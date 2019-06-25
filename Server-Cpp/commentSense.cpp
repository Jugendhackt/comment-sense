#include "commentSense.hpp"

static const char *noCommentsStr =  "{\"comments\":[{"
                                        "\"id\":-1,"
                                        "\"headline\":\"Keine Kommentare\","
                                        "\"content\":\"F&uumlr diese Webseite wurden bis jetzt noch keine Kommentare erstellt. Du kannst gern damit anfangen.\","
                                        "\"votes\":0,"
                                        "\"userID\":-1,"
                                        "\"userName\":\"CommentSense\""
                                    "}]}";

HttpResponse getComments(PluginArg arg){
    Sqlite3DB *db = reinterpret_cast<Sqlite3DB*>(arg.arg);
    std::string url = arg.url.data()+10;
    if(url.rfind("site='") == 0){
        std::string site = url.data()+6;
        site.pop_back();
#if defined(DEBUG)
        std::cerr<<"getting comments on:\""<<site<<"\n";
#endif
        std::stringstream ss;
        ss<<"SELECT comments FROM sites WHERE url LIKE \'"<<site<<"\';";
        dbResult *result = db->exec(ss.str());
        if(result->columns != 1 || result->data.size() != 1){
#if defined(DEBUG)
            std::cerr<<"Error: no comments on this site\n";
#endif
            delete  result;
            return {HttpStatus_NotFound,"application/json",noCommentsStr};
        }
        else{
#if defined(DEBUG)
            std::cerr<<"found "<<result->columns<<" comment(s)\n";
#endif
            std::string commentIDs = result->data[0][0];
            ss.str(std::string());
            ss<<"SELECT id,userId,(length(votes)-length(replace(votes, \",\", \"\"))) as count,headline,content,url,date FROM comments WHERE id IN ("<<commentIDs<<");";
            delete result;
            result = db->exec(ss.str());
            std::string json = commentsToJson(result, db);
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
    if(url.rfind("site='") == 0){
        std::string site = url.data()+6;
        site.pop_back();
#if defined(DEBUG)
        std::cerr<<"getting comments on:\""<<site<<"\n";
#endif
        std::stringstream ss;
        ss<<"SELECT comments FROM sites WHERE url LIKE \'"<<site<<"\';";
        dbResult *result = db->exec(ss.str());
        if(result->columns != 1 || result->data.size() != 1){
#if defined(DEBUG)
            std::cerr<<"Error: no comments on this site\n";
#endif
            delete  result;
            return {HttpStatus_NotFound,"application/json","{\"error\":\"no comments on this site\"}"};
        }
        else{
#if defined(DEBUG)
            std::cerr<<"found "<<result->columns<<" comment(s)\n";
#endif
            std::string commentIDs = result->data[0][0];
            ss.str(std::string());
            ss<<"SELECT id,userId,(length(votes)-length(replace(votes, \",\", \"\"))) as count,headline,content,url,date FROM comments WHERE id IN ("<<commentIDs<<") order by count desc limit 5;";
            delete result;
            result = db->exec(ss.str());
            std::string json = commentsToJson(result, db);
            delete result;
            return {200,"application/json",json};
        }
    }
    else{
        std::stringstream ss;
        ss<<"SELECT id,userId,(length(votes)-length(replace(votes, \",\", \"\"))) as count,headline,content,url,date FROM comments order by count desc limit 5;";
        dbResult *result = db->exec(ss.str());
        std::string json = commentsToJson(result, db);
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
    return {HttpStatus_NotImplemented,"application/json","{\"error\":\"not implemented\"}"};
}

HttpResponse voteComment(PluginArg arg){
    Sqlite3DB *db = reinterpret_cast<Sqlite3DB*>(arg.arg);
    cJSON *root = cJSON_Parse(arg.payload.c_str());

    if(!cJSON_HasObjectItem(root, "userName")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"userName missing in json\"}"};
    }
    if(!cJSON_HasObjectItem(root, "password")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"password missing in json\"}"};
    }
    if(!cJSON_HasObjectItem(root, "id")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"headline missing in json\"}"};
    }
    if(!cJSON_HasObjectItem(root, "vote")){
        cJSON_Delete(root);
        return {HttpStatus_BadRequest,"application/json","{\"error\":\"content missing in json\"}"};
    }

    char *userNameRaw = cJSON_GetObjectItem(root, "userName")->valuestring;
    char *passwordRaw = cJSON_GetObjectItem(root, "password")->valuestring;
    int id = cJSON_GetObjectItem(root, "id")->valueint;
    int vote = cJSON_GetObjectItem(root, "vote")->valueint;
    std::string userName = userNameRaw == nullptr ? "" : userNameRaw;
    std::string password = passwordRaw == nullptr ? "" : passwordRaw;

    if(isUserValid(userName, password, db)){
        std::stringstream querry;
        querry<<"SELECT votes FROM comments WHERE id LIKE "<<id<<";";
        dbResult *result = db->exec(querry.str());
        if(result->columns == 1 && result->data.size() == 1){
            std::string votes = *result->data[0];
            int userId = getUserId(userName, db);
            std::vector<std::string> voters = split(votes, ',');
            bool alreadyVoted = false;
            for(std::string current : voters){
                if(atoi(current.c_str()) == userId){
                    alreadyVoted = true;
                    break;
                }
            }
            if(vote == 1){
                if(!alreadyVoted){
                    std::stringstream ss;
                    ss<<votes<<","<<userId;
                    querry.str("");
                    querry<<"UPDATE comments SET votes = \'"<<ss.str()<<"\' WHERE id LIKE "<<id<<";";
                    delete result;
                    result = db->exec(querry.str());
                    if(result->changes > 0){
                        delete result;
                        return {HttpStatus_OK,"application/json","{\"status\":\"successfully voted\"}"};
                    }
                    else{
                        delete result;
                        return {HttpStatus_InternalServerError,"application/json","{\"error\":\"can't write to database\"}"};
                    }
                }
                else{
                    delete result;
                    return {HttpStatus_Conflict,"application/json","{\"error\":\"already voted\"}"};
                }
            }
            else if(vote == -1){
                if(alreadyVoted){
                    std::string userIdStr = std::to_string(userId);
                    votes.replace(votes.find(userIdStr), userIdStr.size()+1, "");
                    querry.str("");
                    querry<<"UPDATE comments SET votes = \'"<<votes<<"\' WHERE id LIKE "<<id<<";";
                    delete result;
                    result = db->exec(querry.str());
                    if(result->changes > 0){
                        delete result;
                        return {HttpStatus_OK,"application/json","{\"status\":\"successfully unvoted\"}"};
                    }
                    else{
                        delete result;
                        return {HttpStatus_InternalServerError,"application/json","{\"error\":\"can't write to database\"}"};
                    }
                }
                else{
                    delete result;
                    return {HttpStatus_Conflict,"application/json","{\"error\":\"you have to vote before you can unvote\"}"};
                }
            }
            else{
                delete result;
                return {HttpStatus_BadRequest,"application/json","{\"error\":\"invalid vote type\"}"};
            }
        }
        else{
            delete result;
            return {HttpStatus_NotFound,"application/json","{\"error\":\"comment not in databse\"}"};
        }
    }
    else{
        return {HttpStatus_Forbidden,"application/json","{\"error\":\"wrong username or password\"}"};
    }
    return {HttpStatus_NotImplemented,"application/json","{\"error\":\"not implemented\"}"};
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
    return {HttpStatus_NotImplemented,"application/json","{\"error\":\"not implemented\"}"};
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
    return {HttpStatus_NotImplemented,"application/json","{\"error\":\"not implemented\"}"};
}

