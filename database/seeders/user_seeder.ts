import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    // Create a default admin user
    await User.create({
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: await hash.make('password123'),
    })

    // Create a test user
    await User.create({
      fullName: 'Test User',
      email: 'test@example.com',
      password: await hash.make('test123'),
    })

    // Create additional users for testing
    await User.create({
      fullName: 'John Doe',
      email: 'john@example.com',
      password: await hash.make('john123'),
    })

    await User.create({
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      password: await hash.make('jane123'),
    })

    console.log('✅ Users seeded successfully!')
    console.log('📧 Default users created:')
    console.log('   - admin@example.com (password: password123)')
    console.log('   - test@example.com (password: test123)')
    console.log('   - john@example.com (password: john123)')
    console.log('   - jane@example.com (password: jane123)')
  }
} 