
import { Router } from 'express';
import passport from 'passport';
import { register, login } from '../controllers/auth.controller';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req: any, res) => {
    const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    // Redirect to the frontend with the token
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
  }
);

// Apple OAuth
router.get('/apple', passport.authenticate('apple'));

router.post(
  '/apple/callback',
  passport.authenticate('apple', { failureRedirect: '/login', session: false }),
  (req: any, res) => {
    const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    // Redirect to the frontend with the token
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
  }
);

export default router;
