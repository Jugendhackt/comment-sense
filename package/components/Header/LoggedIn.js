"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LoggedIn = void 0;

var _mobxReactLite = require("mobx-react-lite");

var _hooks = require("../../util/hooks");

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _core.makeStyles)(function () {
  return {
    account: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%"
    }
  };
});
var LoggedIn = (0, _mobxReactLite.observer)(function (props) {
  var _useStores = (0, _hooks.useStores)(),
      dialogStore = _useStores.dialogStore,
      userStore = _useStores.userStore;

  var classes = useStyles();

  var handleOnClick = function handleOnClick(evt) {
    dialogStore.handleAccount(true);
    dialogStore.handleAnchorElAccount(evt.currentTarget);
  };

  if (userStore.loggedIn) {
    return _react["default"].createElement(_core.Box, {
      className: classes.account
    }, _react["default"].createElement(_core.IconButton, {
      color: "inherit",
      onClick: handleOnClick
    }, _react["default"].createElement(_icons.Person, null)));
  } else {
    return null;
  }
});
exports.LoggedIn = LoggedIn;
var _default = LoggedIn;
exports["default"] = _default;