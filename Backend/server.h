#ifndef SERVER_H
#define SERVER_H

#include <QTcpServer>
#include <QTcpSocket>
#include <QSslSocket>
#include <QSslConfiguration>
#include "sqlite3.h"
#include <QFile>
#include <QDir>
#include <QtDebug>
#include <QFile>
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonValue>
#include <QTime>
#include <QDate>

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
    QDir bin_d, dir_d, data_d;
    const char *dbPath = "../data/mainDatabase.db3";
    
    void initDatabase();
    int execSqlQuerry(QString querry, const char *data);
    
    bool isJsonValid(QByteArray json);
    QString getUrlFromData(QString data);
    QByteArray getType(QByteArray ending);
    QByteArray getFile(QString url, QByteArray *type);
    void sendData(Socket *socket, QByteArray data, QByteArray type, QByteArray status);
    QByteArray httpGet(QString data, QString url, QByteArray *type);
    QByteArray httpPut(QString data, QString url, QByteArray *type);
    QByteArray httpPost(QString data, QString url, QByteArray *type);
    QByteArray httpPatch(QString data, QString url, QByteArray *type);
    QByteArray httpDelete(QString data, QString url, QByteArray *type);

    QStringList getUsers();
    QByteArray calcTrustLevel(int userId);
    QByteArray createUser(QByteArray json);
    QByteArray manageUser(QByteArray json);
    QByteArray isUserValid(QString userName, QString password);
    
    int getNextCommentId();
    int getSiteId(QString url);
    int getUserId(QString userName);
    QByteArray getComments(QString url);
    QList<int> getCommentIds(QString url);
    QByteArray voteComment(QByteArray json);
    QByteArray postComment(QByteArray data);
    QByteArray addCommentToSite(QString url, int commentId);
};

#endif // SERVER_H
