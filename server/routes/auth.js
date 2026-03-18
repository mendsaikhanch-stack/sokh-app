import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = Router();

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, unit, block, building } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Нэр, имэйл, нууц үг заавал шаардлагатай' });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Энэ имэйл бүртгэлтэй байна' });

    const user = await User.create({ name, email, password, phone, unit, block, building });
    const token = signToken(user._id);
    res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, unit: user.unit, block: user.block, isAdmin: user.isAdmin, building: user.building },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Имэйл эсвэл нууц үг буруу байна' });
    }
    const token = signToken(user._id);
    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, unit: user.unit, block: user.block, isAdmin: user.isAdmin, building: user.building },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', auth, (req, res) => {
  res.json({ _id: req.user._id, name: req.user.name, email: req.user.email, phone: req.user.phone, unit: req.user.unit, block: req.user.block, isAdmin: req.user.isAdmin, building: req.user.building });
});

export default router;
