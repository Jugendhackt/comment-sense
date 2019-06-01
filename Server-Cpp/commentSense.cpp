#include "commentSense.h"

HttpResponse getComments(PluginArg arg){
    Sqlite3DB *db = reinterpret_cast<Sqlite3DB*>(arg.arg);
    std::string url = arg.url.data()+10;
    //std::cout<<url<<"\n";
    if(url.rfind("site='") == 0){
        std::string site = url.data()+6;
        site.pop_back();
        //std::cout<<"getting comments on:\""<<site<<"\n";
        std::stringstream ss;
        ss<<"SELECT comments FROM sites WHERE url LIKE \'"<<site<<"\';";
        dbResult *result = db->exec(ss.str());
        if(result->columns != 1 || result->data.size() != 1){
            //std::cout<<"Error: no comments on this site\n";
            delete  result;
            return {HttpStatus_NotFound,"application/json","{\"comments\":[{\"id\":-1,\"headline\":\"Keine Kommentare\",\"content\":\"F&uumlr diese Webseite wurden bis jetzt noch keine Kommentare erstellt. Du kannst gern damit anfangen.\",\"votes\":0,\"userID\":-1,\"userName\":\"CommentSense\"}]}"};
        }
        else{
            //std::cout<<"found some comments\n";
            std::string commentIDs = result->data[0][0];
            ss.str(std::string());
            ss<<"SELECT id,userId,(length(votes)-length(replace(votes, \",\", \"\"))) as count,headline,content,url FROM comments WHERE id IN ("<<commentIDs<<");";
            delete result;
            result = db->exec(ss.str());
            std::string json = commentsToJson(result);
            delete result;
            return {200,"application/json",json};
        }
    }
    else
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"no site specified\"}"};
}

HttpResponse getTopComments(PluginArg arg)
{
    Sqlite3DB *db = reinterpret_cast<Sqlite3DB*>(arg.arg);
    std::string url = arg.url.data()+10;
    //std::cout<<url<<"\n";
    if(url.rfind("site='") == 0){
        std::string site = url.data()+6;
        site.pop_back();
        //std::cout<<"getting comments on:\""<<site<<"\n";
        std::stringstream ss;
        ss<<"SELECT comments FROM sites WHERE url LIKE \'"<<site<<"\';";
        dbResult *result = db->exec(ss.str());
        if(result->columns != 1 || result->data.size() != 1){
            //std::cout<<"Error: no comments on this site\n";
            delete  result;
            return {HttpStatus_NotFound,"text/plain","Error: no comments on this site"};
        }
        else{
            //std::cout<<"found some comments\n";
            std::string commentIDs = result->data[0][0];
            ss.str(std::string());
            ss<<"SELECT id,userId,(length(votes)-length(replace(votes, \",\", \"\"))) as count,headline,content,url FROM comments WHERE id IN ("<<commentIDs<<") order by count desc limit 5;";
            delete result;
            result = db->exec(ss.str());
            std::string json = commentsToJson(result);
            delete result;
            return {200,"application/json",json};
        }
    }
    else{
        std::stringstream ss;
        ss<<"SELECT id,userId,(length(votes)-length(replace(votes, \",\", \"\"))) as count,headline,content,url FROM comments order by count desc limit 5;";
        dbResult *result = db->exec(ss.str());
        std::string json = commentsToJson(result);
        delete result;
        return {200,"application/json",json};
    }
}

HttpResponse getTopSites(PluginArg arg)
{
    Sqlite3DB *db = reinterpret_cast<Sqlite3DB*>(arg.arg);
    std::string getTopSites = "SELECT id,url,(length(comments)-length(replace(comments, \",\", \"\"))+1) as count FROM sites order by count desc limit 5;";
    dbResult *result = db->exec(getTopSites);
    std::string json = sitesToJson(result);
    delete result;
    return {200,"application/json",json};
}

