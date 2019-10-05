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

compileLib () {
	echo "compiling '$1'"
	if [ -f "$1.c" ]; then
		if [ "$1.c" -nt "build/$1.o" ] || [ "$1.h" -nt "build/$1.o" ] || [ "$2" == "1" ]; then
			if ! gcc -c $1.c $3 -fPIC -o build/$1.o -Wall; then
				exit -1;
			fi
		fi
	else
		if [ "$1.cpp" -nt "build/$1.o" ] || [ "$1.hpp" -nt "build/$1.o" ] || [ "$2" == "1" ]; then
			if ! g++ -c $1.cpp $3 -fPIC -o build/$1.o -Wall -std=c++11; then
				exit -1;
			fi
		fi
	fi
}

linkLibs() {
	echo "linking   '$1' to '$2'"
	if ! ld -relocatable $1 -o build/$2; then
		exit -1;
	fi	
}
 
linkDll () {
	echo "linking   '$1'"
	if ! g++ -shared build/$1.o -o build/$1.so $2 -Wl,-soname=./$1.so -Wl,-static -static-libstdc++ -static-libgcc; then
		exit -1;
	fi
}

loadData () {
	echo "copying data folder"
	if ! [ -d data ]; then
		mkdir data
		cp ../MainSite/* data/ -r
	fi
}

rebuild=0, start=0
target="debug"
defines="-D TLS_AMALGAMATION"
options=""
libs='-lpthread -ldl'
staticLibs='-static-libstdc++ -static-libgcc -static'
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

mkdir build;
mkdir resources;

echo "starting build (target = $target)"

compileLib "tlse" $rebuild "$options $defines";
compileLib "cJSON" $rebuild "$options $defines";
compileLib "sqlite3" $rebuild "$options $defines";

compileLib "utils" $rebuild "$options $defines";
compileLib "tcpSocket" $rebuild "$options $defines";
compileLib "tlsSocket" $rebuild "$options $defines";
compileLib "httpServer" $rebuild "$options $defines";
compileLib "commentSense" $rebuild "$options $defines";

#linkDll "tlse" "$options $defines";
#linkDll "cJSON" "$options $defines";
#linkDll "sqlite3" "$options $defines";

#linkDll "utils" "$options $defines";
#linkDll "tcpSocket" "$options $defines";
#linkDll "tlsSocket" "$options $defines";
#linkDll "httpServer" "$options $defines";

linkLibs "build/cJSON.o build/tlse.o build/tcpSocket.o build/tlsSocket.o build/sqlite3.o build/utils.o build/httpServer.o" "default.o"

linkDll "default" "$options $defines";
linkDll "commentSense" "$options $defines build/default.so";

cp build/default.so ./default.so
cp build/commentSense.so ./commentSense.so

echo "building server"
g++ main.cpp build/default.so -o server $libs $options -Wall $defines $args -static-libstdc++ -static-libgcc

loadData ;

echo "done"

if [ "$start" == "1" ]; then
	echo "starting server ..."
	sudo ./server 2> log.txt
fi
