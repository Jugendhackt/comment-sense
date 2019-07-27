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

#include <vector>
#include <string>
#include <iostream>
#include <algorithm>
#include <sstream>

#include "sqlite3.h"
#include "cJSON.h"

typedef unsigned char byte;
typedef std::vector<byte> ByteArray;

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
    sqlite3 *db;
};

#endif //UTILS_H
