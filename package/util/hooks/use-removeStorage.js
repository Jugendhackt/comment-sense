"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useRemoveStorage = void 0;

var useRemoveStorage = function useRemoveStorage(id) {
  localStorage.removeItem(id);
};

exports.useRemoveStorage = useRemoveStorage;
var _default = useRemoveStorage;
exports["default"] = _default;