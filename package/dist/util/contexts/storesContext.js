"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.storesContext = void 0;

var _react = require("react");

var _CommentStore = require("../../stores/CommentStore");

var _UserStore = require("../../stores/UserStore");

var _DialogStore = require("../../stores/DialogStore");

var storesContext = (0, _react.createContext)({
  commentStore: new _CommentStore.CommentStore(),
  userStore: new _UserStore.UserStore(),
  dialogStore: new _DialogStore.DialogStore()
});
exports.storesContext = storesContext;
var _default = storesContext;
exports["default"] = _default;