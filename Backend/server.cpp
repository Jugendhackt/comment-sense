#include "server.h"
#include <QtDebug>
#include <QFile>
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonValue>
#include <QTime>
#include <QDate>

static QList<QList<QPair<QString, QString>>> dataBaseQuerryResult;

static int callback(void *data, int argc, char **argv, char **azColName){
    Q_UNUSED(data);
    QList<QPair<QString, QString>> querryElement;
    for(int i = 0; i < argc; i++)
        querryElement.append(QPair<QString, QString>(QString(azColName[i]), QString(argv[i] ? argv[i] : "NULL")));
    dataBaseQuerryResult.append(querryElement);
    return 0;
}

Server::Server(QObject *parent) :
    QObject(parent)
{
    stdOut.open(stdout, QIODevice::WriteOnly);
    outStream = new QTextStream(stdout);
    server = new QTcpServer(this);
    connect(server, &QTcpServer::newConnection, this, &Server::newConnection);
    quint16 port;
#ifdef SSL
    port = 443;
#else
    port = 80;
#endif
    port = 12345;
    server->listen(QHostAddress::Any, port);
    FILE *f = fopen(dbPath, "r");
    bool init = false;
    if(f == NULL){
        f = fopen(dbPath, "w");
        init = true;
    }
    rc = sqlite3_open(dbPath, &db);
    if(rc){
        cout<<"Cant't open database "<<sqlite3_errmsg(db)<<endl;
        return;
    }
    if(init)
        initDatabase();
    zErrMsg = nullptr;
    
    /*putDatabaseContent("{\"userName\":\"User2\","
                        "\"password\":\"password2\","
                        "\"headline\":\"Header\","
                        "\"comment\":\"this is the comment\","
                        "\"hash\":\"hash1\"}");*/
    /*
    QString hash = getHashFromData("POST /comments/ HTTP/1.1\r\n"
                              "Host: localhost:12345\r\n"
                              "Connection: keep-alive\r\n"
                              "Content-Length: 25\r\n"
                              "Origin: chrome-extension://dijfcbcnifcppjmmidaijhjkhicolgno\r\n"
                              "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 OPR/56.0.3051.52\r\n"
                              "Content-Type: text/plain;charset=UTF-8\r\n"
                              "Accept: *//*\r\nAccept-Encoding: gzip, deflate, br\r\n"
                              "Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7\r\n"
                              "\r\n"
                              "{\"hash\":\"hash1\"}");
    cout<<hash<<"\n"<<getDatabaseContent(hash)<<endl;
    */
    //initDatabase();
}

Server::~Server()
{
    sqlite3_close(db);
}

void Server::newConnection()
{
#ifdef SSL
    Socket *socket = new Socket(this);
    if(!socket->setSocketDescriptor(server->nextPendingConnection()->socketDescriptor())){
        cout<<"Couldn't set socket descriptor"<<endl;
        delete socket;
        return;
    }
#else
    Socket *socket = server->nextPendingConnection();
#endif
    socketList.append(socket);
    connect(socket, &Socket::readyRead, this, &Server::readyRead);
    connect(socket, &Socket::disconnected, this, &Server::disconnected);
    connect(socket, SIGNAL(error(QAbstractSocket::SocketError)), this, SLOT(socketError(QAbstractSocket::SocketError)));
#ifdef SSL
    connect(socket, &Socket::encrypted, this, &Server::encrypted);
    connect(socket, SIGNAL(sslErrors(QList<QSslError>)), this, SLOT(sslErrors(QList<QSslError>)));
    socket->setPrivateKey(":/Server.key");
    socket->setLocalCertificate(":/Server.crt");
    //socket->startServerEncryption();
#endif
    cout<<"connected to :"<<socket->peerAddress().toString() + ":" + QString::number(socket->peerPort())<<endl;
}

void Server::readyRead()
{
    Socket *socket = qobject_cast<Socket*>(sender());
    QString data = socket->readAll();
    cout<<"----------------------------\n\n"<<data<<endl;
    QString httpAction = data.split(' ').first();
    if(httpAction == "POST"){
        httpPost(data, socket);
    }       // Upload comment
    else if(httpAction == "GET"){
        httpGet(data, socket);
    }       // Get all comments on site or get file
    else if(httpAction == "PUT"){
        httpPut(data, socket);
    }       // Upload file (e.g: image to embed in comment)
    else if(httpAction == "PATCH"){
        httpPatch(data, socket);
    }       // Edit comment or change votes of comment
    else if(httpAction == "DELETE"){
        httpPatch(data, socket);
    }       // Delete comment
    cout<<"\n\n"<<"ENDE"<<"\n\n"<<endl;
}

