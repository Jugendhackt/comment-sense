#ifndef COMMENTSENSE_H
#define COMMENTSENSE_H

#include "httpServer.hpp"
#include "utils.hpp"

static const char *noCommentsStr =  "{\"comments\":[{"
                                        "\"id\":-1,"
                                        "\"headline\":\"Keine Kommentare\","
                                        "\"content\":\"F&uumlr diese Webseite wurden bis jetzt noch keine Kommentare erstellt. Du kannst gern damit anfangen.\","
                                        "\"votes\":0,"
                                        "\"userID\":-1,"
                                        "\"userName\":\"CommentSense\""
                                    "}]}";

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
