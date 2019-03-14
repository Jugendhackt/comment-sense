#define _WIN32_WINNT 0x0501

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <pthread.h>

#include "httpHandler.h"

volatile sqlite3 *db;

int callback(void *data, int argc, char **argv, char **azColName){
    for(int i = 0; i < argc; i++){
        printf("| %s ", argv[i]);
    }
    printf("|\n");
    return 0;
}

void* checkSockets(void *data){
    while(1){
        clock_t current = clock();
        for(int i = 0; i < MAX_CONNECTIONS; i++){
            if(connections[i].connectionTime+(CLOCKS_PER_SEC) < current && connections[i].state == 1){
                connections[i].exit = true;
            }
        }
        usleep(100000);
    }
}

int main()
{
    //testJson();
    for(int i = 0; i < MAX_CONNECTIONS; i++){
        connections[i].state = 0;
        connections[i].exit = false;
    }
    //sqlite3_open("./data/mainDataBase.db3", &db);

    pthread_t check;
    pthread_create(&check, NULL, checkSockets, NULL);
    pthread_detach(check);

    socket_t socket = createSocket(AF_INET, SOCK_STREAM, 0);

    bindSocket(&socket, INADDR_ANY, 80);
    listenSocket(&socket);
    for(;;){
        socket_t client;
        acceptSocket(&socket, &client);
        connectionCount++;
        int found = 0;

        for(int i = 0; i < MAX_CONNECTIONS; i++){
            if(connections[i].state == 0){
                int *arg = (int*)(long)i;
                pthread_t thread;
                pthread_create(&thread, NULL, handleClient, arg);
                pthread_detach(thread);
                connections[i].state = 1;
                connections[i].thread = thread;
                connections[i].socket = client;
                connections[i].connectionTime = clock();
                found = 1;
                printf("started thread\t\t%i thread(s) running\n", connectionCount);
                break;
            }
        }
        if(!found){
            closeSocket(&client);
        }
    }
    return pthread_cancel(check);
}
