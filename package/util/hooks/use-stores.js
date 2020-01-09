"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useStores = void 0;

var _react = require("react");

var _contexts = require("../contexts");

var useStores = function useStores() {
  return (0, _react.useContext)(_contexts.storesContext);
};

exports.useStores = useStores;
var _default = useStores;
exports["default"] = _default;