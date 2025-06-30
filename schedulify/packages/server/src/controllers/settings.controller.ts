
import { Request, Response } from 'express';
import Settings from '../models/settings.model';

export const getAuthSettings = async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne();
    res.status(200).json(settings?.auth);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateAuthSettings = async (req: Request, res: Response) => {
  try {
    const { emailPassword, google, apple, sms } = req.body;
    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: { 'auth.emailPassword': emailPassword, 'auth.google': google, 'auth.apple': apple, 'auth.sms': sms } },
      { new: true, upsert: true }
    );
    res.status(200).json(settings?.auth);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
