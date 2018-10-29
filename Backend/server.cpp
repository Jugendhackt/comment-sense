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
    qDebug()<<reinterpret_cast<char*>(data);
    QList<QPair<QString, QString>> querryElement;
    for(int i = 0; i < argc; i++)
        querryElement.append(QPair<QString, QString>(QString(azColName[i]), QString(argv[i] ? argv[i] : "NULL")));
    dataBaseQuerryResult.append(querryElement);
    return 0;
}

Server::Server(QObject *parent) :
    QObject(parent)
{
    server = new QTcpServer(this);
    connect(server, &QTcpServer::newConnection, this, &Server::newConnection);
    server->listen(QHostAddress::Any, 12345);
    rc = sqlite3_open("mainDataBase.db3", &db);
    if(rc){
        qDebug()<<"Cant't open database "<<sqlite3_errmsg(db);
        return;
    }
    zErrMsg = nullptr;
    /*
    putDatabaseContent("{\"userName\":\"User2\","
                        "\"password\":\"password2\","
                        "\"headline\":\"Header\","
                        "\"comment\":\"this is the comment\","
                        "\"hash\":\"hash1\"}");
    qDebug()<<getHashFromData("POST /comments/ HTTP/1.1\r\n"
                              "Host: localhost:12345\r\n"
                              "Connection: keep-alive\r\n"
                              "Content-Length: 25\r\n"
                              "Origin: chrome-extension://dijfcbcnifcppjmmidaijhjkhicolgno\r\n"
                              "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 OPR/56.0.3051.52\r\n"
                              "Content-Type: text/plain;charset=UTF-8\r\n"
                              "Accept: *//*\r\nAccept-Encoding: gzip, deflate, br\r\n"
                              "Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7\r\n"
                              "\r\n"
                              "{\"hash\":\"User2\"}");
    */
    //initDatabase();
}

Server::~Server()
{
    sqlite3_close(db);
}

void Server::newConnection()
{
    QTcpSocket *socket = server->nextPendingConnection();
    socketList.append(socket);
    connect(socket, &QTcpSocket::readyRead, this, &Server::readyRead);
}

void Server::readyRead()
{
    QTcpSocket *socket = qobject_cast<QTcpSocket*>(sender());
    QString data = socket->readAll();
    qDebug()<<data;
    QString httpAction = data.split(' ').first();
    if(httpAction == "POST"){
        httpPost(data, socket);
    }            // Create file
    else if(httpAction == "GET"){
        httpGet(data, socket);
    }        // Read file
    else if(httpAction == "PUT"){
        httpPut(data, socket);
    }        // Replace file
    else if(httpAction == "PATCH"){
        httpPatch(data, socket);
    }
    else if(httpAction == "DELETE"){
        httpPatch(data, socket);
    }
}

void Server::httpGet(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpGet request: \""<<data<<" \".";
    QString requestedData, commentHash;
    QStringList lines = data.split("\r\n");
    if(!lines.first().contains("/comments/")){
        requestedData = "Thats not a comment";
        return;
    }
    else
        requestedData = getDatabaseContent(getHashFromData(data));

    qDebug()<<requestedData;
    socket->write(requestedData.toLatin1());
    socket->flush();
}

void Server::httpPut(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpPut request: \""<<data<<" \".";
}

void Server::httpPost(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpPost request: \""<<data<<" \".";
    QStringList lines = data.split("\r\n");
    if(!lines.first().contains("/comments/")){
        qDebug()<<"Thats not a comment";
        return;
    }
    QString json;
    bool b_json = false;
    for(int i = 0; i < lines.size(); i++){
        if(lines[i].isEmpty())
            b_json = true;
        if(b_json)
            json.append(lines[i]);
    }
    putDatabaseContent(json.toLatin1());
}

void Server::httpPatch(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpPost request: \""<<data<<" \".";
}

void Server::httpDelete(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpPost request: \""<<data<<" \".";
}

void Server::initDatabase()
{
    execSqlQuerry("CREATE TABLE comments("
                  "id INT PRIMARY KEY NOT NULL,"
                  "user_id INT,"
                  "rating INT,"
                  "created_at DATE,"
                  "content TEXT)", nullptr);
    execSqlQuerry("CREATE TABLE comments_on_site("
                  "id INT PRIMARY KEY NOT NULL,"
                  "comment_id INT,"
                  "site_hash TEXT NOT NULL)", nullptr);
    execSqlQuerry("CREATE TABLE sites("
                  "id INT PRIMARY KEY NOT NULL,"
                  " url TEXT, "
                  "hash TEXT NOT NULL)", nullptr);
    execSqlQuerry("CREATE TABLE users("
                  "id INT PRIMARY KEY NOT NULL,"
                  "name TEXT NOT NULL,"
                  "password TEXT NOT NULL)", nullptr);
}

