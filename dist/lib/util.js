'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTableName = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _pluralize = _interopRequireDefault(require("pluralize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeTableName = function makeTableName(modelName) {
  return _lodash.default.snakeCase((0, _pluralize.default)(modelName));
};

exports.makeTableName = makeTableName;