void Server::disconnected()
{   /*  remove the socket from the list
        and delete it once it isn't needed anymore  */
    Socket *socket = qobject_cast<Socket*>(sender());
    cout<<"dissconected from :"<<socket->peerAddress().toString() + ":" + QString::number(socket->peerPort())<<endl;
    socketList.removeAll(socket);
    socket->deleteLater();
}

void Server::encrypted()
{
    cout<<"Encrypted!"<<endl;
}

void Server::socketError(QAbstractSocket::SocketError error)
{
    Q_UNUSED(error);
}

void Server::sslErrors(QList<QSslError> errors)
{
    for(int i = 0; i < errors.length(); i++){
        cout<<errors[i].errorString()<<endl;
    }
}

void Server::httpGet(QString data, Socket *socket)
{
    cout<<"httpGet request: \""<<data<<" \"."<<endl;      //  print info
    QString requestedData;
    QStringList lines = data.split("\r\n");
    if(!lines.first().contains("/comments/"))   //  check whether comments or a file is requested
        requestedData = getFile(lines.first()); //  file : later send requested file / 404
    else{                                       //  comment : get all comments for the site
        QString url;                            //GET /comments/http://esprima.org/demo/validate.html HTTP/1.1
        cout<<lines.first()<<endl;
        url = lines.first().split(" ")[1];
        url.remove(0,10);
        cout<<"URL: \'"<<url<<"\'."<<endl;
        requestedData = getDatabaseContent(url);
    }

    cout<<requestedData<<endl;
    sendData(socket, requestedData.toLatin1()); //  send the requested data back to the client / plugin
}

void Server::httpPut(QString data, Socket *socket)
{
    Q_UNUSED(socket);
    cout<<"httpPut request: \""<<data<<" \"."<<endl;      //  print info
}

void Server::httpPost(QString data, Socket *socket)
{
    cout<<"httpPost request: \""<<data<<" \"."<<endl;     //  print info
    QStringList lines = data.split("\r\n");
    QString response;
    if(!lines.first().contains("/comments/"))   //  check whether comments or a file is requested
        response = "Thats not a comment";       //  file : response (no comment)
    else{
    QString json;                               //  stores complete json data
    bool b_json = false;                        //  bool for checking whether current line is json
    for(int i = 0; i < lines.size(); i++){      //  iterate through all lines of the request
        if(lines[i].isEmpty())                  //  empty line marks border between header and body
            b_json = true;                      //  following part is json
        if(b_json)                              //  if line is jsondata
            json.append(lines[i]);              //  append it to json
    }
    if(putDatabaseContent(json.toLatin1()) == 0)//  if post was successfull
        response = "posting successfull";
    }
    cout<<response<<endl;
    sendData(socket, response.toLatin1());      //  response
}

void Server::httpPatch(QString data, Socket *socket)
{
    Q_UNUSED(socket);
    cout<<"httpPatch request: \""<<data<<" \"."<<endl;    //  print info
}

void Server::httpDelete(QString data, Socket *socket)
{
    Q_UNUSED(socket);
    cout<<"httpDelete request: \""<<data<<" \"."<<endl;   //  print info
}

QByteArray Server::getFile(QString url)
{
    QByteArray data;
    cout<<url<<endl;
    return data;
}

void Server::initDatabase()
{
    execSqlQuerry("CREATE TABLE comments("      //  SQL to create new table (comments)
                  "id INT PRIMARY KEY NOT NULL,"
                  "user_id INT,"
                  "rating INT,"
                  "votes TEXT,"
                  "created_at DATE,"
                  "headline TEXT,"
                  "content TEXT)", nullptr);
    execSqlQuerry("CREATE TABLE comments_on_site("//  SQL to create new table (comments_on_site)
                  "id INT PRIMARY KEY NOT NULL,"
                  "url TEXT NOT NULL,"
                  "comment_id INT)", nullptr);
    execSqlQuerry("CREATE TABLE sites("         //  SQL to create new table (sites)
                  "id INT PRIMARY KEY NOT NULL,"
                  "url TEXT)", nullptr);
    execSqlQuerry("CREATE TABLE users("         //  SQL to create new table (users)
                  "id INT PRIMARY KEY NOT NULL,"
                  "name TEXT NOT NULL,"
                  "password TEXT NOT NULL)", nullptr);
    execSqlQuerry("INSERT INTO users (id, name, password) VALUES (0, \'Nick73\', \'pass0\');", nullptr);
    cout<<"init finisched"<<endl;
}

