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
rebuild=0

defines=""

while [ "$1" != '' ]
    do
    	case $1 in
	    -d | --debug ) debug=1;;
		-r | --rebuild ) rebuild=1;;
	    * ) echo "unknown arg";;
	esac
	shift
done

if [ "$debug" == "1" ]
	then
	echo "debug build"
	defines="-D DEBUG"
else
	echo "release build"
fi

if [ "cJSON.c" -nt "cJSON.o" ] || [ "cJSON.h" -nt "cJSON.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding cJSON"
	gcc -c cJSON.c $defines
fi

if [ "socket.c" -nt "socket.o" ] || [ "socket.h" -nt "socket.o" ] || [ "$rebuild" == "1" ]
     then
     echo "rebuilding socket library"
     gcc -c socket.c $defines
fi

if [ "sqlite3.c" -nt "sqlite3.o" ] || [ "sqlite3.h" -nt "sqlite3.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding sqlite3"
	gcc -c sqlite3.c $defiens
fi

if [ "string.c" -nt "string.o" ] || [ "string.h" -nt "string.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding string library"
	gcc -c string.c $defines
fi

if [ "httpHandler.c" -nt "httpHandler.o" ] || [ "httpHandler.h" -nt "httpHandler.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding httpHandler"
	gcc -c httpHandler.c $defines
fi

if [ "commentSense.c" -nt "commentSense.o" ] || [ "commentSense.h" -nt "commentSense.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding commentSense"
	gcc -c commentSense.c $defines
fi

#gcc -c socket.c
#gcc -c sqlite3.c
#gcc -c string.c
#gcc -c httpHandler.c
#gcc -c commentSense.c

libs='-lpthread -ldl'
link='cJSON.o socket.c sqlite3.o string.o httpHandler.o commentSense.c'

echo "building server"
gcc main.c $link -o server $libs -Wall $defines
echo "building test"
gcc test.c socket.o string.o -o test -Wall

if [ -d data ]
    then
	rm data -r
fi
mkdir data
cp ../MainSite/* data/ -r
