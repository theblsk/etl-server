import { pgTable, serial, bigint, varchar } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  platformCompanyId: bigint('platform_company_id', { mode: 'number' }),
  name: varchar('name', { length: 255 }).notNull(),
}); 