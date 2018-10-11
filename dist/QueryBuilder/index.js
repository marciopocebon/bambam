"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bambam = require("../bambam");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryBuilder = function QueryBuilder(Model) {
  _classCallCheck(this, QueryBuilder);

  this.Model = Model;
  console.log('teste', _bambam.instance);
};

exports.default = QueryBuilder;