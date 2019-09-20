#include "httpServer.hpp"
 
char HttpStatus_isInformational(int code) { return (code >= 100 && code < 200); } /*!< \returns \c true if the given \p code is an informational code. */
char HttpStatus_isSuccessful(int code)    { return (code >= 200 && code < 300); } /*!< \returns \c true if the given \p code is a successful code. */
char HttpStatus_isRedirection(int code)   { return (code >= 300 && code < 400); } /*!< \returns \c true if the given \p code is a redirectional code. */
char HttpStatus_isClientError(int code)   { return (code >= 400 && code < 500); } /*!< \returns \c true if the given \p code is a client error code. */
char HttpStatus_isServerError(int code)   { return (code >= 500 && code < 600); } /*!< \returns \c true if the given \p code is a server error code. */
char HttpStatus_isError(int code)         { return (code >= 400); }               /*!< \returns \c true if the given \p code is any type of error code. */

/*! Returns the standard HTTP reason phrase for a HTTP status code.
 * \param code An HTTP status code.
 * \return The standard HTTP reason phrase for the given \p code or \c NULL if no standard
 * phrase for the given \p code is known.
 */
const char* HttpStatus_reasonPhrase(int code)
{
		switch (code)
		{
				/*####### 1xx - Informational #######*/
				case 100: return "Continue";
				case 101: return "Switching Protocols";
				case 102: return "Processing";
				case 103: return "Early Hints";

				/*####### 2xx - Successful #######*/
				case 200: return "OK";
				case 201: return "Created";
				case 202: return "Accepted";
				case 203: return "Non-Authoritative Information";
				case 204: return "No Content";
				case 205: return "Reset Content";
				case 206: return "Partial Content";
				case 207: return "Multi-Status";
				case 208: return "Already Reported";
				case 226: return "IM Used";

				/*####### 3xx - Redirection #######*/
				case 300: return "Multiple Choices";
				case 301: return "Moved Permanently";
				case 302: return "Found";
				case 303: return "See Other";
				case 304: return "Not Modified";
				case 305: return "Use Proxy";
				case 307: return "Temporary Redirect";
				case 308: return "Permanent Redirect";

				/*####### 4xx - Client Error #######*/
				case 400: return "Bad Request";
				case 401: return "Unauthorized";
				case 402: return "Payment Required";
				case 403: return "Forbidden";
				case 404: return "Not Found";
				case 405: return "Method Not Allowed";
				case 406: return "Not Acceptable";
				case 407: return "Proxy Authentication Required";
				case 408: return "Request Timeout";
				case 409: return "Conflict";
				case 410: return "Gone";
				case 411: return "Length Required";
				case 412: return "Precondition Failed";
				case 413: return "Payload Too Large";
				case 414: return "URI Too Long";
				case 415: return "Unsupported Media Type";
				case 416: return "Range Not Satisfiable";
				case 417: return "Expectation Failed";
				case 418: return "I'm a teapot";
				case 422: return "Unprocessable Entity";
				case 423: return "Locked";
				case 424: return "Failed Dependency";
				case 426: return "Upgrade Required";
				case 428: return "Precondition Required";
				case 429: return "Too Many Requests";
				case 431: return "Request Header Fields Too Large";
				case 451: return "Unavailable For Legal Reasons";

				/*####### 5xx - Server Error #######*/
				case 500: return "Internal Server Error";
				case 501: return "Not Implemented";
				case 502: return "Bad Gateway";
				case 503: return "Service Unavailable";
				case 504: return "Gateway Time-out";
				case 505: return "HTTP Version Not Supported";
				case 506: return "Variant Also Negotiates";
				case 507: return "Insufficient Storage";
				case 508: return "Loop Detected";
				case 510: return "Not Extended";
				case 511: return "Network Authentication Required";

				default: return "";
		}
}

HttpResponse defaultCallback(PluginArg arg){
	return {500,"text/plain","Error: Plugin not initialized"};
}

