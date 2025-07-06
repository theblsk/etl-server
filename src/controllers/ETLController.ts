import type { Request, Response } from 'express';
import { runETL } from '../etl';
import type { SourceData } from '../etl';

export const uploadAndRunETL = async (req: Request, res: Response) => {
  try {
    const data = req.body as SourceData;
    if (!data || !Array.isArray(data.data)) {
      res.status(400).json({
        success: false,
        error: 'Invalid JSON format. Expected { data: [...] }',
      });
      return;
    }
    await runETL(data);
    res.status(200).json({
      success: true,
      message: 'ETL process completed successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error?.message || 'ETL process failed',
    });
  }
}; 