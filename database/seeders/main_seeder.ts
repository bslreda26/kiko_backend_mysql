import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserSeeder from './user_seeder.js'
import CollectionSeeder from './collection_seeder.js'
import ProductSeeder from './product_seeder.js'

export default class extends BaseSeeder {
  async run() {
    console.log('🌱 Starting database seeding...')
    
    // Run seeders in order
    await new UserSeeder(this.client).run()
    await new CollectionSeeder(this.client).run()
    await new ProductSeeder(this.client).run()
    
    console.log('✅ Database seeding completed successfully!')
    console.log('📊 Summary:')
    console.log('   - 4 users created')
    console.log('   - 4 collections created')
    console.log('   - 8 products created')
    console.log('')
    console.log('🔑 Default login credentials:')
    console.log('   Email: admin@example.com')
    console.log('   Password: password123')
  }
} 