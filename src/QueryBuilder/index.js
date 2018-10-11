import { instance } from '../bambam'
import * as util from '../lib/util'
import proxyGet from '../lib/proxyGet'

const proxyHandler = {
  get: proxyGet('query', false, function (target, name) {
    const queryScope = util.makeScopeName(name)

    if (name === 'then') {
      throw new Error(`Make sure to call fetch to execute the query`)
    }

    /**
     * if value is a local query scope and a function, please
     * execute it
     */
    if (typeof target.Model[queryScope] === 'function') {
      return function (...args) {
        target.Model[queryScope](this, ...args)
        return this
      }
    }
  })
}

/**
 * Query builder for the models extended
 * by the @ref('Database') class.
 *
 * @class QueryBuilder
 * @constructor
 */
export default class QueryBuilder {
  constructor (Model) {
    this.Model = Model

    /**
     * Reference to query builder with pre selected table
     */
    this.query = instance.$knex.table(this.Model.table)

    return new Proxy(this, proxyHandler)
  }

  /**
   * Execute insert query
   *
   * @method insert
   *
   * @param  {Object} attributes
   *
   * @return {Array}
   */
  async insert (data) {
    return this.query.insert(data)
  }
}
