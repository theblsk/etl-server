import type { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;
    
    const message = `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} - ${duration}ms`;
    
    if (statusCode >= 400) {
      console.error(message);
    } else {
      console.log(message);
    }
  });
  
  next();
};

export const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req;
  const status = err.status || 500;
  
  const errorMessage = `[${new Date().toISOString()}] ERROR: ${method} ${originalUrl} - ${status} - ${err.message}`;
  
  console.error(errorMessage);
  console.error(err.stack);
  
  res.status(status).json({
    success: false,
    error: err.message || 'Something went wrong!',
  });
}; 