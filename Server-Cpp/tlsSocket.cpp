#include "tlsSocket.hpp"

TLSSocket::TLSSocket(int af, int type, int protocol):
	TCPSocket(af, type, protocol)
{
	context = nullptr;
}

TLSSocket::TLSSocket(socket_t other, SSL *context):
	TCPSocket (other)
{
	this->context = context;
}

TLSSocket::~TLSSocket()
{
	if(context)
		SSL_CTX_free(context);
}

void TLSSocket::listen()
{
	TCPSocket::listen();
	context = SSL_CTX_new(SSLv3_server_method());
	if(!context){
		std::cerr<<"ERROR: couldn't create serve context\n";
		return;
	}
	SSL_CTX_use_certificate_file(context, "./localhost.crt", SSL_SERVER_RSA_CERT);
	SSL_CTX_use_PrivateKey_file(context, "./localhost.key", SSL_SERVER_RSA_KEY);
	
	if(!SSL_CTX_check_private_key(context)){
		std::cerr<<"ERROR: private key not loaded\n";
	}
}

TLSSocket *TLSSocket::accept()
{
	struct sockaddr_in client;
    unsigned int len = sizeof(client);
    socket_t new_socket = ::accept(sock,(struct sockaddr *)&client, &len);
    if(new_socket  == -1)
        std::cerr<<"error: couldn't accept socket: "<<strerror(errno)<<"\n";
	SSL *client_ctx = SSL_new(context);
	SSL_set_fd(client_ctx, new_socket);
	if(SSL_accept(client_ctx)){
		TLSSocket *socket = new TLSSocket(new_socket, client_ctx);
		socket->setTimeout(5);
		return socket;
	}
	return nullptr;
}

void TLSSocket::connect(std::string servAddr, unsigned short port)
{
	struct sockaddr_in server;
    struct hostent *host_info;
    unsigned long addr;

    memset( &server, 0, sizeof (server));
    if((addr = inet_addr(servAddr.c_str())) != INADDR_NONE) {
        memcpy(&server.sin_addr, &addr, sizeof(addr));
    }
    else {
        host_info = gethostbyname(servAddr.c_str());
		if(host_info == nullptr){
#if defined(DEBUG)
            fprintf(stderr, "error: unknown server: %s\n", strerror(errno));
#endif
		}
        else
            memcpy(&server.sin_addr, host_info->h_addr, host_info->h_length);
    }
    server.sin_family = AF_INET;
    server.sin_port = htons(port);
	if(::connect(sock, (struct sockaddr*)&server, sizeof(server)) < 0){
#if defined(DEBUG)
        fprintf(stderr, "error: couldn't connect to server: %s\n", strerror(errno));
#endif
	}
}

void TLSSocket::disconnect()
{
	if(sock >= 0 && context){
        std::cout<<getError();
		SSL_shutdown(context);
        if(shutdown(sock, SHUT_RDWR) < 0){
			if (errno != ENOTCONN && errno != EINVAL){
#if defined(DEBUG)
                std::cerr<<"error: shutdown socket failed\n";
#endif
			}
        }
        if(close(sock) < 0){
#if defined(DEBUG)
            std::cerr<<"error: close socket failed\n";
#endif
        }
		SSL_free(context);
		context = nullptr;
    }
}

bool TLSSocket::send(std::string data)
{
	if(isConnected()){
        if(SSL_write(context, data.c_str(), size_t(data.size())) <= 0 ){
#if defined(DEBUG)
            std::cerr<<"error: tcp send(): "<<strerror(errno)<<"\n";
#endif
            return false;
		}
        return true;
	}
    return false;
}

std::string TLSSocket::recv(int len)
{
	if(!isConnected())
		return "";
	char *data = new char[len];
	int size = SSL_read(context, data, size_t(len));
	if(size < len)
		data[size] = 0;
	std::string str(size_t(len), '\0');
    memcpy(&str[0], data, size_t(len));
	delete[] data;
	return str;
}

std::vector<std::string> TLSSocket::recvHeader()
{
	if(!isConnected())
		return std::vector<std::string>();
	std::vector<std::string> header;
	std::string line;
	char c;
	while(SSL_read(context, &c, size_t(1)) >= 0){
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
