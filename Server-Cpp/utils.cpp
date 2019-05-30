#include "utils.h"

std::vector<std::string> split(const std::string& s, char delimiter)
{
   std::vector<std::string> tokens;
   std::string token;
   std::istringstream tokenStream(s);
   while (std::getline(tokenStream, token, delimiter))
   {
      tokens.push_back(token);
   }
   return tokens;
}

std::string removeAll(std::string str, std::string chars){
    std::string result;
    for(unsigned int i = 0; i < str.length(); i++){
        if(chars.find(str[i]) == std::string::npos)
            result.push_back(str[i]);
    }
    return result;
}

File::File(std::string fileName){
	this->fileName = fileName;
}

bool File::open(std::string mode, std::string fileName){
	if(fileName != "")
		this->fileName = fileName;
	if(this->fileName != ""){
		file = fopen(this->fileName.c_str(), mode.c_str());
		if(!file)
			return false;
		m_isOpen = true;
		return true;
	}
	return false;
}

std::string File::readAll(){
	if(!m_isOpen){
		std::cout<<"Error: file not open\n";
		return "";
	}
	fseek(file, 0, SEEK_END);
	unsigned long size = static_cast<unsigned long>(ftell(file));
	fseek(file, 0, SEEK_SET);
	//std::cout<<"reading file"<<fileName<<" size:"<<size<<"\n";
	std::string content(size, '\0');
    if(fread(&content[0], size, 1, file) != size){
        std::cout<<"[ERROR] reading file\n";
    }
	return content;
}

std::string File::read(unsigned int len){
	if(!m_isOpen)
		return "";
    std::string content(len, '\0');
	if(fread(&content[0], len, 1, file) != len){
        std::cout<<"[ERROR] reading file:\""<<fileName<<"\"\n";
    }
	return content;    
}

void File::write(std::string data){
	if(!m_isOpen)
		return;
    fwrite(data.data(), data.size(), 1, file);
}

void File::close(){
	if(!m_isOpen)
		return;
}

Sqlite3DB::Sqlite3DB(std::string fileName)
{
    sqlite3_open(fileName.data(), &db);
}

dbResult Sqlite3DB::exec(std::string querry)
{
    dbResult result;
    sqlite3_exec(db, querry.data(), sqlite3db_callback, &result, nullptr);
    return result;
}

int sqlite3db_callback(void *data, int argc, char **argv, char **azColName)
{
    if(!data)
        return  0;
    dbResult *result = reinterpret_cast<dbResult*>(data);
    result->columns = argc;
    std::string *row = new std::string[argc];
    for(int i = 0; i < argc; i++){
        if(argv[i] == nullptr)
            row[i] = "";
        else
            row[i] = argv[i];
    }
    result->data.push_back(row);
    return 0;
}
