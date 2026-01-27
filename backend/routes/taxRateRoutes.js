import express from 'express';
const router = express.Router();
import {
  getTaxRates,
  getTaxRateByState,
  updateTaxRate,
  deactivateTaxRate,
  activateTaxRate,
  getAllTaxRates,
} from '../controllers/taxRateController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public routes
router.get('/', getTaxRates);
router.get('/:state', getTaxRateByState);

// Admin routes
router.get('/admin/all', protect, admin, getAllTaxRates);
router.put('/:state', protect, admin, updateTaxRate);
router.put('/:state/deactivate', protect, admin, deactivateTaxRate);
router.put('/:state/activate', protect, admin, activateTaxRate);

export default router;
