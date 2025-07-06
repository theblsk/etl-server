import type { Database } from '../db/connection';
import { eq, type SQL } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';

// Generic CRUD functions that can be reused by all DAOs

export const findAll = async <T extends PgTable>(
  db: Database,
  table: T
): Promise<any[]> => {
  return await db.select().from(table as any);
};

export const findById = async <T extends PgTable>(
  db: Database,
  table: T,
  id: number
): Promise<any | null> => {
  const result = await db
    .select()
    .from(table as any)
    .where(eq((table as any).id, id))
    .limit(1);
  
  return result[0] || null;
};

export const create = async <T extends PgTable>(
  db: Database,
  table: T,
  data: any
): Promise<any> => {
  const result = await db
    .insert(table)
    .values(data)
    .returning();
  
  return result[0];
};

export const update = async <T extends PgTable>(
  db: Database,
  table: T,
  id: number,
  data: any
): Promise<any | null> => {
  const result = await db
    .update(table)
    .set(data)
    .where(eq((table as any).id, id))
    .returning();
  
  return result[0] || null;
};

export const deleteById = async <T extends PgTable>(
  db: Database,
  table: T,
  id: number
): Promise<boolean> => {
  const result = await db
    .delete(table)
    .where(eq((table as any).id, id))
    .returning();
  
  return result.length > 0;
};

export const findWhere = async <T extends PgTable>(
  db: Database,
  table: T,
  condition: SQL
): Promise<any[]> => {
  return await db
    .select()
    .from(table as any)
    .where(condition);
};

// Helper function to create a DAO factory with common operations
export const createDaoOperations = <T extends PgTable>(db: Database, table: T) => ({
  findAll: () => findAll(db, table),
  findById: (id: number) => findById(db, table, id),
  create: (data: any) => create(db, table, data),
  update: (id: number, data: any) => update(db, table, id, data),
  delete: (id: number) => deleteById(db, table, id),
  findWhere: (condition: SQL) => findWhere(db, table, condition),
}); 