"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.topCommentsRoute = void 0;

var _constants = require("../constants");

var topCommentsRoute = function topCommentsRoute(count) {
  if (count) {
    return "".concat(_constants.ipAddress, "/api/comments?count=").concat(count);
  } else {
    return null;
  }
};

exports.topCommentsRoute = topCommentsRoute;
var _default = topCommentsRoute;
exports["default"] = _default;