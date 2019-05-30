#include <iostream>
#include <vector>
#include <string>

#include "utils.h"
#include "httpserver.h"

using namespace std;

HttpResponse func(PluginArg arg){
	std::cout<<"get index.html\n";
	HttpResponse response = {404,"text/plain","Error: Data not found"};
	return response;
}

int main()
{
    HttpServer *server = new HttpServer();
    //add plugin
	server->addPlugin(newPlugin("get data", HttpServer::GET, "/data/", func));
    server->start();
    delete server;
    return 0;
}
