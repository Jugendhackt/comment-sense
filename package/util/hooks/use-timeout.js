"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useTimeout = void 0;

var useTimeout = function useTimeout(time, cb) {
  setTimeout(cb, time);
};

exports.useTimeout = useTimeout;
var _default = useTimeout;
exports["default"] = _default;