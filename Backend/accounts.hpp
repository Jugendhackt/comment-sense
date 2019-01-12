#ifndef ACCOUNTS_HPP
#define ACCOUNTS_HPP

#include "server.h"
#include "database.hpp"

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

QByteArray Server::createUser(QByteArray json)
{
    QJsonDocument doc = QJsonDocument::fromJson(json);
    QJsonObject object = doc.object();
    QString password = object.value("password").toString();
    QString username = object.value("username").toString();
    QString trustLevel = QString::number(0.0);
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
    execSqlQuerry("INSERT INTO users (id, name, password, trustLevel) VALUES (" + id + ", \'" + username + "\',\'" + password + "\',\'" + trustLevel + "\');", nullptr);
    dataBaseQuerryResult.clear();
    return calcTrustLevel(id.toInt());
}

QByteArray Server::manageUser(QByteArray json)
{
    Q_UNUSED(json);
    return "{\"error\":\"unknown error\"}";
}

QByteArray Server::calcTrustLevel(int userId)   //calc trustLevel, lower trust -> easier to delete comment / account
{                                               //gets calculated from amount of information given, amount of comments,
                                                //quality of posts (likes user got per comment and who liked(their trustLevel))
    return "{\"status\":\"everything worked\"}";
}

#endif // ACCOUNTS_HPP