QByteArray Server::getDatabaseContent(QString url)
{
    cout<<"URL: "<<url<<endl;
    QByteArray result = "{\"Comments\":[";
    zErrMsg = nullptr;
    
    QList<int> commentIds = getCommentIds(url);
    QStringList users = getUsers();
    int x = 0;
    execSqlQuerry("SELECT * FROM comments", nullptr);
    cout<<dataBaseQuerryResult.length()<<":"<<endl;
    qDebug()<<commentIds;
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        if(commentIds.contains(i)){ //add comments[i].comment & votes to result, get commentator name & add to result
            QList<QPair<QString, QString>> querryElement = dataBaseQuerryResult[i];
            QString content, commentator, headline;
            int votes = 0, user_id = 0;
            for(int k = 0; k < querryElement.length(); k++){
                if(querryElement[k].first.contains("content"))              //  get comment text from querry result
                    content = querryElement[k].second;
                else if(querryElement[k].first.contains("headline"))        //  get headline of comment from querry result
                    headline = querryElement[k].second;
                else if(querryElement[k].first.contains("rating"))          //  get rating 
                    votes = querryElement[k].second.toInt();
                else if (querryElement[k].first.contains("user_id")){
                    user_id = querryElement[k].second.toInt();
                    commentator = users[user_id];
                }
            }
            result.append("{\"id\":" + QString::number(i) + 
                          ",\"headline\":\"" + headline + 
                          "\",\"content\":\"" + content + 
                          "\",\"votes\":" + QString::number(votes) + 
                          ",\"userId\":" + QString::number(user_id) +
                          ",\"userName\":\"" + commentator + 
                          "\"},");
            x++;
        }
    }
    //{"Comments":[{"id":0,"headline":"Ich bins","content":"","votes":0,"userID":0,"userName":"Nick73"},
    //             {"id":1,"headline":"123","content":"","votes":0,"userID":0,"userName":"Nick73"},]}
    if(x == 0)
        return "{\"Comments\":[{\"id\":-1,\"headline\":\"Keine Kommentare\",\"content\":\""
                "F&uumlr diese Webseite wurden bis jetzt noch keine Kommentare erstellt. "
                "Du kannst gern damit anfangen.\",\"votes\":0,\"userID\":-1,\"userName\":\"CommentSense\"}]}";
    dataBaseQuerryResult.clear();
    if(x > 0)
        if(result[result.length()-1] == ',')
            result.remove(result.length()-1, 1);
    result.append("]}");
    cout<<"Result:"<<result<<endl;
    //if(isJsonValid(result)){
    //    return "json not valid";
    //}
    //cout<<"json is valid"<<endl;
    return result;
}

qint64 Server::putDatabaseContent(QByteArray data)
{
    int rating = 0;
    QString date, content, password, url, headline;
    QString userName;
    QDate currentDate = QDate::currentDate();
    date = QString(QString::number(currentDate.day()) + "."
                 + QString::number(currentDate.month()) + "."
                 + QString::number(currentDate.year()));
    QJsonDocument json = QJsonDocument::fromJson(data);
    QJsonObject object = json.object();
    QJsonValue value = object.value(QString("userName"));
    userName = value.toString();
    value = object.value(QString("password"));
    password = value.toString();
    value = object.value(QString("headline"));
    headline = value.toString();
    value = object.value(QString("comment"));
    content = value.toString();
    value = object.value(QString("url"));
    url = value.toString();

    cout<<data<<"\n"<<userName<<password<<headline<<content<<endl;
    
    if(!isUserValid(userName, password)){
        cout<<"Wrong username or password"<<endl;
        return -1;
    }

    int id = getCommentId();    
    int siteID = getSiteId(url);
    int cosId = getCosId();
    int userId = getUserId(userName);
    cout<<"Writing..."<<endl;
    execSqlQuerry("INSERT INTO comments (id, user_id, rating, created_at, content, headline) VALUES (" +
                  QString::number(id) + "," + QString::number(userId) + "," + QString::number(rating) + ",\'" +
                  date + "\',\'" + content + "\',\'" + headline + "\');", nullptr);
    execSqlQuerry("INSERT INTO comments_on_site (id, comment_id, url) VALUES (" +
                  QString::number(cosId) + "," + QString::number(id) + ",\'" + url + "\');", nullptr);
    dataBaseQuerryResult.clear();
    Q_UNUSED(siteID);
    return 0;
}

int Server::execSqlQuerry(QString querry, const char *data)
{
    void *info = reinterpret_cast<void*>(const_cast<char*>(data));              //  conversation from const char * to void *    (c99: (void*)data)  still just for reading
    rc = sqlite3_exec(db, querry.toLatin1().data(), callback, info, &zErrMsg);  //  execute the querry, callback function to receive results
    if(rc != SQLITE_OK){                                                        //  if not (no errors)
        cout<<"SQL error: "<<zErrMsg<<endl;                                       //  show errors
        sqlite3_free(zErrMsg);                                                  //  make space for new errors
    }
    else{
        cout<<"Operation done succesfully"<<endl;
    }
    return 0;
}

