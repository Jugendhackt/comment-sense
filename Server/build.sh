if ! dpkg -s gcc &> /dev/null
then sudo apt-get install gcc
fi

if ! dpkg -s build-essential &> /dev/null
then sudo apt-get install build-essential
fi

gcc -c cJSON.c
gcc -c socket.c
gcc -c sqlite3.c
gcc main.c cJSON.o socket.o sqlite3.o -o server -lpthread -ldl -Wall
gcc test.c socket.o -o test -Wall
mkdir data
cp ../MainSite/* data/ -r
