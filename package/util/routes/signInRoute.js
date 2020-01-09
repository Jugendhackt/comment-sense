"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.signInRoute = void 0;

var _constants = require("../constants");

var signInRoute = function signInRoute(data) {
  if (data.username && data.password) {
    return "".concat(_constants.ipAddress, "/api/signin?username=").concat(data.username, "&password=").concat(data.password);
  } else {
    return null;
  }
};

exports.signInRoute = signInRoute;
var _default = signInRoute;
exports["default"] = _default;