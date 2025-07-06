import type { Request, Response } from 'express';
import { 
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyWithReports
} from '../services';

export const getAllCompaniesController = async (req: Request, res: Response): Promise<void> => {
  const result = await getAllCompanies();
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

export const getCompanyByIdController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Company ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid company ID',
    });
    return;
  }

  const result = await getCompanyById(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Company not found' ? 404 : 500).json(result);
  }
};

export const createCompanyController = async (req: Request, res: Response): Promise<void> => {
  const result = await createCompany(req.body);
  
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(result.error === 'Company with this name already exists' ? 409 : 500).json(result);
  }
};

export const updateCompanyController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Company ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid company ID',
    });
    return;
  }

  const result = await updateCompany(id, req.body);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    const status = result.error === 'Company not found' ? 404 : 
                  result.error === 'Company with this name already exists' ? 409 : 500;
    res.status(status).json(result);
  }
};

export const deleteCompanyController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Company ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid company ID',
    });
    return;
  }

  const result = await deleteCompany(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Company not found' ? 404 : 500).json(result);
  }
};

export const getCompanyWithReportsController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Company ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid company ID',
    });
    return;
  }

  const result = await getCompanyWithReports(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Company not found' ? 404 : 500).json(result);
  }
}; 