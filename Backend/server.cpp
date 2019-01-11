#include "server.h"
#include <QtDebug>
#include <QFile>
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonValue>
#include <QTime>
#include <QDate>
#include <QDir>

//#define lineStr {QString(": " + QString::number(__LINE__))};

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
    server = new QTcpServer(this);
    connect(server, &QTcpServer::newConnection, this, &Server::newConnection);
    quint16 port;
#ifdef SSL
    port = 443;
#else
    port = 80;
#endif
    bin = QDir::current();
    qDebug()<<bin.path();
    dir = bin;
    dir.cd("../");
    qDebug()<<dir.path();
    dir.mkdir("data");
    data = dir;
    data.cd("data");
    qDebug()<<data.path();
    dataPath = data.path();
    FILE *f = fopen(dbPath, "r");
    bool init = false;
    if(f == nullptr){
        f = fopen(dbPath, "w");
        init = true;
    }
    rc = sqlite3_open(dbPath, &db);
    if(rc){
        qDebug()<<"Cant't open database "<<sqlite3_errmsg(db);
        return;
    }
    if(init)
        initDatabase();
    zErrMsg = nullptr;
    
    server->listen(QHostAddress::Any, port);
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
        cout<<"Couldn't set socket descriptor";
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
    qDebug()<<"connected to :"<<socket->peerAddress().toString() + ":" + QString::number(socket->peerPort());
}

void Server::readyRead()
{
    Socket *socket = qobject_cast<Socket*>(sender());
    QString data = socket->readAll();
    data.remove("\r");
    QStringList lines = data.split("\n");
    QString url = lines.first().split(" ")[1];
    qDebug()<<"----------------------------\n\n";
    QString httpAction = data.split(' ').first();
    QByteArray response;
    QByteArray type = getType("json");
    if(httpAction == "POST"){
        response = httpPost(data, url, &type);
    }       // Upload comment or create new account
    else if(httpAction == "GET"){
        response = httpGet(data, url, &type);
    }       // Get all comments on site or get file
    else if(httpAction == "PUT"){
        response = httpPut(data, url, &type);
    }       // Upload file (e.g: image to embed in comment)
    else if(httpAction == "PATCH"){
        response = httpPatch(data, url, &type);
    }       // Edit comment or change votes of comment or manage account
    else if(httpAction == "DELETE"){
        response = httpDelete(data, url, &type);
    }       // Delete comment
    sendData(socket, response, type);
    qDebug()<<"\n"<<"finished work on request\n----------------------------\n";
}

void Server::disconnected()
{   /*  remove the socket from the list
        and delete it once it isn't needed anymore  */
    Socket *socket = qobject_cast<Socket*>(sender());
    qDebug()<<"dissconected from :"<<socket->peerAddress().toString() + ":" + QString::number(socket->peerPort());
    socketList.removeAll(socket);
    socket->deleteLater();
}

void Server::encrypted()
{
    qDebug()<<"Encrypted!";
}

void Server::socketError(QAbstractSocket::SocketError error)
{
    qDebug()<<error;
}

void Server::sslErrors(QList<QSslError> errors)
{
    for(int i = 0; i < errors.length(); i++){
        qDebug()<<errors[i].errorString();
    }
}

QByteArray Server::httpGet(QString data, QString url, QByteArray *type)
{
    qDebug()<<"httpGet request:\n"<<data<<".\n";      //  print info
    qDebug()<<"URL: "<<url<<endl;
    QStringList lines = data.split("\n");
    if(url.contains("/comments/"))   //  check whether comments or a file is requested
        return getDatabaseContent(url);        
    else{
        return getFile(url, type);
        //sendData(socket, getFile(url, &type), type);
        //return "";
    }
    return "{\"error\":\"unknown get action\"}";
}

QByteArray Server::httpPut(QString data, QString url, QByteArray *type)
{
    Q_UNUSED(type)
    qDebug()<<"httpPut request:\n"<<data<<".\n";      //  print info
    qDebug()<<"URL: "<<url<<endl;
    return "{\"error\":\"unknown put action\"}";
}

