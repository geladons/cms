
import { Router } from 'express';
import { getPublicEmployees, getEmployeeProfile } from '../controllers/public.controller';

const router = Router();

router.get('/team', getPublicEmployees);
router.get('/team/:id', getEmployeeProfile);

export default router;
