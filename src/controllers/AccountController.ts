import type { Request, Response, NextFunction } from 'express';
import { 
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountsByCategory,
  searchAccounts
} from '../services';

export const getAllAccountsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await getAllAccounts();
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

export const getAccountByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Account ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid account ID');
      error.status = 400;
      return next(error);
    }

    const result = await getAccountById(id);
    
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

export const createAccountController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createAccount(req.body);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Account with this name already exists' ? 409 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateAccountController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Account ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid account ID');
      error.status = 400;
      return next(error);
    }

    const result = await updateAccount(id, req.body);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      const error: any = new Error(result.error);
      error.status = result.error === 'Account not found' ? 404 : 
                    result.error === 'Account with this name already exists' ? 409 : 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteAccountController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      const error: any = new Error('Account ID is required');
      error.status = 400;
      return next(error);
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      const error: any = new Error('Invalid account ID');
      error.status = 400;
      return next(error);
    }

    const result = await deleteAccount(id);
    
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

export const getAccountsByCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = req.params.category;
    if (!category) {
      const error: any = new Error('Category is required');
      error.status = 400;
      return next(error);
    }

    const result = await getAccountsByCategory(category);
    
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

export const searchAccountsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      const error: any = new Error('Search query parameter "q" is required');
      error.status = 400;
      return next(error);
    }

    const result = await searchAccounts(q);
    
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