
import { Request, Response } from 'express';
import User from '../models/user.model';
import LoyaltyTransaction from '../models/loyalty.model';
import { loyaltyService } from '../plugins/loyalty';

export const getLoyaltyData = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('loyaltyPoints');
    const transactions = await LoyaltyTransaction.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      points: user?.loyaltyPoints,
      history: transactions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const redeemPoints = async (req: any, res: Response) => {
  try {
    const { points } = req.body;
    const result = await loyaltyService.redeemPoints(req.user._id, points);
    if (result.success) {
      res.status(200).json({ discount: result.discount });
    } else {
      res.status(400).json({ message: 'Insufficient points' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
