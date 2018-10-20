#include "server.h"
#include <QtDebug>
#include <QFile>

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

    socket->write(requestedData.toLatin1());
    socket->flush();
}

void Server::httpPut(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpPut request: \""<<data<<" \".";
    QString result;
    QString commentHash, dataToWrite;
    QStringList put = data.split('\n').first().split(' ');
    QStringList url = put[1].split('/');
    dataToWrite = data.split('\n')[1];
    if(url.length() >= 2){
        if(url[url.length()-2] == "comments"){
            commentHash = url.last();
            result = QString::number(putDatabaseContent(dataToWrite.toLatin1(), commentHash));
        }
        else{
            result = "that's not a comment";
        }
    }

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
    QString querry = "SELECT comment_id FROM comments_on_site WHERE site_hash = " + commentHash;
    QByteArray result;
    zErrMsg = 0;
    char *data = "Callback function called";
    execSqlQuerry(querry, data);
    QList<int> commentIds;
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        commentIds.append(dataBaseQuerryResult[i].first().second.toInt());
    }
    dataBaseQuerryResult.clear();
    execSqlQuerry("SELECT * FROM comments", data);
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        if(commentIds.contains(i)){ //add comments[i].comment & votes to result, get commentator name & add to result
            ;
        }
    }
    return result;
}

qint64 Server::putDatabaseContent(QByteArray data, QString commentHash)
{
    QString querry = "";
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
