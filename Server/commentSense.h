#ifndef COMMENTSENSE_H_INCLUDED
#define COMMENTSENSE_H_INCLUDED

#include "sqlite3.h"
#include "string.h"

#ifdef OWN_JSON_PARSER_FINISHED
#include "json.h"
#else
#include "cJSON.h"
#endif


typedef struct dbResult{
    int rows;
    int columns;
    String **data;
} dbResult;

String getComments(String request, int *status);
String postComment(String json, int *status);
String createUser(String json, int *status);
String voteComment(String json, int *status);

String getDate();
String getUserName(unsigned int id);
int isUserValid(String userName, String password);
int addCommentToSite(int commentId, String url);
unsigned int getUserId(String userName);

char *noComments = "{\"Comments\":[{\"id\":-1,\"headline\":\"Keine Kommentare\",\"content\":\""
                   "F&uumlr diese Webseite wurden bis jetzt noch keine Kommentare erstellt. "
                   "Du kannst gern damit anfangen.\",\"votes\":0,\"userID\":-1,\"userName\":\"CommentSense\"}]}";
sqlite3 *db;

int callback(void *data, int argc, char **argv, char **azColName){
    if(data == NULL)
        return 0;
    dbResult *result = data;
    int len = result->rows++;
    result->columns = argc;
    result->data = realloc(result->data, result->rows*sizeof(String*));
    String *line = malloc(argc*sizeof(String));
    for(int i = 0; i < argc; i++){
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
    result->data = malloc(0);
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

String getComments(String request, int *status){
    String content;
    String site = newString(request.data+10);
    String getIDs = newString("SELECT * FROM sites WHERE url LIKE \'");
    appendStringStr(&getIDs, site);
    appendString(&getIDs, '\'');

    dbResult result = (dbResult){0,0,malloc(0)};
    sqlite3_exec(db, getIDs.data, callback, &result, NULL);

    if(result.rows > 0 && result.columns == 3){
        cJSON *root = cJSON_CreateObject();
        cJSON *comments = cJSON_AddArrayToObject(root, "Comments");

        String commentIDs = result.data[0][2];
        String querry = newString("SELECT * FROM comments WHERE id IN (");
        appendStringStr(&querry, commentIDs);
        appendString(&querry, ')');

        clearResult(&result);
        sqlite3_exec(db, querry.data, callback, &result, NULL);

        if(result.rows > 0 && result.columns == 6){
            for(int i = 0; i < result.rows; i++){
                int id = intFromString(result.data[i][0]);
                int userId = intFromString(result.data[i][1]);
                StringList votes = splitString(result.data[i][2], ',');
                String headline = result.data[i][4];
                String content = result.data[i][5];
                String userName = getUserName(userId);

                cJSON *comment = cJSON_CreateObject();
                cJSON_AddNumberToObject(comment, "id", id);
                cJSON_AddStringToObject(comment, "headline", headline.data);
                cJSON_AddStringToObject(comment, "content", content.data);
                cJSON_AddNumberToObject(comment, "votes", stringListLen(votes));
                cJSON_AddNumberToObject(comment, "userID", userId);
                cJSON_AddStringToObject(comment, "userName", userName.data);

                cJSON_AddItemToArray(comments, comment);

                deleteString(userName);
                deleteStringList(votes);
            }
        }

        content.data = cJSON_Print(root);
        content.length = strlen(content.data);
        deleteString(querry);
        cJSON_Delete(root);
    }
    else{
        content = newString(noComments);
        *status = 404;
    }

    deleteString(site);
    deleteString(getIDs);
    clearResult(&result);
    return content;
}

String postComment(String json, int *status){
    String response = newString("");

    cJSON *root = cJSON_Parse(json.data);

    String userName = newString(cJSON_GetObjectItem(root, "userName")->valuestring);
    String password = newString(cJSON_GetObjectItem(root, "password")->valuestring);

    if(isUserValid(userName, password)){
        String headline = newString(cJSON_GetObjectItem(root, "headline")->valuestring);
        String comment = newString(cJSON_GetObjectItem(root, "comment")->valuestring);
        String url = newString(cJSON_GetObjectItem(root, "url")->valuestring);

        unsigned int userId = getUserId(userName);
        String date = getDate();
        String querry = newString("INSERT INTO comments (userId, votes, date, headline, content) VALUES (\"");
        appendStringInt(&querry, userId);
        appendStringStdStr(&querry, "\",\"\",\"");
        appendStringStr(&querry, date);
        appendStringStdStr(&querry, "\",\"");
        appendStringStr(&querry, headline);
        appendStringStdStr(&querry, "\",\"");
        appendStringStr(&querry, comment);
        appendStringStdStr(&querry, "\")");

        sqlite3_exec(db, querry.data, callback, NULL, NULL);
        int commentId = sqlite3_last_insert_rowid(db);

        if(!addCommentToSite(commentId, url))
            printf("could't add the comment %i to the site\n", commentId);

        deleteString(date);
        deleteString(querry);
        deleteString(headline);
        deleteString(comment);
        deleteString(url);
        *status = 201;
    }
    else{
        deleteString(response);
        response = newString("{\"error\":\"User not valid\"");
        printf("User not Valid: \'%s\' | \'%s\'\n", userName.data, password.data);
        *status = 401;
    }

    deleteString(userName);
    deleteString(password);
    cJSON_Delete(root);

    return response;
}

String createUser(String json, int *status){
    String response = newString("");

    cJSON *root = cJSON_Parse(json.data);
    String userName = newString(cJSON_GetObjectItem(root, "userName")->valuestring);
    String password = newString(cJSON_GetObjectItem(root, "password")->valuestring);

    printf("creating user ...\n%s\n", json.data);

    cJSON_Delete(root);
    return response;
}
String voteComment(String json, int *status){
    String response = newString("");

    cJSON *root = cJSON_Parse(json.data);

    String userName = newString(cJSON_GetObjectItem(root, "userName")->valuestring);
    String password = newString(cJSON_GetObjectItem(root, "password")->valuestring);
    int id = cJSON_GetObjectItem(root, "id")->valueint;
    int vote = cJSON_GetObjectItem(root, "vote")->valueint;

    if(isUserValid(userName, password)){
        int userId = getUserId(userName);
        String querry = newString("SELECT votes FROM comments WHERE id LIKE ");
        appendStringInt(&querry, id);
        printf("%s\n", querry.data);

        dbResult result = (dbResult){0,0,malloc(0)};
        sqlite3_exec(db, querry.data, callback, &result, NULL);
        if(result.rows == 1 && result.columns == 1){
            String votes = newString(result.data[0][0].data);
            printf("%s\n", votes.data);
            if(vote == 1){  //vote
                if(votes.length == 0){
                    deleteString(votes);
                    votes = stringFromInt(userId);

                    deleteString(querry);
                    querry = newString("UPDATE comments SET votes = \'");
                    appendStringStr(&querry, votes);
                    appendStringStdStr(&querry, "\' WHERE id LIKE \'");
                    appendStringInt(&querry, id);
                    appendString(&querry, '\'');
                    printf("%s\n", querry.data);
                    sqlite3_exec(db, querry.data, callback, NULL, NULL);
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
                        querry = newString("UPDATE comments SET votes = \'");
                        appendStringStr(&querry, votes);
                        appendStringStdStr(&querry, "\' WHERE id LIKE \'");
                        appendStringInt(&querry, id);
                        appendString(&querry, '\'');
                        printf("%s\n", querry.data);
                        sqlite3_exec(db, querry.data, callback, NULL, NULL);
                    }
                    else{// the user has already voted
                        printf("already voted\n");
                        *status = 403;
                    }
                    deleteString(user);
                    deleteStringList(voters);
                }
            }
            else if(vote == -1){    //unvote
                if(votes.length == 0){//someone must have voted, before you can unvote
                    *status = 422;
                }
                else{
                    ;
                }
            }
            else{   //you can't vote nothing/more than once/unvote more then once
                *status = 422;
            }
            deleteString(votes);
        }
        else{   //the comment is not in the database
            *status = 404;
        }
        deleteString(querry);
        clearResult(&result);
    }
    else{   //you need a valid account to vote
        deleteString(response);
        response = newString("{\"error\":\"User not valid\"");
        printf("User not Valid: \'%s\' | \'%s\'\n", userName.data, password.data);
        *status = 401;
    }

    printf("voting ...\n%s\n", json.data);
    deleteString(userName);
    deleteString(password);
    cJSON_Delete(root);
    return response;
}

String getUserName(unsigned int userId){
    if(userId == -1)
        return newString("Unknown User");
    String userName;
    dbResult result = (dbResult){0,0,malloc(0)};
    String querry = newString("SELECT name FROM users WHERE id LIKE ");
    String id = stringFromInt(userId);
    appendStringStr(&querry, id);

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
    dbResult result = (dbResult){0,0,malloc(0)};
    String querry = newString("SELECT id FROM users WHERE name LIKE \'");
    appendStringStr(&querry, userName);
    appendString(&querry, '\'');

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
    dbResult result = (dbResult){0,0,malloc(0)};
    String id = stringFromInt(commentId);
    String querry = newString("SELECT comments FROM sites WHERE url LIKE \'");
    appendStringStr(&querry, url);
    appendString(&querry, '\'');

    sqlite3_exec(db, querry.data, callback, &result, NULL);
    deleteString(querry);
    if(result.rows == 0){// site isn't in db --> create entry
        querry = newString("INSERT INTO sites (url, comments) VALUES (\'");
        appendStringStr(&querry, url);
        appendStringStdStr(&querry, "\', \'");
        appendStringStr(&querry, id);
        appendStringStdStr(&querry, "\')");
        sqlite3_exec(db, querry.data, callback, NULL, NULL);
    }
    else if(result.rows > 0 && result.columns == 1){
        String comments = result.data[0][0];
        appendString(&comments, ',');
        appendStringStr(&comments, id);

        querry = newString("UPDATE sites SET comments = \'");
        appendStringStr(&querry, comments);
        appendStringStdStr(&querry, "\' WHERE url LIKE \'");
        appendStringStr(&querry, url);
        appendString(&querry, '\'');

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
    String querry = newString("SELECT password FROM users WHERE name LIKE \'");
    appendStringStr(&querry, userName);
    appendString(&querry, '\'');
    dbResult result = (dbResult){0,0,malloc(0)};
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

#endif // COMMENTSENSE_H_INCLUDED
