#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <QTcpServer>
#include <QTcpSocket>
#include <QtSql>
#include <QIODevice>


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
    QSqlDatabase *database;


    void httpGet(QString data, QTcpSocket *socket);
    void httpPut(QString data, QTcpSocket *socket);
    void httpPost(QString data, QTcpSocket *socket);
    void httpPatch(QString data, QTcpSocket *socket);
    void httpDelete(QString data, QTcpSocket *socket);

    QByteArray getDatabaseContent(QString commentHash);
    qint64 putDatabaseContent(QByteArray data, QString commentHash);
};

#endif // WIDGET_H
