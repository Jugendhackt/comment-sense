#ifndef COMMENTSENSE_H_INCLUDED
#define COMMENTSENSE_H_INCLUDED

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>

#include "sqlite3.h"
#include "string.h"
#include "cJSON.h"

typedef struct dbResult{
    int rows;
    int columns;
    String **data;
} dbResult;

String getTopComments(String request, int *status);
String getTopSites(String json, int *status);
String getComments(String request, int *status);
String postComment(String json, int *status);
String createUser(String json, int *status);
String voteComment(String json, int *status);
String checkUser(String json, int *status);
String existsUser(String json, int *status);
String manageUser(String json, int *status);

String commentsToJson(dbResult comments);

String getDate();
String getUserName(unsigned int id);
int isUserValid(String userName, String password);
int addCommentToSite(int commentId, String url);
unsigned int getUserId(String userName);

void initDatabase();

#endif // COMMENTSENSE_H_INCLUDED
