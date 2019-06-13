#include <iostream>
#include <vector>
#include <string>

#include "utils.hpp"
#include "httpServer.hpp"
#include "commentSense.hpp"

using namespace std;

int main()
{
    HttpServer *server = new HttpServer();
    Sqlite3DB *db = new Sqlite3DB("./data/mainDataBase.db3");
    
    //add plugin
	server->addPlugin(newPlugin("get comments\t", HttpServer::GET, "/comments/", getComments, db));
    server->addPlugin(newPlugin("get top comments", HttpServer::GET, "/comments/top/", getTopComments, db));
    server->addPlugin(newPlugin("get top sites\t", HttpServer::GET, "/sites/top/", getTopSites, db));
    
    server->addPlugin(newPlugin("post comment\t", HttpServer::POST, "/comments/", postComment, db));
    server->addPlugin(newPlugin("vote comment\t", HttpServer::PATCH, "/comments/", voteComment, db));
    
    server->addPlugin(newPlugin("create user\t", HttpServer::POST, "/users/create/", createUser, db));
    server->addPlugin(newPlugin("exists user\t", HttpServer::POST, "/users/exists/", existsUser, db));
    server->addPlugin(newPlugin("check  user\t", HttpServer::POST, "/users/check/", checkUser, db));
    server->addPlugin(newPlugin("check  user\t", HttpServer::POST, "/users/login/", checkUser, db));
    server->addPlugin(newPlugin("manage user\t", HttpServer::PATCH, "/users/manage/", manageUser, db));
#if defined(DEBUG)
    server->setCorsEnabled(true);
#endif
    server->start();
    delete server;
    return 0;
}
