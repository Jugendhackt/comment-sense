QT       += core network

TARGET = Server
TEMPLATE = app
CONFIG += console

SOURCES += main.cpp \
        server.cpp \
        sqlite3.c

HEADERS += server.h \
        sqlite3.h
