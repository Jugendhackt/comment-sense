#ifndef SOCKET_H_
#define SOCKET_H_

#ifdef WIN32
#include <stdio.h>
#include <stdlib.h>
#include <winsock.h>
#include <io.h>

typedef SOCKET socket_t;

#else

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

typedef int socket_t;
#endif

void errorExit(char *message);
int createSocket(int af, int type, int protocol);
void bindSocket(socket_t *socket, unsigned long adress, unsigned short port);
void listenSocket(socket_t *socket);
void acceptSocket(socket_t *newSocket, socket_t *socket);
void connectSocket(socket_t *socket, char *servAddr, unsigned short port);
void TCPSend(socket_t *sock, char *data, size_t size);
int TCPRecv(socket_t *sock, char *data, size_t size);
void UDPSend(socket_t *sock, char *data, size_t size, char *addr, unsigned short port);
void UDPRecv(socket_t *sock, char *data, size_t size);
void closeSocket(socket_t *socket);

#endif

