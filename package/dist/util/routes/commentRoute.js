"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.commentRoute = void 0;

var _constants = require("../constants");

var commentRoute = function commentRoute(url, username) {
  console.log(username, "commentRoute");
  console.log(url, "commentRoute");

  if (url && username) {
    return "".concat(_constants.ipAddress, "/api/comments?site='").concat(url, "'&username='").concat(username, "'");
  } else if (url) {
    return "".concat(_constants.ipAddress, "/api/comments?site='").concat(url);
  } else {
    return null;
  }
};

exports.commentRoute = commentRoute;
var _default = commentRoute;
exports["default"] = _default;