HttpResponse getUser(PluginArg arg)
{
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
    std::string userName = userNameRaw == nullptr ? "" : userNameRaw;
	char *passwordRaw = cJSON_GetObjectItem(root, "password")->valuestring;
    std::string password = passwordRaw == nullptr ? "" : passwordRaw;
	
	cJSON_Delete(root);
	if(isUserValid(userName, password, db)){
		std::stringstream ss;
		ss<<"SELECT * FROM users WHERE name LIKE \'"<<userName<<"\';";
		dbResult *result = db->exec(ss.str());
		if(result->columns == 5 && result->data.size() == 1){
			std::string id = result->data[0][0];
			std::string email = result->data[0][3];
			std::stringstream json;
			json<<"{\"id\":"<<id<<",\"userName\":\""<<userName<<"\",\"password\":\""<<password<<"\",\"email\":\""<<email<<"\"}";
			delete result;
			return {HttpStatus_OK,"application/json",json.str()};
		}
		else{
			delete result;
			return {HttpStatus_NotFound,"application/json","{\"error\":\"username not found\"}"};
		}
	}
	else{
        return {HttpStatus_UnprocessableEntity,"application/json","{\"error\":\"wrong password or username\"}"};
    }
}

std::string commentsToJson(dbResult *comments, Sqlite3DB *db)
{
    int columns = comments->columns;
    if(columns != 7)
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
		std::string date = row[6];
        
        cJSON *comment = cJSON_CreateObject();
        cJSON_AddNumberToObject(comment, "id", id);
        cJSON_AddNumberToObject(comment, "userId", userId);
        cJSON_AddNumberToObject(comment, "votes", count);
		cJSON_AddStringToObject(comment, "userName", getUserName(userId, db).c_str());
        cJSON_AddStringToObject(comment, "headline", stringFromHex(headline).c_str());
        cJSON_AddStringToObject(comment, "content", stringFromHex(content).c_str());
        cJSON_AddStringToObject(comment, "url", url.c_str());
		cJSON_AddStringToObject(comment, "date", date.c_str());
        
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

std::string getUserName(int userId, Sqlite3DB *db)
{
	std::stringstream querry;
    querry<<"SELECT name FROM users WHERE id LIKE \'"<<userId<<"\';";
    dbResult *result = db->exec(querry.str());
    if(result->data.size() != 1 || result->columns != 1){
        delete result;
        return "";
    }
    else{
		std::string name = result->data[0][0];
        delete result;
        return name;
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
