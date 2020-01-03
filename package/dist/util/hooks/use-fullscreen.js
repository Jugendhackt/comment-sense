"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useFullscreen = void 0;

var _core = require("@material-ui/core");

var useFullscreen = function useFullscreen(size) {
  var theme = (0, _core.useTheme)();
  return (0, _core.useMediaQuery)(theme.breakpoints.down(size));
};

exports.useFullscreen = useFullscreen;
var _default = useFullscreen;
exports["default"] = _default;