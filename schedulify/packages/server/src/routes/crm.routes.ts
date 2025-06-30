
import { Router } from 'express';
import { getUserDetails, addUserNote } from '../controllers/crm.controller';
import { auth, admin } from '../middleware/auth.middleware';

const router = Router();

router.get('/users/:id', auth, admin, getUserDetails);
router.post('/users/:id/notes', auth, admin, addUserNote);

export default router;
