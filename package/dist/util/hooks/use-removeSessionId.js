"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var removeSessionId = function removeSessionId() {
  document.cookie = "sid=; expires Thu, 01 Jan 1970 00:00:01 GMT;";
};

var _default = removeSessionId;
exports["default"] = _default;