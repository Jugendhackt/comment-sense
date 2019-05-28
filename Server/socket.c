#include "socket.h"

#ifdef WIN32

int createSocket(int af, int type, int protocol){
    socket_t sock;
    WORD wVersionRequested;
    WSADATA wsaData;
    wVersionRequested = MAKEWORD (1, 1);
    if (WSAStartup (wVersionRequested, &wsaData) != 0)
        fprintf(stderr, "Error: initialising winsock failed \t%d\n", WSAGetLastError());

    sock = socket(af, type, protocol);
    if (sock < 0)
        fprintf(stderr, "Error: creating socket failed \t%d\n", WSAGetLastError());
    return sock;
}

void bindSocket(socket_t *socket, unsigned long adress, unsigned short port) {
    struct sockaddr_in server;
    memset(&server, 0, sizeof (server));
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = htonl(adress);
    server.sin_port = htons(port);
    if (bind(*socket, (struct sockaddr*) &server, sizeof( server)) == SOCKET_ERROR)
        fprintf(stderr, "Error: couldn't bind socket \t%d\n", WSAGetLastError());
}

void listenSocket(socket_t *socket) {
    if(listen(*socket, 5) == -1 )
        fprintf(stderr, "Error: couldn't bind socket \t%d\n", WSAGetLastError());
}

void acceptSocket(socket_t *socket, socket_t *new_socket ){
    struct sockaddr_in client;
    unsigned int len;

    len = sizeof(client);
    *new_socket=accept(*socket, (struct sockaddr *)&client, &len);
    if (*new_socket == INVALID_SOCKET)
        fprintf(stderr, "Error: accept \t%d\n", WSAGetLastError());
}

void connectSocket(socket_t *sock, char *serv_addr, unsigned short port){
    struct sockaddr_in server;
    struct hostent *host_info;
    unsigned long addr;

    memset( &server, 0, sizeof (server));
    if ((addr = inet_addr( serv_addr )) != INADDR_NONE) {
        memcpy( (char *)&server.sin_addr, &addr, sizeof(addr));
    }
    else {
        host_info = gethostbyname( serv_addr );
        if (NULL == host_info)
            fprintf(stderr, "Error: unknown host \t%d\n", WSAGetLastError());
        memcpy( (char *)&server.sin_addr, host_info->h_addr,
        host_info->h_length);
    }
    server.sin_family = AF_INET;
    server.sin_port = htons(port);

    if (connect(*sock, (struct sockaddr*)&server, sizeof( server)) < 0)
        fprintf(stderr, "Error: can't connect to server \t%d\n", WSAGetLastError());
}

void TCPSend(socket_t *sock, char *data, size_t size){
    if(send(*sock, data, size, 0) == SOCKET_ERROR)
        fprintf(stderr, "Error: tcpsend() \t%d\n", WSAGetLastError());
}

int TCPRecv(socket_t *sock, char *data, size_t size){
    int len;
    len = recv (*sock, data, size, 0);
    if( len > 0 || len != SOCKET_ERROR )
        data[len] = '\0';
    else
        return -1;
    return 0;
}

void UDPSend(socket_t *sock, char *data, size_t size, char *addr, unsigned short port){
    struct sockaddr_in addr_sento;
    struct hostent *h;
    int rc;

    h = gethostbyname(addr);
    if (h == NULL)
        fprintf(stderr, "Error: unknown host \t%d\n", WSAGetLastError());

    addr_sento.sin_family = h->h_addrtype;
    memcpy((char*)&addr_sento.sin_addr.s_addr, h->h_addr_list[0], h->h_length);
    addr_sento.sin_port = htons (port);

    rc = sendto(*sock, data, size, 0, (struct sockaddr *) &addr_sento, sizeof(addr_sento));
    if (rc == SOCKET_ERROR)
        fprintf(stderr, "Error: Konnte Daten nicht senden - sendto() \t%d\n", WSAGetLastError());
}

void UDPRecv(socket_t *sock, char *data, size_t size){
    struct sockaddr_in addr_recvfrom;
    unsigned int len;
    int n;

    len = sizeof(addr_recvfrom);
    n = recvfrom(*sock, data, size, 0, (struct sockaddr*)&addr_recvfrom, &len);
    if (n == SOCKET_ERROR)
        fprintf(stderr, "Error: Fehler bei recvfrom() \t%d\n", WSAGetLastError());
}

void closeSocket(socket_t *sock){
    closesocket(*sock);
}

void cleanup(){
    WSACleanup();
}

#else

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
    if(listen(*sock, 64) == -1 )
        fprintf(stderr, "error: couldn't listen socket: %s\n", strerror(errno));
}

void acceptSocket(socket_t *socket, socket_t *new_socket ){
    struct sockaddr_in client;
    unsigned int len = sizeof(client);

    *new_socket = accept(*socket,(struct sockaddr *)&client, &len);
    if(*new_socket  == -1)
        fprintf(stderr, "error: couldn't accept socket: %s\n", strerror(errno));

    struct timeval tv;
    tv.tv_sec = 10;
    tv.tv_usec = 0;
    setsockopt(*new_socket, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));
}

void connectSocket(socket_t *sock, char *serv_addr, unsigned short port) {
    struct sockaddr_in server;
    struct hostent *host_info;
    unsigned long addr;

    memset( &server, 0, sizeof (server));
    if((addr = inet_addr(serv_addr)) != INADDR_NONE) {
        memcpy(&server.sin_addr, &addr, sizeof(addr));
    }
    else {
        host_info = gethostbyname(serv_addr);
        if(NULL == host_info)
            fprintf(stderr, "error: unknown server: %s\n", strerror(errno));
        else
            memcpy(&server.sin_addr, host_info->h_addr, host_info->h_length);
    }
    server.sin_family = AF_INET;
    server.sin_port = htons(port);
    if(connect(*sock, (struct sockaddr*)&server, sizeof(server)) < 0)
        fprintf(stderr, "error: couldn't connect to server: %s\n", strerror(errno));
}

void TCPSend(socket_t *sock, char *data, size_t size) {
    if(isSocketConnected(sock))
        if(send(*sock, data, size, MSG_NOSIGNAL) == -1 )
            fprintf(stderr, "error: tcp send(): %s\n", strerror(errno));
}

int isSocketConnected(socket_t *sock){
    int error = 0;
    socklen_t errorlen = sizeof (error);
    if(getsockopt(*sock, SOL_SOCKET, SO_ERROR, &error, &errorlen) != 0){
        fprintf(stderr, "error: socket not connected: %s\n", strerror(errno));
        return 0;
    }
    return 1;
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
    memcpy(&addr_sento.sin_addr.s_addr, h->h_addr_list[0], h->h_length);
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

#endif // WIN32
