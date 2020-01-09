"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.voteCommentRoute = void 0;

var _constants = require("../constants");

var voteCommentRoute = function voteCommentRoute() {
  return "".concat(_constants.ipAddress, "/api/comments/");
};

exports.voteCommentRoute = voteCommentRoute;
var _default = voteCommentRoute;
exports["default"] = _default;