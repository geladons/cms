
import { Request, Response } from 'express';
import Stripe from 'stripe';
import Booking from '../models/booking.model';
import Coupon from '../models/coupon.model';
import { loyaltyService } from '../plugins/loyalty';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount, bookingId, couponCode } = req.body;
  let finalAmount = amount;

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode });
    if (coupon) {
      if (coupon.discountType === 'percentage') {
        finalAmount = amount * (1 - coupon.value / 100);
      } else {
        finalAmount = amount - coupon.value * 100; // Convert dollars to cents
      }
    }
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount),
      currency: 'usd',
      metadata: { bookingId, couponCode },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const confirmPayment = async (req: Request, res: Response) => {
  const { bookingId, couponCode } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(bookingId, { paid: true, status: 'confirmed' });
    if (booking) {
      await loyaltyService.awardPoints(booking);
    }
    if (couponCode) {
      await Coupon.findOneAndUpdate({ code: couponCode }, { $inc: { timesUsed: 1 } });
    }
    res.status(200).json({ message: 'Payment confirmed' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
