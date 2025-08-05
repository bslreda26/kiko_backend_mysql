/* eslint-disable prettier/prettier */
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const now = new Date()
    const users = [
      {
        full_name: 'John Doe',
        email: 'john@example.com',
        password: await hash.make('password123'),
        created_at: now,
        updated_at: now,
      },
      {
        full_name: 'Jane Smith',
        email: 'jane@example.com',
        password: await hash.make('password123'),
        created_at: now,
        updated_at: now,
      },
      {
        full_name: 'Admin User',
        email: 'admin@example.com',
        password: await hash.make('admin123'),
        created_at: now,
        updated_at: now,
      },
    ]

    await db.table('users').multiInsert(users)
  }
} 