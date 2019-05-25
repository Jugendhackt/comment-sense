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

if [ "cJSON.c" -nt "cJSON.o" ] || [ "cJSON.h" -nt "cJSON.o" ] 
	then
	echo "rebuilding cJSON"
	gcc -c cJSON.c
fi

if [ "socket.c" -nt "socket.o" ] || [ "socket.h" -nt "socket.o" ]
     then
     echo "rebuilding socket library"
     gcc -c socket.c
fi

if [ "sqlite3.c" -nt "sqlite3.o" ] || [ "sqlite3.h" -nt "sqlite3.o" ]
	then
	echo "rebuilding sqlite3"
	gcc -c sqlite3.c
fi

if [ "string.c" -nt "string.o" ] || [ "string.h" -nt "string.o" ]
	then
	echo "rebuilding string library"
	gcc -c string.c
fi

if [ "httpHandler.c" -nt "httpHandler.o" ] || [ "httpHandler.h" -nt "httpHandler.o" ]
	then
	echo "rebuilding httpHandler"
	gcc -c httpHandler.c
fi

if [ "commentSense.c" -nt "commentSense.o" ] || [ "commentSense.h" -nt "commentSense.o" ]
	then
	echo "rebuilding commentSense"
	gcc -c commentSense.c
fi

#gcc -c socket.c
#gcc -c sqlite3.c
#gcc -c string.c
#gcc -c httpHandler.c
#gcc -c commentSense.c

libs='-lpthread -ldl'
link='cJSON.o socket.c sqlite3.o string.o httpHandler.o commentSense.c'

if [ "$debug" == "1" ]
    then
   	echo "debug build"
	gcc main.c $link -o server $libs -Wall -D DEBUG
else
   	echo "release build"
	gcc main.c $link -o server $libs -Wall
fi

gcc test.c socket.o string.o -o test -Wall

if [ -d data ]
    then
	rm data -r
fi
mkdir data
cp ../MainSite/* data/ -r
