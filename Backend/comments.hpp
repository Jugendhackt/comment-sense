#ifndef COMMENTS_HPP
#define COMMENTS_HPP

#include "server.h"
#include "database.hpp"

QByteArray Server::addCommentToSite(QString url, int commentId)
{
    execSqlQuerry("SELECT comments FROM sites WHERE url LIKE \'" + url + "\';", nullptr);
    if(dataBaseQuerryResult.length() < 1){
        dataBaseQuerryResult.clear();
        return "{\"error\":\"this comment is not in the database\"}";
    }
    
    QString comments = dataBaseQuerryResult[0][0].second;
    QString id = QString::number(commentId);
    if(comments == "NULL" || comments.isEmpty())
        comments = id;
    else if(!comments.split(",").contains(id))
        comments.append("," + id);
    else{
        return "{\"error\":\"this user has already voted\"}";
    }
    execSqlQuerry("UPDATE sites SET comments = \'" + comments + "\' WHERE url LIKE \'" + url + "\';", nullptr);
    dataBaseQuerryResult.clear();
    return "{\"status\":\"everything worked\"}";
}

QList<int> Server::getCommentIds(QString url)
{
    QList<int> commentIds;
    execSqlQuerry("SELECT comments FROM sites WHERE url LIKE \'" + url +"\'", nullptr);
    for(int i = 0; i < dataBaseQuerryResult.length(); i++){
        QString result = dataBaseQuerryResult[i].first().second;
        QStringList commentids;
        if(result == "NULL" || result.isEmpty())
            ;
        else 
            commentids = result.split(",");
        for(int i = 0; i < commentids.length(); i++)
            commentIds.append(commentids[i].toInt());
    }
    dataBaseQuerryResult.clear();    
    return  commentIds;
}

QByteArray Server::voteComment(QByteArray json)
{
    qDebug()<<json;
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
    
    execSqlQuerry("SELECT votes, user_id FROM comments WHERE id LIKE " + id + ";", nullptr);
    if(dataBaseQuerryResult.length() < 1){
        dataBaseQuerryResult.clear();
        return "{\"error\":\"this comment is not in the database\"}";
    }
    
    QString votes = dataBaseQuerryResult[0][0].second;
    QString user = dataBaseQuerryResult[0][1].second;
    if(user.compare(userId) == 0)
        return "{\"error\":\"you can't vote on your own comment\"}";
    else if(votes == "NULL" || votes.isEmpty())
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

QByteArray Server::getComments(QString url)
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
    if(x == 0)
        return "{\"Comments\":[{\"id\":-1,\"headline\":\"Keine Kommentare\",\"content\":\""
                "F&uumlr diese Webseite wurden bis jetzt noch keine Kommentare erstellt. "
                "Du kannst gern damit anfangen.\",\"votes\":0,\"userID\":-1,\"userName\":\"CommentSense\"}]}";
    dataBaseQuerryResult.clear();
    if(x > 0)
        if(result[result.length()-1] == ',')
            result.remove(result.length()-1, 1);
    result.append("]}");
    if(!isJsonValid(result)){
        return "{\"error\":\"json not valid\"}";
    }
    qDebug()<<"json is valid";
    return result;
}

QByteArray Server::postComment(QByteArray data)
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

    int id = getNextCommentId();
    int userId = getUserId(userName);
    qDebug()<<"Writing...";
    execSqlQuerry("INSERT INTO comments (id, user_id, rating, created_at, content, headline) VALUES (" +
                  QString::number(id) + "," + QString::number(userId) + "," + QString::number(rating) + ",\'" +
                  date + "\',\'" + content + "\',\'" + headline + "\');", nullptr);
    dataBaseQuerryResult.clear();
    return addCommentToSite(url, id);
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

int Server::getNextCommentId()
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

#endif // COMMENTS_HPP
