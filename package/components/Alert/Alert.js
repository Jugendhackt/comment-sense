"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _core = require("@material-ui/core");

var _lang = require("../../util/lang");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Transition = _react["default"].forwardRef(function Transition(props, ref) {
  return _react["default"].createElement(_core.Slide, _extends({
    direction: "up",
    ref: ref
  }, props));
});

var Alert = (0, _mobxReactLite.observer)(function (props) {
  var theme = (0, _core.useTheme)();
  var fullScreen = (0, _core.useMediaQuery)(theme.breakpoints.down("sm"));
  return _react["default"].createElement(_core.Dialog, {
    open: props.open,
    onClose: props.onClose,
    fullScreen: fullScreen,
    TransitionComponent: Transition
  }, _react["default"].createElement(_core.DialogTitle, null, props.title), _react["default"].createElement(_core.DialogContent, null, _react["default"].createElement(_core.DialogContentText, null, props.text)), _react["default"].createElement(_core.DialogActions, null, _react["default"].createElement(_core.Button, {
    variant: "contained",
    color: "secondary",
    onClick: props.onClose
  }, _lang.langDe.cancel)));
});
var _default = Alert;
exports["default"] = _default;