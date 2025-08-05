/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('title').notNullable()
      table.text('description').nullable()
      table.text('image').nullable() // JSON or string - using text for compatibility
      table.text('dimensions').nullable() // JSON object with width, height, depth
      table.decimal('price', 10, 2).nullable() // Made nullable as per previous migration
      table
        .integer('collection_id')
        .unsigned()
        .references('id')
        .inTable('collections')
        .onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}