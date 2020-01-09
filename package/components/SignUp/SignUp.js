"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _mobxReactLite = require("mobx-react-lite");

var _lang = require("../../util/lang");

var _routes = require("../../util/routes");

var _hooks = require("../../util/hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  var _useStores = (0, _hooks.useStores)(),
      userStore = _useStores.userStore,
      dialogStore = _useStores.dialogStore;

  var fullscreen = (0, _hooks.useFullscreen)("sm");
  var classes = useStyles();

  var handleOnClose = function handleOnClose() {
    dialogStore.handleSignUp(false);
    userStore.reset();
  };

  var handleOnChange = function handleOnChange(evt) {
    if (evt.target.name === "username") {
      userStore.handleUsername(evt.target.value);
    } else if (evt.target.name === "password") {
      userStore.handlePassword(evt.target.value);
    }
  };

  var sendData = function sendData() {
    var closeDialog = function closeDialog() {
      dialogStore.handleSignUp(false);
      window.location.reload();
    };

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
          setStatus(_lang.langDe.signUpSuccessText);
        } else if (res.status === 403) {
          setStatus(_lang.langDe.signUpErrText403);
        }

        (0, _hooks.useTimeout)(2000, closeDialog);
      })["catch"](function (e) {
        setStatus(_lang.langDe.signUpErrText500);
      });
    }
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_core.Dialog, {
    open: dialogStore.openSignUp,
    onClose: handleOnClose,
    fullScreen: fullscreen
  }, _react["default"].createElement(_core.DialogTitle, null, _lang.langDe.signUp), _react["default"].createElement(_core.DialogContent, null, _react["default"].createElement(_core.DialogContentText, null, _lang.langDe.signUpText), _react["default"].createElement("form", null, _react["default"].createElement(_core.TextField, {
    label: _lang.langDe.username,
    value: userStore.username,
    fullWidth: true,
    required: true,
    name: "username",
    autoComplete: "username",
    className: classes.mb,
    onChange: handleOnChange
  }), _react["default"].createElement(_core.TextField, {
    label: _lang.langDe.password,
    value: userStore.password,
    fullWidth: true,
    required: true,
    name: "password",
    autoComplete: "new-password",
    className: classes.mb,
    onChange: handleOnChange,
    type: "password"
  })), _react["default"].createElement(_core.Typography, {
    component: "div",
    variant: "body1"
  }, _react["default"].createElement(_core.Box, {
    textAlign: "center"
  }, status))), _react["default"].createElement(_core.DialogActions, {
    className: classes.center
  }, _react["default"].createElement(_core.Button, {
    variant: "contained",
    color: "primary",
    onClick: sendData
  }, _lang.langDe.signUp), _react["default"].createElement(_core.Button, {
    variant: "contained",
    color: "secondary",
    onClick: handleOnClose
  }, _lang.langDe.cancel))));
});
var _default = SignUp;
exports["default"] = _default;