#include "server.h"
#include <QtDebug>
#include <QFile>
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonValue>

QList<QList<QPair<QString, QString>>> dataBaseQuerryResult;

static int callback(void *data, int argc, char **argv, char **azColName){
    qDebug()<<(char*)data;
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
    server->listen(QHostAddress::Any, 1234);
    rc = sqlite3_open("mainDataBase.db", &db);
    if(rc){
        qDebug()<<"Cant't open database "<<sqlite3_errmsg(db);
        return;
    }
    zErrMsg = 0;
    //qDebug()<<getDatabaseContent("hash1");
    putDatabaseContent("{\"userId\":1,\"password\":\"password2\",\"headline\":\"Header\",\"comment\":\"this is the comment\"}", "hash1");
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
    QStringList get = data.split('\n').first().split(' ');
    QStringList url = get[1].split('/');
    if(url.length() >= 2){
        if(url[url.length()-2] == "comments"){
            commentHash = url.last();
            requestedData = getDatabaseContent(commentHash);
        }
        else{
            requestedData = "that's not a comment";
        }
    }

    qDebug()<<requestedData;
    socket->write(requestedData.toLatin1());
    socket->flush();
}

void Server::httpPut(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpPut request: \""<<data<<" \".";
    QString result;
    QString commentHash, jsonData;
    QStringList put = data.split('\n').first().split(' ');
    QStringList url = put[1].split('/');
    jsonData = data.split('\n')[1];
    if(url.length() >= 2){
        if(url[url.length()-2] == "comments"){
            commentHash = url.last();
            result = QString::number(putDatabaseContent(jsonData.toLatin1(), commentHash));
        }
        else{
            result = "that's not a comment";
        }
    }
    qDebug()<<result;
    socket->write(result.toLatin1());
    socket->flush();
}

void Server::httpPost(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpPost request: \""<<data<<" \".";
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
                  "content TEXT)", 0);
    execSqlQuerry("CREATE TABLE comments_on_site("
                  "id INT PRIMARY KEY NOT NULL,"
                  "comment_id INT,"
                  "site_hash TEXT NOT NULL)", 0);
    execSqlQuerry("CREATE TABLE sites("
                  "id INT PRIMARY KEY NOT NULL,"
                  " url TEXT, "
                  "hash TEXT NOT NULL)", 0);
    execSqlQuerry("CREATE TABLE users("
                  "id INT PRIMARY KEY NOT NULL,"
                  "name TEXT NOT NULL,"
                  "password TEXT NOT NULL)", 0);
}

QByteArray Server::getDatabaseContent(QString commentHash) //wants commentator names, comments, votes
{
    qDebug()<<commentHash;
    commentHash.replace("\r", "");
    commentHash.replace("\n", "");
    QByteArray result = "{Comments:[";
    zErrMsg = 0;
    char *data = "Callback function called";
    QList<int> commentIds;
    execSqlQuerry("SELECT comment_id, site_hash FROM comments_on_site WHERE site_hash LIKE \'" + commentHash +"\'", data);
    qDebug()<<dataBaseQuerryResult.length();
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        if(dataBaseQuerryResult[i].last().second == commentHash)
            commentIds.append(dataBaseQuerryResult[i].first().second.toInt());
    }
    dataBaseQuerryResult.clear();

    QStringList users;
    execSqlQuerry("SELECT * FROM users", data);
    qDebug()<<dataBaseQuerryResult.length();
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        for(int k = 0; k < dataBaseQuerryResult[i].length(); k++){
            if(dataBaseQuerryResult[i][k].first.contains("name"))
                users.append(dataBaseQuerryResult[i][k].second);
        }
    }
    dataBaseQuerryResult.clear();

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

qint64 Server::putDatabaseContent(QByteArray data, QString commentHash)
{   //data = userId + password + headline + comment
    //jason(data) -> vars
    int id, userId, rating, siteID;
    QString date, content, password, url, headline;

    QJsonDocument json = QJsonDocument::fromJson(data);
    QJsonObject object = json.object();
    QJsonValue value = object.value(QString("userId"));
    userId = value.toInt();
    value = object.value(QString("password"));
    password = value.toString();
    value = object.value(QString("headline"));
    headline = value.toString();
    value = object.value(QString("comment"));
    content = value.toString();

    qDebug()<<data<<endl<<userId<<password<<headline<<content;

    commentHash.replace("\r", "");
    commentHash.replace("\n", "");
    execSqlQuerry("SELECT password FROM users WHERE id LIKE \'" + QString::number(userId) + "\'", 0);
    if(dataBaseQuerryResult.length() < 1)
        return -1;
    else{
        bool correctPassword = false;
        for(int i = 0; i  < dataBaseQuerryResult.length(); i++){
            if(dataBaseQuerryResult[i].first().second == password){
                correctPassword = true;
                break;
            }
        }
        if(!correctPassword)
            return -1;
    }
    dataBaseQuerryResult.clear();

    execSqlQuerry("SELECT MAX(comment_id) FROM comments", 0);
    id = dataBaseQuerryResult.first().first().second.toInt() + 1;
    dataBaseQuerryResult.clear();

    execSqlQuerry("SELECT id FROM sites WHERE hash LIKE \'" + commentHash + "\'", 0);
    bool newsite = false;
    if(dataBaseQuerryResult.length() < 1)
        newsite = true;
    else
        siteID = dataBaseQuerryResult.first().first().second.toInt() + 1;
    dataBaseQuerryResult.clear();
    if(newsite){
        execSqlQuerry("SELECT MAX(id) FROM sites", 0);
        siteID = dataBaseQuerryResult.first().first().second.toInt() + 1;
        execSqlQuerry("INSERT INTO sites (id, url, hash) VALUES (" + QString::number(siteID) + ",\'" + url + "\'," + commentHash + ");", 0);
    }
    dataBaseQuerryResult.clear();

    execSqlQuerry("INSERT INTO comments (id, user_id, rating, created_at, content, Headline) VALUES (" +
                  QString::number(id) + "," + QString::number(userId) + "," + QString::number(rating) + ",\'" +
                  date + "\',\'" + content + "\',\'" + headline + "\');", 0);
    execSqlQuerry("INSERT INTO comments_on_site (id, comment_id, site_hash) VALUES (" +
                  QString::number(siteID) + "," + QString::number(id) + ",\'" + commentHash +"\');", 0);
    dataBaseQuerryResult.clear();
}

int Server::execSqlQuerry(QString querry, char *data)
{
    rc = sqlite3_exec(db, querry.toLatin1().data(), callback, (void*)data, &zErrMsg);
    if(rc != SQLITE_OK){
        qDebug()<<"SQL error: "<<zErrMsg;
        sqlite3_free(zErrMsg);
    }
    else{
        qDebug()<<"Operation done succesfully";
    }
}
