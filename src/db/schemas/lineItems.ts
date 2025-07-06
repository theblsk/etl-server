import { pgTable, serial, integer, numeric } from 'drizzle-orm/pg-core';
import { reports } from './reports';
import { accounts } from './accounts';

export const lineItems = pgTable('line_items', {
  id: serial('id').primaryKey(),
  reportId: integer('report_id').references(() => reports.id).notNull(),
  accountId: integer('account_id').references(() => accounts.id).notNull(),
  value: numeric('value', { precision: 15, scale: 2 }).notNull(),
}); 