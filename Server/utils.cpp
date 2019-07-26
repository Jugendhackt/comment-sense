#include "utils.hpp"

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

std::vector<std::string> split(const std::string& str, std::string delimiter)
{
    std::string s = str;
    std::vector<std::string> tokens;
    size_t pos = 0;
    std::string token;
    while ((pos = s.find(delimiter)) != std::string::npos) {
        token = s.substr(0, pos);
        tokens.push_back(token);
        s.erase(0, pos + delimiter.length());
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

std::string stringToHex(std::string str){
    std::string hex(str.size()*2, '\0');
    for(unsigned int i = 0; i < str.size(); i++){
        unsigned char c = static_cast<unsigned char>(str[i]);
        unsigned char higher = c>>4;
        unsigned char lower = static_cast<unsigned char>(c<<4);
        lower >>= 4;
        higher += higher > 9 ? 7 : 0;
        lower += lower > 9 ? 7 : 0;
        hex[i*2] = char(higher+48);
        hex[i*2+1] = char(lower+48);
    }
    return hex;
}

std::string stringFromHex(std::string hex){
    std::string str(hex.size()/2, '\0');
    for(unsigned int i = 0; i < str.size(); i++){
        int higher = hex[i*2] -48;
        int lower = hex[i*2+1] - 48;
        higher -= higher > 9 ? 7 : 0;
        lower -= lower > 9 ? 7 : 0;
        
        int c = (higher<<4) + lower;
        str[i] = char(c);
    }
    return str;
}

std::string getDate()
{
    time_t now = time(nullptr);
    struct tm tstruct = *localtime(&now);
    char buf[80];
    strftime(buf, sizeof(buf), "%d.%m.%Y", &tstruct);
    return buf;
}

std::vector<std::string> getDirContent(std::string path)
{
    DIR *dir;
    struct dirent *ent;
    std::vector<std::string> entrys;
    if((dir = opendir(path.c_str())) != nullptr){
        while((ent = readdir(dir)) != nullptr){
            entrys.push_back(ent->d_name);
        }
        closedir(dir);
    }
    return  entrys;
}

namespace sys {
    long long getTotalMem(){
        struct sysinfo memInfo;
        sysinfo (&memInfo);
        long long totalPhysMem = memInfo.totalram;
        //Multiply in next statement to avoid int overflow on right hand side...
        totalPhysMem *= memInfo.mem_unit;
        return totalPhysMem;
    }
    long long getUsedMem(){
        struct sysinfo memInfo;
        sysinfo (&memInfo);
        long long physMemUsed = memInfo.totalram - memInfo.freeram;
        //Multiply in next statement to avoid int overflow on right hand side...
        physMemUsed *= memInfo.mem_unit;
        return physMemUsed;
    }
    long long getFreeMem(){
        struct sysinfo memInfo;
        sysinfo (&memInfo);
        long long physMemFree = memInfo.freeram;
        //Multiply in next statement to avoid int overflow on right hand side...
        physMemFree *= memInfo.mem_unit;
        return physMemFree;
    }
    long long getCurrentMem(){
        FILE* file = fopen("/proc/self/status", "r");
        int result = -1;
        char line[128];

        while (fgets(line, 128, file) != NULL){
            if (strncmp(line, "VmRSS:", 6) == 0){
                result = parseLine(line);
                break;
            }
        }
        fclose(file);
        return result*1024;
    }
    float getTotalCpuUsage(){
        float percent;
        FILE* file;
        unsigned long long totalUser, totalUserLow, totalSys, totalIdle, total;

        file = fopen("/proc/stat", "r");
        fscanf(file, "cpu %llu %llu %llu %llu", &totalUser, &totalUserLow,
            &totalSys, &totalIdle);
        fclose(file);

        if (totalUser < lastTotalUser || totalUserLow < lastTotalUserLow ||
            totalSys < lastTotalSys || totalIdle < lastTotalIdle){
            //Overflow detection. Just skip this value.
            percent = -1.0;
        }
        else{
            total = (totalUser - lastTotalUser) + (totalUserLow - lastTotalUserLow) +
                (totalSys - lastTotalSys);
            percent = total;
            total += (totalIdle - lastTotalIdle);
            percent /= total;
            percent *= 100;
        }

        lastTotalUser = totalUser;
        lastTotalUserLow = totalUserLow;
        lastTotalSys = totalSys;
        lastTotalIdle = totalIdle;

        return percent;
    }
    float getCpuUsage(){
        struct tms timeSample;
        clock_t now;
        float percent;

        now = times(&timeSample);
        if (now <= lastCPU || timeSample.tms_stime < lastSysCPU ||
            timeSample.tms_utime < lastUserCPU){
            //Overflow detection. Just skip this value.
            percent = -1.0;
        }
        else{
            percent = (timeSample.tms_stime - lastSysCPU) +
                (timeSample.tms_utime - lastUserCPU);
            percent /= (now - lastCPU);
            percent /= numProcessors;
            percent *= 100;
        }
        lastCPU = now;
        lastSysCPU = timeSample.tms_stime;
        lastUserCPU = timeSample.tms_utime;

        return percent;
    }

    void init(){
        FILE* file = fopen("/proc/stat", "r");
        fscanf(file, "cpu %llu %llu %llu %llu", &lastTotalUser, &lastTotalUserLow,
            &lastTotalSys, &lastTotalIdle);
        fclose(file);
        ////
        struct tms timeSample;
        char line[128];

        lastCPU = times(&timeSample);
        lastSysCPU = timeSample.tms_stime;
        lastUserCPU = timeSample.tms_utime;

        file = fopen("/proc/cpuinfo", "r");
        numProcessors = 0;
        while(fgets(line, 128, file) != NULL){
            if (strncmp(line, "processor", 9) == 0) numProcessors++;
        }
        fclose(file);
    }

    int parseLine(char *line){
        // This assumes that a digit will be found and the line ends in " Kb".
        int i = strlen(line);
        const char* p = line;
        while (*p <'0' || *p > '9') p++;
        line[i-3] = '\0';
        i = atoi(p);
        return i;
    }
}

File::File(std::string fileName){
    this->fileName = fileName;
}

void File::setFileName(std::string file)
{
    fileName = file;
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
	unsigned long size = this->size();
	std::string content(size, '\0');
    if(fread(&content[0], size, 1, file) > size){
        std::cout<<"[ERROR] reading file:\""<<fileName<<"\"\n";
    }
	return content;
}

std::string File::read(unsigned long len){
    if(m_isOpen){
        std::string content(len, '\0');
        if(fread(&content[0], len, 1, file) > len){
            std::cout<<"[ERROR] reading file:\""<<fileName<<"\"\n";
        }
        return content;
    }
    return "";  
}

void File::write(std::string data){
    if(m_isOpen){
        fwrite(data.data(), data.size(), 1, file);
    }
}

void File::close(){
	if(m_isOpen){
        fclose(file);
    }
}

unsigned long File::size()
{
    unsigned long size = 0;
    if(m_isOpen){
        fseek(file, 0, SEEK_END);
        size = static_cast<unsigned long>(ftell(file));
        fseek(file, 0, SEEK_SET);
    }
    return size;
}

bool File::isDir()
{
    struct stat pathStat;
    stat(fileName.c_str(), &pathStat);
    return S_ISDIR(pathStat.st_mode);
}

Sqlite3DB::Sqlite3DB(std::string fileName)
{
    sqlite3_open(fileName.data(), &db);
}

Sqlite3DB::~Sqlite3DB()
{
    sqlite3_close(db);
}

dbResult* Sqlite3DB::exec(std::string querry)
{
    dbResult *result = new dbResult;
    char *error = nullptr;
    sqlite3_exec(db, querry.data(), sqlite3db_callback, result, &error);
    if(error){
        std::cout<<"[SQL ERROR] : \'"<<error<<"\'\n"<<querry<<"\n";
    }
    result->changes = sqlite3_changes(db);
    result->rowId = sqlite3_last_insert_rowid(db);
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

dbResult::~dbResult()
{
    clear();
}

void dbResult::clear()
{
    for(std::string *row : data){
        delete [] row;
    }
    data.clear();
    columns = 0;
}
