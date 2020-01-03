"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserStore = void 0;

var _mobx = require("mobx");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var UserStore = (_class = (_temp =
/*#__PURE__*/
function () {
  function UserStore() {
    _classCallCheck(this, UserStore);

    _initializerDefineProperty(this, "username", _descriptor, this);

    _initializerDefineProperty(this, "password", _descriptor2, this);

    _initializerDefineProperty(this, "email", _descriptor3, this);

    _initializerDefineProperty(this, "sid", _descriptor4, this);

    _initializerDefineProperty(this, "loggedIn", _descriptor5, this);
  }

  _createClass(UserStore, [{
    key: "handleUsername",
    value: function handleUsername(username) {
      this.username = username;
    }
  }, {
    key: "handlePassword",
    value: function handlePassword(password) {
      this.password = password;
    }
  }, {
    key: "handleSid",
    value: function handleSid(sid) {
      this.sid = sid;
    }
  }, {
    key: "handleLoggedIn",
    value: function handleLoggedIn(loggedIn) {
      this.loggedIn = loggedIn;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.username = "";
      this.password = "";
      this.email = "";
      this.sid = "";
      this.loggedIn = false;
    }
  }]);

  return UserStore;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "username", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "";
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "password", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "";
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "email", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "";
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "sid", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "";
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "loggedIn", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "handleUsername", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleUsername"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handlePassword", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handlePassword"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleSid", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleSid"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleLoggedIn", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleLoggedIn"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "reset", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "reset"), _class.prototype)), _class);
exports.UserStore = UserStore;