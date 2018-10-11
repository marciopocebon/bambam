"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "instance", {
  enumerable: true,
  get: function get() {
    return _instance.default;
  }
});
Object.defineProperty(exports, "Model", {
  enumerable: true,
  get: function get() {
    return _Model.default;
  }
});

require("@babel/polyfill");

var _instance = _interopRequireDefault(require("./instance"));

var _Model = _interopRequireDefault(require("./Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }