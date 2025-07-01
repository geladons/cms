
import { Request, Response } from 'express';
import User from '../models/user.model';
import { geocodingService } from '../plugins/mapping';

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { name, email, address } = req.body;
    let location = null;

    if (address) {
      location = await geocodingService.getCoordinates(address);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, location: { ...location, address } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
