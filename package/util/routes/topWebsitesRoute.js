"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.topWebsitesRoute = void 0;

var _constants = require("../constants");

var topWebsitesRoute = function topWebsitesRoute(count) {
  if (count) {
    return "".concat(_constants.ipAddress, "/api/sites?count=").concat(count);
  } else {
    return null;
  }
};

exports.topWebsitesRoute = topWebsitesRoute;
var _default = topWebsitesRoute;
exports["default"] = _default;