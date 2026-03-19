import { Router } from 'express';
import multer from 'multer';
import XLSX from 'xlsx';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import Resident from '../models/Resident.js';
import Payment from '../models/Payment.js';
import Expense from '../models/Expense.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Column name mappings (Mongolian → field)
const COLUMN_MAPS = {
  residents: {
    'нэр': 'name', 'name': 'name',
    'утас': 'phone', 'phone': 'phone', 'утасны дугаар': 'phone',
    'тоот': 'unit', 'unit': 'unit', 'өрөө': 'unit',
    'блок': 'block', 'block': 'block',
    'төрөл': 'type', 'type': 'type',
    'регистр': 'regNo', 'регистрийн дугаар': 'regNo',
    'гишүүд': 'members', 'гэр бүлийн гишүүд': 'members', 'members': 'members',
    'нүүсэн огноо': 'moveIn', 'movein': 'moveIn',
    'машин': 'car', 'car': 'car',
    'зогсоол': 'parking', 'parking': 'parking',
  },
  payments: {
    'тоот': 'unit', 'unit': 'unit',
    'блок': 'block', 'block': 'block',
    'сар': 'month', 'month': 'month', 'он сар': 'month',
    'нэр': 'label', 'label': 'label', 'төлбөрийн нэр': 'label',
    'дүн': 'amount', 'amount': 'amount', 'мөнгөн дүн': 'amount', 'үнэ': 'amount',
    'төлсөн': 'paid', 'paid': 'paid', 'төлсөн эсэх': 'paid',
    'төлсөн огноо': 'paidDate', 'paiddate': 'paidDate',
    'арга': 'method', 'method': 'method', 'төлбөрийн арга': 'method',
  },
  expenses: {
    'нэр': 'label', 'label': 'label', 'зарлагын нэр': 'label',
    'дүн': 'amount', 'amount': 'amount', 'мөнгөн дүн': 'amount', 'үнэ': 'amount',
    'сар': 'month', 'month': 'month', 'он сар': 'month',
    'icon': 'icon', 'зураг': 'icon',
  },
};

function normalizeColumnName(name) {
  return String(name || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function mapColumns(headers, type) {
  const colMap = COLUMN_MAPS[type] || {};
  const mapping = {};
  headers.forEach((h, idx) => {
    const norm = normalizeColumnName(h);
    if (colMap[norm]) {
      mapping[idx] = colMap[norm];
    }
  });
  return mapping;
}

function parseBool(val) {
  if (typeof val === 'boolean') return val;
  const s = String(val || '').trim().toLowerCase();
  return ['тийм', 'yes', 'true', '1', 'төлсөн'].includes(s);
}

function parseRows(rows, columnMapping, type) {
  return rows.map(row => {
    const obj = {};
    Object.entries(columnMapping).forEach(([idx, field]) => {
      let val = row[Number(idx)];
      if (val === undefined || val === null) val = '';
      if (field === 'unit' || field === 'amount' || field === 'members') {
        val = Number(val) || 0;
      } else if (field === 'paid') {
        val = parseBool(val);
      } else {
        val = String(val).trim();
      }
      obj[field] = val;
    });
    return obj;
  }).filter(obj => {
    if (type === 'residents') return obj.name && obj.unit;
    if (type === 'payments') return obj.unit && obj.amount;
    if (type === 'expenses') return obj.label && obj.amount;
    return true;
  });
}

// POST /api/import/parse - upload and parse Excel, return preview
router.post('/parse', auth, admin, upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Файл оруулна уу' });

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheets = workbook.SheetNames.map(name => {
      const sheet = workbook.Sheets[name];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
      if (data.length === 0) return { name, headers: [], rows: [], totalRows: 0 };

      const headers = data[0].map(h => String(h || '').trim());
      const rows = data.slice(1).filter(r => r.some(cell => cell !== ''));

      return {
        name,
        headers,
        rows: rows.slice(0, 50),
        totalRows: rows.length,
      };
    });

    res.json({ sheets, fileName: req.file.originalname });
  } catch (err) {
    res.status(500).json({ message: 'Файл уншихад алдаа гарлаа: ' + err.message });
  }
});

// POST /api/import/execute - import parsed data
router.post('/execute', auth, admin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Файл оруулна уу' });

    const { type, sheetName, columnMapping: mappingJson, building } = req.body;
    if (!type || !sheetName) {
      return res.status(400).json({ message: 'type, sheetName шаардлагатай' });
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) return res.status(400).json({ message: 'Sheet олдсонгүй' });

    const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    if (data.length < 2) return res.status(400).json({ message: 'Өгөгдөл хоосон байна' });

    const headers = data[0];
    const rows = data.slice(1).filter(r => r.some(cell => cell !== ''));

    let columnMap;
    if (mappingJson) {
      columnMap = JSON.parse(mappingJson);
    } else {
      columnMap = mapColumns(headers, type);
    }

    const parsed = parseRows(rows, columnMap, type);
    if (parsed.length === 0) {
      return res.status(400).json({ message: 'Импортлох өгөгдөл олдсонгүй. Багануудыг шалгана уу.' });
    }

    // Add building reference
    const withBuilding = parsed.map(p => ({ ...p, building: building || undefined }));

    let result;
    if (type === 'residents') {
      result = await Resident.insertMany(withBuilding);
    } else if (type === 'payments') {
      const payments = withBuilding.map(p => ({
        ...p,
        label: p.label || 'СӨХ төлбөр',
        block: p.block || 'A',
      }));
      result = await Payment.insertMany(payments);
    } else if (type === 'expenses') {
      result = await Expense.insertMany(withBuilding);
    } else {
      return res.status(400).json({ message: 'Төрөл буруу байна (residents/payments/expenses)' });
    }

    res.json({ imported: result.length, type });
  } catch (err) {
    res.status(500).json({ message: 'Импорт амжилтгүй: ' + err.message });
  }
});

// POST /api/import/auto-detect - detect column types
router.post('/auto-detect', auth, admin, (req, res) => {
  const { headers, type } = req.body;
  if (!headers || !type) return res.status(400).json({ message: 'headers, type required' });
  const mapping = mapColumns(headers, type);
  res.json({ mapping });
});

export default router;
