import type { Knex } from 'knex';
import dotenv from 'dotenv';
dotenv.config();

type Environment = 'development' | 'production';

const config: { [env: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'demo-credit',
    },
    migrations: {
      directory: './src/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL ?? (() => { 
      throw new Error('DATABASE_URL is required in production'); })(),
    migrations: {
      directory: './src/migrations',
    },
  },
};

export default config;