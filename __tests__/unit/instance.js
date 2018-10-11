import test from 'ava'
import instance from '../../src/instance'

test('should wait for connection', t => {
  t.is(instance.$connected, false)
  t.is(instance.$knex, null)
})

test('should reuse singleton instance', t => {
  instance.connect('test')

  const db = require('../../src/instance')

  t.is(db.$knex, 'test')
})
