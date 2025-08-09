/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    // Make the spaceimage column nullable
    await this.db.rawQuery('ALTER TABLE products MODIFY COLUMN spaceimage LONGTEXT NULL')
  }

  async down() {
    // Revert back to NOT NULL (though this might cause issues if there are NULL values)
    await this.db.rawQuery('ALTER TABLE products MODIFY COLUMN spaceimage LONGTEXT NOT NULL')
  }
}