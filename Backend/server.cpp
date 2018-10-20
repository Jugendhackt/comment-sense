#include "server.h"
#include <QtDebug>
#include <QFile>

Server::Server(QObject *parent) :
    QObject(parent)
{
    server = new QTcpServer(this);
    connect(server, &QTcpServer::newConnection, this, &Server::newConnection);
    server->listen(QHostAddress::Any, 1234);
    database = QSqlDatabase::addDatabase("dataBase");
    database.setHostName("localhost");
    database.setPort(1433);
    database.setDatabaseName("test");
    database.setUserName("");
    database.setPassword("");
    if(database.open())
        qDebug()<<"database connection succsessful";
}

Server::~Server()
{
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
            QString filename = ".";
            for(int i = 1; i < url.length(); i++)
                filename.append("/"+url[i]);
            qDebug()<<filename;
            QFile file(filename);
            file.open(QIODevice::ReadOnly);
            requestedData = file.readAll();
            file.close();
        }
    }

    socket->write(requestedData.toLatin1());
    socket->flush();                            //wants commentator names, comments, votes
}

void Server::httpPut(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpPut request: \""<<data<<" \".";
    qint64 result = -1;
    QString commentHash, dataToWrite;
    QStringList put = data.split('\n').first().split(' ');
    QStringList url = put[1].split('/');
    dataToWrite = data.split('\n')[1];
    if(url.length() >= 2){
        if(url[url.length()-2] == "comments"){
            commentHash = url.last();
            result = putDatabaseContent(dataToWrite.toLatin1(), commentHash);
        }
        else{
            QString filename = ".";
            for(int i = 1; i < url.length(); i++)
                filename.append("/"+url[i]);
            qDebug()<<filename;
            QFile file(filename);
            file.open(QIODevice::WriteOnly);
            result = file.write(dataToWrite.toLatin1());
            file.close();
        }
    }

    socket->write(QString::number(result).toLatin1());
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
    QString querry = "SELECT comment_id FROM commment_on_site WHERE site_id = " + commentHash;
    QByteArray result;
    QSqlQuery *sqlQuery = new QSqlQuery(querry, database);
    sqlQuery->exec();
    qDebug()<<querry;
    while(sqlQuery->next()){
        QVariant value = sqlQuery->value(0);
        result.append(value.toByteArray());
    }
    return result;
}

qint64 Server::putDatabaseContent(QByteArray data, QString commentHash)
{
    QString querry = "";
    QSqlQuery *sqlQuery = new QSqlQuery(querry, database);
    return sqlQuery->exec();
}