QByteArray Server::httpPost(QString data, QString url, QByteArray *type)
{
    Q_UNUSED(type)
    qDebug()<<"httpPost request:\n"<<data<<".\n";     //  print info
    qDebug()<<"URL: "<<url<<endl;
    QStringList lines = data.split("\n");
    QString response;
    if(url.contains("/users/")){
        QString action = url.split("/users/").last().split(" ").first();
        if(action.contains("create")){
            return createUser(data.split("\n\n").last().toLatin1());
        }
        else{
            qDebug()<<"unknown usermanagement request";
            return "{\"error\":\"unknown usermanagement request\"}";
        }
    }
    else if(lines.first().contains("/comments/")){
        QByteArray json = data.split("\n\n").last().toLatin1();                               //  stores complete json data
        return putDatabaseContent(json);
    }
    return "{\"error\":\"unknown post action\"}";
}

QByteArray Server::httpPatch(QString data, QString url, QByteArray *type)
{    
    Q_UNUSED(type) 
    qDebug()<<"httpPatch request:\n"<<data<<".\n";     //  print info 
    qDebug()<<"URL: "<<url<<endl;
    if(url.contains("/users/manage")){
        return manageUser(data.split("\n\n").last().toLatin1());
    }
    else{
        data.replace("\r", "");
        QByteArray json = data.split("\n\n").last().toLatin1();
        return voteComment(json);
    }
    return "{\"error\":\"unknown patch action\"}";
}

QByteArray Server::httpDelete(QString data, QString url, QByteArray *type)
{
    Q_UNUSED(type);
    qDebug()<<"httpDelete request:\n"<<data<<".\n";   //  print info
    qDebug()<<"URL: "<<url<<endl;
    return "{\"error\":\"unknown delete action\"}";
}

QByteArray Server::getType(QByteArray ending){
    ending = ending.toLower();
    if(ending == "txt")
        return "text/plain";
    else if(ending == "html")
        return "text/html";
    else if(ending == "css")
        return "text/css";
    else if(ending == "csv")
        return "text/csv";
    else if(ending == "js")
        return "text/javascript";
    else if(ending == "xml")
        return "text/xml";
    
    else if(ending == "json")
        return "application/json";
    else if(ending == "pdf")
        return "application/pdf";
    else if(ending == "zip")
        return "application/zip";
    
    else if(ending == "png")
        return "image/png";
    else if(ending == "jpg")
        return "image/jpm";
    else if(ending == "ico")
        return "image/ico";
    else if(ending == "svg")
        return "image/svg+xml";
    return "text/plain";
}

QByteArray Server::getFile(QString url, QByteArray *type)
{
    QByteArray data;
    if(url == "/")
        url = "/index.html";
    QString ending = url.split(".").last();
    *type = getType(ending.toLatin1());
    QFile f(dataPath+url);
    f.open(QIODevice::ReadOnly);
    data = f.readAll();
    f.close();
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
                  "name TEXT UNIQUE NOT NULL,"
                  "password TEXT NOT NULL)", nullptr);
    execSqlQuerry("INSERT INTO users (id, name, password) VALUES (0, \'Nick73\', \'pass0\');", nullptr);
    qDebug()<<"init finisched";
}

QByteArray Server::getDatabaseContent(QString url)
{
    QByteArray result = "{\"Comments\":[";
    zErrMsg = nullptr;
    
    QList<int> commentIds = getCommentIds(url);
    QStringList users = getUsers();
    int x = 0;
    execSqlQuerry("SELECT * FROM comments", nullptr);
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
                else if(querryElement[k].first.contains("votes")){         //  get rating 
                    qDebug()<<"votes: "<<querryElement[k].second;
                    if(querryElement[k].second.isEmpty() || querryElement[k].second == "NULL")
                        votes = 0;
                    else
                        votes = querryElement[k].second.split(",").length();
                }
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
    qDebug()<<"Result:"<<result;
    if(!isJsonValid(result)){
        return "{\"error\":\"json not valid\"}";
    }
    qDebug()<<"json is valid";
    return result;
}

