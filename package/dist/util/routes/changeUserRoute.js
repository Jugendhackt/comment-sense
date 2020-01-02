"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.changeUserRoute = void 0;

var _constants = require("../constants");

var changeUserRoute = function changeUserRoute() {
  return "".concat(_constants.ipAddress, "/api/user");
};

exports.changeUserRoute = changeUserRoute;
var _default = changeUserRoute;
exports["default"] = _default;