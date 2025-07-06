import type { Request, Response } from 'express';
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

export const getAllLineItemsController = async (req: Request, res: Response): Promise<void> => {
  const result = await getAllLineItems();
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

export const getLineItemByIdController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Line item ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid line item ID',
    });
    return;
  }

  const result = await getLineItemById(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Line item not found' ? 404 : 500).json(result);
  }
};

export const createLineItemController = async (req: Request, res: Response): Promise<void> => {
  const result = await createLineItem(req.body);
  
  if (result.success) {
    res.status(201).json(result);
  } else {
    const status = result.error === 'Report not found' || result.error === 'Account not found' ? 404 : 500;
    res.status(status).json(result);
  }
};

export const updateLineItemController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Line item ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid line item ID',
    });
    return;
  }

  const result = await updateLineItem(id, req.body);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    const status = result.error === 'Line item not found' || 
                  result.error === 'Report not found' || 
                  result.error === 'Account not found' ? 404 : 500;
    res.status(status).json(result);
  }
};

export const deleteLineItemController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Line item ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid line item ID',
    });
    return;
  }

  const result = await deleteLineItem(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Line item not found' ? 404 : 500).json(result);
  }
};

export const getLineItemsByReportController = async (req: Request, res: Response): Promise<void> => {
  const reportIdParam = req.params.reportId;
  if (!reportIdParam) {
    res.status(400).json({
      success: false,
      error: 'Report ID is required',
    });
    return;
  }
  
  const reportId = parseInt(reportIdParam);
  if (isNaN(reportId)) {
    res.status(400).json({
      success: false,
      error: 'Invalid report ID',
    });
    return;
  }

  const result = await getLineItemsByReport(reportId);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Report not found' ? 404 : 500).json(result);
  }
};

export const getLineItemsByAccountController = async (req: Request, res: Response): Promise<void> => {
  const accountIdParam = req.params.accountId;
  if (!accountIdParam) {
    res.status(400).json({
      success: false,
      error: 'Account ID is required',
    });
    return;
  }
  
  const accountId = parseInt(accountIdParam);
  if (isNaN(accountId)) {
    res.status(400).json({
      success: false,
      error: 'Invalid account ID',
    });
    return;
  }

  const result = await getLineItemsByAccount(accountId);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Account not found' ? 404 : 500).json(result);
  }
};

export const createBulkLineItemsController = async (req: Request, res: Response): Promise<void> => {
  const result = await createBulkLineItems(req.body);
  
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result);
  }
}; 