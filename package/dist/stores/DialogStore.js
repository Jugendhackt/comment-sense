"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DialogStore = void 0;

var _mobx = require("mobx");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DialogStore = (_class = (_temp =
/*#__PURE__*/
function () {
  function DialogStore() {
    _classCallCheck(this, DialogStore);

    _initializerDefineProperty(this, "openSignIn", _descriptor, this);

    _initializerDefineProperty(this, "openSignUp", _descriptor2, this);

    _initializerDefineProperty(this, "openSignInSuccess", _descriptor3, this);

    _initializerDefineProperty(this, "openSignInFail", _descriptor4, this);

    _initializerDefineProperty(this, "openSignUpSuccess", _descriptor5, this);

    _initializerDefineProperty(this, "openSignUpFail", _descriptor6, this);

    _initializerDefineProperty(this, "openAccount", _descriptor7, this);

    _initializerDefineProperty(this, "anchorElAccount", _descriptor8, this);

    _initializerDefineProperty(this, "openDrawer", _descriptor9, this);
  }

  _createClass(DialogStore, [{
    key: "handleSignIn",
    value: function handleSignIn(signIn) {
      this.openSignIn = signIn;
    }
  }, {
    key: "handleSignUp",
    value: function handleSignUp(signUp) {
      this.openSignUp = signUp;
    }
  }, {
    key: "handleSignInSuccess",
    value: function handleSignInSuccess(signInSuccess) {
      this.openSignInSuccess = signInSuccess;
    }
  }, {
    key: "handleSignInFail",
    value: function handleSignInFail(signInFail) {
      this.openSignInFail = signInFail;
    }
  }, {
    key: "handleSignUpSuccess",
    value: function handleSignUpSuccess(signUpSuccess) {
      this.openSignUpSuccess = signUpSuccess;
    }
  }, {
    key: "handleSignUpFail",
    value: function handleSignUpFail(signUpFail) {
      this.openSignUpFail = signUpFail;
    }
  }, {
    key: "handleAccount",
    value: function handleAccount(account) {
      this.openAccount = account;
    }
  }, {
    key: "handleAnchorElAccount",
    value: function handleAnchorElAccount(anchorEl) {
      this.anchorElAccount = anchorEl;
    }
  }, {
    key: "handleDrawer",
    value: function handleDrawer(drawer) {
      this.openDrawer = drawer;
    }
  }]);

  return DialogStore;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "openSignIn", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "openSignUp", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "openSignInSuccess", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "openSignInFail", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "openSignUpSuccess", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "openSignUpFail", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "openAccount", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "anchorElAccount", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "openDrawer", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "handleSignIn", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleSignIn"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleSignUp", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleSignUp"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleSignInSuccess", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleSignInSuccess"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleSignInFail", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleSignInFail"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleSignUpSuccess", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleSignUpSuccess"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleSignUpFail", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleSignUpFail"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleAccount", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleAccount"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleAnchorElAccount", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleAnchorElAccount"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleDrawer", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleDrawer"), _class.prototype)), _class);
exports.DialogStore = DialogStore;
var _default = DialogStore;
exports["default"] = _default;