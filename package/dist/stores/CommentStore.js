"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CommentStore = void 0;

var _mobx = require("mobx");

var _class, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var CommentStore = (_class = (_temp =
/*#__PURE__*/
function () {
  function CommentStore() {
    _classCallCheck(this, CommentStore);

    _initializerDefineProperty(this, "comments", _descriptor, this);
  }

  _createClass(CommentStore, [{
    key: "handleComments",
    value: function handleComments(comments) {
      this.comments = comments;
    }
  }]);

  return CommentStore;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "comments", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, "handleComments", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleComments"), _class.prototype)), _class);
exports.CommentStore = CommentStore;
var _default = CommentStore;
exports["default"] = _default;