import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { auth } from './lib/auth.js';
import { toNodeHandler } from 'better-auth/node';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Better Auth API Endpoint
app.all('/api/auth/*', toNodeHandler(auth));

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'TeaHouse Express TS Server running smoothly' });
});

// REST API Endpoints
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`🚀 [TeaHouse Server] Express running on http://localhost:${PORT}`);
});
