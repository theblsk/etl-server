import type { Database } from '../db/connection';
import { reports, companies, lineItems, accounts } from '../db/schemas';
import type { Report, NewReport, ReportWithCompany, ReportWithLineItems } from '../types';
import { findAll, findById, create, update, deleteById } from './BaseDao';
import { eq, and, gte, lte } from 'drizzle-orm';
import { db } from '../db/connection';

// Basic CRUD operations
export const getAllReports = (): Promise<Report[]> => findAll(db, reports);
export const getReportById = (id: number): Promise<Report | null> => findById(db, reports, id);
export const createReport = (data: NewReport): Promise<Report> => create(db, reports, data);
export const updateReport = (id: number, data: Partial<NewReport>): Promise<Report | null> => 
  update(db, reports, id, data);
export const deleteReport = (id: number): Promise<boolean> => deleteById(db, reports, id);

// Report-specific operations
export const findReportsByCompanyId = async (companyId: number): Promise<Report[]> => {
  return await db
    .select()
    .from(reports)
    .where(eq(reports.companyId, companyId));
};

export const findReportByPlatformId = async (platformId: string): Promise<Report | null> => {
  const result = await db
    .select()
    .from(reports)
    .where(eq(reports.platformReportId, platformId))
    .limit(1);
  
  return result[0] || null;
};

export const findReportsByDateRange = async (startDate: string, endDate: string): Promise<Report[]> => {
  return await db
    .select()
    .from(reports)
    .where(
      and(
        gte(reports.periodStart, startDate),
        lte(reports.periodEnd, endDate)
      )
    );
};

export const findReportWithCompany = async (id: number): Promise<ReportWithCompany | null> => {
  const result = await db
    .select()
    .from(reports)
    .innerJoin(companies, eq(reports.companyId, companies.id))
    .where(eq(reports.id, id))
    .limit(1);

  if (!result[0]) return null;

  return {
    ...result[0].reports,
    company: result[0].companies,
  };
};

export const findReportWithLineItems = async (id: number): Promise<ReportWithLineItems | null> => {
  const report = await findById(db, reports, id);
  if (!report) return null;

  const reportLineItems = await db
    .select()
    .from(lineItems)
    .innerJoin(accounts, eq(lineItems.accountId, accounts.id))
    .where(eq(lineItems.reportId, id));

  return {
    ...report,
    lineItems: reportLineItems.map(item => ({
      ...item.line_items,
      account: item.accounts,
    })),
  };
}; 