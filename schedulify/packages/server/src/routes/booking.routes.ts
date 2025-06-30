
import { Router } from 'express';
import {
  getBookings,
  createBooking,
  getBooking,
  updateBookingStatus,
  getMyBookings,
  getAssignedBookings,
  assignBooking,
} from '../controllers/booking.controller';
import { auth, admin, employee } from '../middleware/auth.middleware'; // We will add employee middleware next

const router = Router();

router.get('/', auth, admin, getBookings);
router.get('/my-bookings', auth, getMyBookings);
router.get('/my-assigned-bookings', auth, employee, getAssignedBookings);
router.post('/', auth, createBooking);
router.get('/:id', auth, getBooking);
router.put('/:id/status', auth, admin, updateBookingStatus);
router.put('/:id/assign', auth, admin, assignBooking);

export default router;
