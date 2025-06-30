
import { Router } from 'express';
import { updateProfile } from '../controllers/profile.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

router.put('/', auth, updateProfile);

export default router;
