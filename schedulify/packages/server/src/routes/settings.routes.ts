
import { Router } from 'express';
import { getAuthSettings, updateAuthSettings } from '../controllers/settings.controller';
import { auth, admin } from '../middleware/auth.middleware'; // We will create this middleware next

const router = Router();

router.get('/auth', getAuthSettings);
router.put('/auth', auth, admin, updateAuthSettings); // Protected route

export default router;
