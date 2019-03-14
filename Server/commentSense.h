#ifndef COMMENTSENSE_H_INCLUDED
#define COMMENTSENSE_H_INCLUDED

#include "sqlite3.h"
#include "string.h"

#ifdef OWN_JSON_PARSER_FINISHED
#include "json.h"
#else
#include "cJSON.h"
#endif

String getComments(String site);




String getComments(String site){
    String content = newString("");
    printf("get comments: \"%s\"\n", site.data);
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
