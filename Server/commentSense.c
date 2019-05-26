#include "commentSense.h"

char *noComments = "{\"Comments\":[{\"id\":-1,\"headline\":\"Keine Kommentare\",\"content\":\""
                        "F&uumlr diese Webseite wurden bis jetzt noch keine Kommentare erstellt. "
                        "Du kannst gern damit anfangen.\",\"votes\":0,\"userID\":-1,\"userName\":\"CommentSense\"}]}";

const char *dbpath = "./data/mainDataBase.db3";
const char *initdbSQL = "CREATE TABLE \"comments\" (\'id\' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, "
                                                    "\'userId\' INTEGER NOT NULL, \'votes\' TEXT NOT NULL, "
                                                    "\'date\' DATE NOT NULL, \'headline\' TEXT NOT NULL, "
                                                    "\'content\' TEXT NOT NULL, \'url\' TEXT);"
                        "CREATE TABLE \"sites\" (\'id\' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, "
                                                    "\'url\' TEXT, "
                                                    "\'comments\' TEXT);"
                        "CREATE TABLE \"users\" (\'id\' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, "
                                                    "\'name\' TEXT NOT NULL UNIQUE, "
                                                    "\'password\' TEXT NOT NULL, "
                                                    "\'email\' TEXT, "
                                                    "\'trustLevel\' REAL);"
                        "CREATE TABLE sqlite_sequence(name,seq);";
const char *sqlTestChars = ");\"\'*";

sqlite3 *db;

int callback(void *data, int argc, char **argv, char **azColName){
    if(!data)
        return 0;
    dbResult *result = data;
    int len = result->rows++;
    result->columns = argc;
    if(!result->data)
        result->data = malloc(result->rows*sizeof(String*));
    else
        result->data = realloc(result->data, result->rows*sizeof(String*));
    String *line = malloc(argc*sizeof(String));
    for(int i = 0; i < argc; i++){
        if(argv[i] == NULL)
            line[i] = newString("");
        else
            line[i] = newString(argv[i]);
    }
    result->data[len] = line;
    return 0;
}

void clearResult(dbResult *result){
    String **data = result->data;
    for(int i = 0; i < result->rows; i++){
        for(int k = 0; k < result->columns; k++){
            deleteString(data[i][k]);
        }
        free(data[i]);
    }
    free(data);
    result->columns = 0;
    result->rows = 0;
    result->data = NULL;
}

void deleteResult(dbResult result){
    String **data = result.data;
    for(int i = 0; i < result.rows; i++){
        for(int k = 0; k < result.columns; k++){
            deleteString(data[i][k]);
        }
        free(data[i]);
    }
    free(data);
}

String commentsToJson(dbResult result){
    String json;

    cJSON *root = cJSON_CreateObject();
    cJSON *comments = cJSON_AddArrayToObject(root, "Comments");

    if(result.rows > 0 && result.columns == 6){
        for(int i = 0; i < result.rows; i++){
            int id = intFromString(result.data[i][0]);
            int userId = intFromString(result.data[i][1]);
            int count = intFromString(result.data[i][2]);
            String headline = result.data[i][3];
            String content = result.data[i][4];
            String url = result.data[i][5];
            String userName = getUserName(userId);

            String contentDecrypted = fromHex(content);
            String headlineDecrypted = fromHex(headline);

            cJSON *comment = cJSON_CreateObject();
            cJSON_AddNumberToObject(comment, "id", id);
            cJSON_AddStringToObject(comment, "headline", headlineDecrypted.data);
            cJSON_AddStringToObject(comment, "content", contentDecrypted.data);
            cJSON_AddNumberToObject(comment, "votes", count);
            cJSON_AddNumberToObject(comment, "userID", userId);
            cJSON_AddStringToObject(comment, "userName", userName.data);
            cJSON_AddStringToObject(comment, "url", url.data);

            cJSON_AddItemToArray(comments, comment);

            deleteString(contentDecrypted);
            deleteString(headlineDecrypted);
            deleteString(userName);
        }
    }
    else
        fprintf(stderr, "error when creating json from comments: not enough data: %i columns\n", result.columns);

    json.data = cJSON_Print(root);
    json.length = strlen(json.data);
    cJSON_Delete(root);
    return json;
}

