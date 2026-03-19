import { Router } from 'express';
import MoveOut from '../models/MoveOut.js';
import Payment from '../models/Payment.js';
import Parking from '../models/Parking.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = Router();

const DEFAULT_CHECKLIST = [
  { key: 'utilities', label: 'Цахилгаан, ус, дулааны тооцоо хийсэн', completed: false },
  { key: 'maintenance_fee', label: 'СӨХ-ийн төлбөр бүрэн төлсөн', completed: false },
  { key: 'parking', label: 'Зогсоолын түрээс тооцсон / чөлөөлсөн', completed: false },
  { key: 'key_return', label: 'Түлхүүр хүлээлгэж өгсөн', completed: false },
  { key: 'meter_reading', label: 'Тоолуурын уншилт авсан', completed: false },
  { key: 'damage_check', label: 'Эвдрэл гэмтлийн шалгалт хийсэн', completed: false },
  { key: 'cleaning', label: 'Цэвэрлэгээ хийсэн', completed: false },
  { key: 'deposit', label: 'Барьцаа мөнгөний тооцоо хийсэн', completed: false },
];

// Helper: send webhook
async function sendWebhook(moveOut, event, extraData = {}) {
  if (!moveOut.webhookUrl) return;
  if (moveOut.webhookEvents.length > 0 && !moveOut.webhookEvents.includes(event)) return;
  try {
    const payload = {
      event,
      moveOutId: moveOut._id,
      status: moveOut.status,
      unit: moveOut.unit,
      block: moveOut.block,
      residentName: moveOut.residentName,
      totalAmount: moveOut.totalAmount,
      paidAmount: moveOut.paidAmount,
      timestamp: new Date().toISOString(),
      ...extraData,
    };
    const headers = { 'Content-Type': 'application/json' };
    if (moveOut.webhookSecret) headers['X-Webhook-Secret'] = moveOut.webhookSecret;
    await fetch(moveOut.webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    moveOut.lastWebhookAt = new Date().toISOString();
    await moveOut.save();
  } catch {
    // webhook failure is non-blocking
  }
}

// Recalc totals
function recalcTotals(moveOut) {
  moveOut.totalAmount = moveOut.invoices.reduce((s, i) => s + i.amount, 0);
  moveOut.paidAmount = moveOut.invoices.filter(i => i.paid).reduce((s, i) => s + i.amount, 0);
}

// GET /api/moveouts - list
router.get('/', auth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.unit) filter.unit = Number(req.query.unit);
    if (req.query.block) filter.block = req.query.block;
    if (req.query.search) {
      const s = req.query.search;
      filter.$or = [
        { residentName: { $regex: s, $options: 'i' } },
        { phone: { $regex: s, $options: 'i' } },
      ];
    }
    const list = await MoveOut.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/moveouts/stats
router.get('/stats', auth, async (req, res) => {
  try {
    const all = await MoveOut.find();
    const total = all.length;
    const byStatus = {};
    all.forEach(m => { byStatus[m.status] = (byStatus[m.status] || 0) + 1; });
    const totalOwed = all.filter(m => m.status !== 'completed' && m.status !== 'cancelled')
      .reduce((s, m) => s + (m.totalAmount - m.paidAmount), 0);
    const completedThisMonth = all.filter(m => {
      if (m.status !== 'completed') return false;
      const now = new Date();
      const monthKey = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`;
      return m.actualDate?.startsWith(monthKey);
    }).length;
    res.json({ total, byStatus, totalOwed, completedThisMonth });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/moveouts/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const m = await MoveOut.findById(req.params.id);
    if (!m) return res.status(404).json({ message: 'Олдсонгүй' });
    res.json(m);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/moveouts - create
router.post('/', auth, admin, async (req, res) => {
  try {
    const data = {
      ...req.body,
      checklist: DEFAULT_CHECKLIST,
      requestDate: new Date().toISOString().slice(0, 10),
      status: 'pending',
    };
    const m = await MoveOut.create(data);
    sendWebhook(m, 'created');
    res.status(201).json(m);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/moveouts/:id - update general info
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const m = await MoveOut.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!m) return res.status(404).json({ message: 'Олдсонгүй' });
    res.json(m);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/moveouts/:id/status - change status
router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const update = { status };
    if (status === 'completed') update.actualDate = new Date().toISOString().slice(0, 10);
    const m = await MoveOut.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!m) return res.status(404).json({ message: 'Олдсонгүй' });
    sendWebhook(m, 'status_changed', { newStatus: status });
    res.json(m);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/moveouts/:id/checklist - update checklist item
router.put('/:id/checklist', auth, admin, async (req, res) => {
  try {
    const { key, completed, notes } = req.body;
    const m = await MoveOut.findById(req.params.id);
    if (!m) return res.status(404).json({ message: 'Олдсонгүй' });
    const item = m.checklist.find(c => c.key === key);
    if (!item) return res.status(400).json({ message: 'Checklist item олдсонгүй' });
    item.completed = completed;
    if (completed) item.completedDate = new Date().toISOString().slice(0, 10);
    else item.completedDate = '';
    if (notes !== undefined) item.notes = notes;
    await m.save();
    res.json(m);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/moveouts/:id/invoice - add invoice item
router.post('/:id/invoice', auth, admin, async (req, res) => {
  try {
    const m = await MoveOut.findById(req.params.id);
    if (!m) return res.status(404).json({ message: 'Олдсонгүй' });
    m.invoices.push(req.body);
    recalcTotals(m);
    await m.save();
    res.json(m);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/moveouts/:id/invoice/:invoiceId - update / mark paid
router.put('/:id/invoice/:invoiceId', auth, admin, async (req, res) => {
  try {
    const m = await MoveOut.findById(req.params.id);
    if (!m) return res.status(404).json({ message: 'Олдсонгүй' });
    const inv = m.invoices.id(req.params.invoiceId);
    if (!inv) return res.status(400).json({ message: 'Нэхэмжлэх олдсонгүй' });
    if (req.body.paid !== undefined) {
      inv.paid = req.body.paid;
      inv.paidDate = req.body.paid ? new Date().toISOString().slice(0, 10) : '';
    }
    if (req.body.method) inv.method = req.body.method;
    if (req.body.label) inv.label = req.body.label;
    if (req.body.amount !== undefined) inv.amount = req.body.amount;
    recalcTotals(m);
    await m.save();
    sendWebhook(m, 'invoice_paid', { invoiceId: inv._id, label: inv.label, amount: inv.amount });
    res.json(m);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/moveouts/:id/invoice/:invoiceId - remove invoice item
router.delete('/:id/invoice/:invoiceId', auth, admin, async (req, res) => {
  try {
    const m = await MoveOut.findById(req.params.id);
    if (!m) return res.status(404).json({ message: 'Олдсонгүй' });
    m.invoices.pull(req.params.invoiceId);
    recalcTotals(m);
    await m.save();
    res.json(m);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/moveouts/:id/generate-invoices - auto-generate from unpaid payments & parking
router.post('/:id/generate-invoices', auth, admin, async (req, res) => {
  try {
    const m = await MoveOut.findById(req.params.id);
    if (!m) return res.status(404).json({ message: 'Олдсонгүй' });

    // Unpaid payments for this unit
    const unpaid = await Payment.find({ unit: m.unit, block: m.block, paid: false });
    for (const p of unpaid) {
      const exists = m.invoices.some(i => i.label === `${p.label} (${p.month})`);
      if (!exists) {
        m.invoices.push({ label: `${p.label} (${p.month})`, amount: p.amount, paid: false });
      }
    }

    // Unpaid parking
    const parkingSpots = await Parking.find({ unit: m.unit, block: m.block, status: 'occupied' });
    for (const ps of parkingSpots) {
      if (ps.monthlyFee > 0 && !ps.paid) {
        const label = `Зогсоол ${ps.spotNumber} төлбөр`;
        const exists = m.invoices.some(i => i.label === label);
        if (!exists) {
          m.invoices.push({ label, amount: ps.monthlyFee, paid: false });
        }
      }
    }

    recalcTotals(m);
    await m.save();
    res.json(m);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/moveouts/:id/webhook-test - test webhook
router.post('/:id/webhook-test', auth, admin, async (req, res) => {
  try {
    const m = await MoveOut.findById(req.params.id);
    if (!m) return res.status(404).json({ message: 'Олдсонгүй' });
    if (!m.webhookUrl) return res.status(400).json({ message: 'Webhook URL тохируулаагүй' });
    await sendWebhook(m, 'test', { message: 'Webhook test from СӨХ system' });
    res.json({ message: 'Webhook илгээгдлээ', lastWebhookAt: m.lastWebhookAt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/moveouts/:id
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const m = await MoveOut.findByIdAndDelete(req.params.id);
    if (!m) return res.status(404).json({ message: 'Олдсонгүй' });
    res.json({ message: 'Устгалаа' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
