import type { Request, Response } from 'express';
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

export const getAllReportsController = async (req: Request, res: Response): Promise<void> => {
  const result = await getAllReports();
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

export const getReportByIdController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Report ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid report ID',
    });
    return;
  }

  const result = await getReportById(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Report not found' ? 404 : 500).json(result);
  }
};

export const createReportController = async (req: Request, res: Response): Promise<void> => {
  const result = await createReport(req.body);
  
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(result.error === 'Company not found' ? 404 : 500).json(result);
  }
};

export const updateReportController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Report ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid report ID',
    });
    return;
  }

  const result = await updateReport(id, req.body);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    const status = result.error === 'Report not found' ? 404 : 
                  result.error === 'Company not found' ? 404 : 500;
    res.status(status).json(result);
  }
};

export const deleteReportController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Report ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid report ID',
    });
    return;
  }

  const result = await deleteReport(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Report not found' ? 404 : 500).json(result);
  }
};

export const getReportsByCompanyController = async (req: Request, res: Response): Promise<void> => {
  const companyIdParam = req.params.companyId;
  if (!companyIdParam) {
    res.status(400).json({
      success: false,
      error: 'Company ID is required',
    });
    return;
  }
  
  const companyId = parseInt(companyIdParam);
  if (isNaN(companyId)) {
    res.status(400).json({
      success: false,
      error: 'Invalid company ID',
    });
    return;
  }

  const result = await getReportsByCompany(companyId);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Company not found' ? 404 : 500).json(result);
  }
};

export const getReportWithCompanyController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Report ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid report ID',
    });
    return;
  }

  const result = await getReportWithCompany(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Report not found' ? 404 : 500).json(result);
  }
};

export const getReportWithLineItemsController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Report ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid report ID',
    });
    return;
  }

  const result = await getReportWithLineItems(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Report not found' ? 404 : 500).json(result);
  }
}; 