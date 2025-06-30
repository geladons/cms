
import { Request, Response } from 'express';
import Stripe from 'stripe';
import Booking from '../models/booking.model';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount, bookingId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { bookingId },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// It's better to use webhooks for reliable payment confirmation,
// but for simplicity, we'll create a dedicated endpoint.
import { loyaltyService } from '../plugins/loyalty';

// ... (inside confirmPayment)
export const confirmPayment = async (req: Request, res: Response) => {
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(bookingId, { paid: true, status: 'confirmed' });
    if (booking) {
      await loyaltyService.awardPoints(booking);
    }
    res.status(200).json({ message: 'Payment confirmed' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
