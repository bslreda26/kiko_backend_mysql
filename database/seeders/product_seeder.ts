import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'
import Collection from '#models/collection'

export default class extends BaseSeeder {
  async run() {
    // Get collections to associate products with
    const modernFurniture = await Collection.query().where('name', 'Modern Furniture').firstOrFail()
    const vintageClassics = await Collection.query().where('name', 'Vintage Classics').firstOrFail()
    const officeEssentials = await Collection.query().where('name', 'Office Essentials').firstOrFail()
    const outdoorLiving = await Collection.query().where('name', 'Outdoor Living').firstOrFail()

    // Modern Furniture Products
    await Product.create({
      title: 'Modern Leather Sofa',
      description: 'Contemporary 3-seater leather sofa with clean lines',
      image: 'https://example.com/images/modern-leather-sofa.jpg',
      dimensions: JSON.stringify({ width: 220, height: 85, depth: 95 }),
      price: 1299.99,
      collectionId: modernFurniture.id,
    })

    await Product.create({
      title: 'Glass Coffee Table',
      description: 'Minimalist glass coffee table with metal frame',
      image: 'https://example.com/images/glass-coffee-table.jpg',
      dimensions: JSON.stringify({ width: 120, height: 45, depth: 60 }),
      price: 299.99,
      collectionId: modernFurniture.id,
    })

    // Vintage Classics Products
    await Product.create({
      title: 'Antique Wooden Chair',
      description: 'Handcrafted wooden chair with intricate details',
      image: 'https://example.com/images/antique-wooden-chair.jpg',
      dimensions: JSON.stringify({ width: 50, height: 95, depth: 55 }),
      price: 450.00,
      collectionId: vintageClassics.id,
    })

    await Product.create({
      title: 'Vintage Side Table',
      description: 'Classic side table with brass accents',
      image: 'https://example.com/images/vintage-side-table.jpg',
      dimensions: JSON.stringify({ width: 45, height: 65, depth: 45 }),
      price: 275.50,
      collectionId: vintageClassics.id,
    })

    // Office Essentials Products
    await Product.create({
      title: 'Ergonomic Office Chair',
      description: 'Adjustable office chair with lumbar support',
      image: 'https://example.com/images/ergonomic-office-chair.jpg',
      dimensions: JSON.stringify({ width: 65, height: 120, depth: 70 }),
      price: 599.99,
      collectionId: officeEssentials.id,
    })

    await Product.create({
      title: 'Standing Desk',
      description: 'Electric standing desk with memory settings',
      image: 'https://example.com/images/standing-desk.jpg',
      dimensions: JSON.stringify({ width: 140, height: 120, depth: 70 }),
      price: 899.99,
      collectionId: officeEssentials.id,
    })

    // Outdoor Living Products
    await Product.create({
      title: 'Weather-Resistant Patio Set',
      description: 'Complete 4-seater patio furniture set',
      image: 'https://example.com/images/patio-set.jpg',
      dimensions: JSON.stringify({ width: 200, height: 75, depth: 100 }),
      price: 799.99,
      collectionId: outdoorLiving.id,
    })

    await Product.create({
      title: 'Garden Bench',
      description: 'Rustic wooden garden bench',
      image: 'https://example.com/images/garden-bench.jpg',
      dimensions: JSON.stringify({ width: 120, height: 45, depth: 40 }),
      price: 199.99,
      collectionId: outdoorLiving.id,
    })

    console.log('✅ Products seeded successfully!')
    console.log('🛍️ Sample products created:')
    console.log('   - Modern Leather Sofa ($1299.99)')
    console.log('   - Glass Coffee Table ($299.99)')
    console.log('   - Antique Wooden Chair ($450.00)')
    console.log('   - Vintage Side Table ($275.50)')
    console.log('   - Ergonomic Office Chair ($599.99)')
    console.log('   - Standing Desk ($899.99)')
    console.log('   - Weather-Resistant Patio Set ($799.99)')
    console.log('   - Garden Bench ($199.99)')
  }
} 