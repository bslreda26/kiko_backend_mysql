/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collections'

  async up() {
    // Use raw SQL to alter the images column to LONGTEXT
    await this.db.rawQuery('ALTER TABLE collections MODIFY COLUMN images LONGTEXT NULL')
  }

  async down() {
    // Revert back to TEXT type
    await this.db.rawQuery('ALTER TABLE collections MODIFY COLUMN images TEXT NULL')
  }
}