String sitesToJson(dbResult result){
    String json;

    cJSON *root = cJSON_CreateObject();
    cJSON *comments = cJSON_AddArrayToObject(root, "sites");

    if(result.rows > 0 && result.columns == 3){
        for(int i = 0; i < result.rows; i++){
            int id = intFromString(result.data[i][0]);
            String url = result.data[i][1];
            int count = intFromString(result.data[i][2]);

            cJSON *site = cJSON_CreateObject();
            cJSON_AddNumberToObject(site, "id", id);
            cJSON_AddStringToObject(site, "url", url.data);
            cJSON_AddNumberToObject(site, "count", count);

            cJSON_AddItemToArray(comments, site);
        }
    }
    else
        fprintf(stderr, "error when creating json from sites: not enough data: %i columns\n", result.columns);

    json.data = cJSON_Print(root);
    json.length = strlen(json.data);
    cJSON_Delete(root);
    return json;
}

String getComments(String request, int *status){
    String content, site;
    char *data = request.data+10;
    if(stringStartsWith(data, "site=\'")){
        site = newString(data+6);
        for(int i = 0; site.data[i] != 0; i++){
            if(site.data[i] == '\''){
                site.data[i] = 0;
                site.length = i;
                break;
            }
        }
    }
    else{
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"no site specified\"}");
    }
    ///
    printf("request: %s, site: %s\n", request.data, site.data);
    if(stringContainsAnyOf(site, sqlTestChars)){
        *status = HttpStatus_Forbidden;
        return newString("{\"error\":\"we don't like sql injections\"");
    }
    String getIDs = combineString(3, "SELECT * FROM sites WHERE url LIKE \'", site.data, "\';");

    dbResult result = (dbResult){0,0,NULL};
    sqlite3_exec(db, getIDs.data, callback, &result, NULL);

    if(result.rows > 0 && result.columns == 3){
        String commentIDs = result.data[0][2];
        if(stringContainsAnyOf(commentIDs, sqlTestChars)){
            *status = HttpStatus_Forbidden;
            return newString("{\"error\":\"we don't like sql injections\"");
        }
        String querry = combineString(3, "SELECT * FROM comments WHERE id IN (", commentIDs.data, ");");

        clearResult(&result);
        sqlite3_exec(db, querry.data, callback, &result, NULL);

        content = commentsToJson(result);
    }
    else{
        content = newString(noComments);
        *status = HttpStatus_NotFound;
    }

    deleteString(site);
    deleteString(getIDs);
    clearResult(&result);
    return content;
}

String getTopComments(String request, int *status){
    String content, site;
    int onSite = 0;
    char *data = request.data+14;
    if(request.length > 14 && stringStartsWith(data, "site=\'")){
        site = newString(data+6);
        for(int i = 0; site.data[i] != 0; i++){
            if(site.data[i] == '\''){
                site.data[i] = 0;
                site.length = i;
                break;
            }
        }
        onSite = 1;
    }
    else{
        onSite = 0;
        site = newString("");
    }
    dbResult result = (dbResult){0,0,NULL};
    if(onSite == 1){
        printf("request: %s, site: %s\n", request.data, site.data);
        if(stringContainsAnyOf(site, sqlTestChars)){
            *status = HttpStatus_Forbidden;
            return newString("{\"error\":\"we don't like sql injections\"");
        }
        String getIDs = combineString(3, "SELECT * FROM sites WHERE url LIKE \'", site.data, "\';");

        sqlite3_exec(db, getIDs.data, callback, &result, NULL);

        if(result.rows > 0 && result.columns == 3){
            String commentIDs = result.data[0][2];
            if(stringContainsAnyOf(commentIDs, sqlTestChars)){
                *status = HttpStatus_Forbidden;
                return newString("{\"error\":\"we don't like sql injections\"");
            }
            String querry = combineString(3, "SELECT id,userId,(length(votes)-length(replace(votes, \",\", \"\"))) as count,headline,content,url FROM comments WHERE id IN (", commentIDs.data, ") order by count desc limit 5;");
            clearResult(&result);
            sqlite3_exec(db, querry.data, callback, &result, NULL);
            content = commentsToJson(result);
            deleteString(querry);
        }
        else{
            content = newString(noComments);
            *status = HttpStatus_NotFound;
        }
        deleteString(getIDs);
    }
    else{
        String querry = newString("SELECT id,userId,(length(votes)-length(replace(votes, \",\", \"\"))) as count,headline,content,url FROM comments order by count desc limit 5;");
        sqlite3_exec(db, querry.data, callback, &result, NULL);
        content = commentsToJson(result);
        deleteString(querry);
    }
    clearResult(&result);
    free(result.data);
    deleteString(site);
    return content;
}

