/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    // Use raw SQL to alter the spaceimage column to LONGTEXT
    await this.db.rawQuery('ALTER TABLE products MODIFY COLUMN spaceimage LONGTEXT NULL')
  }

  async down() {
    // Revert back to TEXT type
    await this.db.rawQuery('ALTER TABLE products MODIFY COLUMN spaceimage TEXT NULL')
  }
}