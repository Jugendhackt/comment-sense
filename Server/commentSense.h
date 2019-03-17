#ifndef COMMENTSENSE_H_INCLUDED
#define COMMENTSENSE_H_INCLUDED

#include "sqlite3.h"
#include "string.h"

#ifdef OWN_JSON_PARSER_FINISHED
#include "json.h"
#else
#include "cJSON.h"
#endif

String getComments(int index, String request);


char *noComments = "{\"Comments\":[{\"id\":-1,\"headline\":\"Keine Kommentare\",\"content\":\""
                   "F&uumlr diese Webseite wurden bis jetzt noch keine Kommentare erstellt. "
                   "Du kannst gern damit anfangen.\",\"votes\":0,\"userID\":-1,\"userName\":\"CommentSense\"}]}";
sqlite3 *db;

int callback(void *data, int argc, char **argv, char **azColName){
    int index = (long)data;
    int len = connections[index].result.rows++;
    connections[index].result.columns = argc;
    connections[index].result.data = realloc(connections[index].result.data, connections[index].result.rows*sizeof(String*));
    String *line = malloc(argc*sizeof(String));
    for(int i = 0; i < argc; i++){
        line[i] = newString(argv[i]);
    }
    connections[index].result.data[len] = line;
    return 0;
}

void clearResult(int index){
    dbResult result = connections[index].result;
    String **data = result.data;
    for(int i = 0; i < result.rows; i++){
        for(int k = 0; k < result.columns; k++){
            deleteString(data[i][k]);
        }
        free(data[i]);
    }
    free(data);

    connections[index].result.columns = 0;
    connections[index].result.rows = 0;
    connections[index].result.data = malloc(0);
}

String getComments(int index, String request){
    String content = newString(noComments);
    String site = newString(request.data+10);

    String getIDs = newString("SELECT * FROM sites WHERE url LIKE \'");
    appendStringStr(&getIDs, site);
    appendString(&getIDs, '\'');

    sqlite3_exec(db, getIDs.data, callback, (void*)(long)index, NULL);

    dbResult result = connections[index].result;
    if(result.rows != 0){
        deleteString(content);
        cJSON *root = cJSON_CreateObject();
        cJSON *comments = cJSON_AddArrayToObject(root, "Comments");
        ;
        content.data = cJSON_Print(root);
        content.length = strlen(content.data);
        cJSON_Delete(root);
    }
    clearResult(index);

    printf("get comments: \"%s\"\n", getIDs.data);
    return content;
}

void testJson(){
    cJSON *root = cJSON_CreateObject();
    cJSON_AddItemToObject(root, "string", cJSON_CreateString("test string 123"));
    char *str = cJSON_Print(root);
    printf("%s\n\n", str);
    free(str);
    cJSON_Delete(root);
}

#endif // COMMENTSENSE_H_INCLUDED
