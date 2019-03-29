#ifndef RESPONSETARGETS_H_INCLUDED
#define RESPONSETARGETS_H_INCLUDED

char *mainFile = "HTTP/1.1 200\nContent-Type:text/html\nContent-Length:807\n\n<html>\n    <head>\n        "
                 "<title>Comment-Sense</title>\n        <link rel=\"stylesheet\" href=\"CSS/style.css\" ty"
                 "pe=\"text/css\">\n        <link rel=\"stylesheet\" href=\"CSS/index.css\" type=\"text/cs"
                 "s\">\n        <meta charset=\"utf-8\">\n    </head>\n\t<body>\n        <div class=\"flex"
                 "box\">\n            <button id=\"createAcc\" type=\"button\" class=\"button\">Account Er"
                 "stellen</button>\n        </div>\n        <div class=\"row\">\n          <div class=\"co"
                 "lumn\">\n            <div id=\"topWebsites\">\n              Top Websiten\n            <"
                 "/div>\n          </div>\n          <div class=\"column\">\n            <div id=\"topComm"
                 "ents\">\n              Top Kommentare\n            </div>\n          </div>\n        </d"
                 "iv>\n        <script src=\"JS/index.js\" charset=\"utf-8\" type=\"text/javascript\"></sc"
                 "ript>\n\t</body>\n</html>\n\n";

char *testComment = "HTTP/1.1 200\nContent-Type:application/json\nContent-Length:141\n\n{\n\t\"Comments\":"
                 "\t[{\n\t\t\t\"id\":\t0,\n\t\t\t\"headline\":\t\"headline\",\n\t\t\t\"content\":\t\"conte"
                 "nt\",\n\t\t\t\"votes\":\t0,\n\t\t\t\"userID\":\t0,\n\t\t\t\"userName\":\t\"test\"\n\t\t}"
                 "]\n}\n";

char *usersCreate1 = "x";
char *usersExists1 = "x";
char *usersLogin1 = "x";

#endif // RESPONSETARGETS_H_INCLUDED
