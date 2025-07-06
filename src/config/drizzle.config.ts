import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schemas/*',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/kudwatest',
  },
}); 