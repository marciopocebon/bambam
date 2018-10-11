"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _QueryBuilder = _interopRequireDefault(require("../QueryBuilder"));

var _util = require("../lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model =
/*#__PURE__*/
function () {
  _createClass(Model, null, [{
    key: "table",
    get: function get() {
      return (0, _util.makeTableName)(this.name);
    }
  }, {
    key: "primaryKey",
    get: function get() {
      return 'id';
    }
  }, {
    key: "incrementing",
    get: function get() {
      return true;
    }
  }]);

  function Model() {
    _classCallCheck(this, Model);

    this.$attributes = {};
  }

  _createClass(Model, [{
    key: "set",
    value: function set(name, value) {
      this.$attributes[name] = value;
    }
  }, {
    key: "fill",
    value: function fill(attributes) {
      this.$attributes = {};
      this.merge(attributes);
    }
  }, {
    key: "merge",
    value: function merge(attributes) {
      var _this = this;

      _lodash.default.each(attributes, function (value, key) {
        return _this.set(key, value);
      });
    }
  }], [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(data, trx) {
        var modelInstance;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                modelInstance = new this();
                modelInstance.fill(data); // await modelInstance.save(trx)

                return _context.abrupt("return", modelInstance);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function create(_x, _x2) {
        return _create.apply(this, arguments);
      };
    }()
  }, {
    key: "query",
    value: function query() {
      return new _QueryBuilder.default(this);
    }
  }]);

  return Model;
}();

exports.default = Model;