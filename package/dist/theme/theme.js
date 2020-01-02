"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("@material-ui/core/styles");

var palette = {
  type: "dark",
  primary: {
    light: '#ff9800',
    main: '#f57c00',
    dark: '#e65100',
    contrastText: '#fffff'
  },
  secondary: {
    light: '#42a5f5',
    main: '#1e88e5',
    dark: '#0d47a1',
    contrastText: '#fffff'
  }
};
var themeName = 'CommentSense';

var _default = (0, _styles.createMuiTheme)({
  palette: palette,
  themeName: themeName
});

exports["default"] = _default;