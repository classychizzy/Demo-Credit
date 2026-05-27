import type { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });



console.log('DB_USER:', process.env.DB_USER);
type Environment = 'development' | 'production';

const config: { [env: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'DemoCredit',
    },
    migrations: {
     directory: path.resolve(__dirname, '../migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: path.resolve(__dirname, '../seeds'),
    },
  },
  production: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL || '',
    migrations: {
      directory: path.resolve(__dirname, '../migrations'),
    },
  },
};

console.log('cwd:', process.cwd());
console.log('migrations dir:', path.resolve(process.cwd(), '../migrations'));

export default config;