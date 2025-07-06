import { companies, accounts, reports, lineItems } from '../db/schemas';

// Entity types (what's stored in the database)
export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;

export type LineItem = typeof lineItems.$inferSelect;
export type NewLineItem = typeof lineItems.$inferInsert;

// Response types with relationships
export type CompanyWithReports = Company & {
  reports: Report[];
};

export type ReportWithLineItems = Report & {
  lineItems: (LineItem & { account: Account })[];
};

export type ReportWithCompany = Report & {
  company: Company;
};

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}; 