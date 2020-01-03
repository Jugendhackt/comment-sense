"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _mobxReactLite = require("mobx-react-lite");

var _react = _interopRequireDefault(require("react"));

var _lang = require("../../util/lang");

var _hooks = require("../../util/hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AccountDropDown = (0, _mobxReactLite.observer)(function (props) {
  var _useStores = (0, _hooks.useStores)(),
      userStore = _useStores.userStore,
      dialogStore = _useStores.dialogStore;

  var handleOnClose = function handleOnClose() {
    dialogStore.handleAnchorElAccount(null);
    dialogStore.handleAccount(false);
  };

  var logout = function logout() {
    userStore.reset();
    (0, _hooks.useRemoveStorage)("sid");
    window.location.reload();
  };

  if (userStore.loggedIn) {
    return _react["default"].createElement(_core.Menu, {
      keepMounted: true,
      anchorEl: dialogStore.anchorElAccount,
      open: dialogStore.openAccount,
      onClose: handleOnClose
    }, _react["default"].createElement(_core.MenuItem, null, _react["default"].createElement(_core.ListItemIcon, null, _react["default"].createElement(_icons.Person, {
      color: "secondary"
    })), _react["default"].createElement(_core.ListItemText, {
      primary: "".concat(_lang.langDe.loggedInAs, " ").concat(userStore.username)
    })), _react["default"].createElement(_core.MenuItem, {
      onClick: logout
    }, _react["default"].createElement(_core.ListItemIcon, null, _react["default"].createElement(_icons.Person, {
      color: "secondary"
    })), _react["default"].createElement(_core.ListItemText, {
      primary: _lang.langDe.logout
    })));
  } else {
    return null;
  }
});
var _default = AccountDropDown;
exports["default"] = _default;