#ifndef COMMENTSENSE_H
#define COMMENTSENSE_H

#include "httpserver.h"
#include "utils.h"

HttpResponse getComments(PluginArg arg);        //done
HttpResponse getTopComments(PluginArg arg);     //done
HttpResponse getTopSites(PluginArg arg);        //done

HttpResponse postComment(PluginArg arg);        //
HttpResponse voteComment(PluginArg arg);        //

HttpResponse createUser(PluginArg arg);         //done, possibly memleak in sqlite_exec with insert
HttpResponse checkUser(PluginArg arg);          //done
HttpResponse existsUser(PluginArg arg);         //done
HttpResponse manageUser(PluginArg arg);         //

std::string commentsToJson(dbResult *comments); //done
std::string sitesToJson(dbResult *sites);       //done

int getUserId(std::string userName, Sqlite3DB *db);
bool isUserValid(std::string userName, std::string password, Sqlite3DB *db);
bool addCommentToSite(int64_t commentId, std::string url, Sqlite3DB *db);

#endif // COMMENTSENSE_H
