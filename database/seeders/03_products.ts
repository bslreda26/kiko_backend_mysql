/* eslint-disable prettier/prettier */
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const now = new Date()
    const products = [
      {
        title: 'Modern Leather Sofa',
        description: 'Comfortable 3-seater leather sofa with clean lines',
        image: JSON.stringify([
          'https://example.com/images/leather-sofa-1.jpg',
          'https://example.com/images/leather-sofa-2.jpg',
        ]),
        dimensions: JSON.stringify({
          width: 220,
          height: 85,
          depth: 95,
        }),
        price: 1299.99,
        collection_id: 1, // Modern Furniture
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Vintage Wooden Table',
        description: 'Solid oak dining table with classic design',
        image: JSON.stringify([
          'https://example.com/images/vintage-table-1.jpg',
          'https://example.com/images/vintage-table-2.jpg',
        ]),
        dimensions: JSON.stringify({
          width: 180,
          height: 75,
          depth: 90,
        }),
        price: 899.99,
        collection_id: 2, // Vintage Collection
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Ergonomic Office Chair',
        description: 'Adjustable office chair with lumbar support',
        image: JSON.stringify([
          'https://example.com/images/office-chair-1.jpg',
          'https://example.com/images/office-chair-2.jpg',
        ]),
        dimensions: JSON.stringify({
          width: 65,
          height: 120,
          depth: 70,
        }),
        price: 299.99,
        collection_id: 3, // Office Essentials
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Patio Dining Set',
        description: 'Weather-resistant outdoor dining set for 6 people',
        image: JSON.stringify([
          'https://example.com/images/patio-set-1.jpg',
          'https://example.com/images/patio-set-2.jpg',
        ]),
        dimensions: JSON.stringify({
          width: 150,
          height: 75,
          depth: 90,
        }),
        price: 599.99,
        collection_id: 4, // Outdoor Living
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Minimalist Coffee Table',
        description: 'Sleek glass and metal coffee table',
        image: JSON.stringify([
          'https://example.com/images/coffee-table-1.jpg',
          'https://example.com/images/coffee-table-2.jpg',
        ]),
        dimensions: JSON.stringify({
          width: 120,
          height: 45,
          depth: 60,
        }),
        price: 199.99,
        collection_id: 1, // Modern Furniture
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Vintage Armchair',
        description: 'Comfortable vintage armchair with fabric upholstery',
        image: JSON.stringify([
          'https://example.com/images/vintage-chair-1.jpg',
          'https://example.com/images/vintage-chair-2.jpg',
        ]),
        dimensions: JSON.stringify({
          width: 85,
          height: 95,
          depth: 85,
        }),
        price: 449.99,
        collection_id: 2, // Vintage Collection
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Standing Desk',
        description: 'Adjustable height standing desk for modern offices',
        image: JSON.stringify([
          'https://example.com/images/standing-desk-1.jpg',
          'https://example.com/images/standing-desk-2.jpg',
        ]),
        dimensions: JSON.stringify({
          width: 140,
          height: 120,
          depth: 70,
        }),
        price: 399.99,
        collection_id: 3, // Office Essentials
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Garden Bench',
        description: 'Rustic wooden garden bench for outdoor spaces',
        image: JSON.stringify([
          'https://example.com/images/garden-bench-1.jpg',
          'https://example.com/images/garden-bench-2.jpg',
        ]),
        dimensions: JSON.stringify({
          width: 120,
          height: 45,
          depth: 40,
        }),
        price: 149.99,
        collection_id: 4, // Outdoor Living
        created_at: now,
        updated_at: now,
      },
    ]

    await db.table('products').multiInsert(products)
  }
} 