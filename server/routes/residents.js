import { Router } from 'express';
import Resident from '../models/Resident.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = Router();

// GET /api/residents
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.block) filter.block = req.query.block;
    if (req.query.unit) filter.unit = Number(req.query.unit);
    const residents = await Resident.find(filter).sort({ block: 1, unit: 1 });
    res.json(residents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/residents/:id
router.get('/:id', async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) return res.status(404).json({ message: 'Resident not found' });
    res.json(resident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/residents
router.post('/', auth, admin, async (req, res) => {
  try {
    const { name, phone, unit } = req.body;
    if (!name || !phone || !unit) {
      return res.status(400).json({ message: 'name, phone, unit required' });
    }
    const resident = await Resident.create(req.body);
    res.status(201).json(resident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/residents/bulk - bulk import
router.post('/bulk', auth, admin, async (req, res) => {
  try {
    const { residents } = req.body;
    if (!Array.isArray(residents) || residents.length === 0) {
      return res.status(400).json({ message: 'residents array required' });
    }
    const created = await Resident.insertMany(residents);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/residents/:id
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const resident = await Resident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resident) return res.status(404).json({ message: 'Resident not found' });
    res.json(resident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/residents/:id
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const resident = await Resident.findByIdAndDelete(req.params.id);
    if (!resident) return res.status(404).json({ message: 'Resident not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
