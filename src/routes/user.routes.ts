import { Router } from 'express';
import {
  getUserById,
  getUsers,
  blockUser,
} from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminOnly } from '../middlewares/role.middleware';

const router = Router();

router.get('/:id', authMiddleware, getUserById);
router.get('/', authMiddleware, adminOnly, getUsers);
router.patch('/:id/block', authMiddleware, blockUser);

export default router;
