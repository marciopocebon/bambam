"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bambam =
/*#__PURE__*/
function () {
  function Bambam() {
    _classCallCheck(this, Bambam);

    if (!Bambam.instance) {
      this.$connected = false;
      Bambam.instance = this;
    }

    return Bambam.instance;
  }

  _createClass(Bambam, [{
    key: "connect",
    value: function connect(knex) {
      this.$knex = knex;
      this.$connected = true;
    }
  }]);

  return Bambam;
}();

var instance = new Bambam();
module.exports = instance;