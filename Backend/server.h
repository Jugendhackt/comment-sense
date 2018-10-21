#ifndef WIDGET_H
#define WIDGET_H

#include <QTcpServer>
#include <QTcpSocket>
//#include <QtSql>
#include <QIODevice>
#include <sqlite3.h>

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
    explicit Server(QObject *parent = 0);
    ~Server();
public slots:
    void newConnection();
    void readyRead();

private:
    //Ui::Widget *ui;
    QTcpServer *server;
    QList<QTcpSocket*> socketList;
//s    QSqlDatabase database;
    sqlite3 *db;
    int rc;
    char *zErrMsg;


    void httpGet(QString data, QTcpSocket *socket);
    void httpPut(QString data, QTcpSocket *socket);
    void httpPost(QString data, QTcpSocket *socket);
    void httpPatch(QString data, QTcpSocket *socket);
    void httpDelete(QString data, QTcpSocket *socket);

    void initDatabase();

    QByteArray getDatabaseContent(QString commentHash);
    qint64 putDatabaseContent(QByteArray data, QString commentHash);
    int execSqlQuerry(QString querry, char *data);

    enum Table{
        comments,
        comments_on_site,
        site,
        users
    };
};

#endif // WIDGET_H