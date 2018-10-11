import _ from 'lodash'

import QueryBuilder from '../QueryBuilder'
import * as util from '../lib/util'

export default class Model {
  /**
   * Boot model
   */
  constructor () {
    this.$attributes = {}
    this.$persisted = false
    this.$originalAttributes = {}
    this.$visible = this.constructor.visible
    this.$hidden = this.constructor.hidden
  }

  /**
   * The table name for the model. It is dynamically generated
   * from the Model name by pluralizing it and converting it
   * to lowercase.
   *
   * @attribute table
   *
   * @return {String}
   *
   * @static
   */
  static get table () {
    return util.makeTableName(this.name)
  }

  /**
   * The primary key for the model. You can change it
   * to anything you want, just make sure that the
   * value of this key will always be unique.
   *
   * @attribute primaryKey
   *
   * @return {String} The default value is `id`
   *
   * @static
   */
  static get primaryKey () {
    return 'id'
  }

  /**
   * Tell whether primary key is supposed to be incrementing
   * or not. If `false` is returned then you are responsible for
   * setting the `primaryKeyValue` for the model instance.
   *
   * @attribute incrementing
   *
   * @return {Boolean}
   *
   * @static
   */
  static get incrementing () {
    return true
  }

  /**
   * The attribute name for created at timestamp.
   *
   * @attribute createdAtColumn
   *
   * @return {String}
   *
   * @static
   */
  static get createdAtColumn () {
    return 'created_at'
  }

  /**
   * The attribute name for updated at timestamp.
   *
   * @attribute updatedAtColumn
   *
   * @return {String}
   *
   * @static
   */
  static get updatedAtColumn () {
    return 'updated_at'
  }

  /**
   * Tells whether model instance is new or
   * persisted to database.
   *
   * @attribute isNew
   *
   * @return {Boolean}
   */
  get isNew () {
    return !this.$persisted
  }

  /**
   * Creates a new model instances from payload
   * and also persist it to database at the
   * same time.
   *
   * @method create
   *
   * @param  {Object} payload
   *
   * @return {Model} Model instance is returned
   */
  static async create (payload) {
    const model = new this()

    model.fill(payload)

    await model.save()

    return model
  }

  /**
   * Get fresh instance of query builder for
   * this model.
   *
   * @method query
   *
   * @return {QueryBuilder}
   *
   * @static
   */
  static query () {
    return new QueryBuilder(this)
  }

  /**
   * Persist model instance to the database. It will create
   * a new row when model has not been persisted already,
   * otherwise will update it.
   *
   * @method save
   * @async
   *
   * @return {Boolean} Whether or not the model was persisted
   */
  async save () {
    return this.isNew ? this._insert() : this._update()
  }

  /**
   * Insert values to the database. This method will
   * call before and after hooks for `create` and
   * `save` event.
   *
   * @method _insert
   * @async
   *
   * @return {Boolean}
   *
   * @private
   */
  async _insert () {
    /**
     * Set timestamps
     */
    this._setCreatedAt(this.$attributes)
    this._setUpdatedAt(this.$attributes)

    const result = await this.constructor
      .query()
      .returning(this.constructor.primaryKey)
      .insert(this.$attributes)

    /**
     * Only set the primary key value when incrementing is
     * set to true on model
     */
    if (this.constructor.incrementing) {
      this.primaryKeyValue = result[0]
    }

    this.$persisted = true

    return true
  }

  /**
   * Checks for existence of setter on model and if exists
   * returns the return value of setter, otherwise returns
   * the default value.
   *
   * @method _getSetterValue
   *
   * @param  {String}        key
   * @param  {Mixed}        value
   *
   * @return {Mixed}
   *
   * @private
   */
  _getSetterValue (key, value) {
    const setterName = util.getSetterName(key)
    return typeof this[setterName] === 'function'
      ? this[setterName](value)
      : value
  }

  /**
   * Checks for existence of getter on model and if exists
   * returns the return value of getter, otherwise returns
   * the default value
   *
   * @method _getGetterValue
   *
   * @param  {String}        key
   * @param  {Mixed}         value
   * @param  {Mixed}         [passAttrs = null]
   *
   * @return {Mixed}
   *
   * @private
   */
  _getGetterValue (key, value, passAttrs = null) {
    const getterName = util.getGetterName(key)
    return typeof this[getterName] === 'function'
      ? this[getterName](passAttrs || value)
      : value
  }

  /**
   * Sets `created_at` column on the values object.
   *
   * Note: This method will mutate the original object
   * by adding a new key/value pair.
   *
   * @method _setCreatedAt
   *
   * @param  {Object}     values
   *
   * @private
   */
  _setCreatedAt (values) {
    const createdAtColumn = this.constructor.createdAtColumn
    if (createdAtColumn) {
      values[createdAtColumn] = this._getSetterValue(
        createdAtColumn,
        new Date()
      )
    }
  }

  /**
   * Sets `updated_at` column on the values object.
   *
   * Note: This method will mutate the original object
   * by adding a new key/value pair.
   *
   * @method _setUpdatedAt
   *
   * @param  {Object}     values
   *
   * @private
   */
  _setUpdatedAt (values) {
    const updatedAtColumn = this.constructor.updatedAtColumn
    if (updatedAtColumn) {
      values[updatedAtColumn] = this._getSetterValue(
        updatedAtColumn,
        new Date()
      )
    }
  }

  /**
   * Set attribute on model instance. Setting properties
   * manually or calling the `set` function has no
   * difference.
   *
   * NOTE: this method will call the setter
   *
   * @method set
   *
   * @param  {String} name
   * @param  {Mixed} value
   *
   * @return {void}
   */
  set (name, value) {
    this.$attributes[name] = this._getSetterValue(name, value)
  }

  /**
   * Set attributes on model instance in bulk.
   *
   * NOTE: Calling this method will remove the existing attributes.
   *
   * @method fill
   *
   * @param  {Object} attributes
   *
   * @return {void}
   */
  fill (attributes) {
    this.$attributes = {}
    this.merge(attributes)
  }

  /**
   * Merge attributes into on a model instance without
   * overriding existing attributes and their values
   *
   * @method fill
   *
   * @param  {Object} attributes
   *
   * @return {void}
   */
  merge (attributes) {
    _.each(attributes, (value, key) => this.set(key, value))
  }
}
