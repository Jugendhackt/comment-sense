#ifndef UTILS_H
#define UTILS_H

#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/sysinfo.h>
#include <sys/times.h>
#include <unistd.h>
#include <dirent.h>
#include <dlfcn.h>

#include <vector>
#include <string>
#include <iostream>
#include <algorithm>
#include <functional>
#include <sstream>

#include "sqlite3.h"
#include "cJSON.h"

#define uchar unsigned char
#define uint unsigned int

#define DBL_INT_ADD(a,b,c) if (a > 0xffffffff - (c)) ++b; a += c;
#define ROTLEFT(a,b) (((a) << (b)) | ((a) >> (32-(b))))
#define ROTRIGHT(a,b) (((a) >> (b)) | ((a) << (32-(b))))

#define CH(x,y,z) (((x) & (y)) ^ (~(x) & (z)))
#define MAJ(x,y,z) (((x) & (y)) ^ ((x) & (z)) ^ ((y) & (z)))
#define EP0(x) (ROTRIGHT(x,2) ^ ROTRIGHT(x,13) ^ ROTRIGHT(x,22))
#define EP1(x) (ROTRIGHT(x,6) ^ ROTRIGHT(x,11) ^ ROTRIGHT(x,25))
#define SIG0(x) (ROTRIGHT(x,7) ^ ROTRIGHT(x,18) ^ ((x) >> 3))
#define SIG1(x) (ROTRIGHT(x,17) ^ ROTRIGHT(x,19) ^ ((x) >> 10))

std::vector<std::string> split(const std::string& s, char delimiter);
std::vector<std::string> split(const std::string& str, std::string delimiter);
std::string removeAll(std::string str, std::string chars);
std::string stringToHex(std::string str);
std::string stringFromHex(std::string hex);

std::string getDate();
std::vector<std::string> getDirContent(std::string path);

namespace sys {
	long long getTotalMem();
	long long getUsedMem();
	long long getFreeMem();
	long long getCurrentMem();
	float getTotalCpuUsage();
	float getCpuUsage();

	void init();
	int parseLine(char *line);
}

class File{
public:
	File(std::string fileName = "");
	void setFileName(std::string file);
	bool open(std::string mode, std::string fileName = "");
	std::string readAll();
	static std::string readAll(std::string fileName);
	std::string read(unsigned long len);
	void write(std::string data);
	void close();
	
	unsigned long size();
	
	bool isDir();
	bool isOpen();
private:
	std::string fileName;
	FILE *file;
	bool m_isOpen = false;
};

struct dbResult{
	~dbResult();
	void clear();
	int columns = 0;
	int changes = 0;
	int64_t rowId = 0;
	std::vector<std::string*> data;
};

int sqlite3db_callback(void *data, int argc, char **argv, char **azColName);

class Sqlite3DB{
public:
	Sqlite3DB(std::string fileName);
	~Sqlite3DB();
	dbResult *exec(std::string querry);
private:
	sqlite3 *db = nullptr;
};

const uint k[64] = {
	0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
	0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
	0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
	0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
	0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
	0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
	0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
	0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
};

class sha256{
public:
	sha256();
	void update(std::string data);
	std::string final();
	
	static std::string hashFile(std::string fileName);
private:
	void transform();

	uchar data[64];
	uint datalen;
	uint bitlen[2];
	uint state[8];
};

typedef void(*fptr)(std::string);

class dll{
public:
	dll(std::string name = "");
	void open(std::string name);
	template <class T>
	T get(std::string function){
		if(handle){
			T func = reinterpret_cast<T>(dlsym(handle, function.c_str()));
			if(!func){
				std::cerr<<dlerror()<<std::endl;
			}
			return func;
		}
		return nullptr;
	}
	std::string getName();
	bool isOpen();
	void close();
private:
	void *handle = nullptr;
	std::string name;
	bool m_open = false;
};




void init() __attribute__((constructor));

#endif //UTILS_H
