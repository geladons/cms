
import { Router } from 'express';
import {
  getAvailability,
  updateAvailability,
  requestTimeOff,
  getTimeOffRequests,
  updateTimeOffStatus,
  getMyTimeOffRequests,
} from '../controllers/availability.controller';
import { auth, admin, employee } from '../middleware/auth.middleware';

const router = Router();

// Employee routes
router.get('/', auth, employee, getAvailability);
router.put('/', auth, employee, updateAvailability);
router.post('/timeoff', auth, employee, requestTimeOff);
router.get('/timeoff/my-requests', auth, employee, getMyTimeOffRequests);

// Admin routes
router.get('/timeoff', auth, admin, getTimeOffRequests);
router.put('/timeoff/:id/status', auth, admin, updateTimeOffStatus);

export default router;
