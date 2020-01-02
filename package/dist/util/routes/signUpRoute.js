"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.signUpRoute = void 0;

var _constants = require("../constants");

var signUpRoute = function signUpRoute() {
  return "".concat(_constants.ipAddress, "/api/signup/");
};

exports.signUpRoute = signUpRoute;
var _default = signUpRoute;
exports["default"] = _default;