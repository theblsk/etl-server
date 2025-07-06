import { Router } from 'express';
import { 
  getAllAccountsController,
  getAccountByIdController,
  createAccountController,
  updateAccountController,
  deleteAccountController,
  getAccountsByCategoryController,
  searchAccountsController
} from '../controllers';

const router = Router();

// Account routes
router.get('/', getAllAccountsController);
router.get('/search', searchAccountsController);
router.get('/category/:category', getAccountsByCategoryController);
router.get('/:id', getAccountByIdController);
router.post('/', createAccountController);
router.put('/:id', updateAccountController);
router.delete('/:id', deleteAccountController);

export default router; 