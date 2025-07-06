import { readFileSync } from 'fs';
import { join } from 'path';
import { 
  findCompanyByPlatformId, 
  createCompany,
  findAccountByPlatformId,
  createAccount,
  findReportByPlatformId,
  createReport,
  createBulkLineItems
} from '../models';

export interface SourceLineItem {
  account_id: string;
  name: string;
  value: number;
}

export interface SourceSection {
  name: string;
  value: number;
  line_items: SourceLineItem[];
}

export interface SourceReport {
  rootfi_company_id: number;
  platform_id: string;
  period_start: string;
  period_end: string;
  gross_profit: number;
  net_profit: number;
  revenue: SourceSection[];
  cost_of_goods_sold: SourceSection[];
  operating_expenses: SourceSection[];
  non_operating_revenue: SourceSection[];
  non_operating_expenses: SourceSection[];
}

export interface SourceData {
  data: SourceReport[];
}

export async function runETL(sourceData: SourceData) {
  console.log('🔄 Starting ETL process...');
  
  try {
    const sourceReports = sourceData.data;
    console.log(`📊 Found ${sourceReports.length} reports to process`);
    
    // 2. TRANSFORM & LOAD
    
    // Process companies
    const companyMap = new Map<number, number>(); // rootfi_company_id -> db_company_id
    
    for (const report of sourceReports) {
      if (!companyMap.has(report.rootfi_company_id)) {
        let company = await findCompanyByPlatformId(report.rootfi_company_id);
        
        if (!company) {
          company = await createCompany({
            name: `Company ${report.rootfi_company_id}`,
            platformCompanyId: report.rootfi_company_id,
          });
          console.log(`✅ Created company: ${company.name}`);
        }
        
        companyMap.set(report.rootfi_company_id, company.id);
      }
    }
    
    // Process accounts - collect all unique accounts across all reports
    const accountMap = new Map<string, number>(); // platform_account_id -> db_account_id
    
    for (const report of sourceReports) {
      const sectionGroups = [
        { name: 'revenue', sections: report.revenue },
        { name: 'cost_of_goods_sold', sections: report.cost_of_goods_sold },
        { name: 'operating_expenses', sections: report.operating_expenses },
        { name: 'non_operating_revenue', sections: report.non_operating_revenue },
        { name: 'non_operating_expenses', sections: report.non_operating_expenses },
      ];
      
      for (const sectionGroup of sectionGroups) {
        if (sectionGroup.sections) {
          for (const section of sectionGroup.sections) {
            if (section.line_items) {
              for (const item of section.line_items) {
                if (!accountMap.has(item.account_id)) {
                  let account = await findAccountByPlatformId(item.account_id);
                  
                  if (!account) {
                    account = await createAccount({
                      name: item.name,
                      platformAccountId: item.account_id,
                      category: sectionGroup.name,
                    });
                  }
                  
                  accountMap.set(item.account_id, account.id);
                }
              }
            }
          }
        }
      }
    }
    
    console.log(`✅ Processed ${accountMap.size} unique accounts`);
    
    // Process reports and line items
    for (const sourceReport of sourceReports) {
      const companyId = companyMap.get(sourceReport.rootfi_company_id)!;
      
      // Check if report already exists
      let report = await findReportByPlatformId(sourceReport.platform_id);
      
      if (!report) {
        report = await createReport({
          companyId,
          platformReportId: sourceReport.platform_id,
          periodStart: sourceReport.period_start,
          periodEnd: sourceReport.period_end,
          grossProfit: sourceReport.gross_profit?.toString() || '0',
          netProfit: sourceReport.net_profit?.toString() || '0',
        });
      }
      
      // Collect all line items for this report
      const lineItems = [];
      const sectionGroups = [
        { name: 'revenue', sections: sourceReport.revenue },
        { name: 'cost_of_goods_sold', sections: sourceReport.cost_of_goods_sold },
        { name: 'operating_expenses', sections: sourceReport.operating_expenses },
        { name: 'non_operating_revenue', sections: sourceReport.non_operating_revenue },
        { name: 'non_operating_expenses', sections: sourceReport.non_operating_expenses },
      ];
      
      for (const sectionGroup of sectionGroups) {
        if (sectionGroup.sections) {
          for (const section of sectionGroup.sections) {
            if (section.line_items) {
              for (const item of section.line_items) {
                const accountId = accountMap.get(item.account_id)!;
                lineItems.push({
                  reportId: report.id,
                  accountId,
                  value: item.value.toString(),
                });
              }
            }
          }
        }
      }
      
      // Create line items in bulk
      if (lineItems.length > 0) {
        await createBulkLineItems(lineItems);
      }
    }
    
    console.log('✅ ETL process completed successfully!');
    console.log(`📈 Processed ${sourceReports.length} reports`);
    console.log(`🏢 ${companyMap.size} companies`);
    console.log(`📊 ${accountMap.size} accounts`);
    
  } catch (error) {
    console.error('❌ ETL process failed:', error);
    throw error;
  }
} 