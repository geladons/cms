
import { Request, Response } from 'express';
import User from '../models/user.model';
import TimeOff from '../models/timeoff.model';

// --- Employee Controllers ---

export const getAvailability = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('availability');
    res.status(200).json(user?.availability);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateAvailability = async (req: any, res: Response) => {
  try {
    const { availability } = req.body;
    await User.findByIdAndUpdate(req.user._id, { availability });
    res.status(200).json({ message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const requestTimeOff = async (req: any, res: Response) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const newTimeOff = new TimeOff({
      employee: req.user._id,
      startDate,
      endDate,
      reason,
    });
    await newTimeOff.save();
    res.status(201).json(newTimeOff);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// --- Admin Controllers ---

export const getTimeOffRequests = async (req: Request, res: Response) => {
  try {
    const timeOffRequests = await TimeOff.find().populate('employee', 'name');
    res.status(200).json(timeOffRequests);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateTimeOffStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const timeOff = await TimeOff.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!timeOff) {
      return res.status(404).json({ message: 'Time off request not found' });
    }
    export const getMyTimeOffRequests = async (req: any, res: Response) => {
  try {
    const timeOffRequests = await TimeOff.find({ employee: req.user._id });
    res.status(200).json(timeOffRequests);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// ... (rest of the controller)
    res.status(200).json(timeOff);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
