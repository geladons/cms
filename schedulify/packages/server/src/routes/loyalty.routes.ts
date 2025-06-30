
import { Router } from 'express';
import { getLoyaltyData, redeemPoints } from '../controllers/loyalty.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

router.get('/', auth, getLoyaltyData);
router.post('/redeem', auth, redeemPoints);

export default router;
