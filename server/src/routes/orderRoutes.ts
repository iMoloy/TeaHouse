import { Router, Request, Response } from 'express';
import { Order } from '../models/Order.js';

const router = Router();

// POST Create Order
router.post('/', async (req: Request, res: Response) => {
  try {
    const { customerName, customerEmail, items, totalAmount } = req.body;

    if (!customerName || !customerEmail || !items || items.length === 0) {
      return res.status(400).json({ error: 'Invalid order details provided' });
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      items,
      totalAmount,
      status: 'pending'
    });

    return res.status(201).json({
      message: 'Order created successfully',
      orderId: order._id,
      order
    });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

// GET All Orders (Admin or User history)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).exec();
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
