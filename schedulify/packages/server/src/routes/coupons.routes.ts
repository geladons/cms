
import { Router } from 'express';
import { 
  createCoupon, 
  getCoupons, 
  updateCoupon, 
  deleteCoupon,
  validateCoupon
} from '../controllers/coupons.controller';
import { auth, admin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/validate', validateCoupon);

// Admin routes
router.post('/', auth, admin, createCoupon);
router.get('/', auth, admin, getCoupons);
router.put('/:id', auth, admin, updateCoupon);
router.delete('/:id', auth, admin, deleteCoupon);

export default router;
