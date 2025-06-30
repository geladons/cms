
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send({ error: 'Admin access required.' });
  }
};

export const employee = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === 'employee' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).send({ error: 'Employee access required.' });
  }
};
