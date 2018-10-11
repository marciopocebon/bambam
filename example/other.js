const { instance, Model } = require('bambam')

console.log(instance)

class User extends Model {}

User.query()
