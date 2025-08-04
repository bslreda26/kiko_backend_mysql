import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Collection from '#models/collection'

export default class extends BaseSeeder {
  async run() {
    // Create sample collections
    await Collection.create({
      name: 'Modern Furniture',
      description: 'Contemporary furniture pieces for modern homes',
      images: JSON.stringify([
        'https://example.com/images/modern-furniture-1.jpg',
        'https://example.com/images/modern-furniture-2.jpg'
      ]),
    })

    await Collection.create({
      name: 'Vintage Classics',
      description: 'Timeless vintage furniture with character',
      images: JSON.stringify([
        'https://example.com/images/vintage-1.jpg',
        'https://example.com/images/vintage-2.jpg'
      ]),
    })

    await Collection.create({
      name: 'Office Essentials',
      description: 'Professional office furniture and accessories',
      images: JSON.stringify([
        'https://example.com/images/office-1.jpg',
        'https://example.com/images/office-2.jpg'
      ]),
    })

    await Collection.create({
      name: 'Outdoor Living',
      description: 'Durable outdoor furniture for patios and gardens',
      images: JSON.stringify([
        'https://example.com/images/outdoor-1.jpg',
        'https://example.com/images/outdoor-2.jpg'
      ]),
    })

    console.log('✅ Collections seeded successfully!')
    console.log('📦 Sample collections created:')
    console.log('   - Modern Furniture')
    console.log('   - Vintage Classics')
    console.log('   - Office Essentials')
    console.log('   - Outdoor Living')
  }
} 