std::string HttpStatus_string(int code){
	std::stringstream ss;
	ss << code << " " << HttpStatus_reasonPhrase(code);
	return ss.str();
}

const char* HttpContentType(std::string ending){
	if(ending == "txt")
		return "text/plain";
	else if(ending == "html" || ending == "htm")
		return "text/html";
	else if(ending == "css")
		return "text/css";
	else if(ending == "js")
		return "text/javascript";
	else if(ending == "xml")
		return "text/xml";

	else if(ending == "json")
		return "application/json";
	else if(ending == "pdf")
		return "application/pdf";
	else if(ending == "zip")
		return "application/zip";

	else if(ending == "png")
		return "image/png";
	else if(ending == "jpg")
		return "image/jpg";
	else if(ending == "ico")
		return "image/ico";
	else if(ending == "svg")
		return "image/svg+xml";

	else
		return "text/plain";
}

std::string getDir(std::string dir)
{
		std::vector<std::string> entrys = getDirContent(dir);
		std::stringstream html;
		for(std::string entry : entrys){
				if(entry == ".")
						html<<"<a href=\""<<"/"<<dir<<"\">"<<entry<<"</a><br>";
				else if(entry == ".."){
						std::string parent = dir;
						while(parent.back() != '/' && parent.size())
								parent.pop_back();
						html<<"<a href=\""<<"/"<<parent<<"\">"<<entry<<"</a><br>";
				}
				else
						html<<"<a href=\""<<"/"<<dir<<"/"<<entry<<"\">"<<entry<<"</a><br>";
		}
		return html.str();
}

void getBigFile(File *file, TCPSocket *socket, HttpServer *server){
	unsigned long chunk = 1024*1024;
	unsigned long size = file->size();
	unsigned long chunks = size/chunk;
	unsigned long rest = size%chunk;
#if defined(DEBUG)
	std::cout<<"getting big file: "<<size<<" bytes\n";
	std::cout<<"sending "<<chunks<<" chunks of size "<<chunk<<"bytes and "<<rest<<" bytes\n";
#endif
	std::stringstream ss;
	ss<<"HTTP/1.1 "<<HttpStatus_string(HttpStatus_OK)<<"\n";
	if(server->isCorsEnabled())
		ss<<"Access-Control-Allow-Origin:*\n"
	if(server->isAcawEnabled())
		ss<<"Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS\n"
		<<"Access-Control-Allow-Headers: *\n";
	ss<<"Content-Type:"<<"text/plain"<<"\n";
	ss<<"Content-Length:"<<size<<"\n\n";
	socket->send(ss.str());
	
	for(unsigned long i = 0; i < chunks; i++){
		std::string data = file->read(chunk);
		if(!socket->send(data)){
			return;
		}
	}
	std::string data = file->read(rest);
	socket->send(data);
}

HttpResponse defaultGet(PluginArg arg){
	std::string url = arg.url;
		url.erase(0,1);
	if(url.size() == 0)
		url = "index.html";
		if(url.rfind("data") > 0)
				url.insert(0, "data/");
		if(url.back() == '/')
				url.pop_back();
	File file(url);
	std::string content, type;
	int status;
		if(file.isDir()){
				content = getDir(url);
				type = "text/html";
				status = HttpStatus_OK;
		}
		else{
				if(file.open("rb")){
						if(file.size() > 1024*1024){
								getBigFile(&file, arg.client->socket, arg.server);
								content = "";
								status = -1;
						}
						else{
								content = file.readAll();
								status = HttpStatus_OK;
						}
						type = HttpContentType(split(url, '.').back());
						file.close();
				}
				else{
						content = "Error: File not found";
						type = "text/plain";
						status = HttpStatus_NotFound;
				}
		}
	return {status, type, content};
}

HttpResponse defaultPut(PluginArg arg){
	return {501,"text/plain","Error: Not Implemented"};
}

HttpResponse defaultPost(PluginArg arg){
	return {501,"text/plain","Error: Not Implemented"};
}

