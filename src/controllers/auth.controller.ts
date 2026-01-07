import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { generateToken } from '../utils/jwt';

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


export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }
  
      const user = await UserModel.findOne({ email });
  
      if (!user || !user.isActive) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = generateToken({
        id: user._id.toString(),
        role: user.role,
      });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Login error' });
    }
  };