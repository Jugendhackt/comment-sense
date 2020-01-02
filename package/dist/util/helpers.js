"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentTab = exports.restoreUserStore = exports.removeStorage = exports.getStorage = exports.setStorage = void 0;

/*global chrome*/
var setStorage = function setStorage(id, value) {
  if (Array.isArray(id) && Array.isArray(value)) {
    for (var i = 0; i < id.length; i++) {
      localStorage.setItem(id[i], value[i]);
    }
  } else {
    localStorage.setItem(id, value);
  }
};

exports.setStorage = setStorage;

var getStorage = function getStorage(id) {
  if (Array.isArray(id)) {
    var arr = [];
    var length = id.length;

    for (var i = 0; i < length; i++) {
      arr.push(localStorage.getItem(id[i]));
    }

    return arr;
  } else {
    return localStorage.getItem(id);
  }
};

exports.getStorage = getStorage;

var removeStorage = function removeStorage(id) {
  localStorage.removeItem(id);
};

exports.removeStorage = removeStorage;

var restoreUserStore = function restoreUserStore(userStore) {
  userStore.username = "";
  userStore.password = "";
  userStore.email = "";
  userStore.sid = "";
  userStore.loggedIn = false;
};

exports.restoreUserStore = restoreUserStore;

var getCurrentTab = function getCurrentTab() {
  return new Promise(function (resolve) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      console.log(tabs[0].url, "getCurrentTab");
      resolve(tabs[0].url);
    });
  });
};

exports.getCurrentTab = getCurrentTab;