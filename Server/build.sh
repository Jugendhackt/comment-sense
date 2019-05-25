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
gcc -c string.c
gcc -c httpHandler.c
gcc -c commentSense.c

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
