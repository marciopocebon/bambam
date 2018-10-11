module.exports = {
  createTables (db) {
    return Promise.all([
      db.schema.createTable('users', function (table) {
        table.increments()
        table.string('name')
        table.string('email')
        table.timestamps()
      })
    ])
  },

  dropTables (db) {
    return Promise.all([db.schema.dropTable('users')])
  }
}
