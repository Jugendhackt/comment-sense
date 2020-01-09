"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LoggedIn = void 0;

var _mobxReactLite = require("mobx-react-lite");

var _hooks = require("../../util/hooks");

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _lang = require("../../util/lang");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LoggedIn = (0, _mobxReactLite.observer)(function (props) {
  var _useStores = (0, _hooks.useStores)(),
      userStore = _useStores.userStore;

  var logout = function logout() {
    userStore.loggedIn = false;
    userStore.password = "";
    userStore.username = "";
    userStore.email = "";
    userStore.sid = "";
    (0, _hooks.useRemoveStorage)("sid");
    window.location.reload();
  };

  if (userStore.loggedIn) {
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_core.Link, {
      color: "inherit",
      href: "/account/"
    }, _react["default"].createElement(_core.ListItem, {
      button: true
    }, _react["default"].createElement(_core.ListItemIcon, null, _react["default"].createElement(_icons.SettingsApplications, {
      color: "secondary"
    })), _react["default"].createElement(_core.ListItemText, {
      primary: _lang.langDe.account
    }))), _react["default"].createElement(_core.ListItem, {
      button: true
    }, _react["default"].createElement(_core.ListItemIcon, null, _react["default"].createElement(_icons.Person, {
      color: "secondary"
    })), _react["default"].createElement(_core.ListItemText, {
      primary: "".concat(_lang.langDe.loggedInAs, " ").concat(userStore.username)
    })), _react["default"].createElement(_core.ListItem, {
      button: true,
      onClick: logout
    }, _react["default"].createElement(_core.ListItemIcon, null, _react["default"].createElement(_icons.ExitToApp, {
      color: "secondary"
    })), _react["default"].createElement(_core.ListItemText, {
      primary: _lang.langDe.logout
    })));
  } else {
    return null;
  }
});
exports.LoggedIn = LoggedIn;
var _default = LoggedIn;
exports["default"] = _default;