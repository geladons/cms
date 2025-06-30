
import { Router } from 'express';
import { 
  submitReview, 
  getEmployeeReviews, 
  getAllReviews, 
  approveReview, 
  deleteReview 
} from '../controllers/reviews.controller';
import { auth, admin } from '../middleware/auth.middleware';

const router = Router();

// Client routes
router.post('/', auth, submitReview);

// Public routes
router.get('/employee/:employeeId', getEmployeeReviews);

// Admin routes
router.get('/', auth, admin, getAllReviews);
router.put('/:id/approve', auth, admin, approveReview);
router.delete('/:id', auth, admin, deleteReview);

export default router;
