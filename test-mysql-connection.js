import mysql from 'mysql2/promise'
import { config } from 'dotenv'

// Load environment variables from .env file
config()

async function testConnection() {
  try {
    let connectionConfig
    
    if (process.env.MYSQL_URL) {
      // Use the connection string
      console.log('🔗 Using MYSQL_URL connection string')
      connectionConfig = process.env.MYSQL_URL
    } else {
      // Use individual parameters
      console.log('🔗 Using individual connection parameters')
      connectionConfig = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'kikobackend'
      }
    }

    const connection = await mysql.createConnection(connectionConfig)

    console.log('✅ MySQL connection successful!')
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test')
    console.log('✅ Query test successful:', rows)
    
    await connection.end()
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message)
    console.log('\nTroubleshooting tips:')
    console.log('1. Make sure MySQL is running')
    console.log('2. Check your database credentials in .env file')
    console.log('3. Ensure the database exists')
    console.log('4. Verify the user has proper permissions')
    console.log('\nCurrent connection settings:')
    
    if (process.env.MYSQL_URL) {
      console.log(`MYSQL_URL: ${process.env.MYSQL_URL.replace(/\/\/.*@/, '//***:***@')}`) // Hide credentials
    } else {
      console.log(`Host: ${process.env.DB_HOST || 'localhost'}`)
      console.log(`Port: ${process.env.DB_PORT || 3306}`)
      console.log(`User: ${process.env.DB_USER || 'root'}`)
      console.log(`Database: ${process.env.DB_DATABASE || 'kikobackend'}`)
    }
  }
}

testConnection() 