String getTopSites(String json, int *status){
    String querry = newString("SELECT id,url,(length(comments)-length(replace(comments, \",\", \"\"))+1) as count FROM sites order by count desc limit 5;");
    dbResult result = (dbResult){0,0,NULL};
    sqlite3_exec(db, querry.data, callback, &result, NULL);
    String sites = sitesToJson(result);
    clearResult(&result);
    deleteString(querry);
    free(result.data);
    return sites;
}

String postComment(String json, int *status){
    String response;

    cJSON *root = cJSON_Parse(json.data);

    if(!cJSON_HasObjectItem(root, "userName")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"userName missing in json\"}");
    }
    if(!cJSON_HasObjectItem(root, "password")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"password missing in json\"}");
    }
    if(!cJSON_HasObjectItem(root, "headline")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"headline missing in json\"}");
    }
    if(!cJSON_HasObjectItem(root, "comment")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"comment missing in json\"}");
    }
    if(!cJSON_HasObjectItem(root, "url")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"url missing in json\"}");
    }
    char *userNameData = cJSON_GetObjectItem(root, "userName")->valuestring;
    char *passwordData = cJSON_GetObjectItem(root, "password")->valuestring;
    String userName = newString(userNameData == NULL ? "" : userNameData);
    String password = newString(passwordData == NULL ? "" : passwordData);

    if(isUserValid(userName, password)){
        char *rawHeadlineData = cJSON_GetObjectItem(root, "headline")->valuestring;
        char *rawCommentData = cJSON_GetObjectItem(root, "comment")->valuestring;
        char *urlData = cJSON_GetObjectItem(root, "url")->valuestring;
        String rawHeadline = newString(rawHeadlineData == NULL ? "" : rawHeadlineData);
        String rawComment = newString(rawCommentData == NULL ? "" : rawCommentData);
        String url = newString(urlData == NULL ? "" : urlData);

        if(stringContainsAnyOf(url, sqlTestChars)){
            *status = HttpStatus_Forbidden;
            return newString("{\"error\":\"we don't like sql injections\"");
        }

        String headline = convertToHex(rawHeadline);
        String comment = convertToHex(rawComment);

        String userId = stringFromInt(getUserId(userName));
        String date = getDate();
        String querry = combineString(11, "INSERT INTO comments (userId, votes, date, headline, content, url) VALUES (\"",
                                      userId.data, "\",\"\",\"", date.data, "\",\"", headline.data, "\",\"", comment.data, "\",\"", url.data, "\")");
        printf("%s\n", querry.data);

        sqlite3_exec(db, querry.data, callback, NULL, NULL);
        int commentId = sqlite3_last_insert_rowid(db);

        if(!addCommentToSite(commentId, url))
            printf("could't add the comment %i to the site\n", commentId);

        deleteString(rawComment);
        deleteString(rawHeadline);
        deleteString(date);
        deleteString(querry);
        deleteString(headline);
        deleteString(comment);
        deleteString(url);
        response = newString("{\"status\":\"posting the comment probably worked\"}");
        *status = HttpStatus_Created;
    }
    else{
        response = newString("{\"error\":\"User not valid\"}");
        printf("User not Valid: \'%s\' | \'%s\'\n", userName.data, password.data);
        *status = HttpStatus_Unauthorized;
    }

    deleteString(userName);
    deleteString(password);
    cJSON_Delete(root);

    return response;
}

