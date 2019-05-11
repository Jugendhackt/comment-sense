#ifndef HTTPHANDLER_H_INCLUDED
#define HTTPHANDLER_H_INCLUDED

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#include "string.h"
#include "socket.h"

#define MAX_CONNECTIONS 1024

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
int connectionCount = 0;

String getType(String filename);
void* handleClient(void *arg);

String handleGetRequest(int index, StringList request);
String handlePutRequest(int index, StringList request, String payload);
String handlePostRequest(int index, StringList request, String payload);
String handlePatchRequest(int index, StringList request, String payload);
String handleDeleteRequest(int index, StringList request);



#include "commentSense.h"

String getType(String filename){
    StringList parts = splitString(filename, '.');
    char *data = "";
    for(int i = 0; parts[i].data != NULL; i++)
        data = parts[i].data;
    String type;

    if(compareString(data, "html"))
        type = newString("text/html");
    else if(compareString(data, "css"))
        type = newString("text/css");
    else if(compareString(data, "csv"))
        type = newString("text/csv");
    else if(compareString(data, "js"))
        type = newString("text/javascript");
    else if(compareString(data, "xml"))
        type = newString("text/xml");

    else if(compareString(data, "json"))
        type = newString("application/json");
    else if(compareString(data, "pdf"))
        type = newString("application/pdf");
    else if(compareString(data, "zip"))
        type = newString("application/zip");

    else if(compareString(data, "png"))
        type = newString("image/png");
    else if(compareString(data, "jpg"))
        type = newString("image/jpm");
    else if(compareString(data, "ico"))
        type = newString("image/ico");
    else if(compareString(data, "svg"))
        type = newString("image/svg+xml");
    else
        type = newString("text/plain");

    deleteStringList(parts);
    return type;
}

void* handleClient(void *arg){
    int index = (long)arg;
    socket_t *socket = &connections[index].socket;
    char buffer;
    char tmp = 0;
    String line = newString("");
    StringList header = malloc(sizeof(String));
    header[0].data = NULL;
    while(TCPRecv(socket, &buffer, 1) != -1){
        if(buffer == '\r')
            continue;
        if(tmp == '\n' && buffer == '\n')
            break;
        tmp = buffer;
        appendString(&line, buffer);
        if(buffer == '\n'){
            header = stringListAppend(header, line);
            line = newString("");
        }
    }
    if(!isSocketConnected(socket)){
        deleteString(line);
        deleteStringList(header);
        return NULL;
    }
    if(header != NULL && header[0].data != 0 && header[0].length > 0){
        int len = 0;

        for(int i = 0; header[i].data != NULL; i++){
            if(containsString(header[i].data, "Content-Length:")){
                String contentLength = newString(header[i].data+16);
                len = intFromString(contentLength);
                deleteString(contentLength);
                break;
            }
        }

        String payload;
        if(len > 0){
            payload.length = len;
            payload.data = malloc(len+1);
            if(read(*socket, payload.data, len) < 0)
                fprintf(stderr, "error: couldn't read payload\n");
            payload.data[len] = 0;
        }
        else
            payload = newString("no payload");

        String response;
        StringList request = splitString(header[0], ' ');

        httpRequestType type = NONE;

        if(connections[index].exit)
            response = newString("");
        else{
            if(compareString(request[0].data, "GET")){
                type = GET;
                response = handleGetRequest(index, request);
            }
            else if(compareString(request[0].data, "PUT")){
                type = PUT;
                response = handlePutRequest(index, request, payload);
            }
            else if(compareString(request[0].data, "POST")){
                type = POST;
                response = handlePostRequest(index, request, payload);
            }
            else if(compareString(request[0].data, "PATCH")){
                type = PATCH;
                response = handlePatchRequest(index, request, payload);
            }
            else if(compareString(request[0].data, "DELETE")){
                type = DELETE;
                response = handleDeleteRequest(index, request);
            }
            else
                response = newString("Unknown request");
        }
        if(type != NONE){
            TCPSend(socket, response.data, response.length);
            if(type != POST){
                char c = '\n';
                TCPSend(socket, &c, 1);
            }
        }
        closeSocket(socket);

        deleteString(payload);
        deleteString(response);
        deleteStringList(request);
    }
    deleteString(line);
    deleteStringList(header);
    connectionCount--;
    connections[index].state = 0;
    printf("ended thread\t\t%i thread(s) running\n", connectionCount);
    return NULL;
}

