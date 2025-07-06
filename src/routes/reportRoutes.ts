import { Router } from 'express';
import { 
  getAllReportsController,
  getReportByIdController,
  createReportController,
  updateReportController,
  deleteReportController,
  getReportsByCompanyController,
  getReportWithCompanyController,
  getReportWithLineItemsController
} from '../controllers';

const router = Router();

// Report routes
router.get('/', getAllReportsController);
router.get('/:id', getReportByIdController);
router.post('/', createReportController);
router.put('/:id', updateReportController);
router.delete('/:id', deleteReportController);
router.get('/company/:companyId', getReportsByCompanyController);
router.get('/:id/company', getReportWithCompanyController);
router.get('/:id/line-items', getReportWithLineItemsController);

export default router; 