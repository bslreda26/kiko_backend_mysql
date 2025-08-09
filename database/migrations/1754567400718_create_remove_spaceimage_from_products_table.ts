/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    // Drop the spaceimage column
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('spaceimage')
    })
  }

  async down() {
    // Recreate the spaceimage column if needed to rollback
    this.schema.alterTable(this.tableName, (table) => {
      table.text('spaceimage').nullable()
    })
  }
}