QByteArray Server::putDatabaseContent(QByteArray data)
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

    qDebug()<<data<<"\n"<<userName<<password<<headline<<content;
    
    QByteArray validUser = isUserValid(userName, password);
    if(!validUser.contains("valid")){
        return validUser;
    }

    int id = getCommentId();    
    int siteID = getSiteId(url);
    int cosId = getCosId();
    int userId = getUserId(userName);
    qDebug()<<"Writing...";
    execSqlQuerry("INSERT INTO comments (id, user_id, rating, created_at, content, headline) VALUES (" +
                  QString::number(id) + "," + QString::number(userId) + "," + QString::number(rating) + ",\'" +
                  date + "\',\'" + content + "\',\'" + headline + "\');", nullptr);
    execSqlQuerry("INSERT INTO comments_on_site (id, comment_id, url) VALUES (" +
                  QString::number(cosId) + "," + QString::number(id) + ",\'" + url + "\');", nullptr);
    dataBaseQuerryResult.clear();
    Q_UNUSED(siteID);
    return "{\"status\":\"everything worked\"}";
}

int Server::execSqlQuerry(QString querry, const char *data)
{
    void *info = reinterpret_cast<void*>(const_cast<char*>(data));              //  conversation from const char * to void *    (c99: (void*)data)  still just for reading
    rc = sqlite3_exec(db, querry.toLatin1().data(), callback, info, &zErrMsg);  //  execute the querry, callback function to receive results
    if(rc != SQLITE_OK){                                                        //  if not (no errors)
        qDebug()<<"SQL error: "<<zErrMsg;                                       //  show errors
        sqlite3_free(zErrMsg);                                                  //  make space for new errors
        return -1;
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
    if(dataBaseQuerryResult.length() > 0){
        QString id = dataBaseQuerryResult.first().first().second;
        if(id.isEmpty() || id == "NULL")
            cosId = 0;
        else
            cosId = id.toInt() + 1;
    }
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
        QString id = dataBaseQuerryResult.first().first().second;
        if(id.isEmpty() || id == "NULL")
            siteID = 0;
        else
            siteID = id.toInt() + 1;
        execSqlQuerry("INSERT INTO sites (id, url) VALUES (" + QString::number(siteID) + ",\'" + url + "\');", nullptr);
    }
    dataBaseQuerryResult.clear();
    return siteID;
}

QByteArray Server::isUserValid(QString userName, QString password)
{
    qDebug()<<"checking user..."<<userName<<password;
    execSqlQuerry("SELECT password FROM users WHERE name LIKE \'" + userName + "\'", nullptr);
    
    if(dataBaseQuerryResult.length() < 1){
        dataBaseQuerryResult.clear();
        return "{\"error\":\"no User has this nickname\"}";
    }/*
    else if(dataBaseQuerryResult.length() > 1){
        qDebug()<<dataBaseQuerryResult.length();
        dataBaseQuerryResult.clear();
        return "{\"error\":\"somehow there are multiple users with this nickname\"}";
    }*/
    else {
        bool valid = false;
        for(int i = 0; i < dataBaseQuerryResult.length(); i++){
            if(dataBaseQuerryResult[i].first().second.compare(password, Qt::CaseSensitive) == 0){
                valid = true;
                break;
            }
        }
        if(valid){
            dataBaseQuerryResult.clear();
            qDebug()<<"user is valid";
            return "valid";
        }
        else{
            dataBaseQuerryResult.clear();
            return "{\"error\":\"wrong password\"}";
        }
    }
    dataBaseQuerryResult.clear();
    return "{\"error\":\"unknown error(isUserValid unexpected end)\"}";
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
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        for(int k = 0; k < dataBaseQuerryResult[i].length(); k++){
            if(dataBaseQuerryResult[i][k].first.contains("name"))
                users.append(dataBaseQuerryResult[i][k].second);
        }
    }
    dataBaseQuerryResult.clear();  
    return users;
}