String createUser(String json, int *status){
    String response;
    cJSON *root = cJSON_Parse(json.data);

    if(!cJSON_HasObjectItem(root, "userName")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"userName missing in json\"}");
    }
    if(!cJSON_HasObjectItem(root, "password")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"password missing in json\"}");
    }

    char *userNameData = cJSON_GetObjectItem(root, "userName")->valuestring;
    String userName = newString(userNameData == NULL ? "" : userNameData);
    char *passwordData = cJSON_GetObjectItem(root, "password")->valuestring;
    String password = newString(passwordData == NULL ? "" : passwordData);

    if(stringContainsAnyOf(userName, sqlTestChars)){
        *status = HttpStatus_Forbidden;
        return newString("{\"error\":\"we don't like sql injections\"");
    }
    else if(stringContainsAnyOf(password, sqlTestChars)){
        *status = HttpStatus_Forbidden;
        return newString("{\"error\":\"we don't like sql injections\"");
    }

    String querry = combineString(3, "SELECT id FROM users WHERE name LIKE \'", userName.data, "\'");

    dbResult result = (dbResult){0,0,NULL};
    sqlite3_exec(db, querry.data, callback, &result, NULL);

    if(result.rows == 0){//create the account
        deleteString(querry);
        querry = combineString(5, "INSERT INTO users (name, password) VALUES (\'",
                           userName.data, "\',\'", password.data, "\')");

        sqlite3_exec(db, querry.data, callback, NULL, NULL);
        *status = HttpStatus_Created;
        response = newString("{\"status\":\"user created succesfully\"}");
    }
    else{   // this username is already in use
        *status = HttpStatus_Conflict;
        printf("username already used\n");
        response = newString("{\"status\":\"username already used\"}");
    }

    deleteString(userName);
    deleteString(password);
    deleteString(querry);
    clearResult(&result);
    cJSON_Delete(root);
    return response;
}

String checkUser(String json, int *status){
    cJSON *root = cJSON_Parse(json.data);
    if(!cJSON_HasObjectItem(root, "userName")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"userName missing in json\"}");
    }
    if(!cJSON_HasObjectItem(root, "password")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"password missing in json\"}");
    }
    char *userNameData = cJSON_GetObjectItem(root, "userName")->valuestring;
    String userName = newString(userNameData == NULL ? "" : userNameData);
    char *passwordData = cJSON_GetObjectItem(root, "password")->valuestring;
    String password = newString(passwordData == NULL ? "" : passwordData);
    String response;
    if(isUserValid(userName, password)){
        *status = HttpStatus_OK;
        response = newString("{\"status\":\"login data valid\"}");
    }
    else{
        *status = HttpStatus_Unauthorized;
        response = newString("{\"status\":\"login data not valid\"}");
    }
    deleteString(userName);
    deleteString(password);
    cJSON_Delete(root);
    return response;
}

String existsUser(String json, int *status){
    cJSON  *root = cJSON_Parse(json.data);
    if(!cJSON_HasObjectItem(root, "userName")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"userName missing in json\"}");
    }
    char *userNameData = cJSON_GetObjectItem(root, "userName")->valuestring;
    String userName = newString(userNameData == NULL ? "" : userNameData);
    String response;

    if(stringContainsAnyOf(userName, sqlTestChars)){
        *status = HttpStatus_Forbidden;
        return newString("{\"error\":\"we don't like sql injections\"");
    }

    dbResult result = (dbResult){0,0,NULL};
    String querry = combineString(3, "SELECT id FROM users WHERE name LIKE \'", userName.data, "\'");
    sqlite3_exec(db, querry.data, callback, &result, NULL);

    if(result.rows == 1){
        response = newString("{\"status\":\"userName valid\"}");
    }
    else{
        response = newString("{\"status\":\"userName not valid\"}");
    }

    clearResult(&result);
    deleteString(userName);
    cJSON_Delete(root);
    return response;
}

