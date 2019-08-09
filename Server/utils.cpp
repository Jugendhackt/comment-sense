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
	static unsigned long long lastTotalUser, lastTotalUserLow, lastTotalSys, lastTotalIdle;
	static clock_t lastCPU, lastSysCPU, lastUserCPU;
	static int numProcessors;
	
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

bool File::isOpen(){
	return m_isOpen;
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

sha256::sha256(){
	datalen = 0;
	bitlen[0] = 0;
	bitlen[1] = 0;
	state[0] = 0x6a09e667;
	state[1] = 0xbb67ae85;
	state[2] = 0x3c6ef372;
	state[3] = 0xa54ff53a;
	state[4] = 0x510e527f;
	state[5] = 0x9b05688c;
	state[6] = 0x1f83d9ab;
	state[7] = 0x5be0cd19;
}
void sha256::update(std::string data){
	for (uint i = 0; i < data.size(); ++i) {
		this->data[datalen] = data[i];
		datalen++;
		if (datalen == 64) {
			transform();
			DBL_INT_ADD(bitlen[0], bitlen[1], 512);
			datalen = 0;
		}
	}
}
std::string sha256::final(){
	uchar hash[32];

	uint i = datalen;

	if (datalen < 56) {
		data[i++] = 0x80;

		while (i < 56)
			data[i++] = 0x00;
	}
	else {
		data[i++] = 0x80;

		while (i < 64)
			data[i++] = 0x00;

		transform();
		memset(data, 0, 56);
	}

	DBL_INT_ADD(bitlen[0], bitlen[1], datalen * 8);
	data[63] = bitlen[0];
	data[62] = bitlen[0] >> 8;
	data[61] = bitlen[0] >> 16;
	data[60] = bitlen[0] >> 24;
	data[59] = bitlen[1];
	data[58] = bitlen[1] >> 8;
	data[57] = bitlen[1] >> 16;
	data[56] = bitlen[1] >> 24;
	transform();

	for (i = 0; i < 4; ++i) {
		hash[i] = (state[0] >> (24 - i * 8)) & 0x000000ff;
		hash[i + 4] = (state[1] >> (24 - i * 8)) & 0x000000ff;
		hash[i + 8] = (state[2] >> (24 - i * 8)) & 0x000000ff;
		hash[i + 12] = (state[3] >> (24 - i * 8)) & 0x000000ff;
		hash[i + 16] = (state[4] >> (24 - i * 8)) & 0x000000ff;
		hash[i + 20] = (state[5] >> (24 - i * 8)) & 0x000000ff;
		hash[i + 24] = (state[6] >> (24 - i * 8)) & 0x000000ff;
		hash[i + 28] = (state[7] >> (24 - i * 8)) & 0x000000ff;
	}

	std::string hashStr;
	char s[3];
	for (int i = 0; i < 32; i++) {
		sprintf(s, "%02x", hash[i]);
		hashStr += s;
	}
	return hashStr;
}
void sha256::transform(){
	uint a, b, c, d, e, f, g, h, i, j, t1, t2, m[64];

	for (i = 0, j = 0; i < 16; ++i, j += 4)
		m[i] = (data[j] << 24) | (data[j + 1] << 16) | (data[j + 2] << 8) | (data[j + 3]);
	for (; i < 64; ++i)
		m[i] = SIG1(m[i - 2]) + m[i - 7] + SIG0(m[i - 15]) + m[i - 16];

	a = state[0];
	b = state[1];
	c = state[2];
	d = state[3];
	e = state[4];
	f = state[5];
	g = state[6];
	h = state[7];

	for (i = 0; i < 64; ++i) {
		t1 = h + EP1(e) + CH(e, f, g) + k[i] + m[i];
		t2 = EP0(a) + MAJ(a, b, c);
		h = g;
		g = f;
		f = e;
		e = d + t1;
		d = c;
		c = b;
		b = a;
		a = t1 + t2;
	}

	state[0] += a;
	state[1] += b;
	state[2] += c;
	state[3] += d;
	state[4] += e;
	state[5] += f;
	state[6] += g;
	state[7] += h;
}

std::string sha256::hashFile(std::string fileName){
	sha256 hash;
	File f(fileName);
	f.open("rb");
	size_t size = f.size();
	size_t hashed = 0;
	while(hashed < size){
		size_t missing = size - hashed;
		size_t s = (missing < 1024*1024) ? missing : 1024*1024;
		std::string data = f.read(s);
		hash.update(data);
		hashed += s;
	}
	f.close();
	return hash.final();
}