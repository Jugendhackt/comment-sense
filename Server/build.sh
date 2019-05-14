#!/bin/bash

if ! dpkg -s gcc &> /dev/null
    then 
	sudo apt-get install gcc
fi

if ! dpkg -s build-essential &> /dev/null
    then 
	sudo apt-get install build-essential
fi

debug=0

while [ "$1" != '' ]
    do
    	case $1 in
	    -d | --debug ) debug=1;;
	    * ) echo "unknown arg";;
	esac
	shift
done

gcc -c cJSON.c
gcc -c socket.c
gcc -c sqlite3.c

if [ "$debug" == "1" ] 
    then
    	echo "debug build"
	gcc main.c cJSON.o socket.o sqlite3.o -o server -lpthread -ldl -Wall -D DEBUG
    else
    	echo "release build"
	gcc main.c cJSON.o socket.o sqlite3.o -o server -lpthread -ldl -Wall
fi

gcc test.c socket.o -o test -Wall
mkdir data
cp ../MainSite/* data/ -r
