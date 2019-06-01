#!/bin/bash

if ! dpkg -s gcc &> /dev/null
    then
	sudo apt-get install gcc
fi

if ! dpkg -s build-essential &> /dev/null
    then
	sudo apt-get install build-essential
fi

rebuild=0
target=""

defines=""
options=""
libs='-lpthread -ldl'
link='cJSON.o tcpsocket.o sqlite3.o utils.o httpServer.o commentSense.o'
args='-std=c++11 -Wall'

for i in "$@"
    do
    	case $i in
	    -d | --debug ) target="debug";;
		-r | --release ) target="release";;
		--rebuild ) rebuild=1;;
		-t=* | --target=* ) target="${i#*=}";;
	    * ) echo "unknown arg";;
	esac
	shift
done

echo "target: $target"

if [ "$target" == "debug" ]
	then
	echo "debug build"
	defines="-D DEBUG"
	options=""
else
	echo "release build"
	options="-O3"
fi

if [ "cJSON.c" -nt "cJSON.o" ] || [ "cJSON.h" -nt "cJSON.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding cJSON"
	gcc -c cJSON.c $options
fi

if [ "tcpsocket.cpp" -nt "tcpsocket.o" ] || [ "tcpsocket.h" -nt "tcpsocket.o" ] || [ "$rebuild" == "1" ]
     then
     echo "rebuilding socket library"
     g++ -c tcpsocket.cpp $options $defines $args
fi

if [ "sqlite3.c" -nt "sqlite3.o" ] || [ "sqlite3.h" -nt "sqlite3.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding sqlite3"
	gcc -c sqlite3.c $options
fi

if [ "utils.cpp" -nt "utils.o" ] || [ "utils.h" -nt "utils.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding utils library"
	g++ -c utils.cpp $options $defines $args
fi

if [ "httpServer.cpp" -nt "httpServer.o" ] || [ "httpServer.h" -nt "httpServer.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding httpServer"
	g++ -c httpServer.cpp $options $defines $args
fi

if [ "commentSense.cpp" -nt "commentSense.o" ] || [ "commentSense.h" -nt "commentSense.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding commentSense"
	g++ -c commentSense.cpp $options $defines $args
fi

echo "building server:"
echo "g++ main.cpp $link -o server $libs $options -Wall $defines $args"
g++ main.cpp $link -o server $libs $options -Wall $defines $args

if [ -d data ]
    then
	rm data -r
fi
mkdir data
cp ../MainSite/* data/ -r