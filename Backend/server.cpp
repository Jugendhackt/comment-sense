#include "server.h"
#include <QtDebug>
#include <QFile>

Server::Server(QObject *parent) :
    QObject(parent)
{
    server = new QTcpServer(this);
    connect(server, &QTcpServer::newConnection, this, &Server::newConnection);
    server->listen(QHostAddress::Any, 1234);
 /*   qDebug()<<QSqlDatabase::drivers();
    database = QSqlDatabase::addDatabase("QSQLITE");
    database.setHostName("localhost");
    database.setPort(1433);
    database.setDatabaseName("test");
    database.setUserName("commondbusr");
    char *str = (char*)malloc(sizeof (char)*100);
    //fgets(str, 100, stdin);
    database.setPassword("str");
    qDebug()<<"password set";
    if(database.open())
        qDebug()<<"database connection succsessful";*/
    char *zErrMsg = 0;
    rc = sqlite3_open("database.db", &db);
    if(rc){
        qDebug()<<"Cant't open database "<<sqlite3_errmsg(db);
        return;
    }
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
    socket->flush();                            //wants commentator names, comments, votes
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

QByteArray Server::getDatabaseContent(QString commentHash)
{
    QString querry = "SELECT comment_id FROM comment_on_site WHERE site_hash = " + commentHash;
    QByteArray result;
/*    QSqlQuery *sqlQuery = new QSqlQuery(querry, database);
    sqlQuery->exec();
    qDebug()<<querry;
    while(sqlQuery->next()){
        QVariant value = sqlQuery->value(0);
        qDebug()<<value.toString();
        result.append(value.toByteArray());
    }*/
    return result;
}

qint64 Server::putDatabaseContent(QByteArray data, QString commentHash)
{
    QString querry = "";
    //QSqlQuery *sqlQuery = new QSqlQuery(querry, database);
    //return sqlQuery->exec();
}
