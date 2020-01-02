"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Website = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _lang = require("../../util/lang");

var _icons = require("@material-ui/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    website: {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(1)
    },
    title: {
      margin: theme.spacing(2)
    },
    paper: {
      margin: theme.spacing(1),
      padding: "5%",
      minWidth: "40%"
    },
    text: {
      marginLeft: theme.spacing(1)
    }
  };
});

var Website = function Website(props) {
  var classes = useStyles();

  var showTitle = function showTitle() {
    if (props.url.length > 40) {
      return props.url.substring(0, 40) + "...";
    }

    return props.url;
  };

  return _react["default"].createElement(_core.ListItem, {
    button: true,
    className: classes.website
  }, _react["default"].createElement(_core.Paper, {
    className: classes.paper
  }, _react["default"].createElement(_core.Typography, {
    variant: "h5"
  }, showTitle()), _react["default"].createElement("br", null), _react["default"].createElement(_core.Box, {
    display: "flex"
  }, _react["default"].createElement(_icons.ThumbUp, {
    color: "secondary"
  }), _react["default"].createElement(_core.ListItemText, {
    primary: props.comments,
    className: classes.text
  })), _react["default"].createElement(_core.Link, {
    color: "inherit",
    href: props.url
  }, _react["default"].createElement(_core.Button, {
    color: "primary",
    variant: "contained"
  }, _lang.langDe.toWebsite))));
};

exports.Website = Website;