#include "socket.h"

int createSocket(int af, int type, int protocol ) {
    socket_t sock;
    const int y = 1;
    sock = socket(af, type, protocol);
    if (sock < 0)
        fprintf(stderr, "error: creating socket failed: %s\n", strerror(errno));
    setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &y, sizeof(int));
    return sock;
}

void bindSocket(socket_t *sock, unsigned long adress, unsigned short port) {
    struct sockaddr_in server;

    memset( &server, 0, sizeof (server));
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = htonl(adress);
    server.sin_port = htons(port);
    if(bind(*sock, (struct sockaddr*)&server,sizeof(server)) < 0)
        fprintf(stderr, "error: couldn't bind socket: %s\n", strerror(errno));
}

void listenSocket( socket_t *sock ) {
    if(listen(*sock, 5) == -1 )
        fprintf(stderr, "error: couldn't listen socket: %s\n", strerror(errno));
}

void acceptSocket(socket_t *socket, socket_t *new_socket ){
    struct sockaddr_in client;
    unsigned int len = sizeof(client);

    *new_socket = accept(*socket,(struct sockaddr *)&client, &len);
    if(*new_socket  == -1)
        fprintf(stderr, "error: couldn't accept socket: %s\n", strerror(errno));
}

void connectSocket(socket_t *sock, char *serv_addr, unsigned short port) {
    struct sockaddr_in server;
    struct hostent *host_info;
    unsigned long addr;

    memset( &server, 0, sizeof (server));
    if((addr = inet_addr(serv_addr)) != INADDR_NONE) {
        memcpy( (char *)&server.sin_addr, &addr, sizeof(addr));
    }
    else {
        host_info = gethostbyname(serv_addr);
    if(NULL == host_info)
        fprintf(stderr, "error: unknown server: %s\n", strerror(errno));
        memcpy( (char *)&server.sin_addr, host_info->h_addr,
        host_info->h_length);
    }
    server.sin_family = AF_INET;
    server.sin_port = htons(port);
    if(connect(*sock, (struct sockaddr*)&server, sizeof(server)) < 0)
        fprintf(stderr, "error: couldn't connect to server: %s\n", strerror(errno));
}

void TCPSend(socket_t *sock, char *data, size_t size) {
    int error = 0;
    socklen_t errorlen = sizeof (error);
    if(getsockopt(*sock, SOL_SOCKET, SO_ERROR, &error, &errorlen) != 0){
        fprintf(stderr, "error: socket not connected: %s\n", strerror(errno));
        return;
    }
    if(send(*sock, data, size, 0) == -1 )
        fprintf(stderr, "error: tcp send(): %s\n", strerror(errno));
}

int TCPRecv(socket_t *sock, char *data, size_t size) {
    int len;
    int error = 0;
    socklen_t errorlen = sizeof (error);
    if(getsockopt(*sock, SOL_SOCKET, SO_ERROR, &error, &errorlen) != 0){
        fprintf(stderr, "error: socket not connected: %s\n", strerror(errno));
        return -1;
    }
    len = recv(*sock, data, size, 0);
    if( len != -1)
        data[len] = '\0';
    else{
        fprintf(stderr, "error: tcp recv(): %s\n", strerror(errno));
        return -1;
    }
    return 0;
}

void UDPSend(socket_t *sock, char *data, size_t size, char *addr, unsigned short port){
    struct sockaddr_in addr_sento;
    struct hostent *h;
    int rc;

    h = gethostbyname(addr);
    if (h == NULL)
        fprintf(stderr, "error: unknown host: %s\n", strerror(errno));

    addr_sento.sin_family = h->h_addrtype;
    memcpy((char *)&addr_sento.sin_addr.s_addr, h->h_addr_list[0], h->h_length);
    addr_sento.sin_port = htons (port);

    rc = sendto(*sock, data, size, 0, (struct sockaddr*)&addr_sento, sizeof(addr_sento));
    if (rc < 0)
        fprintf(stderr, "error: couldn't send data - sendto(): %s\n", strerror(errno));
}

void UDPRecv(socket_t *sock, char *data, size_t size){
    struct sockaddr_in addr_recvfrom;
    unsigned int len;
    int n;

    len = sizeof(addr_recvfrom);
    n = recvfrom(*sock, data, size, 0, (struct sockaddr*)&addr_recvfrom, &len);
    if (n < 0){
        fprintf(stderr, "error: no data received\n");
        return;
    }
}

void closeSocket(socket_t *sock){
    close(*sock);
}
