"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _lang = require("../../util/lang");

var _icons = require("@material-ui/icons");

var _SignUp = require("../SignUp");

var _SignIn = require("../SignIn");

var _mobxReactLite = require("mobx-react-lite");

var _hooks = require("../../util/hooks");

var _LoggedIn = require("./LoggedIn");

var _CreateAccount = require("./CreateAccount");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    list: {
      width: 250,
      height: "100%"
    }
  };
});
var SideList = (0, _mobxReactLite.observer)(function (props) {
  var _useStores = (0, _hooks.useStores)(),
      dialogStore = _useStores.dialogStore;

  var classes = useStyles();
  return _react["default"].createElement(_core.Drawer, {
    open: dialogStore.openDrawer,
    onClose: function onClose() {
      return dialogStore.handleDrawer(false);
    }
  }, _react["default"].createElement("div", {
    className: classes.list
  }, _react["default"].createElement(_core.List, null, _react["default"].createElement(_core.ListItem, null, _react["default"].createElement(_core.Typography, {
    variant: "h6"
  }, _lang.langDe.brandName)), _react["default"].createElement(_core.Divider, null), _react["default"].createElement(_core.Link, {
    color: "inherit",
    href: "/"
  }, _react["default"].createElement(_core.ListItem, {
    button: true
  }, _react["default"].createElement(_core.ListItemIcon, null, _react["default"].createElement(_icons.Home, {
    color: "secondary"
  })), _react["default"].createElement(_core.ListItemText, {
    primary: _lang.langDe.home
  }))), _react["default"].createElement(_CreateAccount.CreateAccount, null), _react["default"].createElement(_LoggedIn.LoggedIn, null), _react["default"].createElement(_core.Link, {
    color: "inherit",
    href: "https://github.com/Jugendhackt/comment-sense/"
  }, _react["default"].createElement(_core.ListItem, {
    button: true
  }, _react["default"].createElement(_core.ListItemIcon, null, _react["default"].createElement(_icons.Code, {
    color: "secondary"
  })), _react["default"].createElement(_core.ListItemText, {
    primary: _lang.langDe.github
  }))))), _react["default"].createElement(_SignUp.SignUp, null), _react["default"].createElement(_SignIn.SignIn, null));
});
var _default = SideList;
exports["default"] = _default;