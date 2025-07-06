import type { Request, Response, NextFunction } from 'express';
import { 
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  getReportsByCompany,
  getReportWithCompany,
  getReportWithLineItems
} from '../services';

export const getAllReportsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await getAllReports();
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

export const getReportByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Report ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid report ID');
      error.status = 400;
      return next(error);
    }

    const result = await getReportById(id);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Report not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const createReportController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createReport(req.body);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Company not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateReportController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Report ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid report ID');
      error.status = 400;
      return next(error);
    }

    const result = await updateReport(id, req.body);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Report not found' ? 404 : 
                    result.error === 'Company not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteReportController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Report ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid report ID');
      error.status = 400;
      return next(error);
    }

    const result = await deleteReport(id);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Report not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getReportsByCompanyController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const companyIdParam = req.params.companyId;
    if (!companyIdParam) {
      const error: any = new Error('Company ID is required');
      error.status = 400;
      return next(error);
    }
    
    const companyId = parseInt(companyIdParam);
    if (isNaN(companyId)) {
      const error: any = new Error('Invalid company ID');
      error.status = 400;
      return next(error);
    }

    const result = await getReportsByCompany(companyId);
    
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

export const getReportWithCompanyController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Report ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid report ID');
      error.status = 400;
      return next(error);
    }

    const result = await getReportWithCompany(id);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Report not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getReportWithLineItemsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Report ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid report ID');
      error.status = 400;
      return next(error);
    }

    const result = await getReportWithLineItems(id);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Report not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
}; 