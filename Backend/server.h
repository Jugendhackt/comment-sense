#ifndef WIDGET_H
#define WIDGET_H

#include <QTcpServer>
#include <QTcpSocket>
//#include <QtSql>
#include <QIODevice>
#include <sqlite3.h>


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


    void httpGet(QString data, QTcpSocket *socket);
    void httpPut(QString data, QTcpSocket *socket);
    void httpPost(QString data, QTcpSocket *socket);
    void httpPatch(QString data, QTcpSocket *socket);
    void httpDelete(QString data, QTcpSocket *socket);

    QByteArray getDatabaseContent(QString commentHash);
    qint64 putDatabaseContent(QByteArray data, QString commentHash);
};

#endif // WIDGET_H
