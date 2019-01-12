#ifndef HTTPSERVER_HPP
#define HTTPSERVER_HPP

#include "server.h"

QByteArray Server::httpGet(QString data, QString url, QByteArray *type)
{
    qDebug()<<"httpGet request:\n"<<data<<".\n";      //  print info
    qDebug()<<"URL: "<<url<<endl;
    QStringList lines = data.split("\n");
    if(url.contains("/comments/"))   //  check whether comments or a file is requested
        return getComments(url.split("/comments/").last());        
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
        return postComment(json);
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
    else if(url.contains("/comments/vote")){
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
    QFile f(data_d.path()+url);
    f.open(QIODevice::ReadOnly);
    data = f.readAll();
    f.close();
    return data;
}

void Server::sendData(Socket *socket, QByteArray data, QByteArray type)
{
    qDebug()<<endl<<"Sending data ("<<data.length()<<" bytes) of type :"<<type;
    if(data.length() < 250)
        qDebug()<<data;
    socket->write(QString("HTTP/1.1 200 OK\nContent-Length: "+ QString::number(data.length()) +"\nContent-Type: "+type+"\nConnection: Closed\n\n").toLatin1());
    socket->write(data);
    socket->waitForBytesWritten();
    socket->flush();
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

bool Server::isJsonValid(QByteArray json)
{
    QJsonDocument doc = QJsonDocument::fromJson(json);
    return !doc.isNull();
}

#endif // HTTPSERVER_HPP
