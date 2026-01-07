import express from 'express';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';

export const app = express();

app.use(express.json());

connectDB();

app.use('/auth', authRoutes);

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
