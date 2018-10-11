const bambam = require('bambam')

bambam.instance.connect({
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite'
  }
})

require('./other')
