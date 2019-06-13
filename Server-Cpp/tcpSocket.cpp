#include "tcpSocket.hpp"

TCPSocket::TCPSocket(int af, int type, int protocol)
{
    const int y = 1;
    sock = socket(af, type, protocol);
    if(sock < 0)
        std::cerr<<"error: creating socket failed: "<<strerror(errno)<<"\n";
    setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &y, sizeof(int));
}

TCPSocket::TCPSocket(socket_t other){
    sock = other;
}

TCPSocket::~TCPSocket()
{
    //dtor
}

void TCPSocket::bind(unsigned long address, unsigned short port){
    struct sockaddr_in server;
    memset(&server, 0, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = htonl(address);
    server.sin_port = htons(port);
    if(::bind(sock, (struct sockaddr*)&server, sizeof(server)) < 0)
        std::cerr<<"error: couldn't bind socket: "<<strerror(errno)<<"\n";
}

void TCPSocket::listen(){
    if(::listen(sock, 64) == -1 )
        std::cerr<<"error: couldn't listen socket: "<<strerror(errno)<<"\n";
}

TCPSocket* TCPSocket::accept(){
    struct sockaddr_in client;
    unsigned int len = sizeof(client);
    socket_t new_socket = ::accept(sock,(struct sockaddr *)&client, &len);
    if(new_socket  == -1)
        std::cerr<<"error: couldn't accept socket: "<<strerror(errno)<<"\n";
    TCPSocket *socket = new TCPSocket(new_socket);
	socket->setTimeout(5);
    return socket;
}

void TCPSocket::connect(std::string servAddr, unsigned short port){
    struct sockaddr_in server;
    struct hostent *host_info;
    unsigned long addr;

    memset( &server, 0, sizeof (server));
    if((addr = inet_addr(servAddr.c_str())) != INADDR_NONE) {
        memcpy(&server.sin_addr, &addr, sizeof(addr));
    }
    else {
        host_info = gethostbyname(servAddr.c_str());
        if(host_info == nullptr)
            fprintf(stderr, "error: unknown server: %s\n", strerror(errno));
        else
            memcpy(&server.sin_addr, host_info->h_addr, host_info->h_length);
    }
    server.sin_family = AF_INET;
    server.sin_port = htons(port);
    if(::connect(sock, (struct sockaddr*)&server, sizeof(server)) < 0)
        fprintf(stderr, "error: couldn't connect to server: %s\n", strerror(errno));
}

void TCPSocket::disconnect(){
#if defined(DEBUG)
    std::cout<<"disconnected\n";
#endif
    if(sock >= 0){
        std::cout<<getError();
        if(shutdown(sock, SHUT_RDWR) < 0){
            if (errno != ENOTCONN && errno != EINVAL)
                std::cerr<<"error: shutdown socket failed\n";
        }
        if(close(sock) < 0){
            std::cerr<<"error: close socket failed\n";
        }
    }
    if(isConnected()){
        std::cerr<<"error: socket still connected\n";
    }
}

bool TCPSocket::isConnected(){
	int error = 0;
    socklen_t errorlen = sizeof (error);
    if(getsockopt(sock, SOL_SOCKET, SO_ERROR, &error, &errorlen) != 0){
#if defined (DEBUG)
        std::cerr<<"error: socket not connected: "<<strerror(errno)<<"\n";
#endif
        return false;
    }
    return true;
}

std::string TCPSocket::getError()
{
    int err = 1;
    socklen_t len = sizeof err;
    if(getsockopt(sock, SOL_SOCKET, SO_ERROR, &err, &len) == -1)
        return "getsockopt failed";
    if (err)
        return strerror(err);
    return "";
}

void TCPSocket::setTimeout(unsigned int secs, unsigned int usecs){
    struct timeval tv;
    tv.tv_sec = secs;
    tv.tv_usec = usecs;
    setsockopt(sock, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));
}

bool TCPSocket::send(std::string data){
	if(isConnected()){
        if(::send(sock, data.c_str(), (size_t)data.size(), MSG_NOSIGNAL) == -1 ){
            std::cerr<<"error: tcp send(): "<<strerror(errno)<<"\n";
            return false;
		}
        return true;
	}
    return false;
}

std::string TCPSocket::recv(int len){
	if(!isConnected())
		return "";
	char *data = new char[len];
	int size = ::recv(sock, data, len, 0);
	if(size < len)
		data[size] = 0;
	std::string str(len, '\0');
    memcpy(&str[0], data, len);
	delete[] data;
	return str;
}

std::vector<std::string> TCPSocket::recvHeader(){
	if(!isConnected())
		return std::vector<std::string>();
	std::vector<std::string> header;
	std::string line;
	char c;
	while(::recv(sock, &c, 1, 0) > 0){
		if(c == '\r')
			continue;
		if(c == '\n'){
			if(line.size() == 0)
				break;
			header.push_back(line);
			line.clear();
			continue;
		}
		line.push_back(c);
	}
	return header;
}
