import express from 'express';
import cors from 'cors';
import routes from './routes';

export const createApp = () => {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Routes
  app.use('/api', routes);
  
  // 404 handler
  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      error: 'Route not found',
      path: req.path,
      method: req.method,
    });
  });
  
  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Global error handler:', err);
    
    res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  });
  
  return app;
}; 