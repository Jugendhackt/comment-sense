#include "socket.h"
#include "string.h"
#include "responseTargets.h"

String tcpRequest(String request, char *serverAddr, unsigned short port){
    String response = newString("");

    socket_t socket = createSocket(AF_INET, SOCK_STREAM, 0);
    connectSocket(&socket, serverAddr, port);
    TCPSend(&socket, request.data, request.length);

    char buffer;
    TCPRecv(&socket, &buffer, 0);
    while(read(socket, &buffer, 1) == 1){
        if(buffer == '\r')
            continue;
        appendString(&response, buffer);
    }

    closeSocket(&socket);

    return response;
}

int checkGetFile(char *serverAddr, unsigned short port){
    String request = combineString(1, "GET / HTTP/1.1\n\n");
    String response = tcpRequest(request, serverAddr, port);
    if(compareString(response.data, mainFile))
        return 1;
    printf("\n\n\"%s\"\n\n", expandEscapes(response.data));
    return 0;
}

int checkGetComments(char *serverAddr, unsigned short port){
    String request = combineString(1, "GET /comments/site=\'http://check/\' HTTP/1.1\n\n");
    String response = tcpRequest(request, serverAddr, port);
    if(compareString(response.data, testComment))
        return 1;
    printf("\n\n\"%s\"\n\n", expandEscapes(response.data));
    return 0;
}

int checkUsersCreate(char *serverAddr, unsigned short port){
    String request = combineString(1, "POST /users/create/ HTTP/1.1\nContent-Length: 37\n\n{\"userName\":\"test\",\"password\":\"test\"}");
    String response = tcpRequest(request, serverAddr, port);
    if(compareString(response.data, usersCreate1) || compareString(response.data, usersCreate2))
        return 1;
    printf("\n\n\"%s\"\n\n", expandEscapes(response.data));
    return 0;
}

int checkUsersExists(char *serverAddr, unsigned short port){
    String request = combineString(1, "POST /users/exists/ HTTP/1.1\nContent-Length: 19\n\n{\"userName\":\"test\"}");
    String response = tcpRequest(request, serverAddr, port);
    if(compareString(response.data, usersExists1) || compareString(response.data, usersExists2))
        return 1;
    printf("\n\n\"%s\"\n\n", expandEscapes(response.data));
    return 0;
}

int checkUsersLogin(char *serverAddr, unsigned short port){
    String request = combineString(1, "POST /users/login/ HTTP/1.1\nContent-Length: 37\n\n{\"userName\":\"test\",\"password\":\"test\"}");
    String response = tcpRequest(request, serverAddr, port);
    if(compareString(response.data, usersLogin1) || compareString(response.data, usersLogin2))
        return 1;
    printf("\n\n\"%s\"\n\n", expandEscapes(response.data));
    return 0;
}

int main(int argc, char *argv[]){
    char *serverAddr = "localhost";
    unsigned short port = 80;
    for(int i = 0; i < argc; i++){
        printf("%i : %s\n", i, argv[i]);
    }
    if(argc >= 3){
        serverAddr = argv[1];
        port = strtol(argv[2], NULL, 0);
    }
    printf("%s:%i\n", serverAddr, port);


    if(checkGetFile(serverAddr, port)){
        printf("Server sends file back properly\n");
    }
    else{
        printf("server can't send file back properly\n");
    }

    if(checkGetComments(serverAddr, port)){
        printf("Server sends comments back properly\n");
    }
    else{
        printf("server can't send comments back properly\n");
    }

    if(checkUsersCreate(serverAddr, port)){
        printf("Server creates user properly\n");
    }
    else{
        printf("server can't create users properly\n");
    }

    if(checkUsersExists(serverAddr, port)){
        printf("Server checks user properly\n");
    }
    else{
        printf("server can't check users properly\n");
    }

    if(checkUsersLogin(serverAddr, port)){
        printf("Server logs in user properly\n");
    }
    else{
        printf("server can't log in users properly\n");
    }
    return 0;
}


//"GET / HTTP/1.1\n"
//"Host: localhost\n"
//"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0\n"
//"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\n"
//"Accept-Language: de,en-US;q=0.7,en;q=0.3\n"
//"Accept-Encoding: gzip, deflate\n"
//"Connection: keep-alive\n"
//"Upgrade-Insecure-Requests: 1\n"
//"Cache-Control: max-age=0\n"
