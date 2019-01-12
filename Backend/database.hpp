#ifndef DATABASE_HPP
#define DATABASE_HPP

#include "server.h"
#include "sqlite3.h"

static QList<QList<QPair<QString, QString>>> dataBaseQuerryResult;

static int callback(void *data, int argc, char **argv, char **azColName){
    Q_UNUSED(data);
    QList<QPair<QString, QString>> querryElement;
    for(int i = 0; i < argc; i++)
        querryElement.append(QPair<QString, QString>(QString(azColName[i]), QString(argv[i] ? argv[i] : "NULL")));
    dataBaseQuerryResult.append(querryElement);
    return 0;
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
    execSqlQuerry("CREATE TABLE sites("         //  SQL to create new table (sites)
                  "id INT PRIMARY KEY NOT NULL,"
                  "url TEXT,"
                  "comments TEXT)", nullptr);
    execSqlQuerry("CREATE TABLE users("         //  SQL to create new table (users)
                  "id INT PRIMARY KEY NOT NULL,"
                  "name TEXT UNIQUE NOT NULL,"
                  "password TEXT NOT NULL,"
                  "email TEXT,"
                  "trustLevel REAL NOT NULL)", nullptr);
    execSqlQuerry("INSERT INTO users (id, name, password) VALUES (0, \'Nick73\', \'pass0\');", nullptr);
    qDebug()<<"init finisched";
}

#endif // DATABASE_HPP
