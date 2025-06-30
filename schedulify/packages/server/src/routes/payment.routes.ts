
import { Router } from 'express';
import { createPaymentIntent, confirmPayment } from '../controllers/payment.controller';

const router = Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/confirm-payment', confirmPayment);

export default router;
