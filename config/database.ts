import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: env.get('NODE_ENV') === 'test' ? 'sqlite' : 'mysql',
  connections: {
    mysql: {
      client: 'mysql2',
      connection: env.get('MYSQL_URL') 
        ? env.get('MYSQL_URL') // Use Railway's connection string
        : {
            host: env.get('DB_HOST'),
            port: env.get('DB_PORT'),
            user: env.get('DB_USER'),
            password: env.get('DB_PASSWORD'),
            database: env.get('DB_DATABASE'),
          },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
    sqlite: {
      client: 'sqlite3',
      connection: {
        filename: env.get('NODE_ENV') === 'test' ? ':memory:' : env.get('DB_FILENAME', 'database.sqlite'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      useNullAsDefault: true,
    },
  },
})

export default dbConfig