String handleGetRequest(int index, StringList request){
    printf("get request\n");
    String response = newString("HTTP/1.1 ");
    String content;
    int status = 200;
    String type;

    /// handling the request
    if(containsString(request[1].data, "/comments/top/")){
        type = newString("application/json");
        content = getTopComments(request[1], &status);
    }
    else if(containsString(request[1].data, "/comments/")){    //client wants comments
        type = newString("application/json");
        content = getComments(request[1], &status);
    }
    else if(containsString(request[1].data, "/sites/top/")){
        type = newString("application/json");
        content = getTopSites(request[1], &status);
    }
    else{   //client wants file
        String file = newString("./data");
        appendStringStr(&file, request[1]);
        if(file.data[7] == ' '){
            file.data[7] = 0;
            file.length = 7;
        }
        if(compareString(file.data, "./data") || compareString(file.data, "./data/"))
            appendStringStdStr(&file, "index.html");
        type = getType(file);
        FILE *f = fopen(file.data, "rb");
        if(f != NULL){
            fseek(f, 0, SEEK_END);
            long size = ftell(f);
            fseek(f, 0, SEEK_SET);
            char *buffer = malloc(size);
            if(buffer != NULL){
                if(!fread(buffer, size, 1, f))
                    fprintf(stderr, "error: couldn't read file: %s\n", file.data);
                fclose(f);
                content.data = buffer;
                content.length = size;
            }
            else
                content = newString("error, data == NULL");
        }
        else{
            status = 404;
            content = newString("Error: File not found");
            type = newString("text/plain");
        }
        deleteString(file);
    }

    /// creating the response
    String length = stringFromInt(content.length);
    String statusStr = stringFromInt(status);
    appendStringStr(&response, statusStr);

    if(content.length > 0){
        appendStringStdStr(&response, "\nContent-Type:");
        appendStringStr(&response, type);
        appendStringStdStr(&response, "\nContent-Length:");
        appendStringStr(&response, length);
        appendStringStdStr(&response, "\n\n");
        appendStringByteArray(&response, content);
    }

    deleteString(content);
    deleteString(type);
    deleteString(length);
    deleteString(statusStr);
    return response;
}

String handlePutRequest(int index, StringList request, String payload){
    printf("put request\n");
    String response = newString("HTTP/1.1 ");
    String content = newString("");
    int status = 200;
    String type;

    /// handling the request
    type = newString("text/plain");

    /// creating the response
    String length = stringFromInt(content.length);
    String statusStr = stringFromInt(status);
    appendStringStr(&response, statusStr);

    if(content.length > 0){
        appendStringStdStr(&response, "\ncontent type:");
        appendStringStr(&response, type);
        appendStringStdStr(&response, "\ncontent length:");
        appendStringStr(&response, length);
        appendStringStdStr(&response, "\n\n");
        appendStringByteArray(&response, content);
    }

    deleteString(content);
    deleteString(type);
    deleteString(length);
    deleteString(statusStr);
    return response;
}
String handlePostRequest(int index, StringList request, String payload){
    printf("post request\n");
    String response = newString("HTTP/1.1 ");
    String content;
    int status = 200;
    String type;

    /// handling the request
    if(containsString(request[1].data, "/comments/")){    //client wants to post a comment
        type = newString("application/json");
        content = postComment(payload, &status);
    }
    else if(containsString(request[1].data, "/users/create")){    //client wants to create a new account
        type = newString("application/json");
        content = createUser(payload, &status);
    }
    else if(containsString(request[1].data, "/users/exists/")){
        type = newString("application/json");
        content = existsUser(payload, &status);
    }
    else if(containsString(request[1].data, "/users/login/")){
        type = newString("application/json");
        content = checkUser(payload, &status);
    }
    else{
        type = newString("text/plain");
        content = newString("");
    }

    /// creating the response
    String length = stringFromInt(content.length);
    String statusStr = stringFromInt(status);
    appendStringStr(&response, statusStr);

    if(content.length > 0){
        appendStringStdStr(&response, "\ncontent type:");
        appendStringStr(&response, type);
        appendStringStdStr(&response, "\ncontent length:");
        appendStringStr(&response, length);
        appendStringStdStr(&response, "\n\n");
        appendStringByteArray(&response, content);
    }

    deleteString(content);
    deleteString(type);
    deleteString(length);
    deleteString(statusStr);
    return response;
}
String handlePatchRequest(int index, StringList request, String payload){
    printf("patch request\n");
    String response = newString("HTTP/1.1 ");
    String content;
    int status = 200;
    String type;

    /// handling the request
    if(containsString(request[1].data, "/comments/vote")){    //client wants to vote
        type = newString("application/json");
        content = voteComment(payload, &status);
    }
    else{
        type = newString("text/plain");
        content = newString("");
    }

    /// creating the response
    String length = stringFromInt(content.length);
    String statusStr = stringFromInt(status);
    appendStringStr(&response, statusStr);

    if(content.length > 0){
        appendStringStdStr(&response, "\ncontent type:");
        appendStringStr(&response, type);
        appendStringStdStr(&response, "\ncontent length:");
        appendStringStr(&response, length);
        appendStringStdStr(&response, "\n\n");
        appendStringByteArray(&response, content);
    }

    deleteString(content);
    deleteString(type);
    deleteString(length);
    deleteString(statusStr);
    return response;
}
String handleDeleteRequest(int index, StringList request){
    printf("delete request\n");
    String response = newString("HTTP/1.1 ");
    String content = newString("");
    int status = 200;
    String type;

    /// handling the request
    type = newString("text/html");

    /// creating the response
    String length = stringFromInt(content.length);
    String statusStr = stringFromInt(status);
    appendStringStr(&response, statusStr);

    if(content.length > 0){
        appendStringStdStr(&response, "\ncontent type:");
        appendStringStr(&response, type);
        appendStringStdStr(&response, "\ncontent length:");
        appendStringStr(&response, length);
        appendStringStdStr(&response, "\n\n");
        appendStringByteArray(&response, content);
    }

    deleteString(content);
    deleteString(type);
    deleteString(length);
    deleteString(statusStr);
    return response;
}

#endif // HTTPHANDLER_H_INCLUDED
