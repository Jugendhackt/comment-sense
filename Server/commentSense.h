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

String getComments(int index, String request);
String getUserName(int id);

char *noComments = "{\"Comments\":[{\"id\":-1,\"headline\":\"Keine Kommentare\",\"content\":\""
                   "F&uumlr diese Webseite wurden bis jetzt noch keine Kommentare erstellt. "
                   "Du kannst gern damit anfangen.\",\"votes\":0,\"userID\":-1,\"userName\":\"CommentSense\"}]}";
sqlite3 *db;

int callback(void *data, int argc, char **argv, char **azColName){
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

String getComments(int index, String request){
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

        if(result.rows > 0 && result.columns == 7){
            for(int i = 0; i < result.rows; i++){
                int id = intFromString(result.data[i][0]);
                int userId = intFromString(result.data[i][1]);
                StringList votes = splitString(result.data[i][3], ',');
                String headline = result.data[i][5];
                String content = result.data[i][6];
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
    else
        content = newString(noComments);

    deleteString(site);
    deleteString(getIDs);
    clearResult(&result);
    return content;
}

String getUserName(int userId){
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

#endif // COMMENTSENSE_H_INCLUDED
