# Local Development Setup

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MySQL** (v8.0 or higher)
3. **npm** or **yarn**

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. **Create MySQL Database:**
   ```sql
   CREATE DATABASE kikobackend;
   ```

2. **Configure Environment Variables:**
   Copy `env.example` to `.env` and update with your MySQL credentials:
   ```bash
   cp env.example .env
   ```

   Update the `.env` file with your MySQL settings:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your-password
   DB_DATABASE=kikobackend
   ```

### 3. Run Migrations

```bash
npm run migrate
```

### 4. Seed Database (Optional)

```bash
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3333`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run build` - Build for production
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Endpoints

- `GET /` - Health check
- `GET /api/collections` - Get all collections
- `POST /api/collections` - Create a new collection
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product

## Database Schema

The application includes the following tables:
- `users` - User authentication and profiles
- `collections` - Product collections/categories
- `products` - Product information

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check your database credentials in `.env`
- Ensure the database exists

### Migration Issues
- Make sure all environment variables are set
- Check that the database exists and is accessible
- Run `npm run migrate` to apply migrations

### Port Issues
- Change the `PORT` in your `.env` file if 3333 is already in use 