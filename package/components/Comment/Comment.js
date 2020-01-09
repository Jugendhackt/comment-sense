"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _hooks = require("../../util/hooks");

var _routes = require("../../util/routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    comment: {
      display: "flex",
      flexDirection: "column"
    },
    paper: {
      margin: theme.spacing(2),
      padding: "5%",
      minWidth: "70%"
    },
    box: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    mb: {
      marginBottom: theme.spacing(2)
    },
    text: {
      marginLeft: theme.spacing(1)
    }
  };
});

var Comment = function Comment(props) {
  var _useStores = (0, _hooks.useStores)(),
      userStore = _useStores.userStore;

  var classes = useStyles();

  var sendVote = function sendVote() {
    console.log(userStore.sid);
    fetch((0, _routes.voteCommentRoute)(), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sid: userStore.sid,
        username: userStore.username,
        id: props.id,
        vote: !props.voted,
        password: "q"
      })
    }).then(function (res) {
      if (res.status === 200) {} else if (res.status === 400) {}
    });
  };

  return _react["default"].createElement(_core.ListItem, {
    button: true,
    className: classes.comment
  }, _react["default"].createElement(_core.Paper, {
    className: classes.paper
  }, _react["default"].createElement(_core.Box, {
    className: "".concat(classes.box, " ").concat(classes.mb)
  }, _react["default"].createElement(_core.Typography, {
    variant: "h5"
  }, props.title), _react["default"].createElement(_core.Typography, {
    variant: "caption"
  }, props.date)), _react["default"].createElement(_core.ListItemText, {
    primary: props.content,
    className: classes.mb
  }), _react["default"].createElement(_core.Box, {
    className: classes.box
  }, _react["default"].createElement(_core.Typography, {
    variant: "caption"
  }, props.author), _react["default"].createElement(_core.Box, {
    display: "flex",
    onClick: sendVote
  }, _react["default"].createElement(_icons.ThumbUp, {
    color: props.voted ? "primary" : "inherit"
  }), _react["default"].createElement(_core.ListItemText, {
    primary: props.votes,
    className: classes.text
  })))));
};

var _default = Comment;
exports["default"] = _default;