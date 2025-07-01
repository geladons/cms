
import { Request, Response } from 'express';
import Booking from '../models/booking.model';

export const getReports = async (req: Request, res: Response) => {
  try {
    const totalBookings = await Booking.countDocuments({ status: 'confirmed' });
    const totalRevenue = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$fee' } } },
    ]);

    res.status(200).json({
      totalBookings,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
