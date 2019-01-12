#include "server.h"
#include "accounts.hpp"
#include "comments.hpp"
#include "database.hpp"
#include "httpserver.hpp"

//#define lineStr {QString(": " + QString::number(__LINE__))};

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
    bin_d = QDir::current();
    dir_d = bin_d;
    dir_d.cd("../");
    dir_d.mkdir("data");
    data_d = dir_d;
    data_d.cd("data");
    qDebug()<<dir_d.path();
    qDebug()<<bin_d.path();
    qDebug()<<data_d.path();
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
