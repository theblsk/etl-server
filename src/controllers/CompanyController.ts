import type { Request, Response, NextFunction } from 'express';
import { 
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyWithReports
} from '../services';

export const getAllCompaniesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await getAllCompanies();
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getCompanyByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Company ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid company ID');
      error.status = 400;
      return next(error);
    }

    const result = await getCompanyById(id);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Company not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const createCompanyController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createCompany(req.body);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Company with this name already exists' ? 409 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateCompanyController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Company ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid company ID');
      error.status = 400;
      return next(error);
    }

    const result = await updateCompany(id, req.body);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Company not found' ? 404 : 
                    result.error === 'Company with this name already exists' ? 409 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCompanyController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Company ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid company ID');
      error.status = 400;
      return next(error);
    }

    const result = await deleteCompany(id);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Company not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getCompanyWithReportsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Company ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid company ID');
      error.status = 400;
      return next(error);
    }

    const result = await getCompanyWithReports(id);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Company not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
}; 