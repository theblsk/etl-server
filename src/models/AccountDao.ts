import { accounts } from '../db/schemas';
import type { Account, NewAccount } from '../types';
import { findAll, findById, create, update, deleteById } from './BaseDao';
import { eq, like } from 'drizzle-orm';
import { db } from '../db/connection';

// Basic CRUD operations
export const getAllAccounts = (): Promise<Account[]> => findAll(db, accounts);
export const getAccountById = (id: number): Promise<Account | null> => findById(db, accounts, id);
export const createAccount = (data: NewAccount): Promise<Account> => create(db, accounts, data);
export const updateAccount = (id: number, data: Partial<NewAccount>): Promise<Account | null> => 
  update(db, accounts, id, data);
export const deleteAccount = (id: number): Promise<boolean> => deleteById(db, accounts, id);

// Account-specific operations
export const findAccountsByCategory = async (category: string): Promise<Account[]> => {
  return await db
    .select()
    .from(accounts)
    .where(eq(accounts.category, category));
};

export const findAccountByName = async (name: string): Promise<Account | null> => {
  const result = await db
    .select()
    .from(accounts)
    .where(eq(accounts.name, name))
    .limit(1);
  
  return result[0] || null;
};

export const findAccountByPlatformId = async (platformId: string): Promise<Account | null> => {
  const result = await db
    .select()
    .from(accounts)
    .where(eq(accounts.platformAccountId, platformId))
    .limit(1);
  
  return result[0] || null;
};

export const searchAccountsByName = async (searchTerm: string): Promise<Account[]> => {
  return await db
    .select()
    .from(accounts)
    .where(like(accounts.name, `%${searchTerm}%`));
}; 