HttpResponse defaultPatch(PluginArg arg){
	return {501,"text/plain","Error: Not Implemented"};
}

HttpResponse defaultDelete(PluginArg arg){
	return {501,"text/plain","Error: Not Implemented"};
}

Plugin newPlugin(std::string name, int requestType, std::string subUrl, std::function<HttpResponse(PluginArg)> callback, std::vector<dll*> requirements, void *arg){
	Plugin p;
	p.name = name;
	p.requestType = requestType;
	p.subUrl = subUrl;
	p.callback = callback;
	p.arg = arg;
	p.requirements = requirements;
	return p;
}

bool comparePlugin(Plugin p1, Plugin p2){
	int c1 = std::count(p1.subUrl.begin(), p1.subUrl.end(), '/');
	int c2 = std::count(p2.subUrl.begin(), p2.subUrl.end(), '/');
	return c1 > c2;
}

void* handleClient(void *data){
	Client *client = reinterpret_cast<Client*>(data);
	client->server->handleClient(client);
	client->socket->disconnect();
#if defined(DEBUG)
		std::cerr<<"client "<<client->index<<": disconnected"<<"\n";
#endif
	delete client->socket;
	delete client;
		pthread_exit(nullptr);
}

void *console(void *data)
{
	HttpServer *server = reinterpret_cast<HttpServer*>(data);
	std::string input;
	std::cout<<">";
	while(true){
		std::getline(std::cin, input);
		unsigned pos;
		if(input.find("stop") == 0)
			break;
		else if(input.find("cors=") == 0){
			bool cors = input.at(5)-48;
			server->setCorsEnabled(cors);
			std::cout<<"cors set to "<<(cors ? "true" : "false")<<"\n";
		}
		else if(input.find("acaw=") == 0){
			bool acaw = input.at(5)-48;
			server->setAcawEnabled(acaw);
			std::cout<<"acaw set to "<<(acaw ? "true" : "false")<<"\n";
		}
		else if(input.find("stat") == 0){
			server->showStats();
		}
		else if(input.find("enable") == 0){	// >enable "pluginName"
			int start = input.find("\"") + 1;
			int end = input.find("\"", start);
			if(start != input.npos && end != input.npos){
				std::string p(input.begin() + start, input.begin() + end);
				server->enablePlugin(p);
			}
		}
		else if(input.find("disable") == 0){	// >disable "pluginName"
			int start = input.find("\"") + 1;
			int end = input.find("\"", start);
			if(start != input.npos && end != input.npos){
				std::string p(input.begin() + start, input.begin() + end);
				server->disablePlugin(p);
			}
		}
		else if(input.find("load") == 0){	// >disable "pluginName"
			int start = input.find("\"") + 1;
			int end = input.find("\"", start);
			if(start != input.npos && end != input.npos){
				std::string l(input.begin() + start, input.begin() + end);
				server->reloadDll(l);
			}
		}
		else if(input.find("unload") == 0){	// >disable "pluginName"
			int start = input.find("\"") + 1;
			int end = input.find("\"", start);
			if(start != input.npos && end != input.npos){
				std::string l(input.begin() + start, input.begin() + end);
				server->unloadDll(l);
			}
		}
		else
			std::cout<<"unknown command \'"<<input<<"\'\n";
		std::cout<<">";
	}
	server->stop();
	return nullptr;
}


void* httpServer(void *data){
	HttpServer *server = reinterpret_cast<HttpServer*>(data);
	server->httpServer();
	pthread_exit(nullptr);
}

void* httpsServer(void *data){
	HttpServer *server = reinterpret_cast<HttpServer*>(data);
	server->httpsServer();
	pthread_exit(nullptr);
}

std::string encodeUrl(std::string url){
	return url;
}

