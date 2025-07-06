import { pgTable, serial, integer, date, numeric, text } from 'drizzle-orm/pg-core';
import { companies } from './companies';

export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  platformReportId: text('platform_report_id'),
  companyId: integer('company_id').references(() => companies.id).notNull(),
  periodStart: date('period_start').notNull(),
  periodEnd: date('period_end').notNull(),
  grossProfit: numeric('gross_profit', { precision: 15, scale: 2 }),
  netProfit: numeric('net_profit', { precision: 15, scale: 2 }),
}); 