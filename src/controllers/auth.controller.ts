import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, birthDate, email, password } = req.body;

    if (!fullName || !birthDate || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      fullName,
      birthDate,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration error' });
  }
};
