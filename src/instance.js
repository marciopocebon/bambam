class Bambam {
  constructor () {
    if (!Bambam.instance) {
      this.$knex = null
      this.$connected = false

      Bambam.instance = this
    }

    return Bambam.instance
  }

  connect (knex) {
    this.$knex = knex
    this.$connected = true

    return this
  }
}

const instance = new Bambam()

module.exports = instance
