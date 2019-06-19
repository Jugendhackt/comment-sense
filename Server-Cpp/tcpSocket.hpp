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
        enum Adress{
            Any = INADDR_ANY,
            Broadcast = INADDR_BROADCAST,
            LoopBack = INADDR_LOOPBACK,
            UnspecGroup = INADDR_UNSPEC_GROUP,
            AllHostGroup = INADDR_ALLHOSTS_GROUP,
            AllRtrsGroup = INADDR_ALLRTRS_GROUP,
            MaxLocalGroup = INADDR_MAX_LOCAL_GROUP,
            None
        };
        TCPSocket(int af, int type, int protocol);
        TCPSocket(socket_t other);
		virtual ~TCPSocket();

        void bind(unsigned long address = Adress::Any, unsigned short port = 80);
        virtual void listen();
        virtual TCPSocket* accept();
        virtual void connect(std::string servAddr, unsigned short port = 80);
		virtual void disconnect();

		bool isConnected();
        std::string getError();
        void setTimeout(unsigned int secs = 5, unsigned int usecs = 0);

		virtual bool send(std::string text);
        virtual std::string recv(int len);
		virtual std::vector<std::string> recvHeader();

	protected:
      socket_t sock;
};

#endif // TCPSOCKET_H
