#include "commentSense.hpp"
#include "httpServer.hpp"
#include "utils.hpp"
#include "test.hpp"

#include <dlfcn.h>


int main()
{
	sys::init();
	HttpServer *server = new HttpServer();
	Sqlite3DB *db = new Sqlite3DB("./data/mainDataBase.db3");
	server->loadPlugins("./plugins.json", db);

#if defined(DEBUG)
	server->setCorsEnabled(true);
	server->setAcawEnabled(true);
#endif
	
	server->start();
	delete server;
	delete db;
	return 0;
}
