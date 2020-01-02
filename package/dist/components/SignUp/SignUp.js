"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _mobxReactLite = require("mobx-react-lite");

var _lang = require("../../util/lang");

var _Alert = require("../Alert");

var _routes = require("../../util/routes");

var _hooks = require("../../util/hooks");

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
    mb: {
      marginBottom: theme.spacing(2)
    },
    center: {
      display: "flex",
      justifyContent: "center"
    }
  };
});
var SignUp = (0, _mobxReactLite.observer)(function (props) {
  var _useStores = (0, _hooks.useStores)(),
      userStore = _useStores.userStore,
      dialogStore = _useStores.dialogStore;

  var classes = useStyles();

  var sendData = function sendData() {
    if (userStore.username && userStore.password) {
      fetch((0, _routes.signUpRoute)(), {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userStore.username,
          password: userStore.password
        })
      }).then(function (res) {
        if (res.status === 200) {
          dialogStore.handleSignUpSuccess(true);
          dialogStore.handleSignUp(false);
        } else {
          dialogStore.handleSignUpFail(true);
          dialogStore.handleSignUp(false);
        }
      })["catch"](function (e) {
        dialogStore.handleSignUpFail(true);
      });
    }
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_core.Dialog, {
    open: dialogStore.openSignUp,
    onClose: function onClose() {
      return dialogStore.handleSignUp(false);
    },
    fullScreen: true
  }, _react["default"].createElement(_core.DialogTitle, null, _lang.langDe.signUp), _react["default"].createElement(_core.DialogContent, {
    dividers: true
  }, _react["default"].createElement(_core.DialogContentText, null, _lang.langDe.signUpText), _react["default"].createElement(_core.TextField, {
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
  }, _lang.langDe.signUp), _react["default"].createElement(_core.Button, {
    variant: "contained",
    color: "secondary",
    onClick: function onClick() {
      return dialogStore.handleSignUp(false);
    }
  }, _lang.langDe.cancel))), _react["default"].createElement(_Alert.Alert, {
    open: dialogStore.openSignUpSuccess,
    onClose: function onClose() {
      return dialogStore.handleSignUpSuccess(false);
    },
    title: _lang.langDe.signUpSuccessTitle,
    text: _lang.langDe.signUpSuccessText
  }), _react["default"].createElement(_Alert.Alert, {
    open: dialogStore.openSignUpFail,
    onClose: function onClose() {
      return dialogStore.handleSignUpFail(false);
    },
    title: _lang.langDe.signUpErrTitle,
    text: _lang.langDe.signUpErrText
  }));
});
var _default = SignUp;
exports["default"] = _default;