"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useGetStorage = void 0;

var useGetStorage = function useGetStorage(id) {
  if (Array.isArray(id)) {
    var arr = [];
    var length = id.length;

    for (var i = 0; i < length; i++) {
      arr.push(localStorage.getItem(id[i]));
    }

    return arr;
  } else {
    return localStorage.getItem(id);
  }
};

exports.useGetStorage = useGetStorage;
var _default = useGetStorage;
exports["default"] = _default;