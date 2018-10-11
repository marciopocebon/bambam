"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Model", {
  enumerable: true,
  get: function get() {
    return _Model.default;
  }
});
exports.default = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _Model = _interopRequireDefault(require("./Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = null;

var Bambam =
/*#__PURE__*/
function () {
  function Bambam(options) {
    _classCallCheck(this, Bambam);

    this.knex = (0, _knex.default)(options);
  }

  _createClass(Bambam, null, [{
    key: "connect",
    value: function connect(options) {
      return new this(options);
    }
  }]);

  return Bambam;
}();

var _default = function _default(options) {
  if (!connection) {
    connection = new Bambam(options);
  }

  return connection;
};

exports.default = _default;