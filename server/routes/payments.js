import { Router } from 'express';
import Payment from '../models/Payment.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = Router();

// GET /api/payments
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.unit) filter.unit = Number(req.query.unit);
    if (req.query.block) filter.block = req.query.block;
    if (req.query.month) filter.month = req.query.month;
    if (req.query.paid !== undefined) filter.paid = req.query.paid === 'true';
    const payments = await Payment.find(filter).sort({ month: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/payments - create payment record
router.post('/', auth, admin, async (req, res) => {
  try {
    const { unit, month, amount } = req.body;
    if (!unit || !month || !amount) {
      return res.status(400).json({ message: 'unit, month, amount required' });
    }
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/payments/generate - generate monthly payments for all units
router.post('/generate', auth, admin, async (req, res) => {
  try {
    const { month, amount, units } = req.body;
    if (!month || !amount || !Array.isArray(units)) {
      return res.status(400).json({ message: 'month, amount, units[] required' });
    }
    const payments = units.map(u => ({
      unit: u.number,
      block: u.block || 'A',
      month,
      amount,
      label: 'СӨХ төлбөр',
      paid: false,
    }));
    const created = await Payment.insertMany(payments);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/payments/:id - mark as paid
router.put('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/payments/:id
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
