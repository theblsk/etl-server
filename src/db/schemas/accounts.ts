import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  platformAccountId: varchar('platform_account_id', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }),
}); 