import { 
  getAllAccounts as daoGetAllAccounts,
  getAccountById as daoGetAccountById,
  createAccount as daoCreateAccount,
  updateAccount as daoUpdateAccount,
  deleteAccount as daoDeleteAccount,
  findAccountByName,
  findAccountsByCategory,
  searchAccountsByName
} from '../models';
import type { Account, NewAccount, ApiResponse } from '../types';

export const getAllAccounts = async (): Promise<ApiResponse<Account[]>> => {
  try {
    const accounts = await daoGetAllAccounts();
    return {
      success: true,
      data: accounts,
      message: 'Accounts retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getAccountById = async (id: number): Promise<ApiResponse<Account>> => {
  try {
    const account = await daoGetAccountById(id);
    
    if (!account) {
      return {
        success: false,
        error: 'Account not found',
      };
    }

    return {
      success: true,
      data: account,
      message: 'Account retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const createAccount = async (data: NewAccount): Promise<ApiResponse<Account>> => {
  try {
    // Check if account with same name already exists
    const existingAccount = await findAccountByName(data.name);
    if (existingAccount) {
      return {
        success: false,
        error: 'Account with this name already exists',
      };
    }

    const account = await daoCreateAccount(data);
    return {
      success: true,
      data: account,
      message: 'Account created successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const updateAccount = async (id: number, data: Partial<NewAccount>): Promise<ApiResponse<Account>> => {
  try {
    const existingAccount = await daoGetAccountById(id);
    if (!existingAccount) {
      return {
        success: false,
        error: 'Account not found',
      };
    }

    // Check if new name conflicts with existing account
    if (data.name && data.name !== existingAccount.name) {
      const nameConflict = await findAccountByName(data.name);
      if (nameConflict) {
        return {
          success: false,
          error: 'Account with this name already exists',
        };
      }
    }

    const updatedAccount = await daoUpdateAccount(id, data);
    return {
      success: true,
      data: updatedAccount!,
      message: 'Account updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const deleteAccount = async (id: number): Promise<ApiResponse<boolean>> => {
  try {
    const existingAccount = await daoGetAccountById(id);
    if (!existingAccount) {
      return {
        success: false,
        error: 'Account not found',
      };
    }

    const deleted = await daoDeleteAccount(id);
    return {
      success: true,
      data: deleted,
      message: 'Account deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getAccountsByCategory = async (category: string): Promise<ApiResponse<Account[]>> => {
  try {
    const accounts = await findAccountsByCategory(category);
    return {
      success: true,
      data: accounts,
      message: 'Accounts retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const searchAccounts = async (searchTerm: string): Promise<ApiResponse<Account[]>> => {
  try {
    const accounts = await searchAccountsByName(searchTerm);
    return {
      success: true,
      data: accounts,
      message: 'Accounts retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}; 