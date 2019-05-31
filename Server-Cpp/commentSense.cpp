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
            return {HttpStatus_NotFound,"text/plain","Error: no comments on this site"};
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
        return {400,"text/plain","Error: site not specified"};
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
    std::string json = cJSON_Print(root);
    cJSON_Delete(root);
    return json;
}
