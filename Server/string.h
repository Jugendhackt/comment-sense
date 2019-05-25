#ifndef STRING_H_INCLUDED
#define STRING_H_INCLUDED

#include <string.h>
#include <stdlib.h>
#include <stdarg.h>
#include <stdio.h>

typedef struct String{
    char *data;
    unsigned int length;
} String;

typedef String* StringList;


char* createBasicString(char *str);

String newString(char *str);
String copyString(String str);
String stringFromInt(int i);
String convertToHex(String data);
String fromHex(String hex);
String combineString(int count, ...);

void deleteString(String str);

int intFromString(String str);

void appendString(String *str, char c);
void appendStringStdStr(String *str, char *str2);
void appendStringStr(String *str, String str2);
void appendStringInt(String *str, int i);
void appendStringByteArray(String *str, String byteArray);

StringList splitString(String string, char c);
StringList stringListAppend(StringList list, String str);
StringList stringListAppendList(StringList list, StringList list2);

String removeAll(String str, char c);
int containsString(char *str, char *str2);
int stringContainsAnyOf(String str, char *chars);
int compareString(char *str, char *str2);
int stringFindSubStr(String str, char *substr);
void printStringList(StringList list);
int stringListLen(StringList list);
void deleteStringList(StringList list);
float floatFromString(String str);
char* expandEscapes(char* src);


#endif // STRING_H_INCLUDED
