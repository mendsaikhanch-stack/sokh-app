import { Router } from 'express';
import Parking from '../models/Parking.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = Router();

// GET /api/parking - list all spots (with filters)
router.get('/', auth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.zone) filter.zone = req.query.zone;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.unit) filter.unit = Number(req.query.unit);
    if (req.query.block) filter.block = req.query.block;
    if (req.query.vehiclePlate) filter.vehiclePlate = { $regex: req.query.vehiclePlate, $options: 'i' };
    if (req.query.search) {
      const s = req.query.search;
      filter.$or = [
        { spotNumber: { $regex: s, $options: 'i' } },
        { residentName: { $regex: s, $options: 'i' } },
        { vehiclePlate: { $regex: s, $options: 'i' } },
        { vehicleModel: { $regex: s, $options: 'i' } },
      ];
    }
    const spots = await Parking.find(filter).sort({ zone: 1, spotNumber: 1 });
    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/parking/stats - parking statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const all = await Parking.find();
    const total = all.length;
    const occupied = all.filter(s => s.status === 'occupied').length;
    const available = all.filter(s => s.status === 'available').length;
    const reserved = all.filter(s => s.status === 'reserved').length;
    const maintenance = all.filter(s => s.status === 'maintenance').length;

    // By zone
    const zones = {};
    all.forEach(s => {
      if (!zones[s.zone]) zones[s.zone] = { total: 0, occupied: 0, available: 0 };
      zones[s.zone].total++;
      if (s.status === 'occupied') zones[s.zone].occupied++;
      if (s.status === 'available') zones[s.zone].available++;
    });

    // By type
    const types = {};
    all.forEach(s => {
      if (!types[s.type]) types[s.type] = 0;
      types[s.type]++;
    });

    // Revenue
    const totalMonthlyRevenue = all.filter(s => s.status === 'occupied').reduce((sum, s) => sum + s.monthlyFee, 0);
    const unpaidCount = all.filter(s => s.status === 'occupied' && !s.paid).length;

    res.json({ total, occupied, available, reserved, maintenance, zones, types, totalMonthlyRevenue, unpaidCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/parking/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const spot = await Parking.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Зогсоол олдсонгүй' });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/parking - create spot
router.post('/', auth, admin, async (req, res) => {
  try {
    const { spotNumber } = req.body;
    if (!spotNumber) return res.status(400).json({ message: 'spotNumber шаардлагатай' });
    const exists = await Parking.findOne({ spotNumber, zone: req.body.zone || 'A' });
    if (exists) return res.status(400).json({ message: 'Энэ дугаартай зогсоол аль хэдийн бүртгэгдсэн' });
    const spot = await Parking.create(req.body);
    res.status(201).json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/parking/bulk - bulk create spots
router.post('/bulk', auth, admin, async (req, res) => {
  try {
    const { zone, type, prefix, from, to, monthlyFee } = req.body;
    if (!from || !to || from > to) return res.status(400).json({ message: 'from, to дугаар шаардлагатай' });
    const spots = [];
    for (let i = from; i <= to; i++) {
      const spotNumber = prefix ? `${prefix}-${String(i).padStart(2, '0')}` : String(i);
      spots.push({
        spotNumber,
        zone: zone || 'A',
        type: type || 'standard',
        status: 'available',
        monthlyFee: monthlyFee || 0,
      });
    }
    const created = await Parking.insertMany(spots);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/parking/:id - update spot
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const spot = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!spot) return res.status(404).json({ message: 'Зогсоол олдсонгүй' });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/parking/:id/assign - assign spot to resident
router.put('/:id/assign', auth, admin, async (req, res) => {
  try {
    const { unit, block, residentName, residentPhone, vehiclePlate, vehicleModel, vehicleColor } = req.body;
    const spot = await Parking.findByIdAndUpdate(req.params.id, {
      unit, block: block || 'A', residentName, residentPhone,
      vehiclePlate, vehicleModel, vehicleColor: vehicleColor || '',
      status: 'occupied',
      assignedDate: new Date().toISOString().slice(0, 10),
    }, { new: true });
    if (!spot) return res.status(404).json({ message: 'Зогсоол олдсонгүй' });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/parking/:id/release - release spot
router.put('/:id/release', auth, admin, async (req, res) => {
  try {
    const spot = await Parking.findByIdAndUpdate(req.params.id, {
      unit: 0, block: '', residentName: '', residentPhone: '',
      vehiclePlate: '', vehicleModel: '', vehicleColor: '',
      status: 'available', assignedDate: '', expiryDate: '', paid: false, paidUntil: '',
    }, { new: true });
    if (!spot) return res.status(404).json({ message: 'Зогсоол олдсонгүй' });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/parking/:id/payment - toggle payment status
router.put('/:id/payment', auth, admin, async (req, res) => {
  try {
    const { paid, paidUntil } = req.body;
    const spot = await Parking.findByIdAndUpdate(req.params.id, { paid, paidUntil: paidUntil || '' }, { new: true });
    if (!spot) return res.status(404).json({ message: 'Зогсоол олдсонгүй' });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/parking/:id
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const spot = await Parking.findByIdAndDelete(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Зогсоол олдсонгүй' });
    res.json({ message: 'Устгалаа' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
