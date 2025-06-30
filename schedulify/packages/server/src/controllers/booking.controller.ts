
import { Request, Response } from 'express';
import Booking from '../models/booking.model';

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createBooking = async (req: any, res: Response) => {
  try {
    const { date, startTime, endTime, fee } = req.body;
    const newBooking = new Booking({
      user: req.user._id,
      date,
      startTime,
      endTime,
      fee,
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getMyBookings = async (req: any, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAssignedBookings = async (req: any, res: Response) => {
  try {
    const bookings = await Booking.find({ employee: req.user._id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const assignBooking = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { employee: employeeId },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
