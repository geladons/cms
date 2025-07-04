
import { Router } from 'express';
import { 
  createService, 
  getServices, 
  updateService, 
  deleteService,
  getActiveServices,
  getAvailableEmployees
} from '../controllers/services.controller';
import { auth, admin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/active', getActiveServices);
router.get('/availability', getAvailableEmployees);

// Admin routes
router.post('/', auth, admin, createService);
router.get('/', auth, admin, getServices);
router.put('/:id', auth, admin, updateService);
router.delete('/:id', auth, admin, deleteService);

export default router;
