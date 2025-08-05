/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Add isAvailable boolean column with default true
      table.boolean('isAvailable').defaultTo(true).notNullable().index()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Remove the isAvailable column
      table.dropColumn('isAvailable')
    })
  }
}