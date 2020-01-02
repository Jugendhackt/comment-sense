"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useLoggedIn = void 0;

var _constants = require("../constants");

var useLoggedIn = function useLoggedIn(sessionId) {
  return new Promise(function (resolve) {
    console.log(sessionId);

    if (sessionId !== undefined && sessionId !== null) {
      fetch("".concat(_constants.ipAddress, "/api/checksid?sid='").concat(sessionId, "'")).then(function (res) {
        if (res.status === 401) {
          resolve(false);
        } else if (res.status === 200) {
          resolve(true);
        }
      });
    } else {
      resolve(false);
    }
  });
};

exports.useLoggedIn = useLoggedIn;
var _default = useLoggedIn;
exports["default"] = _default;