#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <QTcpServer>
#include <QTcpSocket>
#include <QtSql>

namespace Ui {
class Widget;
}

class Widget : public QWidget
{
    Q_OBJECT

public:
    explicit Widget(QWidget *parent = 0);
    ~Widget();
public slots:
    void newConnection();
    void readyRead();

private:
    Ui::Widget *ui;
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