QByteArray Server::getDatabaseContent(QString commentHash)
{
    qDebug()<<commentHash;
    QByteArray result = "{Comments:[";
    zErrMsg = nullptr;
    char *data = QByteArray("Callback function called").data();
    
    QList<int> commentIds = getCommentIds(commentHash);
    QStringList users = getUsers();

    execSqlQuerry("SELECT * FROM comments", data);
    qDebug()<<dataBaseQuerryResult.length();
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        if(commentIds.contains(i)){ //add comments[i].comment & votes to result, get commentator name & add to result
            result.append("{");
            QList<QPair<QString, QString>> querryElement = dataBaseQuerryResult[i];
            QString content, commentator, headline;
            int votes, user_id;
            for(int k = 0; k < querryElement.length(); k++){
                if(querryElement[k].first.contains("content"))
                    content = querryElement[k].second;
                else if(querryElement[k].first.contains("Headline"))
                    headline = querryElement[k].second;
                else if(querryElement[k].first.contains("rating"))
                    votes = querryElement[k].second.toInt();
                else if (querryElement[k].first.contains("user_id")){
                    commentator = users[querryElement[k].second.toInt()];
                    user_id = querryElement[k].second.toInt();
                }
            }
            result.append("\"headline\":\"" + headline + "\"," +
                          "\"content\":\""+content+"\",\"votes\":" +
                          QString::number(votes) + ",\"userID\":"+
                          QString::number(user_id)+",\"userName\":\""+
                          commentator + "\"},");
        }
    }
    dataBaseQuerryResult.clear();
    result.replace(result.length()-2, 2, "\0\0");
    result.append("]}");
    return result;
}

qint64 Server::putDatabaseContent(QByteArray data)
{
    int rating = 0;
    QString date, content, password, url, headline;
    QString commentHash, userName;
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
    value = object.value(QString("hash"));
    commentHash = value.toString();

    qDebug()<<data<<endl<<userName<<password<<headline<<content;

    commentHash.replace("\r", "");
    commentHash.replace("\n", "");
    
    if(!isUserValid(userName, password)){
        qDebug()<<"Wrong username or password";
        return -1;
    }

    int id = getCommentId();    
    int siteID = getSiteId(commentHash, url);
    int cosId = getCosId();
    int userId = getUserId(userName);
    qDebug()<<"Writing...";
    execSqlQuerry("INSERT INTO comments (id, user_id, rating, created_at, content, headline) VALUES (" +
                  QString::number(id) + "," + QString::number(userId) + "," + QString::number(rating) + ",\'" +
                  date + "\',\'" + content + "\',\'" + headline + "\');", nullptr);
    execSqlQuerry("INSERT INTO comments_on_site (id, comment_id, site_hash) VALUES (" +
                  QString::number(cosId) + "," + QString::number(id) + ",\'" + commentHash +"\');", nullptr);
    dataBaseQuerryResult.clear();
    return 0;
}

int Server::execSqlQuerry(QString querry, char *data)
{
    rc = sqlite3_exec(db, querry.toLatin1().data(), callback, reinterpret_cast<void*>(data), &zErrMsg);
    if(rc != SQLITE_OK){
        qDebug()<<"SQL error: "<<zErrMsg;
        sqlite3_free(zErrMsg);
    }
    else{
        qDebug()<<"Operation done succesfully";
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

int Server::getSiteId(QString hash, QString url)
{
    int siteID = 0;
    execSqlQuerry("SELECT id FROM sites WHERE hash LIKE \'" + hash + "\'", nullptr);
    if(dataBaseQuerryResult.length() < 1){  //new site
        dataBaseQuerryResult.clear();
        execSqlQuerry("SELECT MAX(id) FROM sites", nullptr);
        siteID = dataBaseQuerryResult.first().first().second.toInt() + 1;
        execSqlQuerry("INSERT INTO sites (id, url, hash) VALUES (" + QString::number(siteID) + ",\'" + url + "\'," + hash + ");", nullptr);
    }
    dataBaseQuerryResult.clear();
    return siteID;
}

bool Server::isUserValid(QString userName, QString password)
{
    bool valid = false;
    execSqlQuerry("SELECT password FROM users WHERE name LIKE \'" + userName + "\'", nullptr);
    if(dataBaseQuerryResult.length() < 1)
        qDebug()<<"no User"<<userName;
    else{
        for(int i = 0; i  < dataBaseQuerryResult.length(); i++){
            if(dataBaseQuerryResult[i].first().second.contains(password)){
                valid = true;
                break;
            }
        }
    }    
    dataBaseQuerryResult.clear();
    return valid;
}

QString Server::getHashFromData(QString data)
{
    QJsonDocument json = QJsonDocument::fromJson(data.split("\r\n\r\n").last().toLatin1());
    QJsonObject object = json.object();
    QJsonValue value = object.value(QString("hash"));
    QString hash = value.toString();
    hash.replace("\r", "");
    hash.replace("\n", "");
    return hash;
}

QStringList Server::getUsers()
{
    QStringList users;
    execSqlQuerry("SELECT * FROM users", nullptr);
    qDebug()<<dataBaseQuerryResult.length();
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        for(int k = 0; k < dataBaseQuerryResult[i].length(); k++){
            if(dataBaseQuerryResult[i][k].first.contains("name"))
                users.append(dataBaseQuerryResult[i][k].second);
        }
    }
    dataBaseQuerryResult.clear();  
    return users;
}

QList<int> Server::getCommentIds(QString hash)
{
    QList<int> commentIds;
    execSqlQuerry("SELECT comment_id, site_hash FROM comments_on_site WHERE site_hash LIKE \'" + hash +"\'", nullptr);
    qDebug()<<dataBaseQuerryResult.length();
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        if(dataBaseQuerryResult[i].last().second == hash)
            commentIds.append(dataBaseQuerryResult[i].first().second.toInt());
    }
    dataBaseQuerryResult.clear();    
    return  commentIds;
}
