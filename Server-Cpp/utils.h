#ifndef UTILS_H
#define UTILS_H

#include <stdio.h>

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

class File{
public:
	File(std::string fileName = "");

	bool open(std::string mode, std::string fileName = "");
	std::string readAll();
	std::string read(unsigned int len);
	void write(std::string data);
	void close();
private:
	std::string fileName;
	FILE *file;
	bool m_isOpen = false;
};

struct dbResult{
    ~dbResult();
    void clear();
    int columns = 0;
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
