# MySQL Authentication Fix

## The Problem
You're getting "Access denied for user 'root'@'localhost'" because MySQL requires authentication.

## Solutions

### Option 1: Use Your MySQL Root Password

1. **Find your MySQL root password**:
   - If you installed MySQL recently, check the installation logs
   - If you used XAMPP/WAMP, the default password might be empty
   - If you set a password during installation, use that

2. **Update the test script**:
   ```javascript
   // In test-mysql-connection.js, change:
   password: 'your_actual_mysql_root_password'
   ```

### Option 2: Reset MySQL Root Password

#### For Windows (XAMPP/WAMP):
1. Open MySQL command line:
   ```bash
   mysql -u root
   ```
   (If this works, your password is empty)

2. If that doesn't work, try:
   ```bash
   mysql -u root -p
   ```
   (Press Enter if password is empty)

#### For Standalone MySQL on Windows:
1. Stop MySQL service
2. Open Command Prompt as Administrator
3. Navigate to MySQL bin directory:
   ```bash
   cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
   ```
4. Start MySQL in safe mode:
   ```bash
   mysqld --skip-grant-tables
   ```
5. Open another Command Prompt and connect:
   ```bash
   mysql -u root
   ```
6. Reset password:
   ```sql
   USE mysql;
   UPDATE user SET authentication_string='' WHERE user='root';
   FLUSH PRIVILEGES;
   EXIT;
   ```

### Option 3: Create a New User (Recommended)

1. **Connect to MySQL** (using one of the methods above)

2. **Create a new user**:
   ```sql
   CREATE USER 'kikobackend_user'@'localhost' IDENTIFIED BY 'your_password';
   CREATE DATABASE kikobackend;
   GRANT ALL PRIVILEGES ON kikobackend.* TO 'kikobackend_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Update your .env file**:
   ```env
   DB_USER=kikobackend_user
   DB_PASSWORD=your_password
   DB_DATABASE=kikobackend
   ```

4. **Update test-mysql-connection.js**:
   ```javascript
   user: 'kikobackend_user',
   password: 'your_password',
   ```

### Option 4: Use Environment Variables

1. **Create a .env file** with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=kikobackend
   ```

2. **Update test-mysql-connection.js** to use environment variables:
   ```javascript
   import mysql from 'mysql2/promise'
   import { config } from 'dotenv'
   
   config() // Load .env file
   
   async function testConnection() {
     try {
       const connection = await mysql.createConnection({
         host: process.env.DB_HOST || 'localhost',
         port: parseInt(process.env.DB_PORT) || 3306,
         user: process.env.DB_USER || 'root',
         password: process.env.DB_PASSWORD || '',
         database: process.env.DB_DATABASE || 'kikobackend'
       })
       
       console.log('✅ MySQL connection successful!')
       
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
     }
   }
   
   testConnection()
   ```

## Quick Test Commands

### Test if MySQL is running:
```bash
# Windows
netstat -an | findstr 3306

# Or check Services app for MySQL
```

### Test connection with command line:
```bash
mysql -u root -p
```

### Create database if it doesn't exist:
```sql
CREATE DATABASE IF NOT EXISTS kikobackend;
```

## Common Issues

1. **MySQL not running**: Start MySQL service
2. **Wrong port**: Check if MySQL is on port 3306
3. **Firewall**: Allow MySQL through Windows Firewall
4. **Host binding**: MySQL might only accept localhost connections

## Next Steps

Once you can connect successfully:
1. Run: `node test-mysql-connection.js`
2. If successful, run: `node ace migration:run`
3. Start your app: `npm run dev` 