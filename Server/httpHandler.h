#ifndef HTTPHANDLER_H_INCLUDED
#define HTTPHANDLER_H_INCLUDED

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#include "string.h"
#include "socket.h"

#define MAX_CONNECTIONS 1024

#if defined DEBUG
#define _CORS_ 1
#endif

typedef struct Connection{
    socket_t socket;
    clock_t connectionTime;
    pthread_t thread;
    int state;
    bool exit;
} Connection;

typedef enum httpRequestType{
    NONE = 0,
    GET = 1,
    PUT = 2,
    POST = 4,
    PATCH = 8,
    DELETE = 16
} httpRequestType;

Connection connections[MAX_CONNECTIONS];
int connectionCount;

String getType(String filename);
void* handleClient(void *arg);

String handleGetRequest(int index, StringList request);
String handlePutRequest(int index, StringList request, String payload);
String handlePostRequest(int index, StringList request, String payload);
String handlePatchRequest(int index, StringList request, String payload);
String handleDeleteRequest(int index, StringList request);

#endif // HTTPHANDLER_H_INCLUDED
