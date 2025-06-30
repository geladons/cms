
import { Router } from 'express';
import { downloadInvoice } from '../controllers/invoice.controller';
import {
  getBookings,
  createBooking,
  getBooking,
  updateBookingStatus,
  getMyBookings,
  getAssignedBookings,
  assignBooking,
  getBookingsWithLocation,
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
router.get('/with-location', getBookingsWithLocation);
router.get('/:id/invoice', auth, downloadInvoice);

export default router;
