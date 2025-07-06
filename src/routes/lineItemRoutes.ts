import { Router } from 'express';
import { 
  getAllLineItemsController,
  getLineItemByIdController,
  createLineItemController,
  updateLineItemController,
  deleteLineItemController,
  getLineItemsByReportController,
  getLineItemsByAccountController,
  createBulkLineItemsController
} from '../controllers';

const router = Router();

// Line item routes
router.get('/', getAllLineItemsController);
router.get('/:id', getLineItemByIdController);
router.post('/', createLineItemController);
router.post('/bulk', createBulkLineItemsController);
router.put('/:id', updateLineItemController);
router.delete('/:id', deleteLineItemController);
router.get('/report/:reportId', getLineItemsByReportController);
router.get('/account/:accountId', getLineItemsByAccountController);

export default router; 