
import { Request, Response } from 'express';
import Coupon from '../models/coupon.model';

// --- Admin Controllers ---
export const createCoupon = async (req: Request, res: Response) => {
  try {
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// --- Public Controller ---
export const validateCoupon = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code, isActive: true, expiryDate: { $gte: new Date() } });

    if (!coupon || coupon.timesUsed >= coupon.usageLimit) {
      return res.status(404).json({ message: 'Invalid or expired coupon' });
    }

    res.status(200).json({
      discountType: coupon.discountType,
      value: coupon.value,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
