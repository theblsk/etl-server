import { Router } from 'express';
import { 
  getAllCompaniesController,
  getCompanyByIdController,
  createCompanyController,
  updateCompanyController,
  deleteCompanyController,
  getCompanyWithReportsController
} from '../controllers';

const router = Router();

// Company routes
router.get('/', getAllCompaniesController);
router.get('/:id', getCompanyByIdController);
router.post('/', createCompanyController);
router.put('/:id', updateCompanyController);
router.delete('/:id', deleteCompanyController);
router.get('/:id/reports', getCompanyWithReportsController);

export default router; 