std::string decodeUrl(std::string url){
	unsigned int len = url.length();
	std::string decoded(len, 0);
	for(unsigned int i = 0, k = 0; i < len; i++, k++){
		int c = url[i];
		if(c == '%' && i < len - 2){
			std::string byte = &url[i+1];
			byte.resize(2);
			std::stringstream ss;
			ss<<std::hex<<byte;
			ss>>c;
			i += 2;
		}
		decoded[k] = char(c);
	}
	return decoded.data();
}

HttpServer::HttpServer(unsigned long adress, unsigned short port)
{
		httpSock = new TCPSocket(AF_INET, SOCK_STREAM, 0);
		httpSock->bind(adress, port);
	
	httpsSock = new TLSSocket(AF_INET, SOCK_STREAM, 0);
		httpsSock->bind(adress, 443);

	addPlugin(newPlugin("default get\t", GET, "/", defaultGet, {}));
	addPlugin(newPlugin("default put\t", PUT, "/", defaultPut, {}));
	addPlugin(newPlugin("default post\t", POST, "/", defaultPost, {}));
	addPlugin(newPlugin("default patch\t", PATCH, "/", defaultPatch, {}));
	addPlugin(newPlugin("default delete\t", DELETE, "/", defaultDelete, {}));

	std::cout<<"server initialized\n";
}

HttpServer::~HttpServer()
{
	delete httpSock;
	delete httpsSock;
	std::cout<<"server stopped\n";
}

int HttpServer::getRequestType(std::string str){
	if(str == "GET")
		return GET;
	else if(str == "PUT")
		return PUT;
	else if(str == "POST")
		return POST;
	else if(str == "PATCH")
		return PATCH;
	else if(str == "DELETE")
		return DELETE;
	else
		return NONE;
}

std::string HttpServer::httpResponsetoString(HttpResponse response){
		if(response.status >= 0){
				std::stringstream ss;
				ss<<"HTTP/1.1 "<<HttpStatus_string(response.status)<<"\n";
				if(isCorsEnabled())
						ss<<"Access-Control-Allow-Origin:*\n";
				ss<<"Content-Type:"<<response.contentType<<"\n";
				ss<<"Content-Length:"<<response.data.size()<<"\n\n";
		//std::cout<<response.data.size()<<"\n"<<ss.str()<<"\n";
				ss<<response.data;
				return ss.str();
		}
		return "";
}

void HttpServer::addPlugin(Plugin plugin){
	plugins.push_back(plugin);
}

inline std::string getValueString(cJSON *object, const char *name){
	if(cJSON_HasObjectItem(object, name)){
		cJSON *n = cJSON_GetObjectItem(object, name);
		if(cJSON_IsString(n)){
			std::string value = n->valuestring;
			return value;
		}
	}
	return std::string("");
}

inline int stringToMethod(std::string method){
	if(method == "GET")
		return HttpServer::GET;
	if(method == "PUT")
		return HttpServer::PUT;
	if(method == "POST")
		return HttpServer::POST;
	if(method == "PATCH")
		return HttpServer::PATCH;
	if(method == "DELETE")
		return HttpServer::DELETE;
}

void HttpServer::loadPlugins(std::string fileName, void *arg){
	std::string data = File::readAll(fileName);
	cJSON *json = cJSON_Parse(data.c_str());
	int size = cJSON_GetArraySize(json);
	for(int i = 0; i < size; i++){
		cJSON *plugin = cJSON_GetArrayItem(json, i);
		std::string name = getValueString(plugin, "name");
		std::string libname = getValueString(plugin, "dll");
		std::string func = getValueString(plugin, "function");
		std::string method = getValueString(plugin, "method");
		std::string suburl = getValueString(plugin, "suburl");
		std::string requirements = getValueString(plugin, "requirements");

		std::cout<<name<<" "<<libname<<" "<<func<<" "<<method<<" "<<suburl<<" "<<requirements<<"\n";
		std::vector<dll*> req;
		for(std::string name : split(requirements, ',')){
			req.push_back(loadDll(name, plugins.size()));
		}
		dll *lib = loadDll(libname, plugins.size());
		req.push_back(lib);
		std::function<HttpResponse(PluginArg)> f = lib->get<pfunc_t>(func);
		addPlugin(newPlugin(name, stringToMethod(method), suburl, f, req, arg));
	}
}

