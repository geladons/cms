
import { Router } from 'express';
import { getReports } from '../controllers/reports.controller';
import { auth, admin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', auth, admin, getReports);

export default router;
