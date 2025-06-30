
import { Request, Response } from 'express';
import twilio from 'twilio';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const otpStore: { [key: string]: { otp: string; expires: number } } = {};

export const sendOtp = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore[phoneNumber] = { otp, expires };

  try {
    await client.messages.create({
      body: `Your Schedulify verification code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: phoneNumber,
    });
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;
  const storedOtp = otpStore[phoneNumber];

  if (!storedOtp || storedOtp.otp !== otp || Date.now() > storedOtp.expires) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  try {
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      // If the user doesn't exist, you might want to create a new one
      // or require them to register through a different method first.
      // For now, we'll assume the user must exist.
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    delete otpStore[phoneNumber]; // OTP is used, so remove it

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
