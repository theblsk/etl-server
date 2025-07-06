import { 
  getAllReports as daoGetAllReports,
  getReportById as daoGetReportById,
  createReport as daoCreateReport,
  updateReport as daoUpdateReport,
  deleteReport as daoDeleteReport,
  findReportsByCompanyId,
  findReportWithCompany,
  findReportWithLineItems,
  getCompanyById
} from '../models';
import type { Report, NewReport, ReportWithCompany, ReportWithLineItems, ApiResponse } from '../types';

export const getAllReports = async (): Promise<ApiResponse<Report[]>> => {
  try {
    const reports = await daoGetAllReports();
    return {
      success: true,
      data: reports,
      message: 'Reports retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getReportById = async (id: number): Promise<ApiResponse<Report>> => {
  try {
    const report = await daoGetReportById(id);
    
    if (!report) {
      return {
        success: false,
        error: 'Report not found',
      };
    }

    return {
      success: true,
      data: report,
      message: 'Report retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const createReport = async (data: NewReport): Promise<ApiResponse<Report>> => {
  try {
    // Validate that company exists
    const company = await getCompanyById(data.companyId);
    if (!company) {
      return {
        success: false,
        error: 'Company not found',
      };
    }

    // Validate date range
    const startDate = new Date(data.periodStart);
    const endDate = new Date(data.periodEnd);
    if (startDate >= endDate) {
      return {
        success: false,
        error: 'Period start must be before period end',
      };
    }

    const report = await daoCreateReport(data);
    return {
      success: true,
      data: report,
      message: 'Report created successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const updateReport = async (id: number, data: Partial<NewReport>): Promise<ApiResponse<Report>> => {
  try {
    const existingReport = await daoGetReportById(id);
    if (!existingReport) {
      return {
        success: false,
        error: 'Report not found',
      };
    }

    // Validate company exists if being updated
    if (data.companyId && data.companyId !== existingReport.companyId) {
      const company = await getCompanyById(data.companyId);
      if (!company) {
        return {
          success: false,
          error: 'Company not found',
        };
      }
    }

    // Validate date range if being updated
    if (data.periodStart || data.periodEnd) {
      const startDate = new Date(data.periodStart || existingReport.periodStart);
      const endDate = new Date(data.periodEnd || existingReport.periodEnd);
      if (startDate >= endDate) {
        return {
          success: false,
          error: 'Period start must be before period end',
        };
      }
    }

    const updatedReport = await daoUpdateReport(id, data);
    return {
      success: true,
      data: updatedReport!,
      message: 'Report updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const deleteReport = async (id: number): Promise<ApiResponse<boolean>> => {
  try {
    const existingReport = await daoGetReportById(id);
    if (!existingReport) {
      return {
        success: false,
        error: 'Report not found',
      };
    }

    const deleted = await daoDeleteReport(id);
    return {
      success: true,
      data: deleted,
      message: 'Report deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getReportsByCompany = async (companyId: number): Promise<ApiResponse<Report[]>> => {
  try {
    // Validate company exists
    const company = await getCompanyById(companyId);
    if (!company) {
      return {
        success: false,
        error: 'Company not found',
      };
    }

    const reports = await findReportsByCompanyId(companyId);
    return {
      success: true,
      data: reports,
      message: 'Reports retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getReportWithCompany = async (id: number): Promise<ApiResponse<ReportWithCompany>> => {
  try {
    const reportWithCompany = await findReportWithCompany(id);
    
    if (!reportWithCompany) {
      return {
        success: false,
        error: 'Report not found',
      };
    }

    return {
      success: true,
      data: reportWithCompany,
      message: 'Report with company retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getReportWithLineItems = async (id: number): Promise<ApiResponse<ReportWithLineItems>> => {
  try {
    const reportWithLineItems = await findReportWithLineItems(id);
    
    if (!reportWithLineItems) {
      return {
        success: false,
        error: 'Report not found',
      };
    }

    return {
      success: true,
      data: reportWithLineItems,
      message: 'Report with line items retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}; 