HttpResponse postComment(PluginArg arg){
    Sqlite3DB *db = reinterpret_cast<Sqlite3DB*>(arg.arg);
    cJSON *root = cJSON_Parse(arg.payload.data());
    if(!cJSON_HasObjectItem(root, "userName")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"userName missing in json\"}"};
    }
    if(!cJSON_HasObjectItem(root, "password")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"password missing in json\"}"};
    }
    if(!cJSON_HasObjectItem(root, "headline")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"headline missing in json\"}"};
    }
    if(!cJSON_HasObjectItem(root, "content")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"content missing in json\"}"};
    }
    if(!cJSON_HasObjectItem(root, "url")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"url missing in json\"}"};
    }
    
    char *userNameRaw = cJSON_GetObjectItem(root, "userName")->valuestring;
    char *passwordRaw = cJSON_GetObjectItem(root, "password")->valuestring;
    char *headlineRaw = cJSON_GetObjectItem(root, "headline")->valuestring;
    char *contentRaw = cJSON_GetObjectItem(root, "content")->valuestring;
    char *urlRaw = cJSON_GetObjectItem(root, "url")->valuestring;
    std::string userName = userNameRaw == nullptr ? "" : userNameRaw;
    std::string password = passwordRaw == nullptr ? "" : passwordRaw;
    std::string headline = headlineRaw == nullptr ? "" : headlineRaw;
    std::string content = contentRaw == nullptr ? "" : contentRaw;
    std::string url = urlRaw == nullptr ? "" : urlRaw;
    
    cJSON_Delete(root);
    
    if(isUserValid(userName, password, db)){
        std::string headlineData = stringToHex(headline);
        std::string contentData = stringToHex(content);
        std::string date = getDate();
        
        int userId = getUserId(userName, db);
        
        std::stringstream querry;
        querry<<"INSERT INTO comments (userId, votes, date, headline, content, url) VALUES (\'"<<userId
              <<"\',\'\',\'"<<date<<"\',\'"<<headlineData<<"\',\'"<<contentData<<"\',\'"<<url<<"\');";
        dbResult *result = db->exec(querry.str());
        if(result->changes == 1){
            int64_t commentId = result->rowId;
            delete result;
            if(addCommentToSite(commentId, url, db)){
                return {HttpStatus_Created,"application/json","{\"status\":\"comment successfully posted\"}"};
            }
            else{
                return {HttpStatus_InternalServerError,"application/json","{\"error\":\"couldn't add comment to sites\"}"};
            }
        }
        else{
            delete result;
            return {HttpStatus_InternalServerError,"application/json","{\"error\":\"sql insert failed\"}"};
        }
    }
    else{
        return {HttpStatus_Unauthorized,"application/json","{\"error\":\"user not valid\"}"};
    }    
    return {HttpStatus_NotImplemented,"text/plain","Error: Not implemented"};
}

HttpResponse voteComment(PluginArg arg){
    return {HttpStatus_NotImplemented,"text/plain","Error: Not implemented"};
}

HttpResponse createUser(PluginArg arg){
    Sqlite3DB *db = reinterpret_cast<Sqlite3DB*>(arg.arg);
    cJSON *root = cJSON_Parse(arg.payload.data());
    if(!cJSON_HasObjectItem(root, "userName")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"userName missing in json\"}"};
    }
    if(!cJSON_HasObjectItem(root, "password")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"password missing in json\"}"};
    }
    char *userNameRaw = cJSON_GetObjectItem(root, "userName")->valuestring;
    char *passwordRaw = cJSON_GetObjectItem(root, "password")->valuestring;
    std::string userName = userNameRaw == nullptr ? "" : userNameRaw;
    std::string password = passwordRaw == nullptr ? "" : passwordRaw;
    
    cJSON_Delete(root);
    
    std::stringstream ss;
    ss<<"SELECT name FROM users WHERE name LIKE \'"<<userName<<"\';";
    dbResult *result = db->exec(ss.str());
    if(result->data.size() == 0){
        delete result;
        ss.str("");
        ss<<"INSERT INTO users (name, password) VALUES (\'"<<userName<<"\',\'"<<password<<"\');";
        result = db->exec(ss.str());
        if(result->changes == 1){
            delete result;
            return {HttpStatus_OK,"application/json","{\"status\":\"user created\"}"};
        }
        else{
            delete result;
            return {HttpStatus_InternalServerError,"application/json","{\"error\":\"user couldn't be created\"}"};
        }
    }
    else{
        delete result;
        return {HttpStatus_Conflict,"application/json","{\"error\":\"user already exists\"}"};
    }
    return {HttpStatus_NotImplemented,"text/plain","Error: Not implemented"};
}

HttpResponse checkUser(PluginArg arg){
    Sqlite3DB *db = reinterpret_cast<Sqlite3DB*>(arg.arg);
    cJSON *root = cJSON_Parse(arg.payload.data());
    if(!cJSON_HasObjectItem(root, "userName")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"userName missing in json\"}"};
    }
    if(!cJSON_HasObjectItem(root, "password")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"password missing in json\"}"};
    }
    char *userNameRaw = cJSON_GetObjectItem(root, "userName")->valuestring;
    char *passwordRaw = cJSON_GetObjectItem(root, "password")->valuestring;
    std::string userName = userNameRaw == nullptr ? "" : userNameRaw;
    std::string password = passwordRaw == nullptr ? "" : passwordRaw;
    
    cJSON_Delete(root);
    
    std::stringstream ss;
    ss<<"SELECT password FROM users WHERE name LIKE \'"<<userName<<"\';";
    dbResult *result = db->exec(ss.str());
    if(result->data.size() != 1){
        delete result;
        return {HttpStatus_NotFound,"application/json","{\"error\":\"username not found\"}"};
    }
    if(result->data[0][0] == password){
        delete result;
        return {HttpStatus_OK,"application/json","{\"status\":\"login data valid\"}"};
    }
    else{
        delete result;
        return {HttpStatus_UnprocessableEntity,"application/json","{\"error\":\"wrong password or username\"}"};
    }
}

