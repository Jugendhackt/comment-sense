#include "widget.h"
#include "ui_widget.h"
#include <QtDebug>
#include <QFile>

Widget::Widget(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::Widget)
{
    ui->setupUi(this);
    server = new QTcpServer(this);
    connect(server, &QTcpServer::newConnection, this, &Widget::newConnection);
    server->listen(QHostAddress::Any, 1234);
    database = new QSqlDatabase();
    database->setHostName("localhost");
    database->setPort(1433);
}

Widget::~Widget()
{
    delete ui;
}

void Widget::newConnection()
{
    QTcpSocket *socket = server->nextPendingConnection();
    socketList.append(socket);
    connect(socket, &QTcpSocket::readyRead, this, &Widget::readyRead);
}

void Widget::readyRead()
{
    QTcpSocket *socket = qobject_cast<QTcpSocket*>(sender());
    QString data = socket->readAll();
    ui->textEdit->append(data);
    QString httpAction = data.split(' ').first();
    qDebug()<<httpAction;
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

void Widget::httpGet(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpGet";
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
    socket->flush();
}

void Widget::httpPut(QString data, QTcpSocket *socket)
{
    qDebug()<<"httpPut";
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

void Widget::httpPost(QString data, QTcpSocket *socket)
{

}

void Widget::httpPatch(QString data, QTcpSocket *socket)
{

}

void Widget::httpDelete(QString data, QTcpSocket *socket)
{

}

QByteArray Widget::getDatabaseContent(QString commentHash)
{
    return QString("Hash war: " + commentHash).toLatin1();
}

qint64 Widget::putDatabaseContent(QByteArray data, QString commentHash)
{

}
