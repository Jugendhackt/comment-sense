#ifndef SERVER_H
#define SERVER_H

#include <QTcpServer>
#include <QTcpSocket>
#include <QSslSocket>
#include <QSslConfiguration>
#include <QIODevice>
#include "sqlite3.h"

#define SSL
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
    const char *dbPath = "../mainDataBase.db3";
    
    void httpGet(QString data, Socket *socket);
    void httpPut(QString data, Socket *socket);
    void httpPost(QString data, Socket *socket);
    void httpPatch(QString data, Socket *socket);
    void httpDelete(QString data, Socket *socket);
    
    int getCosId();
    int getCommentId();
    void initDatabase();
    QStringList getUsers();
    int getUserId(QString userName);
    QString getHashFromData(QString data);
    QList<int> getCommentIds(QString hash);
    int getSiteId(QString hash, QString url);
    qint64 putDatabaseContent(QByteArray data);
    int execSqlQuerry(QString querry, const char *data);
    void sendData(Socket *socket, QByteArray data);
    QByteArray getDatabaseContent(QString commentHash);
    bool isUserValid(QString userName, QString password);
};

#endif // SERVER_H