HttpResponse existsUser(PluginArg arg){
    Sqlite3DB *db = reinterpret_cast<Sqlite3DB*>(arg.arg);
    cJSON *root = cJSON_Parse(arg.payload.data());
    if(!cJSON_HasObjectItem(root, "userName")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"userName missing in json\"}"};
    }
    char *userNameRaw = cJSON_GetObjectItem(root, "userName")->valuestring;
    std::string userName = userNameRaw == nullptr ? "" : userNameRaw;
    
    cJSON_Delete(root);
    
    std::stringstream ss;
    ss<<"SELECT name FROM users WHERE name LIKE \'"<<userName<<"\';";
    dbResult *result = db->exec(ss.str());
    if(result->data.size() != 1){
        delete result;
        return {HttpStatus_OK,"application/json","{\"status\":\"the user exists\"}"};
    }
    else{
        delete result;
        return {HttpStatus_NotFound,"application/json","{\"error\":\"username not found\"}"};
    }
}

HttpResponse manageUser(PluginArg arg){
    return {HttpStatus_NotImplemented,"text/plain","Error: Not implemented"};
}

std::string commentsToJson(dbResult *comments)
{
    int columns = comments->columns;
    if(columns != 6)
        return "{\"error\":\"no comments\"}";
    
    cJSON *root = cJSON_CreateObject();
    cJSON *comments_json = cJSON_AddArrayToObject(root, "comments");
    
    for(std::string *row : comments->data){
        int id = atoi(row[0].c_str());
        int userId = atoi(row[1].c_str());
        int count = atoi(row[2].c_str());
        std::string headline = row[3];
        std::string content = row[4];
        std::string url = row[5];
        
        cJSON *comment = cJSON_CreateObject();
        cJSON_AddNumberToObject(comment, "id", id);
        cJSON_AddNumberToObject(comment, "userId", userId);
        cJSON_AddNumberToObject(comment, "votes", count);
        cJSON_AddStringToObject(comment, "headline", stringFromHex(headline).c_str());
        cJSON_AddStringToObject(comment, "content", stringFromHex(content).c_str());
        cJSON_AddStringToObject(comment, "url", url.c_str());
        
        cJSON_AddItemToArray(comments_json, comment);
    }
    char *data = cJSON_Print(root);
    std::string json = data;
    free(data);
    cJSON_Delete(root);
    return json;
}

std::string sitesToJson(dbResult *sites)
{
    int columns = sites->columns;
    if(columns != 3)
        return "{\"error\":\"no comments\"}";
    
    cJSON *root = cJSON_CreateObject();
    cJSON *sites_json = cJSON_AddArrayToObject(root, "sites");
    
    for(std::string *row : sites->data){
        int id = atoi(row[0].c_str());
        int count = atoi(row[2].c_str());
        std::string url = row[1];
        
        cJSON *comment = cJSON_CreateObject();
        cJSON_AddNumberToObject(comment, "id", id);
        cJSON_AddNumberToObject(comment, "count", count);
        cJSON_AddStringToObject(comment, "url", url.c_str());
        
        cJSON_AddItemToArray(sites_json, comment);
    }
    char *data = cJSON_Print(root);
    std::string json = data;
    free(data);
    cJSON_Delete(root);
    return json;
}

int getUserId(std::string userName, Sqlite3DB *db)
{
    std::stringstream querry;
    querry<<"SELECT id FROM users WHERE name LIKE \'"<<userName<<"\';";
    dbResult *result = db->exec(querry.str());
    if(result->data.size() != 1){
        delete result;
        return -1;
    }
    else{
        int id = atoi(result->data[0][0].c_str());
        delete result;
        return id;
    }
}

bool isUserValid(std::string userName, std::string password, Sqlite3DB *db)
{
    std::stringstream querry;
    querry<<"SELECT password FROM users WHERE name LIKE \'"<<userName<<"\';";
    dbResult *result = db->exec(querry.str());
    if(result->data.size() != 1){
        delete result;
        return false;
    }
    if(result->data[0][0] == password){
        delete result;
        return true;
    }
    delete result;
    return false;
}

bool addCommentToSite(int64_t commentId, std::string url, Sqlite3DB *db)
{
    std::string id = std::to_string(commentId);
    std::stringstream querry;
    querry<<"SELECT comments FROM sites WHERE url LIKE \'"<<url<<"\';";
    dbResult *result = db->exec(querry.str());
    if(result->data.size() == 0){
        delete result;
        querry.str("");
        querry<<"INSERT INTO sites (url, comments) VALUES (\'"<<url<<"\', \'"<<id<<"\');";
        result = db->exec(querry.str());
        if(result->changes){
            delete result;
            return true;
        }
        else{
            delete result;
            return false;
        }
    }
    else if(result->data.size() == 1){
        std::string comments = result->data[0][0];
        delete result;
        comments += ',';
        comments += id;
        querry.str("");
        querry<<"UPDATE sites SET comments = \'"<<comments<<"\' WHERE url LIKE \'"<<url<<"\';";
        result = db->exec(querry.str());
        if(result->changes){
            delete result;
            return true;
        }
        else{
            delete result;
            return false;
        }
    }
    else{
        delete result;
        return false;
    }
    return true;
}
