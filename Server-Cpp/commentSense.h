#ifndef COMMENTSENSE_H
#define COMMENTSENSE_H

#include "httpserver.h"
#include "utils.h"

HttpResponse getComments(PluginArg arg);
HttpResponse getTopComments(PluginArg arg);
HttpResponse getTopSites(PluginArg arg);

HttpResponse postComment(PluginArg arg);
HttpResponse voteComment(PluginArg arg);

HttpResponse createUser(PluginArg arg);
HttpResponse checkUser(PluginArg arg);
HttpResponse existsUser(PluginArg arg);
HttpResponse manageUser(PluginArg arg);

std::string commentsToJson(dbResult comments);
#endif // COMMENTSENSE_H
