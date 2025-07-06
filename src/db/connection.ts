import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { dbConfig } from '../config/database';
import * as schema from './schemas';

// Create postgres client
const client = postgres(dbConfig.url, {
  connect_timeout: 10,
  idle_timeout: 20,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const checkDbConnection = async () => {
  try {
    await client`SELECT 1`;
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Create drizzle instance
export const db = drizzle(client, { schema });

export type Database = typeof db; 