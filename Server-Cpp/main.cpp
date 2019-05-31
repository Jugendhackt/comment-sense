#include <iostream>
#include <vector>
#include <string>

#include "utils.h"
#include "httpserver.h"
#include "commentSense.h"

using namespace std;

int main()
{
    HttpServer *server = new HttpServer();
    Sqlite3DB *db = new Sqlite3DB("./data/mainDataBase.db3");
    //add plugin
	server->addPlugin(newPlugin("get comments\t", HttpServer::GET, "/comments/", getComments, db));
    server->addPlugin(newPlugin("get top comments", HttpServer::GET, "/comments/top/", getTopComments, db));
    server->start();
    delete server;
    return 0;
}
