import { Router } from 'express';
import Request from '../models/Request.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = Router();

// GET /api/requests
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.unit) filter.unit = Number(req.query.unit);
    if (req.query.status) filter.status = req.query.status;
    const requests = await Request.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/requests
router.post('/', auth, async (req, res) => {
  try {
    const { unit, cat, title } = req.body;
    if (!unit || !cat || !title) {
      return res.status(400).json({ message: 'unit, cat, title required' });
    }
    if (!req.body.date) {
      req.body.date = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
    }
    const request = await Request.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/requests/:id - update status
router.put('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/requests/:id
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
