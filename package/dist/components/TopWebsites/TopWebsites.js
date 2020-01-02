"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TopWebsites = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _uuid = _interopRequireDefault(require("uuid"));

var _constants = require("../../util/constants");

var _Website = require("../Website/Website");

var _WebsiteStore = require("../../stores/WebsiteStore");

var _mobxReactLite = require("mobx-react-lite");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var useStyles = (0, _core.makeStyles)(function () {
  return {
    progress: {
      margin: "5%"
    },
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  };
});
var TopWebsites = (0, _mobxReactLite.observer)(function (props) {
  var websiteStore = (0, _react.useContext)(_WebsiteStore.WebsiteStoreContext);
  var classes = useStyles();
  (0, _react.useEffect)(function () {
    fetch("".concat(_constants.ipAddress, "/api/sites/")).then(function (res) {
      if (res.ok) return res.json();
    }).then(function (res) {
      websiteStore.websites = res.sites;
    });
  }, []);

  var showWebsites = function showWebsites() {
    if (Array.isArray(websiteStore.websites) && websiteStore.websites.length) {
      return Array.from(websiteStore.websites).map(function (item) {
        return _react["default"].createElement(_Website.Website, {
          url: item.url,
          comments: item.comments,
          key: _uuid["default"].v4()
        });
      });
    } else {
      return _react["default"].createElement(_core.Box, {
        className: classes.box
      }, _react["default"].createElement(_core.CircularProgress, {
        size: 100,
        className: classes.progress
      }), _react["default"].createElement(_core.CircularProgress, {
        size: 100,
        className: classes.progress
      }), _react["default"].createElement(_core.CircularProgress, {
        size: 100,
        className: classes.progress
      }), _react["default"].createElement(_core.CircularProgress, {
        size: 100,
        className: classes.progress
      }), _react["default"].createElement(_core.CircularProgress, {
        size: 100,
        className: classes.progress
      }));
    }
  };

  return _react["default"].createElement(_core.List, null, showWebsites());
});
exports.TopWebsites = TopWebsites;
var _default = TopWebsites;
exports["default"] = _default;