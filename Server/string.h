#ifndef STRING_H_INCLUDED
#define STRING_H_INCLUDED

#include <string.h>
#include <stdlib.h>
#include <stdarg.h>

typedef struct String{
    char *data;
    unsigned int length;
} String;

typedef String* StringList;


String stringFromInt(int i);


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
    for(int i = 0; tmp[i] != 0; i++){
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
    char *data = malloc(len+len2+2);
    strcpy(data, str->data);
    strcpy(data+len, str2);
    free(str->data);
    str->data = data;
    str->length += len2;
}

void appendStringStr(String *str, String str2){
    appendStringStdStr(str, str2.data);
}

void appendStringInt(String *str, int i){
    String number = stringFromInt(i);
    appendStringStr(str, number);
    deleteString(number);
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

int stringContainsAnyOf(String str, char *chars){
    for(int i = 0, c; i < str.length && (c = str.data[i]) != 0; i++)
        for(int k = 0, s; (s = chars[k]) != 0; k++)
            if(c == s)
                return 1;
    return 0;
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

int stringListLen(StringList list){
    int len = 0;
    for(int i = 0; list[i].data != NULL; i++,len++){
        if(list[i].data[0] == 0)
            len--;
    }
    return len;
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

String convertToHex(String data){
    String hex;
    hex.length = data.length*2;
    hex.data = malloc(hex.length+1);

    for(int i = 0; i < data.length; i++){
        unsigned char c = data.data[i];
        unsigned char higher = c>>4;
        unsigned char lower = c<<4;
        lower >>=4;
        if(higher > 9)
            higher += 7;
        if(lower > 9)
            lower += 7;
        hex.data[i*2] = higher + 48;
        hex.data[i*2+1] = lower + 48;
    }

    hex.data[hex.length] = 0;
    return hex;
}

String fromHex(String hex){
    String str;
    str.length = hex.length/2;
    str.data = malloc(hex.length+1);

    for(int i = 0; i < str.length; i++){
        unsigned char higher = hex.data[i*2] - 48;
        unsigned char lower = hex.data[i*2+1] - 48;

        if(higher > 9)
            higher -= 7;
        if(lower > 9)
            lower -= 7;

        unsigned char c = (higher<<4) + lower;
        str.data[i] = c;
    }

    str.data[str.length] = 0;
    return str;
}

String combineString(int count, ...){
    String result = newString("");
    va_list args;
    va_start(args, count);
    for(int i = 0; i < count; i++)
        appendStringStdStr(&result, va_arg(args, char*));
    va_end(args);
    return result;
}

char* expandEscapes(char* src)
{
    char* dest = malloc(2 * strlen(src) + 1);
    char *result = dest;
    char c;

    while((c = *(src++)) != 0){
        switch(c) {
            case '\a':{
                *(dest++) = '\\';
                *(dest++) = 'a';
            } break;
            case '\b':{
                *(dest++) = '\\';
                *(dest++) = 'b';
            } break;
            case '\t':{
                *(dest++) = '\\';
                *(dest++) = 't';
            } break;
            case '\n':{
                *(dest++) = '\\';
                *(dest++) = 'n';
            } break;
            case '\v':{
                *(dest++) = '\\';
                *(dest++) = 'v';
            } break;
            case '\f':{
                *(dest++) = '\\';
                *(dest++) = 'f';
            } break;
            case '\r':{
                *(dest++) = '\\';
                *(dest++) = 'r';
            } break;
            case '\\':{
                *(dest++) = '\\';
                *(dest++) = '\\';
            } break;
            case '\"':{
                *(dest++) = '\\';
                *(dest++) = '\"';
            } break;
            default:
                *(dest++) = c;
        }
    }

    *dest = '\0';
    return result;
}


#endif // STRING_H_INCLUDED
