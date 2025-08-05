# Railway Deployment Guide

## Prerequisites
1. Install Railway CLI: `npm install -g @railway/cli`
2. Create a Railway account at https://railway.app
3. Login to Railway: `railway login`

## Step 1: Initialize Railway Project

```bash
# Navigate to your project directory
cd kikobackend

# Initialize Railway project
railway init

# Link to existing project (if you created one on Railway dashboard)
# railway link
```

## Step 2: Add MySQL Database

1. Go to Railway Dashboard
2. Create a new project or use existing one
3. Click "New Service" → "Database" → "MySQL"
4. Note the connection details

## Step 3: Configure Environment Variables

In Railway Dashboard, go to your backend service and add these environment variables:

### Required Variables:
```
NODE_ENV=production
HOST=0.0.0.0
PORT=3333
APP_KEY=your-generated-app-key
LOG_LEVEL=info
SESSION_DRIVER=cookie
```

### Database Variables:
You need to set these individually (Railway MySQL service will provide these):
```
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_DATABASE=your-mysql-database
```

## Step 4: Generate APP_KEY

Generate a new APP_KEY for production:
```bash
node ace generate:key
```

## Step 5: Deploy

```bash
# Deploy to Railway
railway up

# Or deploy from specific branch
railway up --service backend
```

## Step 6: Run Migrations

After deployment, run database migrations:
```bash
railway run npm run migrate
```

## Step 7: Seed Database (Optional)

If you want to seed the database:
```bash
railway run npm run seed
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| NODE_ENV | Environment (production) | Yes |
| HOST | Host binding (0.0.0.0) | Yes |
| PORT | Port number (Railway sets this) | Yes |
| APP_KEY | Application encryption key | Yes |
| LOG_LEVEL | Logging level | Yes |
| DB_HOST | MySQL host | Yes (Railway provides) |
| DB_PORT | MySQL port (usually 3306) | Yes (Railway provides) |
| DB_USER | MySQL username | Yes (Railway provides) |
| DB_PASSWORD | MySQL password | Yes (Railway provides) |
| DB_DATABASE | MySQL database name | Yes (Railway provides) |
| SESSION_DRIVER | Session storage (cookie) | Yes |

## Troubleshooting

1. **Build fails**: Check if all dependencies are in `package.json`
2. **Database connection fails**: Verify `MYSQL_URL` is set correctly
3. **App crashes**: Check logs with `railway logs`
4. **Migrations fail**: Ensure database is accessible and credentials are correct

## Useful Commands

```bash
# View logs
railway logs

# Open Railway dashboard
railway open

# Check service status
railway status

# Run commands on Railway
railway run npm run migrate
railway run npm run seed
``` 