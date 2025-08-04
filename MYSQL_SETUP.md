# MySQL Setup Guide

This project has been converted from SQL Server (MSSQL) to MySQL. Follow these steps to set up your MySQL database:

## 1. Install MySQL

### Windows
- Download and install MySQL from: https://dev.mysql.com/downloads/mysql/
- Or use XAMPP/WAMP which includes MySQL

### macOS
```bash
brew install mysql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
```

## 2. Start MySQL Service

### Windows
- MySQL service should start automatically after installation
- Or use Services app to start MySQL

### macOS
```bash
brew services start mysql
```

### Linux
```bash
sudo systemctl start mysql
sudo systemctl enable mysql
```

## 3. Create Database

Connect to MySQL and create the database:

```bash
mysql -u root -p
```

Then in MySQL:
```sql
CREATE DATABASE kikobackend;
CREATE USER 'kikobackend_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON kikobackend.* TO 'kikobackend_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 4. Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
# Application
NODE_ENV=development
PORT=3333
APP_KEY=your-app-key-here
HOST=0.0.0.0
LOG_LEVEL=info

# Database (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=kikobackend_user
DB_PASSWORD=your_password
DB_DATABASE=kikobackend

# Session
SESSION_DRIVER=cookie
```

## 5. Install Dependencies

```bash
npm install
```

## 6. Run Migrations

```bash
node ace migration:run
```

## 7. Seed Data (Optional)

```bash
node ace db:seed
```

## 8. Start Development Server

```bash
npm run dev
```

## Key Changes Made

1. **Database Driver**: Changed from `tedious` (MSSQL) to `mysql2` (MySQL)
2. **Configuration**: Updated `config/database.ts` to use MySQL connection settings
3. **Dependencies**: Updated `package.json` to include `mysql2` instead of `tedious`

## Troubleshooting

### Connection Issues
- Ensure MySQL service is running
- Check that the database exists
- Verify username/password in `.env` file
- Make sure the user has proper permissions

### Migration Issues
- If you have existing data, you may need to export from SQL Server and import to MySQL
- Some data types might need manual conversion

### Port Conflicts
- Default MySQL port is 3306
- If you're using a different port, update the `DB_PORT` in your `.env` file 