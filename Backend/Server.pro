QT       += core network


TARGET = Server
TEMPLATE = app
CONFIG += console

DEFINES += QT_DEPRECATED_WARNINGS

SOURCES += main.cpp \
        server.cpp \
        sqlite3.c

HEADERS += server.h \
        sqlite3.h

RESOURCES += resources.qrc
