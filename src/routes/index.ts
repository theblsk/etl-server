import { Router } from 'express';
import companyRoutes from './companyRoutes';
import accountRoutes from './accountRoutes';
import reportRoutes from './reportRoutes';
import lineItemRoutes from './lineItemRoutes';
import etlRoutes from './etlRoutes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'API is running' 
  });
});

// Mount routes
router.use('/companies', companyRoutes);
router.use('/accounts', accountRoutes);
router.use('/reports', reportRoutes);
router.use('/line-items', lineItemRoutes);
router.use('/etl', etlRoutes);

export default router; 