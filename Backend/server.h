#ifndef SERVER_H
#define SERVER_H

#include <QTcpServer>
#include <QTcpSocket>
#include <QSslSocket>
#include <QSslConfiguration>
#include <QIODevice>
#include <QTextStream>
#include "sqlite3.h"
#include <QFile>
#include <QDir>

//#define SSL
#ifdef SSL
typedef QSslSocket Socket;
#else
typedef QTcpSocket Socket;
#endif

typedef int (*sqlite3_callback)(
        void *,
        int,
        char**,
        char**
);

class Server : public QObject
{
    Q_OBJECT

public:
    explicit Server(QObject *parent = nullptr);
    ~Server();
    
    enum Table{
        comments,
        comments_on_site,
        site,
        users
    };
    
public slots:
    void readyRead();
    void encrypted();
    void disconnected();
    void newConnection();
    void sslErrors(QList<QSslError> errors);
    void socketError(QAbstractSocket::SocketError error);

private:
    QTcpServer *server;
    QList<Socket*> socketList;
    
    int rc;
    sqlite3 *db;
    char *zErrMsg;
    QString dataPath;
    QDir bin, dir, data;
    const char *dbPath = "../data/mainDatabase.db3";
    
    QByteArray httpGet(QString data, QString url, QByteArray *type);
    QByteArray httpPut(QString data, QString url, QByteArray *type);
    QByteArray httpPost(QString data, QString url, QByteArray *type);
    QByteArray httpPatch(QString data, QString url, QByteArray *type);
    QByteArray httpDelete(QString data, QString url, QByteArray *type);
    
    int getCosId();
    int getCommentId();
    void initDatabase();
    QStringList getUsers();
    QByteArray createUser(QByteArray json);
    QByteArray manageUser(QByteArray json);
    QByteArray getFile(QString url, QByteArray *type);
    QByteArray getType(QByteArray ending);
    int getUserId(QString userName);
    bool isJsonValid(QByteArray json);
    QString getUrlFromData(QString data);
    QList<int> getCommentIds(QString url);
    QByteArray voteComment(QByteArray json);
    int getSiteId(QString url);
    QByteArray putDatabaseContent(QByteArray data);
    int execSqlQuerry(QString querry, const char *data);
    void sendData(Socket *socket, QByteArray data, QByteArray type);
    QByteArray getDatabaseContent(QString url);
    QByteArray isUserValid(QString userName, QString password);
};

#endif // SERVER_H
