"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useCurrentTab = void 0;

var useCurrentTab = function useCurrentTab() {
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

exports.useCurrentTab = useCurrentTab;
var _default = useCurrentTab;
exports["default"] = _default;