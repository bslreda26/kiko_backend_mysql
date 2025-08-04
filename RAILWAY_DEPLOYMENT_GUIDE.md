# Railway Deployment Guide

## Local Testing

### 1. Test Database Connection
```bash
node test-mysql-connection.js
```
Expected output: `✅ MySQL connection successful!`

### 2. Test Local Server
```bash
npm run dev
```
Then test the API:
```bash
curl http://localhost:3333/
curl http://localhost:3333/api/collections
```

## Railway Deployment

### 1. Environment Variables Setup

In your Railway dashboard, set these environment variables:

**Required Variables:**
- `NODE_ENV` = `production`
- `HOST` = `0.0.0.0`
- `PORT` = `3333` (or your preferred port)
- `APP_KEY` = `your-app-key-here`
- `MYSQL_URL` = `${{ MySQL.MYSQL_URL }}`

**Database Variables (for validation):**
- `DB_HOST` = `localhost`
- `DB_PORT` = `3306`
- `DB_USER` = `root`
- `DB_PASSWORD` = `(leave empty or set as needed)`
- `DB_DATABASE` = `kikobackend`

### 2. Railway Configuration

1. **Connect your GitHub repository** to Railway
2. **Add a MySQL service** in Railway
3. **Set the environment variables** as shown above
4. **Deploy your application**

### 3. Railway Build Configuration

**Important**: Railway needs to run migrations during deployment. Add this to your Railway project settings:

1. Go to your Railway project dashboard
2. Navigate to your app service
3. Go to **Settings** → **Build & Deploy**
4. Set the **Build Command** to:
   ```bash
   npm run build
   ```
5. Set the **Start Command** to:
   ```bash
   npm start
   ```

### 4. Testing on Railway

After deployment, test your Railway app:

```bash
# Test the root endpoint
curl https://your-railway-app.railway.app/

# Test the collections API
curl https://your-railway-app.railway.app/api/collections

# Test the products API
curl https://your-railway-app.railway.app/api/products
```

### 5. Manual Migration (if needed)

If tables still don't appear, you can manually run migrations:

1. Go to your Railway project dashboard
2. Navigate to your app service
3. Go to **Deployments** → **Latest Deployment**
4. Click on the deployment and go to **Logs**
5. Open a terminal in the deployment and run:
   ```bash
   node ace migration:run --force
   ```

## Configuration Files

### Local Development (.env)
```env
NODE_ENV=development
HOST=0.0.0.0
PORT=3333
APP_KEY=NCnxVnKKoYjnfx7HBlmkzR2a1gH0Vuhv
LOG_LEVEL=info

# Database Configuration
MYSQL_URL=mysql://root:70464336@127.0.0.1:3306/kikobackend

# Individual parameters (required by AdonisJS validation)
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=70464336
DB_DATABASE=kikobackend

SESSION_DRIVER=cookie
```

### Railway Production (Environment Variables)
```env
NODE_ENV=production
HOST=0.0.0.0
PORT=3333
APP_KEY=your-production-app-key
LOG_LEVEL=info

# Database Configuration
MYSQL_URL=${{ MySQL.MYSQL_URL }}

# Individual parameters (for validation)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=kikobackend

SESSION_DRIVER=cookie
```

## How It Works

1. **Local Development**: Uses `MYSQL_URL` connection string to connect to local MySQL
2. **Railway Deployment**: Uses `${{ MySQL.MYSQL_URL }}` which Railway automatically replaces with the actual connection string
3. **Fallback**: If `MYSQL_URL` is not available, falls back to individual connection parameters
4. **Validation**: AdonisJS still validates individual parameters exist, but the database config uses `MYSQL_URL` when available

## Troubleshooting

### Local Issues
- Make sure MySQL is running locally
- Verify the connection string format: `mysql://user:password@host:port/database`
- Check that the database exists

### Railway Issues
- Ensure all environment variables are set in Railway dashboard
- Verify the MySQL service is connected to your app
- Check Railway logs for any connection errors

### Common Errors
- `EnvValidationException`: Missing required environment variables
- `ECONNREFUSED`: Database connection failed
- `ER_ACCESS_DENIED_ERROR`: Wrong database credentials

### Tables Not Appearing in Railway

If your tables work locally but don't appear in Railway:

1. **Check if migrations ran**: Look at Railway deployment logs for migration messages
2. **Manual migration**: Run `node ace migration:run --force` in Railway terminal
3. **Verify database connection**: Ensure `MYSQL_URL` is properly set in Railway environment variables
4. **Check database permissions**: Railway MySQL should have full permissions by default
5. **Re-deploy with build command**: Make sure your Railway project uses `npm run build` as the build command

**Quick Fix**: If tables are missing, SSH into your Railway deployment and run:
```bash
node ace migration:run --force
node ace db:seed  # if you want to seed data
``` 