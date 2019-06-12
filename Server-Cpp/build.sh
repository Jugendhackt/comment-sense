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
staticLibs='-static-libstdc++ -static-libgcc -static'
link='cJSON.o tcpsocket.o sqlite3.o utils.o httpserver.o commentSense.o'
args='-std=c++11 -Wall'

for i in "$@"
    do
    	case $i in
	    -d | --debug ) target="debug";;
		-r | --release ) target="release";;
		-t=* | --target=* ) target="${i#*=}";;
		-s | --static ) libs="$libs $staticLibs";;
		--rebuild ) rebuild=1;;
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

if [ "httpserver.cpp" -nt "httpserver.o" ] || [ "httpserver.h" -nt "httpserver.o" ] || [ "$rebuild" == "1" ]
	then
	echo "rebuilding httpserver"
	g++ -c httpserver.cpp $options $defines $args
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

ipAdress=($(hostname -I))
echo $ipAdress
sed -i -- "s/const ipAdress = here;/const ipAdress = \"$ipAdress\"/g" ./data/JS/*.js
