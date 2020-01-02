"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TopComments = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uuid = _interopRequireDefault(require("uuid"));

var _mobxReactLite = require("mobx-react-lite");

var _core = require("@material-ui/core");

var _Comment = require("../Comment");

var _constants = require("../../util/constants");

var _hooks = require("../../util/hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    progress: {
      margin: "5%"
    }
  };
});
var TopComments = (0, _mobxReactLite.observer)(function (props) {
  var classes = useStyles();

  var _useStores = (0, _hooks.useStores)(),
      commentStore = _useStores.commentStore;

  (0, _react.useEffect)(function () {
    fetch("".concat(_constants.ipAddress, "/api/comments?count=5")).then(function (res) {
      if (res.ok) return res.json();
    }).then(function (res) {
      commentStore.comments = res.comments;
    });
  }, []);

  function showComments() {
    if (Array.isArray(commentStore.comments) && commentStore.comments.length) {
      return commentStore.comments.map(function (item) {
        return _react["default"].createElement(_Comment.Comment, {
          date: item.date,
          content: item.content,
          title: item.headline,
          url: item.url,
          author: item.author,
          votes: item.likes,
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
  }

  ;
  return _react["default"].createElement(_core.List, null, showComments());
});
exports.TopComments = TopComments;
var _default = TopComments;
exports["default"] = _default;