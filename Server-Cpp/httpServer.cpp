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
        ss<<"Access-Control-Allow-Origin:*\n";
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

Plugin newPlugin(std::string name, int requestType, std::string subUrl, std::function<HttpResponse(PluginArg)> callback, void *arg){
	Plugin p;
	p.name = name;
	p.requestType = requestType;
	p.subUrl = subUrl;
	p.callback = callback;
    p.arg = arg;
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
    return nullptr;
}

void *console(void *data)
{
    HttpServer *server = reinterpret_cast<HttpServer*>(data);
    std::string input;
    std::cout<<">";
    while(true){
        std::cin>>input;
        unsigned pos;
        if(input == "stop")
            break;
        else if((pos = input.find("cors=")) < input.size()){
            bool cors = input.at(pos+5)-48;
            server->setCorsEnabled(cors);
            std::cout<<"cors set to "<<(cors ? "true" : "false")<<"\n";
        }
		else if(input == "stat"){
			server->showStats();
		}
        else
            std::cout<<"unknown command \'"<<input<<"\'\n";
        std::cout<<">";
    }
    server->stop();
}

HttpServer::HttpServer(unsigned long adress, unsigned short port)
{
    server = new TCPSocket(AF_INET, SOCK_STREAM, 0);
    server->bind(adress, port);

	addPlugin(newPlugin("default get\t", GET, "/", defaultGet));
	addPlugin(newPlugin("default put\t", PUT, "/", defaultPut));
	addPlugin(newPlugin("default post\t", POST, "/", defaultPost));
	addPlugin(newPlugin("default patch\t", PATCH, "/", defaultPatch));
	addPlugin(newPlugin("default delete\t", DELETE, "/", defaultDelete));

    std::cout<<"server initialized\n";
}

HttpServer::~HttpServer()
{
	delete server;
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
        ss<<response.data;
        return ss.str();
    }
    return "";
}

void HttpServer::addPlugin(Plugin plugin){
	plugins.push_back(plugin);
}

void HttpServer::start(){
	//sort plugins
	std::sort(plugins.begin(), plugins.end(), comparePlugin);
	std::cout<<"loaded Plugins: \n";
	for(Plugin p : plugins){
        std::cout<<"\t"<<p.name<<"\t :  \""<<p.subUrl<<"\"\n";
    }
    //start server
    server->listen();
    std::cout<<"server running\n";
    pthread_create(&stopThread, nullptr, console, this);
    while(keepRunning){
		Client *client = new Client;
		client->server = this;
		client->socket = server->accept();
        client->index = lastIndex++;
#if defined(DEBUG)
		std::cerr<<"client "<<client->index<<": connected\n";
#endif
		pthread_create(&client->thread, nullptr, ::handleClient, client);
		pthread_detach(client->thread);
    }
}

void HttpServer::stop()
{
#if defined(DEBUG)
    std::cerr<<"stopping server\n";
#endif
    keepRunning = false;
    TCPSocket *socket = new TCPSocket(AF_INET, SOCK_STREAM, 0);
    socket->connect("localhost");
    socket->disconnect();
    delete socket;
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
		std::string url = request[1];
		int type = getRequestType(request[0]);
		std::string payload = "";
		for(std::string line : header){
			if(line.rfind("Content-Length:", 0) == 0){
				int len = atoi(line.c_str()+15);
				payload = socket->recv(len);
#if defined(DEBUG)
                if(payload.size() < 250)
                    std::cerr<<"client "<<client->index<<": payload("<<payload.size()<<" bytes): "<<client->index<<":"<<payload<<"\n";
#endif
			}
		}
		PluginArg arg = {url, payload, this, client, nullptr};

		for(Plugin p : plugins){
			if(p.requestType != type)
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
}

bool HttpServer::isCorsEnabled()
{
    return corsEnabled;
}

void HttpServer::setCorsEnabled(bool value)
{
    corsEnabled = value;
}