QByteArray Server::createUser(QByteArray json)
{
    QJsonDocument doc = QJsonDocument::fromJson(json);
    QJsonObject object = doc.object();
    QString password = object.value("password").toString();
    QString username = object.value("username").toString();
    qDebug()<<"new User is beeing registered: username: "<<username<<" password: "<<password<<"";
    QString id;
    QStringList users = getUsers();
    if(!users.isEmpty())
        if(users.contains(username))
            return "{\"error\":\"user already exists\"}";
    execSqlQuerry("SELECT max(id) FROM users", nullptr);
    if(dataBaseQuerryResult.length() != 1)
        return "{\"error\":\"unknown error (creating User)\"}";
    id = QString::number(dataBaseQuerryResult.last().last().second.toInt()+1);
    execSqlQuerry("INSERT INTO users (id, name, password) VALUES (" + id + ", \'" + username + "\',\'" + password + "\');", nullptr);
    dataBaseQuerryResult.clear();
    return "{\"status\":\"everything worked\"}";
}

QByteArray Server::manageUser(QByteArray json)
{
    Q_UNUSED(json);
    return "{\"error\":\"unknown error\"}";
}

QList<int> Server::getCommentIds(QString url)
{
    QList<int> commentIds;
    execSqlQuerry("SELECT comment_id, url FROM comments_on_site WHERE url LIKE \'" + url +"\'", nullptr);
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        if(dataBaseQuerryResult[i].last().second == url)
            commentIds.append(dataBaseQuerryResult[i].first().second.toInt());
    }
    dataBaseQuerryResult.clear();    
    return  commentIds;
}

QByteArray Server::voteComment(QByteArray json)
{
    qDebug()<<"httpPatch request: \""<<data<<" \".";    //  print info
    qDebug()<<"\'"<<json<<"\'";
    QJsonDocument doc = QJsonDocument::fromJson(json);
    QJsonObject object = doc.object();
    QString id = QString::number(object.value(QString("id")).toInt());
    QString password = object.value(QString("password")).toString();
    QString vote = object.value(QString("vote")).toString();
    QString userName = object.value(QString("user")).toString();
    qDebug()<<userName;
    QByteArray validUser = isUserValid(userName, password);
    if(!validUser.contains("valid")){
        return validUser;
    }
    QString userId = QString::number(getUserId(userName));
    
    execSqlQuerry("SELECT votes FROM comments WHERE id LIKE " + id + ";", nullptr);
    if(dataBaseQuerryResult.length() < 1){
        dataBaseQuerryResult.clear();
        return "{\"error\":\"this comment is not in the database\"}";
    }
    
    QString votes = dataBaseQuerryResult[0][0].second;
    if(votes == "NULL" || votes.isEmpty())
        votes = userId;
    else if(!votes.split(",").contains(userId))
        votes.append(","+userId);
    else{
        return "{\"error\":\"this user has already voted\"}";
    }
    execSqlQuerry("UPDATE comments SET votes = \'" + votes + "\' WHERE id LIKE " + id + ";", nullptr);
    dataBaseQuerryResult.clear();
    return "{\"status\":\"everything worked\"}";
}

void Server::sendData(Socket *socket, QByteArray data, QByteArray type)
{
    qDebug()<<endl<<"Sending data ("<<data.length()<<" bytes) of type :"<<type;
    if(data.length() < 1000)
        qDebug()<<data;
    socket->write(QString("HTTP/1.1 200 OK\nContent-Length: "+ QString::number(data.length()) +"\nContent-Type: "+type+"\nConnection: Closed\n\n").toLatin1());
    socket->write(data);
    socket->waitForBytesWritten();
    socket->flush();
}
