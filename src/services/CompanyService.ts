import { 
  getAllCompanies as daoGetAllCompanies,
  getCompanyById as daoGetCompanyById,
  createCompany as daoCreateCompany,
  updateCompany as daoUpdateCompany,
  deleteCompany as daoDeleteCompany,
  findCompanyByName,
  findCompanyWithReports
} from '../models';
import type { Company, NewCompany, CompanyWithReports, ApiResponse } from '../types';

export const getAllCompanies = async (): Promise<ApiResponse<Company[]>> => {
  try {
    const companies = await daoGetAllCompanies();
    return {
      success: true,
      data: companies,
      message: 'Companies retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getCompanyById = async (id: number): Promise<ApiResponse<Company>> => {
  try {
    const company = await daoGetCompanyById(id);
    
    if (!company) {
      return {
        success: false,
        error: 'Company not found',
      };
    }

    return {
      success: true,
      data: company,
      message: 'Company retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const createCompany = async (data: NewCompany): Promise<ApiResponse<Company>> => {
  try {
    // Check if company with same name already exists
    const existingCompany = await findCompanyByName(data.name);
    if (existingCompany) {
      return {
        success: false,
        error: 'Company with this name already exists',
      };
    }

    const company = await daoCreateCompany(data);
    return {
      success: true,
      data: company,
      message: 'Company created successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const updateCompany = async (id: number, data: Partial<NewCompany>): Promise<ApiResponse<Company>> => {
  try {
    // Check if company exists
    const existingCompany = await daoGetCompanyById(id);
    if (!existingCompany) {
      return {
        success: false,
        error: 'Company not found',
      };
    }

    // Check if new name conflicts with existing company
    if (data.name && data.name !== existingCompany.name) {
      const nameConflict = await findCompanyByName(data.name);
      if (nameConflict) {
        return {
          success: false,
          error: 'Company with this name already exists',
        };
      }
    }

    const updatedCompany = await daoUpdateCompany(id, data);
    return {
      success: true,
      data: updatedCompany!,
      message: 'Company updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const deleteCompany = async (id: number): Promise<ApiResponse<boolean>> => {
  try {
    const existingCompany = await daoGetCompanyById(id);
    if (!existingCompany) {
      return {
        success: false,
        error: 'Company not found',
      };
    }

    const deleted = await daoDeleteCompany(id);
    return {
      success: true,
      data: deleted,
      message: 'Company deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getCompanyWithReports = async (id: number): Promise<ApiResponse<CompanyWithReports>> => {
  try {
    const companyWithReports = await findCompanyWithReports(id);
    
    if (!companyWithReports) {
      return {
        success: false,
        error: 'Company not found',
      };
    }

    return {
      success: true,
      data: companyWithReports,
      message: 'Company with reports retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}; 