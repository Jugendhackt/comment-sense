#ifndef WIDGET_H
#define WIDGET_H

#include <QTcpServer>
#include <QTcpSocket>
#include <QSslSocket>
#include <QSslConfiguration>
#include <QIODevice>
#include "sqlite3.h"

#define SSL

typedef int (*sqlite3_callback)(
        void *,
        int,
        char**,
        char**
);

#ifdef SSL
typedef QSslSocket Socket;
#else
typedef QTcpSocket Socket;
#endif

class Server : public QObject
{
    Q_OBJECT

public:
    explicit Server(QObject *parent = nullptr);
    ~Server();
public slots:
    void newConnection();
    void readyRead();
    void disconnected();
    void encrypted();
    void socketError(QAbstractSocket::SocketError error);
    void sslErrors(QList<QSslError> errors);

private:
    //Ui::Widget *ui;
    QTcpServer *server;
    QList<Socket*> socketList;
    sqlite3 *db;
    int rc;
    char *zErrMsg;


    void httpGet(QString data, Socket *socket);
    void httpPut(QString data, Socket *socket);
    void httpPost(QString data, Socket *socket);
    void httpPatch(QString data, Socket *socket);
    void httpDelete(QString data, Socket *socket);

    void initDatabase();

    QByteArray getDatabaseContent(QString commentHash);
    qint64 putDatabaseContent(QByteArray data);
    int execSqlQuerry(QString querry, char *data);
    int getUserId(QString userName);
    int getCosId();
    int getCommentId();
    int getSiteId(QString hash, QString url);
    bool isUserValid(QString userName, QString password);
    QString getHashFromData(QString data);
    QStringList getUsers();
    QList<int> getCommentIds(QString hash);
    void sendData(Socket *socket, QByteArray data);

    enum Table{
        comments,
        comments_on_site,
        site,
        users
    };
};

#endif // WIDGET_H
