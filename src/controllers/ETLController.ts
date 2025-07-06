import type { Request, Response, NextFunction } from 'express';
import { runETL } from '../etl';
import type { SourceData } from '../etl';

export const uploadAndRunETL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body as SourceData;
    if (!data || !Array.isArray(data.data)) {
      const error: any = new Error('Invalid JSON format. Expected { data: [...] }');
      error.status = 400;
      return next(error);
    }
    await runETL(data);
    res.status(200).json({
      success: true,
      message: 'ETL process completed successfully',
    });
  } catch (error: any) {
    next(error);
  }
}; 