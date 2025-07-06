import type { Request, Response } from 'express';
import { 
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountsByCategory,
  searchAccounts
} from '../services';

export const getAllAccountsController = async (req: Request, res: Response): Promise<void> => {
  const result = await getAllAccounts();
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

export const getAccountByIdController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Account ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid account ID',
    });
    return;
  }

  const result = await getAccountById(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Account not found' ? 404 : 500).json(result);
  }
};

export const createAccountController = async (req: Request, res: Response): Promise<void> => {
  const result = await createAccount(req.body);
  
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(result.error === 'Account with this name already exists' ? 409 : 500).json(result);
  }
};

export const updateAccountController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Account ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid account ID',
    });
    return;
  }

  const result = await updateAccount(id, req.body);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    const status = result.error === 'Account not found' ? 404 : 
                  result.error === 'Account with this name already exists' ? 409 : 500;
    res.status(status).json(result);
  }
};

export const deleteAccountController = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.params.id;
  if (!idParam) {
    res.status(400).json({
      success: false,
      error: 'Account ID is required',
    });
    return;
  }
  
  const id = parseInt(idParam);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid account ID',
    });
    return;
  }

  const result = await deleteAccount(id);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error === 'Account not found' ? 404 : 500).json(result);
  }
};

export const getAccountsByCategoryController = async (req: Request, res: Response): Promise<void> => {
  const category = req.params.category;
  
  if (!category) {
    res.status(400).json({
      success: false,
      error: 'Category is required',
    });
    return;
  }

  const result = await getAccountsByCategory(category);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

export const searchAccountsController = async (req: Request, res: Response): Promise<void> => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string') {
    res.status(400).json({
      success: false,
      error: 'Search query parameter "q" is required',
    });
    return;
  }

  const result = await searchAccounts(q);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
}; 