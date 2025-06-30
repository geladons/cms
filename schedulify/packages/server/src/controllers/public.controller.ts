
import { Request, Response } from 'express';
import User from '../models/user.model';
import Review from '../models/review.model';

export const getPublicEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('name bio');
    // In a real app, you'd likely want to calculate and include average ratings
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getEmployeeProfile = async (req: Request, res: Response) => {
  try {
    const employee = await User.findById(req.params.id).select('name bio');
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const reviews = await Review.find({ employee: req.params.id, isApproved: true })
      .populate('client', 'name');
      
    res.status(200).json({ employee, reviews });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
