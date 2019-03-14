#include "socket.h"

#ifdef WINDOWS

void errorExit(char *message) {
    fprintf(stderr,"%s: %d\n", message, WSAGetLastError());
    exit(-1);
}

int createSocket(int af, int type, int protocol){
    socket_t sock;
    WORD wVersionRequested;
    WSADATA wsaData;
    wVersionRequested = MAKEWORD (1, 1);
    if (WSAStartup (wVersionRequested, &wsaData) != 0)
        errorExit( "Error: initialising winsock failed");

    sock = socket(af, type, protocol);
    if (sock < 0)
        errorExit("Error: creating socket failed");
    return sock;
}

void bindSocket(socket_t *socket, unsigned long adress, unsigned short port) {
   struct sockaddr_in server;

   memset( &server, 0, sizeof (server));
   server.sin_family = AF_INET;
   server.sin_addr.s_addr = htonl(adress);
   server.sin_port = htons(port);
   if (bind(*socket, (struct sockaddr*) &server, sizeof( server)) == SOCKET_ERROR)
       errorExit("Error: couldn't bind socket");
}

void listenSocket( socket_t *socket) {
  if(listen(*socket, 5) == -1 )
      errorExit("Error: listen");
}

void acceptSocket( socket_t *socket, socket_t *new_socket ){
   struct sockaddr_in client;
   unsigned int len;

   len = sizeof(client);
   *new_socket=accept(*socket, (struct sockaddr *)&client, &len);
   if (*new_socket == INVALID_SOCKET)
      errorExit("Error: accept");
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
           errorExit("Error: unknown host");
       memcpy( (char *)&server.sin_addr, host_info->h_addr,
                host_info->h_length);
   }
   server.sin_family = AF_INET;
   server.sin_port = htons(port);

   if (connect(*sock, (struct sockaddr*)&server, sizeof( server)) < 0)
      errorExit("Error: can't connect to server");
}

void TCPSend( socket_t *sock, char *data, size_t size){
   if(send(*sock, data, size, 0) == SOCKET_ERROR)
      errorExit("Error: send()");
}

int TCPRecv( socket_t *sock, char *data, size_t size) {
    int len;
    len = recv (*sock, data, size, 0);
    if( len > 0 || len != SOCKET_ERROR )
       data[len] = '\0';
    else
       return -1;
}

void UDPSend ( socket_t *sock, char *data, size_t size, char *addr, unsigned short port){
  struct sockaddr_in addr_sento;
  struct hostent *h;
  int rc;

  h = gethostbyname(addr);
  if (h == NULL)
     errorExit("Unbekannter Host?");

  addr_sento.sin_family = h->h_addrtype;
  memcpy ( (char *) &addr_sento.sin_addr.s_addr,
           h->h_addr_list[0], h->h_length);
  addr_sento.sin_port = htons (port);

  rc = sendto(*sock, data, size, 0,
                 (struct sockaddr *) &addr_sento,
                 sizeof (addr_sento));
  if (rc == SOCKET_ERROR)
     errorExit("Konnte Daten nicht senden - sendto()");
}

void UDPRecv( socket_t *sock, char *data, size_t size){
   struct sockaddr_in addr_recvfrom;
   unsigned int len;
   int n;

   len = sizeof (addr_recvfrom);
   n = recvfrom ( *sock, data, size, 0, (struct sockaddr *) &addr_recvfrom, &len );
   if (n == SOCKET_ERROR)
      errorExit("Fehler bei recvfrom()");
}

void closeSocket( socket_t *sock ){
    closesocket(*sock);
}

void cleanup(void){
   WSACleanup();
}
#else

void errorExit(char *error_message) {
    fprintf(stderr, "%s: %s\n", error_message, strerror(errno));
    exit(-1);
}

int createSocket(int af, int type, int protocol ) {
    socket_t sock;
    const int y = 1;
    sock = socket(af, type, protocol);
    if (sock < 0)
        errorExit("Fehler beim Anlegen eines Socket");
    setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &y, sizeof(int));
    return sock;
}

void bindSocket(socket_t *sock, unsigned long adress, unsigned short port) {
   struct sockaddr_in server;

   memset( &server, 0, sizeof (server));
   server.sin_family = AF_INET;
   server.sin_addr.s_addr = htonl(adress);
   server.sin_port = htons(port);
   if (bind(*sock, (struct sockaddr*)&server,sizeof(server)) < 0)
       errorExit("Kann das Socket nicht \"binden\"");
}

void listenSocket( socket_t *sock ) {
  if(listen(*sock, 5) == -1 )
      errorExit("Fehler bei listen");
}

void acceptSocket(socket_t *socket, socket_t *new_socket ){
   struct sockaddr_in client;
   unsigned int len;

   len = sizeof(client);
   *new_socket=accept(*socket,(struct sockaddr *)&client, &len);
   if (*new_socket  == -1)
      errorExit("Fehler bei accept");
}

void connectSocket(socket_t *sock, char *serv_addr, unsigned short port) {
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
           errorExit("Unbekannter Server");
       memcpy( (char *)&server.sin_addr, host_info->h_addr,
               host_info->h_length);
   }
   server.sin_family = AF_INET;
   server.sin_port = htons( port );
   if (connect(*sock, (struct sockaddr *)&server, sizeof( server)) < 0)
      errorExit( "Kann keine Verbindung zum Server herstellen");
}

void TCPSend(socket_t *sock, char *data, size_t size) {
   if(send( *sock, data, size, 0) == -1 )
      errorExit("Fehler bei send()");
}

int TCPRecv(socket_t *sock, char *data, size_t size) {
    int len;
    len = recv (*sock, data, size, 0);
    if( len > 0 || len != -1 )
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
     errorExit("Unbekannter Host?");

  addr_sento.sin_family = h->h_addrtype;
  memcpy ( (char *) &addr_sento.sin_addr.s_addr,
           h->h_addr_list[0], h->h_length);
  addr_sento.sin_port = htons (port);

  rc = sendto(*sock, data, size, 0,
                 (struct sockaddr *) &addr_sento,
                 sizeof (addr_sento));
  if (rc < 0)
     errorExit("Konnte Daten nicht senden - sendto()");
}

void UDPRecv(socket_t *sock, char *data, size_t size){
   struct sockaddr_in addr_recvfrom;
   unsigned int len;
   int n;

   len = sizeof (addr_recvfrom);
   n = recvfrom ( *sock, data, size, 0,
                   (struct sockaddr *) &addr_recvfrom, &len );
   if (n < 0) {
       printf ("Keine Daten empfangen ...\n");
       return;
    }
}

void closeSocket(socket_t *sock){
    close(*sock);
}

void cleanup(void){
   printf("Aufraeumarbeiten erledigt ...\n");
   return;
}

#endif // WIN32
