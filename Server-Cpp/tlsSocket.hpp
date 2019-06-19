#ifndef TLSSOCKET_HPP
#define TLSSOCKET_HPP

#include <iostream>
#include <string>

#include "tlse.h"

#include "tcpSocket.hpp"
#include "utils.hpp"

class TLSSocket : public TCPSocket
{
public:
	TLSSocket(int af, int type, int protocol);
	TLSSocket(socket_t other, SSL *context = nullptr);
	~TLSSocket();
	///TODO: all TLS stuff
	void listen();
	TLSSocket *accept();
	void connect(std::string servAddr, unsigned short port = 443);
	void disconnect();
	
	bool send(std::string data);
	std::string recv(int len);
	std::vector<std::string> recvHeader();
private:
	SSL *context;
};

#endif // TLSSOCKET_HPP
