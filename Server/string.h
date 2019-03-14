#ifndef STRING_H_INCLUDED
#define STRING_H_INCLUDED

#include <string.h>
#include <stdlib.h>

typedef struct String{
    char *data;
    unsigned int length;
} String;

typedef String* StringList;

void deleteString(String str){
    free(str.data);
}

char* createBasicString(char *str){
    char *string = malloc(sizeof(char)*strlen(str));
    strcpy(string, str);
    return string;
}

String newString(char *str){
    String string;
    string.length = strlen(str);
    string.data = malloc(string.length+1);
    strcpy(string.data, str);
    return string;
}

String copyString(String str){
    return newString(str.data);
}

StringList stringListAppend(StringList list, String str){
    int len = 0;
    for(;list[len].data != NULL; len++);
    list = realloc(list, sizeof(String)*(len+2));
    list[len] = str;
    list[len+1] = (String){NULL,0};
    return list;
}

StringList stringListAppendList(StringList list, StringList list2){
    int len = 0;
    for(;list2[len].data != NULL; len++);
    for(int i = 0; i < len; i++){
        list = stringListAppend(list, list2[i]);
    }
    return list;
}

StringList splitString(String string, char c){
    StringList list = malloc(sizeof(String));
    list[0] = (String){NULL,0};
    char *data = newString(string.data).data;
    char *tmp = data;
    for(int i = 0; i < strlen(data) && data[i] != 0; i++){
        if(data[i] == c){
            data[i] = 0;
            String current = newString(data);
            data += i+1;
            list = stringListAppend(list, current);
        }
    }
    String current = newString(data);
    free(tmp);
    list = stringListAppend(list, current);
    return list;
}

String removeAll(String str, char c){
    str = copyString(str);
    char *data = str.data;
    for(int i = 0; i < str.length && data[i] != 0; i++){
        if(data[i] == c){
            strcpy(&data[i], &data[i+1]);
            data[strlen(data)] = 0;
        }
    }
    return str;
}

void appendString(String *str, char c){
    int len = str->length;
    char *data = malloc(len+2);
    strcpy(data, str->data);
    data[len] = c;
    data[len+1] = 0;
    free(str->data);
    str->data = data;
    str->length = len+1;
}

void appendStringStdStr(String *str, char *str2){
    int len = str->length;
    int len2 = strlen(str2);
    char *data = malloc(len+len2+1);
    strcpy(data, str->data);
    strcpy(data+len, str2);
    free(str->data);
    str->data = data;
    str->length += len2;
}

void appendStringStr(String *str, String str2){
    appendStringStdStr(str, str2.data);
}

void appendStringByteArray(String *str, String byteArray){
    int len = str->length;
    int len2 = byteArray.length;
    char *data = malloc(len+len2);
    memcpy(data, str->data, len);
    memcpy(data+len, byteArray.data, len2);
    free(str->data);
    str->data = data;
    str->length += len2;
}

int containsString(char *str, char *str2){
    for(int i = 0; str[i] != 0 && str2[i] != 0; i++){
        if(str[i] != str2[i])
            return 0;
    }
    return 1;
}

int compareString(char *str, char *str2){
    if(strlen(str) != strlen(str2))
        return 0;
    if(!containsString(str, str2))
        return 0;
    return 1;
}

int stringFindSubStr(String str, char *substr){
    for(int i = 0; i < str.length; i++){
        for(int k = 0; str.data[k+i] != 0 && substr[k] != 0; k++){
            if(str.data[k+i] != substr[k])
                return -1;
        }
    }
    return -1;
}

void printStringList(StringList list){
    for(int i = 0; list[i].data != NULL; i++){
        printf("%i: \"%s\"\n", i, list[i].data);
    }
}

void deleteStringList(StringList list){
    for(int i = 0; list[i].data != 0; i++){
        deleteString(list[i]);
    }
    free(list);
}

String stringFromInt(int i){
    char *data = malloc(12);
    sprintf(data, "%i", i);
    String str = newString(data);
    free(data);
    return str;
}

int intFromString(String str){
    return strtol(str.data, NULL, 0);
}

float floatFromString(String str){
    return strtof(str.data, NULL);
}

#endif // STRING_H_INCLUDED
