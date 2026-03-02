import { Router } from 'express';
import BusinessSettings from '../models/BusinessSettings.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = Router();

// GET /api/settings (public)
router.get('/', async (req, res) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/settings (Admin)
router.put('/', auth, admin, async (req, res) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
