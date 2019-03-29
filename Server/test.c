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
    printf("Request:\"\n%s\"\nResponse:\"\n%s\"\n\n", request.data, response.data);
    if(compareString(response.data, mainFile))
        return 1;
    return 0;
}

int checkGetComments(char *serverAddr, unsigned short port){
    String request = combineString(1, "GET /comments/site=\"http://localhost/\" HTTP/1.1\n\n");
    String response = tcpRequest(request, serverAddr, port);
    printf("Request:\"\n%s\"\nResponse:\"\n%s\"\n\n", request.data, response.data);
    if(compareString(response.data, mainFile))
        return 1;
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
