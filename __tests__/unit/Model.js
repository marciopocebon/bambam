import test from 'ava'
import knex from 'knex'
import helpers from '../helpers'
import Model from '../../src/Model'
import { instance } from '../../src/bambam'

test.before(t => {
  const { $knex } = instance.connect(
    knex({
      client: 'sqlite3',
      connection: {
        filename: './__tests__/tests.sqlite'
      },
      useNullAsDefault: true
    })
  )

  t.context.$knex = $knex

  return helpers.createTables($knex)
})

test.after.always('drop', t => {
  return helpers.dropTables(t.context.$knex)
})

test('should match table name', t => {
  class User extends Model {}
  class UserGroup extends Model {}

  t.is(User.table, 'users')
  t.is(UserGroup.table, 'user_groups')
})

test('should have default primary key', t => {
  class User extends Model {}

  t.is(User.primaryKey, 'id')
})

test('should be able to set primary key', t => {
  class User extends Model {
    static get primaryKey () {
      return 'uuid'
    }
  }

  t.is(User.primaryKey, 'uuid')
})

test('should have default incrementing value', t => {
  class User extends Model {}

  t.is(User.incrementing, true)
})

test('should be able to set incrementing value', t => {
  class User extends Model {
    static get incrementing () {
      return false
    }
  }

  t.is(User.incrementing, false)
})

test('should be able to set attribute', t => {
  class User extends Model {}

  const user = new User()

  user.set('name', 'Diego')

  t.is(user.$attributes.name, 'Diego')
})

test('should be able to merge attributes', t => {
  class User extends Model {}

  const user = new User()

  const data = { name: 'Diego', company: 'Rocketseat' }

  user.merge(data)

  t.deepEqual(user.$attributes, data)
})

test('should be able to fill attributes', t => {
  class User extends Model {}

  const user = new User()

  user.set('age', 23)

  const data = { name: 'Diego', company: 'Rocketseat' }

  user.fill(data)

  t.deepEqual(user.$attributes, data)
  t.is(user.$attributes.age, undefined)
})

test('should be able to create new', async t => {
  class User extends Model {}

  const user = await User.create({ name: 'Diego Fernandes' })

  const data = await t.context.$knex.table('users').first('name')

  t.is(user.$persisted, true)
  t.is(user.isNew, false)
  t.is(data.name, 'Diego Fernandes')
})

// test('should add timestamps', async t => {
//   const spy = sinon.spy(QueryBuilder.prototype, 'insert')

//   class User extends Model {}

//   const user = await User.create({ name: 'Diego Fernandes' })
// })
