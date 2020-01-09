"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useSetStorage = void 0;

var useSetStorage = function useSetStorage(id, value) {
  if (Array.isArray(id) && Array.isArray(value)) {
    for (var i = 0; i < id.length; i++) {
      localStorage.setItem(id[i], value[i]);
    }
  } else {
    localStorage.setItem(id, value);
  }
};

exports.useSetStorage = useSetStorage;
var _default = useSetStorage;
exports["default"] = _default;