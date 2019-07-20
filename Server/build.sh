#!/bin/bash

checkRequirement () {
	if ! dpkg -s $1 &> /dev/null; then
		echo "should the required package '$1' be installed? (Y/N)"
		read ans
		if [ $ans == "Y" ] || [ "$ans" == "y" ] ; then
			sudo apt-get install $1
		else
			exit -1
		fi
	fi
}

buildCLib () {
	if [ "$1.c" -nt "$1.o" ] || [ "$1.h" -nt "$1.o" ] || [ "$2" == "1" ]; then
		echo "building lib '$1'"
		if ! gcc -c $1.c $3; then
                    exit -1;
                fi
	fi
}

buildCppLib () {
	if [ "$1.cpp" -nt "$1.o" ] || [ "$1.hpp" -nt "$1.o" ] || [ "$2" == "1" ]; then
		echo "building lib '$1'"
		if ! g++ -c $1.cpp $3 -std=c++11; then
                    exit -1;
                fi
	fi
}

loadData () {
	if [ -d data ]; then
		rm data -r
	fi
	mkdir data
	cp ../MainSite/* data/ -r

	ipAdress=($(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'))
	echo "private ip adress is '$ipAdress'"
	sed -i -- "s/const ipAdress = here;/const ipAdress = \"$ipAdress\"/g" ./data/JS/*.js
}

rebuild=0, start=0
target="debug"
defines="-D TLS_AMALGAMATION"
options=""
libs='-lpthread -ldl'
staticLibs='-static-libstdc++ -static-libgcc -static'
link='cJSON.o tlse.o tcpSocket.o tlsSocket.o sqlite3.o utils.o httpServer.o commentSense.o'
args='-std=c++11 -Wall'

for i in "$@"
	do
    	case $i in
		-d | --debug ) target="debug";;
		-r | --release ) target="release";;
		-t=* | --target=* ) target="${i#*=}";;
		-s | --static ) libs="$libs $staticLibs";;
		-e | --exec ) start=1;;
		--rebuild ) rebuild=1;;
		* ) echo "unknown arg ${i#*=}";;
	esac
	shift
done

if [ "$target" == "debug" ]; then
	defines="$defines -D DEBUG"
	options="-g"
else
	options="-O3"
fi

echo "checking requirements"
checkRequirement "gcc";
checkRequirement "build-essential";

echo "starting build (target = $target)"
buildCLib   "cJSON" $rebuild "$options $defines";
buildCLib	"tlse" $rebuild "$options $defines";
buildCppLib "tcpsocket" $rebuild "$options $defines";
buildCppLib "tlsSocket" $rebuild "$options $defines";
buildCLib   "sqlite3" $rebuild "$options $defines";
buildCppLib "utils" $rebuild "$options $defines";
buildCppLib "httpserver" $rebuild "$options $defines";
buildCppLib "commentSense" $rebuild "$options $defines";

echo "building server"
g++ main.cpp $link -o server $libs $options -Wall $defines $args

echo "copying data folder"
loadData ;

echo "done"

if [ "$start" == "1" ]; then
	echo "starting server ..."
	sudo ./server 2> log.txt
fi
