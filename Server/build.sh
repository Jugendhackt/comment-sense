gcc -c cJSON.c
gcc -c socket.c
gcc -c sqlite3.c
gcc main.c cJSON.o socket.o sqlite3.o -o server -lpthread -ldl -Wall