String manageUser(String json, int *status){
    return newString("");
}

String voteComment(String json, int *status){
    String response = newString("{\"error\":\"unknown error\"}");

    cJSON *root = cJSON_Parse(json.data);

    if(!cJSON_HasObjectItem(root, "userName")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"userName missing in json\"}");
    }
    if(!cJSON_HasObjectItem(root, "password")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"password missing in json\"}");
    }
    if(!cJSON_HasObjectItem(root, "id")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"id missing in json\"}");
    }
    if(!cJSON_HasObjectItem(root, "vote")){
        cJSON_Delete(root);
        *status = HttpStatus_BadRequest;
        return newString("{\"error\":\"vote missing in json\"}");
    }
    char *userNameData = cJSON_GetObjectItem(root, "userName")->valuestring;
    String userName = newString(userNameData == NULL ? "" : userNameData);
    char *passwordData = cJSON_GetObjectItem(root, "password")->valuestring;
    String password = newString(passwordData == NULL ? "" : passwordData);

    int id = cJSON_GetObjectItem(root, "id")->valueint;
    int vote = cJSON_GetObjectItem(root, "vote")->valueint;

    if(isUserValid(userName, password)){
        int userId = getUserId(userName);
        String commentId = stringFromInt(id);
        String querry = combineString(2, "SELECT votes FROM comments WHERE id LIKE ", commentId.data);

        dbResult result = (dbResult){0,0,NULL};
        sqlite3_exec(db, querry.data, callback, &result, NULL);
        if(result.rows == 1 && result.columns == 1){
            String votes = newString(result.data[0][0].data);
            if(vote == 1){  //vote
                if(votes.length == 0){
                    deleteString(votes);
                    votes = stringFromInt(userId);

                    deleteString(querry);
                    querry = combineString(5, "UPDATE comments SET votes = \'", votes.data, "\' WHERE id LIKE \'", commentId.data, "\'");

                    sqlite3_exec(db, querry.data, callback, NULL, NULL);
                    *status = HttpStatus_OK;
                    deleteString(response);
                    response = newString("{\"status\":\"everything worked\"}");
                }
                else{
                    String user = stringFromInt(userId);
                    StringList voters = splitString(votes, ',');
                    int alreadyVoted = 0;
                    for(int i = 0; voters[i].data != NULL; i++){
                        if(compareString(user.data, voters[i].data)){
                            alreadyVoted = 1;
                            break;
                        }
                    }
                    if(!alreadyVoted){
                        appendString(&votes, ',');
                        appendStringStr(&votes, user);

                        deleteString(querry);
                        querry = combineString(5, "UPDATE comments SET votes = \'", votes.data, "\' WHERE id LIKE \'", commentId.data, "\'");
                        sqlite3_exec(db, querry.data, callback, NULL, NULL);
                        *status = HttpStatus_OK;
                        deleteString(response);
                        response = newString("{\"status\":\"everything worked\"}");
                    }
                    else{// the user has already voted
                        printf("already voted\n");
                        *status = HttpStatus_Forbidden;
                        deleteString(response);
                        response = newString("{\"error\":\"you have already voted on this comment\"}");
                    }
                    deleteString(user);
                    deleteStringList(voters);
                }
            }
            else if(vote == -1){    //unvote
                if(votes.length == 0){//someone must have voted, before you can unvote
                    *status = HttpStatus_UnprocessableEntity;
                    deleteString(response);
                    response = newString("{\"error\":\"nobody has voted --> you can't unvote\"}");
                }
                else{///TODO: implement unvoting
                    *status = HttpStatus_NotImplemented;
                    deleteString(response);
                    response = newString("{\"error\":\"not implemented\"}");
                }
            }
            else{   //you can't vote nothing/more than once/unvote more then once
                *status = HttpStatus_UnprocessableEntity;
                deleteString(response);
                response = newString("{\"error\":\"you can only vote +1 or -1\"}");
            }
            deleteString(votes);
            deleteString(commentId);
        }
        else{   //the comment is not in the database
            *status = HttpStatus_NotFound;
            deleteString(response);
            response = newString("{\"error\":\"Comment not found\"}");
        }
        deleteString(querry);
        clearResult(&result);
    }
    else{   //you need a valid account to vote
        printf("User not Valid: \'%s\' | \'%s\'\n", userName.data, password.data);
        *status = HttpStatus_Unauthorized;
        deleteString(response);
        response = newString("{\"error\":\"User not valid\"}");
    }

    deleteString(userName);
    deleteString(password);
    cJSON_Delete(root);
    return response;
}

