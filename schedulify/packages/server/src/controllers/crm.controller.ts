
import { Request, Response } from 'express';
import User from '../models/user.model';
import Booking from '../models/booking.model';

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookings = await Booking.find({ user: req.params.id });

    res.status(200).json({ user, bookings });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const addUserNote = async (req: any, res: Response) => {
  try {
    const { content } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.notes.push({
      content,
      admin: req.user._id,
    });

    await user.save();
    res.status(201).json(user.notes);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
