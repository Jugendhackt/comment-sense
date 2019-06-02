#ifndef UTILS_H
#define UTILS_H

#include <stdio.h>
#include <time.h>
#include <sys/types.h>
#include <sys/stat.h>
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
std::string removeAll(std::string str, std::string chars);
std::string stringToHex(std::string str);
std::string stringFromHex(std::string hex);

std::string getDate();
std::vector<std::string> getDirContent(std::string path);

class File{
public:
	File(std::string fileName = "");
    void setFileName(std::string file);
	bool open(std::string mode, std::string fileName = "");
	std::string readAll();
	std::string read(unsigned int len);
	void write(std::string data);
	void close();
    
    bool isDir();
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
    dbResult *exec(std::string querry);
private:
    sqlite3 *db;
};

#endif //UTILS_H