typedef void (*v_v_func_t)(void);

dll* HttpServer::loadDll(std::string name, int pluginIdx){
	for(std::pair<dll*, std::vector<int>> &e : libs){
		if(e.first->getName() == name){
			e.second.push_back(pluginIdx);
			return e.first;
		}
	}
	dll *lib = new dll(name);
	libs.push_back({lib, {pluginIdx}});
	std::cout<<"loaded dll "<<name<<std::endl;
	return lib;
}

void HttpServer::reloadDll(std::string name){
	for(std::pair<dll*, std::vector<int>> e : libs){
		if(e.first->getName() == name){
			std::cout<<"opening "<<e.first->getName()<<std::endl;
			e.first->open(e.first->getName());
			break;
		}
	}
}

void HttpServer::unloadDll(std::string name){
	for(std::pair<dll*, std::vector<int>> e : libs){
		if(e.first->getName() == name){
			for(Plugin p : plugins){
				if(std::find(p.requirements.begin(), p.requirements.end(), e.first) != p.requirements.end() && p.enabled){
					std::cout<<"couldn't unload dll because it is still used by "<<p.name<<std::endl;
					return;
				}
			}
			std::cout<<"closing "<<e.first->getName()<<std::endl;
			e.first->close();
			break;
		}
	}
}

void HttpServer::enablePlugin(std::string name){
	for(Plugin &p : plugins){
		if(p.name == name){
			for(dll *l : p.requirements){
				if(!l->isOpen()){
					std::cout<<"requirement missing"<<std::endl;
					return;
				}
			}
			p.enabled = true;
			std::cout<<"enabled plugin "<<name<<std::endl;
			return;
		}
	}
	std::cout<<"plugin "<<name<<" not found"<<std::endl;
}

void HttpServer::disablePlugin(std::string name){
	for(Plugin &p : plugins){
		if(p.name == name){
			p.enabled = false;
			std::cout<<"disabled plugin "<<name<<std::endl;
			return;
		}
	}
	std::cout<<"plugin "<<name<<" not found"<<std::endl;
}

void HttpServer::start(){
	//sort plugins
	std::sort(plugins.begin(), plugins.end(), comparePlugin);
	std::cout<<"loaded Plugins: \n";
	for(Plugin p : plugins){
		std::cout<<"\t"<<p.name<<"\t :  \""<<p.subUrl<<"\"\n";
	}
	//start server
	startTime = std::time(nullptr);
	pthread_t http, https;
	pthread_create(&http, nullptr, ::httpServer, this);
	pthread_create(&https, nullptr, ::httpsServer, this);
	usleep(100000);
	std::cout<<"setup finished\n";
	pthread_create(&stopThread, nullptr, console, this);
	pthread_join(http, nullptr);
	pthread_join(https, nullptr);
	pthread_join(stopThread, nullptr);
}

void HttpServer::httpServer()
{
	httpSock->listen();
		std::cout<<"http server running\n";
		while(keepRunning){
		Client *client = new Client;
		client->server = this;
		client->socket = httpSock->accept();
				client->index = lastIndex++;
#if defined(DEBUG)
		std::cerr<<"client "<<client->index<<": connected (http)\n";
#endif
		pthread_create(&client->thread, nullptr, ::handleClient, client);
		pthread_detach(client->thread);
	}
	std::cout<<"http server stopped\n";
}

void HttpServer::httpsServer()
{
	httpsSock->listen();
	std::cout<<"https server running\n";
	while(keepRunning){
		Client *client = new Client;
		client->server = this;
		client->socket = httpsSock->accept();
		if(client->socket == nullptr)
			continue;
		client->index = lastIndex++;
#if defined(DEBUG)
		std::cerr<<"client "<<client->index<<": connected (https)\n";
#endif
		pthread_create(&client->thread, nullptr, ::handleClient, client);
		pthread_detach(client->thread);
	}
	std::cout<<"https server stopped\n";
}