int Server::getUserId(QString userName)
{
    int userID = 0;
    execSqlQuerry("SELECT id FROM users WHERE name LIKE\'" + userName + "\'", nullptr);
    if(dataBaseQuerryResult.length() > 0)
        userID = dataBaseQuerryResult.first().first().second.toInt();
    dataBaseQuerryResult.clear();
    return userID;
}

bool Server::isJsonValid(QByteArray json)
{
    QJsonDocument doc = QJsonDocument::fromJson(json);
    return !doc.isNull();
}

int Server::getCosId()
{
    int cosId = 0;
    execSqlQuerry("SELECT MAX(id) FROM comments_on_site", nullptr);
    if(dataBaseQuerryResult.length() > 0)
        cosId = dataBaseQuerryResult.first().first().second.toInt() + 1;    //new id in comments_on_site
    dataBaseQuerryResult.clear();
    return cosId;
}

int Server::getCommentId()
{
    int id = 0;
    execSqlQuerry("SELECT MAX(id) FROM comments", nullptr);
    if(dataBaseQuerryResult.length() > 0)
        id = dataBaseQuerryResult.first().first().second.toInt() + 1;
    dataBaseQuerryResult.clear();
    return id;
}

int Server::getSiteId(QString url)
{
    int siteID = 0;
    execSqlQuerry("SELECT id FROM sites WHERE url LIKE \'" + url + "\'", nullptr);
    if(dataBaseQuerryResult.length() < 1){  //new site
        dataBaseQuerryResult.clear();
        execSqlQuerry("SELECT MAX(id) FROM sites", nullptr);
        siteID = dataBaseQuerryResult.first().first().second.toInt() + 1;
        execSqlQuerry("INSERT INTO sites (id, url) VALUES (" + QString::number(siteID) + ",\'" + url + "\');", nullptr);
    }
    dataBaseQuerryResult.clear();
    return siteID;
}

bool Server::isUserValid(QString userName, QString password)
{
    bool valid = false;
    execSqlQuerry("SELECT password FROM users WHERE name LIKE \'" + userName + "\'", nullptr);
    cout<<"checking user..."<<endl;
    if(dataBaseQuerryResult.length() < 1){
        cout<<"no User named :\""<<userName<<"\""<<endl;
    }
    else{
        for(int i = 0; i  < dataBaseQuerryResult.length(); i++){
            cout<<password<<":"<<dataBaseQuerryResult[i].first().second<<endl;
            if(dataBaseQuerryResult[i].first().second.contains(password)){
                valid = true;
                break;
            }
        }
    }    
    cout<<"finished checking user "<<valid<<endl;
    dataBaseQuerryResult.clear();
    return valid;
}

QString Server::getUrlFromData(QString data)
{
    QJsonDocument json = QJsonDocument::fromJson(data.split("\r\n\r\n").last().toLatin1());
    QJsonObject object = json.object();
    QJsonValue value = object.value(QString("url"));
    QString url = value.toString();
    url.replace("\r", "");
    url.replace("\n", "");
    return url;
}

QStringList Server::getUsers()
{
    QStringList users;
    execSqlQuerry("SELECT * FROM users", nullptr);
    cout<<dataBaseQuerryResult.length()<<endl;
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        for(int k = 0; k < dataBaseQuerryResult[i].length(); k++){
            if(dataBaseQuerryResult[i][k].first.contains("name"))
                users.append(dataBaseQuerryResult[i][k].second);
        }
    }
    dataBaseQuerryResult.clear();  
    return users;
}

QList<int> Server::getCommentIds(QString url)
{
    QList<int> commentIds;
    execSqlQuerry("SELECT comment_id, url FROM comments_on_site WHERE url LIKE \'" + url +"\'", nullptr);
    cout<<dataBaseQuerryResult.length()<<endl;
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        if(dataBaseQuerryResult[i].last().second == url)
            commentIds.append(dataBaseQuerryResult[i].first().second.toInt());
    }
    dataBaseQuerryResult.clear();    
    return  commentIds;
}

void Server::sendData(Socket *socket, QByteArray data)
{
    socket->write(QString("HTTP/1.1 200 OK\nContent-Length: "+ QString::number(data.length()) +"\nContent-Type: text\nConnection: Closed\n\n").toLatin1());
    socket->write(data);
    socket->flush();
}
