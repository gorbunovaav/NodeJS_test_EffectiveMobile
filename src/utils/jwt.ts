import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: { id: string; role: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};
