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

//#define SSL
#ifdef SSL
typedef QSslSocket Socket;
#else
typedef QTcpSocket Socket;
#endif
#define cout (*outStream)               //temporary, later std::cout
#define endl "\n";outStream->flush();   //

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
    QFile stdOut;
    QTextStream *outStream;
    
    void httpGet(QString data, Socket *socket);
    void httpPut(QString data, Socket *socket);
    void httpPost(QString data, Socket *socket);
    void httpPatch(QString data, Socket *socket);
    void httpDelete(QString data, Socket *socket);
    
    int getCosId();
    int getCommentId();
    void initDatabase();
    QStringList getUsers();
    QTextStream& qStdOut();
    QByteArray getFile(QString url);
    int getUserId(QString userName);
    bool isJsonValid(QByteArray json);
    QString getUrlFromData(QString data);
    QList<int> getCommentIds(QString url);
    int getSiteId(QString url);
    qint64 putDatabaseContent(QByteArray data);
    int execSqlQuerry(QString querry, const char *data);
    void sendData(Socket *socket, QByteArray data);
    QByteArray getDatabaseContent(QString url);
    bool isUserValid(QString userName, QString password);
};

#endif // SERVER_H
