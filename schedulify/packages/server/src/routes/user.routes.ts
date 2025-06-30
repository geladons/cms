
import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller';
import { auth, admin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', auth, admin, getUsers);
router.post('/', auth, admin, createUser);
router.put('/:id', auth, admin, updateUser);
router.delete('/:id', auth, admin, deleteUser);

export default router;