void HttpServer::stop()
{
#if defined(DEBUG)
	std::cerr<<"stopping server\n";
#endif
	keepRunning = false;
	TCPSocket *http = new TCPSocket(AF_INET, SOCK_STREAM, 0);
	http->connect("localhost", 80);
	http->disconnect();
	delete http;
	TLSSocket *https = new TLSSocket(AF_INET, SOCK_STREAM, 0);
	https->connect("localhost", 443);
	https->disconnect();
	delete https;
}

void HttpServer::handleClient(Client *client){
	clients += 1;
#if defined(DEBUG)
	std::cerr<<"client "<<client->index<<": gets handled\n";
#endif
	TCPSocket *socket = client->socket;
	std::vector<std::string> header = socket->recvHeader();
#if defined(DEBUG)
	std::cerr<<"client "<<client->index<<": header:\n";
	for(std::string line : header){
		std::cerr<<"client "<<client->index<<":\t"<<line<<"\n";
	}
#endif
	HttpResponse response = {404,"text/plain","Error: Not found"};
	if(header.size() == 0 || header[0].size() == 0){
		response.status = HttpStatus_BadRequest;
	}
	else{
		std::vector<std::string> request = split(header[0], ' ');
		std::string url = decodeUrl(request[1]);
		int type = getRequestType(request[0]);
		int payload = 0;
		for(std::string line : header){
			if(line.rfind("Content-Length:", 0) == 0){
				payload = atoi(line.c_str()+15);
			}
		}
		PluginArg arg = {url, payload, this, client, nullptr, header};

		for(Plugin p : plugins){
			if(p.requestType != type || !p.enabled)
				continue;
			if(url.rfind(p.subUrl, 0) == 0){
#if defined(DEBUG)
				std::cerr<<"client "<<client->index<<": calling plugin \'"<<p.name<<"\'\n";
#endif
				arg.arg = p.arg;
				response = p.callback(arg);
				break;
			}
		}
	}
#if defined(DEBUG)
	std::string headerStr = split(httpResponsetoString(response), "\n\n")[0];
	header = split(headerStr, '\n');
	std::cerr<<"client "<<client->index<<": sending response\n";
	std::cerr<<"client "<<client->index<<": header:\n";
	for(std::string line : header){
		std::cerr<<"client "<<client->index<<":\t"<<line<<"\n";
	}
#endif
	socket->send(httpResponsetoString(response));
	clients -= 1;
}

void HttpServer::showStats()
{
	std::cout<<clients<<" client(s) connected\n";
	std::time_t tmp = startTime;
	std::cout<<"running since "<<std::asctime(std::localtime(&tmp));
	int secs = int(std::difftime(std::time(nullptr), startTime));
	int mins = secs/60;
	int hours = mins/60;
	std::cout<<"running for "<<hours%60<<":"<<(mins%60 < 10 ? "0" : "")<<mins%60<<":"<<(secs%60 < 10 ? "0" : "")<<secs%60<<"\n";
		std::cout<<"total memory: "<<sys::getTotalMem()<<" bytes\n";
		std::cout<<"free  memory: "<<sys::getFreeMem()<<" bytes\n";
		std::cout<<"current used memory: "<<sys::getCurrentMem()<<" bytes\n";
		//sys::getTotalCpuUsage();
		std::cout<<"total cpu usage: "<<sys::getTotalCpuUsage()<<"%\n";
		std::cout<<"current cpu usage: "<<sys::getCpuUsage()<<"%\n";
}

bool HttpServer::isCorsEnabled()
{
		return corsEnabled;
}

void HttpServer::setCorsEnabled(bool value)
{
		corsEnabled = value;
}

bool HttpServer::isAcawEnabled()
{
	return acawEnabled;
}

void HttpServer::setAcawEnabled(bool value)
{
	acawEnabled = value;
}
