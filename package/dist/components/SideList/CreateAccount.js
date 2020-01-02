"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAccount = void 0;

var _mobxReactLite = require("mobx-react-lite");

var _hooks = require("../../util/hooks");

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _lang = require("../../util/lang");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CreateAccount = (0, _mobxReactLite.observer)(function (props) {
  var _useStores = (0, _hooks.useStores)(),
      dialogStore = _useStores.dialogStore,
      userStore = _useStores.userStore;

  if (!userStore.loggedIn) {
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_core.ListItem, {
      button: true,
      onClick: function onClick() {
        return dialogStore.openSignIn = true;
      }
    }, _react["default"].createElement(_core.ListItemIcon, null, _react["default"].createElement(_icons.Person, {
      color: "secondary"
    })), _react["default"].createElement(_core.ListItemText, {
      primary: _lang.langDe.signIn
    })), _react["default"].createElement(_core.ListItem, {
      button: true,
      onClick: function onClick() {
        return dialogStore.openSignUp = true;
      }
    }, _react["default"].createElement(_core.ListItemIcon, null, _react["default"].createElement(_icons.PersonAdd, {
      color: "secondary"
    })), _react["default"].createElement(_core.ListItemText, {
      primary: _lang.langDe.signUp
    })));
  } else {
    return null;
  }
});
exports.CreateAccount = CreateAccount;