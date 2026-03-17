import { Router } from 'express';
import Building from '../models/Building.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = Router();

// GET /api/buildings - get building settings (auto-create if none)
router.get('/', async (req, res) => {
  try {
    let building = await Building.findOne();
    if (!building) {
      building = await Building.create({ name: 'СӨХ' });
    }
    res.json(building);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/buildings - update building settings
router.put('/', auth, admin, async (req, res) => {
  try {
    let building = await Building.findOne();
    if (!building) {
      building = await Building.create(req.body);
    } else {
      Object.assign(building, req.body);
      await building.save();
    }
    res.json(building);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
