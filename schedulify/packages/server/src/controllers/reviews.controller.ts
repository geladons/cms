
import { Request, Response } from 'express';
import Review from '../models/review.model';
import Booking from '../models/booking.model';

// --- Client Controller ---
export const submitReview = async (req: any, res: Response) => {
  try {
    const { bookingId, rating, comment } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking || booking.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Booking not found or not authorized' });
    }
    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }

    const newReview = new Review({
      booking: bookingId,
      client: req.user._id,
      employee: booking.employee,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// --- Public Controller ---
export const getEmployeeReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ employee: req.params.employeeId, isApproved: true })
      .populate('client', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// --- Admin Controllers ---
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().populate('client', 'name').populate('employee', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const approveReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
