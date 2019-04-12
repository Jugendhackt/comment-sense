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

char *testComment1 = "HTTP/1.1 200\nContent-Type:application/json\nContent-Length:141\n\n{\n\t\"Comments\""
                 ":\t[{\n\t\t\t\"id\":\t0,\n\t\t\t\"headline\":\t\"headline\",\n\t\t\t\"content\":\t\"cont"
                 "ent\",\n\t\t\t\"votes\":\t0,\n\t\t\t\"userID\":\t0,\n\t\t\t\"userName\":\t\"test\"\n\t\t"
                 "}]\n}\n";
char *testComment2 = "HTTP/1.1 200\nContent-Type:application/json\nContent-Length:141\n\n{\n\t\"Comments\""
                 ":\t[{\n\t\t\t\"id\":\t0,\n\t\t\t\"headline\":\t\"headline\",\n\t\t\t\"content\":\t\"cont"
                 "ent\",\n\t\t\t\"votes\":\t1,\n\t\t\t\"userID\":\t0,\n\t\t\t\"userName\":\t\"test\"\n\t\t"
                 "}]\n}\n";

char *testComment3 = "HTTP/1.1 200\nContent-Type:application/json\nContent-Length:259\n\n{\n\t\"Comments\""
                 ":\t[{\n\t\t\t\"id\":\t0,\n\t\t\t\"headline\":\t\"headline\",\n\t\t\t\"content\":\t\"cont"
                 "ent\",\n\t\t\t\"votes\":\t1,\n\t\t\t\"userID\":\t0,\n\t\t\t\"userName\":\t\"test\"\n\t\t"
                 "}, {\n\t\t\t\"id\":\t29,\n\t\t\t\"headline\":\t\"test\",\n\t\t\t\"content\":\t\"test\","
                 "\n\t\t\t\"votes\":\t0,\n\t\t\t\"userID\":\t0,\n\t\t\t\"userName\":\t\"test\"\n\t\t}]\n}\n";

char *usersCreate1 = "HTTP/1.1 201\ncontent type:application/json\ncontent length:37\n\n{\"status\":\"user created succesfully\"}";
char *usersCreate2 = "HTTP/1.1 409\ncontent type:application/json\ncontent length:34\n\n{\"status\":\"username already used\"}";
char *usersExists1 = "HTTP/1.1 200\ncontent type:application/json\ncontent length:27\n\n{\"status\":\"userName valid\"}";
char *usersExists2 = "HTTP/1.1 200\ncontent type:application/json\ncontent length:31\n\n{\"status\":\"userName not valid\"}";
char *usersLogin1 = "HTTP/1.1 200\ncontent type:application/json\ncontent length:29\n\n{\"status\":\"login data valid\"}";
char *usersLogin2 = "HTTP/1.1 401\ncontent type:application/json\ncontent length:33\n\n{\"status\":\"login data not valid\"}";
char *postComment1 = "HTTP/1.1 201\ncontent type:application/json\ncontent length:48\n\n{\"status\":\"posting the comment probably worked\"}";
char *voteComment1 = "HTTP/1.1 200\ncontent type:application/json\ncontent length:30\n\n{\"status\":\"everything worked\"}\n";
char *voteComment2 = "HTTP/1.1 403\ncontent type:application/json\ncontent length:50\n\n{\"error\":\"you have already voted on this comment\"}\n";

#endif // RESPONSETARGETS_H_INCLUDED
