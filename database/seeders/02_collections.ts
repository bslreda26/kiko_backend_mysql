/* eslint-disable prettier/prettier */
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const now = new Date()
    const collections = [
      {
        name: 'Modern Furniture',
        description: 'Contemporary furniture pieces for modern homes',
        images: JSON.stringify([
          'https://example.com/images/modern-furniture-1.jpg',
          'https://example.com/images/modern-furniture-2.jpg',
        ]),
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Vintage Collection',
        description: 'Classic vintage furniture with timeless appeal',
        images: JSON.stringify([
          'https://example.com/images/vintage-1.jpg',
          'https://example.com/images/vintage-2.jpg',
        ]),
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Office Essentials',
        description: 'Professional office furniture and accessories',
        images: JSON.stringify([
          'https://example.com/images/office-1.jpg',
          'https://example.com/images/office-2.jpg',
        ]),
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Outdoor Living',
        description: 'Durable outdoor furniture for patios and gardens',
        images: JSON.stringify([
          'https://example.com/images/outdoor-1.jpg',
          'https://example.com/images/outdoor-2.jpg',
        ]),
        created_at: now,
        updated_at: now,
      },
    ]

    await db.table('collections').multiInsert(collections)
  }
} 