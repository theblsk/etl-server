import { 
  getAllLineItems as daoGetAllLineItems,
  getLineItemById as daoGetLineItemById,
  createLineItem as daoCreateLineItem,
  updateLineItem as daoUpdateLineItem,
  deleteLineItem as daoDeleteLineItem,
  findLineItemsByReportId,
  findLineItemsByAccountId,
  createBulkLineItems as daoCreateBulkLineItems,
  getReportById,
  getAccountById
} from '../models';
import type { LineItem, NewLineItem, ApiResponse } from '../types';

export const getAllLineItems = async (): Promise<ApiResponse<LineItem[]>> => {
  try {
    const lineItems = await daoGetAllLineItems();
    return {
      success: true,
      data: lineItems,
      message: 'Line items retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getLineItemById = async (id: number): Promise<ApiResponse<LineItem>> => {
  try {
    const lineItem = await daoGetLineItemById(id);
    
    if (!lineItem) {
      return {
        success: false,
        error: 'Line item not found',
      };
    }

    return {
      success: true,
      data: lineItem,
      message: 'Line item retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const createLineItem = async (data: NewLineItem): Promise<ApiResponse<LineItem>> => {
  try {
    // Validate that report exists
    const report = await getReportById(data.reportId);
    if (!report) {
      return {
        success: false,
        error: 'Report not found',
      };
    }

    // Validate that account exists
    const account = await getAccountById(data.accountId);
    if (!account) {
      return {
        success: false,
        error: 'Account not found',
      };
    }

    const lineItem = await daoCreateLineItem(data);
    return {
      success: true,
      data: lineItem,
      message: 'Line item created successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const updateLineItem = async (id: number, data: Partial<NewLineItem>): Promise<ApiResponse<LineItem>> => {
  try {
    const existingLineItem = await daoGetLineItemById(id);
    if (!existingLineItem) {
      return {
        success: false,
        error: 'Line item not found',
      };
    }

    // Validate report exists if being updated
    if (data.reportId && data.reportId !== existingLineItem.reportId) {
      const report = await getReportById(data.reportId);
      if (!report) {
        return {
          success: false,
          error: 'Report not found',
        };
      }
    }

    // Validate account exists if being updated
    if (data.accountId && data.accountId !== existingLineItem.accountId) {
      const account = await getAccountById(data.accountId);
      if (!account) {
        return {
          success: false,
          error: 'Account not found',
        };
      }
    }

    const updatedLineItem = await daoUpdateLineItem(id, data);
    return {
      success: true,
      data: updatedLineItem!,
      message: 'Line item updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const deleteLineItem = async (id: number): Promise<ApiResponse<boolean>> => {
  try {
    const existingLineItem = await daoGetLineItemById(id);
    if (!existingLineItem) {
      return {
        success: false,
        error: 'Line item not found',
      };
    }

    const deleted = await daoDeleteLineItem(id);
    return {
      success: true,
      data: deleted,
      message: 'Line item deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getLineItemsByReport = async (reportId: number): Promise<ApiResponse<LineItem[]>> => {
  try {
    // Validate report exists
    const report = await getReportById(reportId);
    if (!report) {
      return {
        success: false,
        error: 'Report not found',
      };
    }

    const lineItems = await findLineItemsByReportId(reportId);
    return {
      success: true,
      data: lineItems,
      message: 'Line items retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const getLineItemsByAccount = async (accountId: number): Promise<ApiResponse<LineItem[]>> => {
  try {
    // Validate account exists
    const account = await getAccountById(accountId);
    if (!account) {
      return {
        success: false,
        error: 'Account not found',
      };
    }

    const lineItems = await findLineItemsByAccountId(accountId);
    return {
      success: true,
      data: lineItems,
      message: 'Line items retrieved successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const createBulkLineItems = async (data: NewLineItem[]): Promise<ApiResponse<LineItem[]>> => {
  try {
    // Validate all reports and accounts exist
    const reportIds = [...new Set(data.map(item => item.reportId))];
    const accountIds = [...new Set(data.map(item => item.accountId))];

    for (const reportId of reportIds) {
      const report = await getReportById(reportId);
      if (!report) {
        return {
          success: false,
          error: `Report with id ${reportId} not found`,
        };
      }
    }

    for (const accountId of accountIds) {
      const account = await getAccountById(accountId);
      if (!account) {
        return {
          success: false,
          error: `Account with id ${accountId} not found`,
        };
      }
    }

    const lineItems = await daoCreateBulkLineItems(data);
    return {
      success: true,
      data: lineItems,
      message: 'Line items created successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}; 