String getUserName(unsigned int userId){
    if(userId == -1)
        return newString("Unknown User");
    String userName;
    dbResult result = (dbResult){0,0,NULL};
    String id = stringFromInt(userId);
    String querry = combineString(2, "SELECT name FROM users WHERE id LIKE ", id.data);

    sqlite3_exec(db, querry.data, callback, &result, NULL);
    if(result.columns == 1 && result.rows == 1)
        userName = newString(result.data[0][0].data);
    else
        userName = newString("User not found");
    deleteString(querry);
    deleteString(id);
    clearResult(&result);
    return userName;
}

unsigned int getUserId(String userName){
    int id = -1;
    dbResult result = (dbResult){0,0,NULL};
    String querry = combineString(3, "SELECT id FROM users WHERE name LIKE \'", userName.data, "\'");

    sqlite3_exec(db, querry.data, callback, &result, NULL);
    if(result.columns == 1 && result.rows == 1)
        id = intFromString(result.data[0][0]);
    deleteString(querry);
    clearResult(&result);
    return id;
}

String getDate(){
    time_t t = time(NULL);
    char *str = malloc(11);
    strftime(str, 11, "%d.%m.%Y", localtime(&t));
    return (String){str, 10};
}

int addCommentToSite(int commentId, String url){
    dbResult result = (dbResult){0,0,NULL};
    String id = stringFromInt(commentId);
    String querry = combineString(3, "SELECT comments FROM sites WHERE url LIKE \'", url.data, "\'");

    sqlite3_exec(db, querry.data, callback, &result, NULL);
    deleteString(querry);
    if(result.rows == 0){// site isn't in db --> create entry
        querry = combineString(5, "INSERT INTO sites (url, comments) VALUES (\'", url.data, "\', \'", id.data, "\')");

        sqlite3_exec(db, querry.data, callback, NULL, NULL);
    }
    else if(result.rows > 0 && result.columns == 1){
        String comments = newString(result.data[0][0].data);
        appendString(&comments, ',');
        appendStringStr(&comments, id);

        querry = combineString(5, "UPDATE sites SET comments = \'", comments.data, "\' WHERE url LIKE \'", url.data, "\'");
        sqlite3_exec(db, querry.data, callback, NULL, NULL);
        deleteString(comments);
    }
    else
        querry = newString("");

    deleteString(id);
    deleteString(querry);
    clearResult(&result);
    return 1;
}

int isUserValid(String userName, String password){
    String querry = combineString(3, "SELECT password FROM users WHERE name LIKE \'", userName.data, "\'");
    dbResult result = (dbResult){0,0,NULL};
    sqlite3_exec(db, querry.data, callback, &result, NULL);
    int isValid = 0;
    if(result.rows == 1 && result.columns == 1){
        if(compareString(result.data[0][0].data, password.data))
            isValid = 1;
    }
    deleteString(querry);
    clearResult(&result);
    return isValid;
}

void initDatabase(){
    FILE *f = fopen(dbpath, "r");
    bool init = false;
    if(f == NULL){
        f = fopen(dbpath, "w");
        init = true;
    }
    sqlite3_open(dbpath, &db);
    if(init){
        sqlite3_exec(db, initdbSQL, callback, NULL, NULL);
    }
    fclose(f);
}
