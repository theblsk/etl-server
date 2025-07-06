import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { dbConfig } from '../config/database';
import * as schema from './schemas';

// Create postgres client
const client = postgres(dbConfig.url);

// Create drizzle instance
export const db = drizzle(client, { schema });

export type Database = typeof db; 