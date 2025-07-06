import type { Database } from '../db/connection';
import { companies, reports } from '../db/schemas';
import type { Company, NewCompany, CompanyWithReports } from '../types';
import { findAll, findById, create, update, deleteById } from './BaseDao';
import { eq } from 'drizzle-orm';
import { db } from '../db/connection';

// Basic CRUD operations
export const getAllCompanies = (): Promise<Company[]> => findAll(db, companies);
export const getCompanyById = (id: number): Promise<Company | null> => findById(db, companies, id);
export const createCompany = (data: NewCompany): Promise<Company> => create(db, companies, data);
export const updateCompany = (id: number, data: Partial<NewCompany>): Promise<Company | null> => 
  update(db, companies, id, data);
export const deleteCompany = (id: number): Promise<boolean> => deleteById(db, companies, id);

// Company-specific operations
export const findCompanyByName = async (name: string): Promise<Company | null> => {
  const result = await db
    .select()
    .from(companies)
    .where(eq(companies.name, name))
    .limit(1);
  
  return result[0] || null;
};

export const findCompanyByPlatformId = async (platformId: number): Promise<Company | null> => {
  const result = await db
    .select()
    .from(companies)
    .where(eq(companies.platformCompanyId, platformId))
    .limit(1);
  
  return result[0] || null;
};

export const findCompanyWithReports = async (id: number): Promise<CompanyWithReports | null> => {
  const company = await findById(db, companies, id);
  if (!company) return null;

  const companyReports = await db
    .select()
    .from(reports)
    .where(eq(reports.companyId, id));

  return {
    ...company,
    reports: companyReports,
  };
}; 