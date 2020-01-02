"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _lang = require("../../util/lang");

var _SideList = require("../SideList");

var _mobxReactLite = require("mobx-react-lite");

var _AccountDropDown = _interopRequireDefault(require("./AccountDropDown"));

var _LoggedIn = require("./LoggedIn");

var _hooks = require("../../util/hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    menuButton: {
      marginRight: theme.spacing(2)
    }
  };
});
var Navbar = (0, _mobxReactLite.observer)(function (props) {
  var _useStores = (0, _hooks.useStores)(),
      dialogStore = _useStores.dialogStore;

  var classes = useStyles();

  var handleOnClick = function handleOnClick(evt) {
    if (evt && evt.target.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift")) return;
    dialogStore.handleDrawer(!dialogStore.openDrawer);
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_core.AppBar, {
    position: "sticky"
  }, _react["default"].createElement(_core.Toolbar, null, _react["default"].createElement(_core.IconButton, {
    edge: "start",
    className: classes.menuButton,
    color: "inherit",
    onClick: handleOnClick
  }, _react["default"].createElement(_icons.Menu, null)), _react["default"].createElement(_core.Typography, {
    variant: "h6"
  }, _lang.langDe.brandName), _react["default"].createElement(_LoggedIn.LoggedIn, null), _react["default"].createElement(_AccountDropDown["default"], null))), _react["default"].createElement(_SideList.SideList, null));
});
var _default = Navbar;
exports["default"] = _default;