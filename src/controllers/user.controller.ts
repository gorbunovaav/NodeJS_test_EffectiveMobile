import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { UserModel } from '../models/user.model';

export const getUserById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (req.user?.role !== 'admin' && req.user?.id !== id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const user = await UserModel.findById(id).select('-password');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

export const getUsers = async (_req: AuthRequest, res: Response) => {
  const users = await UserModel.find().select('-password');
  res.json(users);
};

export const blockUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (req.user?.role !== 'admin' && req.user?.id !== id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const user = await UserModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'User blocked' });
};
