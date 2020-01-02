"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var useSessionId = function useSessionId() {
  var sessionId = document.cookie.match(new RegExp('(^| )sid=([^;]+)'));
  if (sessionId) return sessionId.length ? sessionId[0].split("=")[1] : null;
};

var _default = useSessionId;
exports["default"] = _default;