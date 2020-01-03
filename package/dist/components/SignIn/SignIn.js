"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _core = require("@material-ui/core");

var _lang = require("../../util/lang");

var _Alert = require("../Alert");

var _hooks = require("../../util/hooks");

var _routes = require("../../util/routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      width: "100%"
    },
    center: {
      display: "flex",
      justifyContent: "center"
    },
    mb: {
      marginBottom: theme.spacing(2)
    }
  };
});
var SignIn = (0, _mobxReactLite.observer)(function (props) {
  var _useStores = (0, _hooks.useStores)(),
      userStore = _useStores.userStore,
      dialogStore = _useStores.dialogStore;

  var classes = useStyles();

  var sendData = function sendData() {
    fetch((0, _routes.signInRoute)({
      username: userStore.username,
      password: userStore.password
    })).then(function (res) {
      if (res.status === 200) {
        (0, _hooks.useSetStorage)("username", userStore.username);
        dialogStore.handleSignInSuccess(true);
        dialogStore.handleSignIn(false);
        return res.json();
      } else {
        dialogStore.handleSignInFail(true);
        dialogStore.handleSignIn(false);
      }
    }).then(function (res) {
      if (res.sid) {
        userStore.handleSid(res.sid);
        (0, _hooks.useSetStorage)("sid", res.sid);
      }
    })["catch"](function (e) {
      dialogStore.handleSignInFail(true);
    });
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_core.Dialog, {
    open: dialogStore.openSignIn,
    onClose: function onClose() {
      return dialogStore.handleSignIn(false);
    },
    fullScreen: true
  }, _react["default"].createElement(_core.DialogTitle, null, _lang.langDe.signIn), _react["default"].createElement(_core.DialogContent, null, _react["default"].createElement(_core.DialogContentText, null, _lang.langDe.signInText), _react["default"].createElement(_core.TextField, {
    label: _lang.langDe.username,
    value: userStore.username,
    fullWidth: true,
    required: true,
    className: classes.mb,
    onChange: function onChange(evt) {
      return userStore.handleUsername(evt.target.value);
    }
  }), _react["default"].createElement(_core.TextField, {
    label: _lang.langDe.password,
    value: userStore.password,
    fullWidth: true,
    required: true,
    className: classes.mb,
    onChange: function onChange(evt) {
      return userStore.handlePassword(evt.target.value);
    },
    type: "password"
  })), _react["default"].createElement(_core.DialogActions, {
    className: classes.center
  }, _react["default"].createElement(_core.Button, {
    variant: "contained",
    color: "primary",
    onClick: sendData
  }, _lang.langDe.signIn), _react["default"].createElement(_core.Button, {
    variant: "contained",
    color: "secondary",
    onClick: function onClick() {
      return dialogStore.handleSignIn(false);
    }
  }, _lang.langDe.cancel))), _react["default"].createElement(_Alert.Alert, {
    open: dialogStore.openSignInSuccess,
    onClose: function onClose() {
      return dialogStore.handleSignInSuccess(false);
    },
    title: _lang.langDe.signInSuccessTitle,
    text: _lang.langDe.signInSuccessText
  }), _react["default"].createElement(_Alert.Alert, {
    open: dialogStore.openSignInFail,
    onClose: function onClose() {
      return dialogStore.handleSignInFail(false);
    },
    title: _lang.langDe.signInErrTitle,
    text: _lang.langDe.signInErrTitle
  }));
});
var _default = SignIn;
exports["default"] = _default;