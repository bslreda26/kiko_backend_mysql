#!/bin/bash

# Railway Deployment Script
# This script ensures migrations run during Railway deployment

echo "🚀 Starting Railway deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Run migrations
echo "🗄️ Running database migrations..."
node ace migration:run --force

# Optionally run seeders (uncomment if you want to seed data)
# echo "🌱 Running database seeders..."
# node ace db:seed

echo "✅ Deployment completed successfully!" 