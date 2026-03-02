import { Router } from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = Router();

// POST /api/orders (guest ok)
router.post('/', async (req, res) => {
  try {
    const { customer, phone, items, total, pay, delivery } = req.body;
    if (!customer || !phone || !items?.length) {
      return res.status(400).json({ message: 'Customer, phone, and items required' });
    }

    // Generate order ID
    const count = await Order.countDocuments();
    const orderId = `ORD-${String(count + 1).padStart(3, '0')}`;

    // Decrement stock for each item
    for (const item of items) {
      if (item.product) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
      }
    }

    const order = await Order.create({
      orderId, customer, phone, items, total, pay, delivery,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders (Admin)
router.get('/', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/orders/:id/status (Admin)
router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
