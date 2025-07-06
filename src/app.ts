import express from 'express';
import cors from 'cors';
import routes from './routes';
import { requestLogger, errorLogger } from './middleware/logging';

export const createApp = () => {
  const app = express();
  
  // Parse CORS origins from environment variable
  const corsOrigins = process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
    : [];

  console.log('🔒 CORS_ORIGINS env var:', process.env.CORS_ORIGINS);
  console.log('🔒 Parsed CORS origins:', corsOrigins);

  // Middleware
  app.use(requestLogger);
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (corsOrigins.length === 0) {
        console.log('No CORS origins configured, blocking origin:', origin);
        return callback(new Error('Not allowed by CORS'), false);
      }
      
      if (corsOrigins.includes(origin)) {
        console.log('Allowed origin:', origin);
        return callback(null, true);
      } else {
        console.log('Blocked origin:', origin);
        return callback(new Error('Not allowed by CORS'), false);
      }
    }
  }));
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
  app.use(errorLogger);
  
  return app;
}; 