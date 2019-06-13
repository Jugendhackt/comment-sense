#ifndef TCPSOCKET_H
#define TCPSOCKET_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <unistd.h>

#include <iostream>
#include <string>

#include "utils.hpp"

#define CHUNK_SIZE 512

typedef int socket_t;

class TCPSocket
{
    public:
        TCPSocket(int af, int type, int protocol);
        TCPSocket(socket_t other);
        ~TCPSocket();

        void bind(unsigned long address = INADDR_ANY, unsigned short port = 80);
        void listen();
        TCPSocket* accept();
        void connect(std::string servAddr, unsigned short port = 80);
		void disconnect();

		bool isConnected();
        std::string getError();
        void setTimeout(unsigned int secs = 5, unsigned int usecs = 0);

		bool send(std::string text);
        std::string recv(int len);
		std::vector<std::string> recvHeader();

    protected:

    private:
      socket_t sock;
};

#endif // TCPSOCKET_H
