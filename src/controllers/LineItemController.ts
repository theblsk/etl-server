import type { Request, Response, NextFunction } from 'express';
import { 
  getAllLineItems,
  getLineItemById,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  getLineItemsByReport,
  getLineItemsByAccount,
  createBulkLineItems
} from '../services';

export const getAllLineItemsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await getAllLineItems();
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

export const getLineItemByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Line item ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid line item ID');
      error.status = 400;
      return next(error);
    }

    const result = await getLineItemById(id);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Line item not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const createLineItemController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createLineItem(req.body);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Report not found' || result.error === 'Account not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateLineItemController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Line item ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid line item ID');
      error.status = 400;
      return next(error);
    }

    const result = await updateLineItem(id, req.body);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Line item not found' || 
                    result.error === 'Report not found' || 
                    result.error === 'Account not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteLineItemController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Line item ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid line item ID');
      error.status = 400;
      return next(error);
    }

    const result = await deleteLineItem(id);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Line item not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getLineItemsByReportController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reportIdParam = req.params.reportId;
    if (!reportIdParam) {
      const error: any = new Error('Report ID is required');
      error.status = 400;
      return next(error);
    }
    
    const reportId = parseInt(reportIdParam);
    if (isNaN(reportId)) {
      const error: any = new Error('Invalid report ID');
      error.status = 400;
      return next(error);
    }

    const result = await getLineItemsByReport(reportId);
    
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

export const getLineItemsByAccountController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accountIdParam = req.params.accountId;
    if (!accountIdParam) {
      const error: any = new Error('Account ID is required');
      error.status = 400;
      return next(error);
    }
    
    const accountId = parseInt(accountIdParam);
    if (isNaN(accountId)) {
      const error: any = new Error('Invalid account ID');
      error.status = 400;
      return next(error);
    }

    const result = await getLineItemsByAccount(accountId);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Account not found' ? 404 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const createBulkLineItemsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createBulkLineItems(req.body);
    if (result.success) {
      res.status(201).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
}; 