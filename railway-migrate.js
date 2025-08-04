#!/usr/bin/env node

/**
 * Railway Migration Helper Script
 * Use this to run migrations and verify database connection on Railway
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Railway Migration Helper');
console.log('==========================');

try {
  // Test database connection
  console.log('\n📡 Testing database connection...');
  execSync('node ace migration:status', { stdio: 'inherit' });
  
  // Run migrations
  console.log('\n🗄️ Running migrations...');
  execSync('node ace migration:run --force', { stdio: 'inherit' });
  
  // Show migration status
  console.log('\n📊 Migration status:');
  execSync('node ace migration:status', { stdio: 'inherit' });
  
  console.log('\n✅ Migrations completed successfully!');
  
} catch (error) {
  console.error('\n❌ Error running migrations:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Check if MYSQL_URL is set in Railway environment variables');
  console.log('2. Verify the MySQL service is connected to your app');
  console.log('3. Check Railway logs for connection errors');
  process.exit(1);
} 