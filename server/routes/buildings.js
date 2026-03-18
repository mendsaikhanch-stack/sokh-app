import { Router } from 'express';
import Building from '../models/Building.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = Router();

// GET /api/buildings - list buildings with optional location filters
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.city) filter.city = req.query.city;
    if (req.query.district) filter.district = req.query.district;
    if (req.query.khoroo) filter.khoroo = req.query.khoroo;
    if (req.query.id) filter._id = req.query.id;

    const buildings = await Building.find(filter).sort({ name: 1 });
    res.json(buildings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/buildings/locations - get distinct cities, districts, khoroos
router.get('/locations', async (req, res) => {
  try {
    const filter = {};
    if (req.query.city) filter.city = req.query.city;
    if (req.query.district) filter.district = req.query.district;

    if (!req.query.city) {
      const cities = await Building.distinct('city');
      return res.json({ cities });
    }
    if (!req.query.district) {
      const districts = await Building.distinct('district', filter);
      return res.json({ districts });
    }
    const khoroos = await Building.distinct('khoroo', filter);
    res.json({ khoroos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/buildings/:id
router.get('/:id', async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) return res.status(404).json({ message: 'Building not found' });
    res.json(building);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/buildings - create building
router.post('/', auth, admin, async (req, res) => {
  try {
    const building = await Building.create(req.body);
    res.status(201).json(building);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/buildings/:id - update building settings
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const building = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!building) return res.status(404).json({ message: 'Building not found' });
    res.json(building);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
