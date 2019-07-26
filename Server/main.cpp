#include "commentSense.hpp"
#include "httpServer.hpp"
#include "utils.hpp"

int main()
{
    sys::init();
    HttpServer *server = new HttpServer();
    Sqlite3DB *db = new Sqlite3DB("./data/mainDataBase.db3");
    
    //add plugin
	server->addPlugin(newPlugin("get comments    ", HttpServer::GET, "/comments/",     getComments, db));
    server->addPlugin(newPlugin("get top comments", HttpServer::GET, "/comments/top/", getTopComments, db));
    server->addPlugin(newPlugin("get top sites   ", HttpServer::GET, "/sites/top/",    getTopSites, db));
    
    server->addPlugin(newPlugin("post comment    ", HttpServer::POST,  "/comments/", postComment, db));
    server->addPlugin(newPlugin("vote comment    ", HttpServer::PATCH, "/comments/", voteComment, db));
    
    server->addPlugin(newPlugin("create user     ", HttpServer::POST,  "/users/create/", createUser, db));
	server->addPlugin(newPlugin("signup user     ", HttpServer::POST,  "/users/signup/", createUser, db));
    server->addPlugin(newPlugin("exists user     ", HttpServer::POST,  "/users/exists/", existsUser, db));
    server->addPlugin(newPlugin("check  user     ", HttpServer::POST,  "/users/check/",  checkUser, db));
    server->addPlugin(newPlugin("check  user     ", HttpServer::POST,  "/users/login/",  checkUser, db));
    server->addPlugin(newPlugin("change user prop", HttpServer::PATCH, "/users/change/", changeUser, db));
	server->addPlugin(newPlugin("get    user     ", HttpServer::POST,  "/users/get/",    getUser, db));

    server->addPlugin(newPlugin("upload image    ", HttpServer::POST,  "/upload/img/",   uploadImage, db));
    
#if defined(DEBUG)
    server->setCorsEnabled(true);
	server->setAcawEnabled(true);
#endif
	
    server->start();
    delete server;
    delete db;
    return 0;
}
