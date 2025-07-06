import { lineItems, accounts, reports } from '../db/schemas';
import type { LineItem, NewLineItem } from '../types';
import { findAll, findById, create, update, deleteById } from './BaseDao';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/connection';

// Basic CRUD operations
export const getAllLineItems = (): Promise<LineItem[]> => findAll(db, lineItems);
export const getLineItemById = (id: number): Promise<LineItem | null> => findById(db, lineItems, id);
export const createLineItem = (data: NewLineItem): Promise<LineItem> => create(db, lineItems, data);
export const updateLineItem = (id: number, data: Partial<NewLineItem>): Promise<LineItem | null> => 
  update(db, lineItems, id, data);
export const deleteLineItem = (id: number): Promise<boolean> => deleteById(db, lineItems, id);

// LineItem-specific operations
export const findLineItemsByReportId = async (reportId: number): Promise<LineItem[]> => {
  return await db
    .select()
    .from(lineItems)
    .where(eq(lineItems.reportId, reportId));
};

export const findLineItemsByAccountId = async (accountId: number): Promise<LineItem[]> => {
  return await db
    .select()
    .from(lineItems)
    .where(eq(lineItems.accountId, accountId));
};

export const findLineItemByReportAndAccount = async (reportId: number, accountId: number): Promise<LineItem | null> => {
  const result = await db
    .select()
    .from(lineItems)
    .where(
      and(
        eq(lineItems.reportId, reportId),
        eq(lineItems.accountId, accountId)
      )
    )
    .limit(1);
  
  return result[0] || null;
};

export const findLineItemWithDetails = async (id: number): Promise<(LineItem & { account: any; report: any }) | null> => {
  const result = await db
    .select()
    .from(lineItems)
    .innerJoin(accounts, eq(lineItems.accountId, accounts.id))
    .innerJoin(reports, eq(lineItems.reportId, reports.id))
    .where(eq(lineItems.id, id))
    .limit(1);

  if (!result[0]) return null;

  return {
    ...result[0].line_items,
    account: result[0].accounts,
    report: result[0].reports,
  };
};

export const createBulkLineItems = async (data: NewLineItem[]): Promise<LineItem[]> => {
  return await db
    .insert(lineItems)
    .values(data)
    .returning();
}; 