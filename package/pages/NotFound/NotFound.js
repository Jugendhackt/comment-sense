"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NotFound = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _lang = require("package/util/lang");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _core.makeStyles)(function () {
  return {
    center: {
      display: "flex",
      justifyContent: "center"
    },
    paper: {
      padding: "2%"
    }
  };
});

var NotFound = function NotFound() {
  var classes = useStyles();
  return _react["default"].createElement("div", {
    className: classes.center
  }, _react["default"].createElement(_core.Paper, {
    className: classes.paper
  }, _react["default"].createElement(_core.Typography, {
    variant: "h4"
  }, _lang.langDe.notFoundTitle), _react["default"].createElement(_core.Typography, {
    variant: "body1"
  }, _lang.langDe.notFoundText)));
};

exports.NotFound = NotFound;
var _default = NotFound;
exports["default"] = _default;