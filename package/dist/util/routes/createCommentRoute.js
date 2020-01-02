"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createCommentRoute = void 0;

var _constants = require("../constants");

var createCommentRoute = function createCommentRoute() {
  return "".concat(_constants.ipAddress, "/api/comments/");
};

exports.createCommentRoute = createCommentRoute;
var _default = createCommentRoute;
exports["default"] = _default;