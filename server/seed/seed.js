import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Building from '../models/Building.js';
import Unit from '../models/Unit.js';
import Resident from '../models/Resident.js';
import Payment from '../models/Payment.js';
import Request from '../models/Request.js';
import Announcement from '../models/Announcement.js';
import Expense from '../models/Expense.js';

dotenv.config({ path: '../.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sokh-app';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear all
  await Promise.all([
    User.deleteMany(),
    Building.deleteMany(),
    Unit.deleteMany(),
    Resident.deleteMany(),
    Payment.deleteMany(),
    Request.deleteMany(),
    Announcement.deleteMany(),
    Expense.deleteMany(),
  ]);
  console.log('Cleared existing data');

  // Buildings - multiple buildings across different locations
  const buildings = await Building.insertMany([
    {
      name: 'Алтан Орд СӨХ',
      address: '15-р байр',
      city: 'Улаанбаатар',
      district: 'Баянзүрх',
      khoroo: '3-р хороо',
      phone: '77001234',
      email: 'info@altanord.mn',
      color: '#2563EB',
      blocks: 'A, B',
      totalUnits: 120,
      floors: 16,
      monthlyFee: 80000,
      bankName: 'Хаан банк',
      accountNo: '5000123456',
      accountHolder: 'Алтан Орд СӨХ',
    },
    {
      name: 'Нарны Гэрэл СӨХ',
      address: '22-р байр',
      city: 'Улаанбаатар',
      district: 'Баянзүрх',
      khoroo: '5-р хороо',
      phone: '77005678',
      email: 'info@narnigerel.mn',
      color: '#059669',
      blocks: 'A',
      totalUnits: 80,
      floors: 12,
      monthlyFee: 70000,
      bankName: 'Голомт банк',
      accountNo: '3200567890',
      accountHolder: 'Нарны Гэрэл СӨХ',
    },
    {
      name: 'Хан-Уул Резиденс СӨХ',
      address: '7-р байр',
      city: 'Улаанбаатар',
      district: 'Хан-Уул',
      khoroo: '1-р хороо',
      phone: '77009012',
      email: 'info@khanuul-res.mn',
      color: '#7C3AED',
      blocks: 'A, B, C',
      totalUnits: 200,
      floors: 20,
      monthlyFee: 100000,
      bankName: 'ХХБ',
      accountNo: '4900112233',
      accountHolder: 'Хан-Уул Резиденс СӨХ',
    },
    {
      name: 'Сүхбаатар Плаза СӨХ',
      address: '3-р байр',
      city: 'Улаанбаатар',
      district: 'Сүхбаатар',
      khoroo: '2-р хороо',
      phone: '77003456',
      email: 'info@sbplaza.mn',
      color: '#DC2626',
      blocks: 'A, B',
      totalUnits: 150,
      floors: 18,
      monthlyFee: 120000,
      bankName: 'Хаан банк',
      accountNo: '5000789012',
      accountHolder: 'Сүхбаатар Плаза СӨХ',
    },
    {
      name: 'Чингэлтэй Гэрэлт СӨХ',
      address: '11-р байр',
      city: 'Улаанбаатар',
      district: 'Чингэлтэй',
      khoroo: '4-р хороо',
      phone: '77007890',
      email: 'info@chingelteig.mn',
      color: '#EA580C',
      blocks: 'A',
      totalUnits: 60,
      floors: 9,
      monthlyFee: 60000,
      bankName: 'Голомт банк',
      accountNo: '3200334455',
      accountHolder: 'Чингэлтэй Гэрэлт СӨХ',
    },
    {
      name: 'Дархан Хотхон СӨХ',
      address: '5-р байр',
      city: 'Дархан',
      district: 'Дархан',
      khoroo: '1-р хороо',
      phone: '77002345',
      email: 'info@darkhan-kh.mn',
      color: '#0891B2',
      blocks: 'A, B',
      totalUnits: 90,
      floors: 10,
      monthlyFee: 50000,
      bankName: 'Хаан банк',
      accountNo: '5000445566',
      accountHolder: 'Дархан Хотхон СӨХ',
    },
    {
      name: 'Эрдэнэт Цэцэг СӨХ',
      address: '8-р байр',
      city: 'Эрдэнэт',
      district: 'Баян-Өндөр',
      khoroo: '2-р хороо',
      phone: '77006789',
      email: 'info@erdenet-ts.mn',
      color: '#4F46E5',
      blocks: 'A',
      totalUnits: 70,
      floors: 9,
      monthlyFee: 55000,
      bankName: 'ХХБ',
      accountNo: '4900556677',
      accountHolder: 'Эрдэнэт Цэцэг СӨХ',
    },
  ]);
  console.log(`${buildings.length} buildings created`);

  const b = buildings[0]; // Алтан Орд for detailed data

  // Admin user (linked to first building)
  const admin = await User.create({
    name: 'Админ',
    email: 'admin@sokh.mn',
    password: 'admin123',
    isAdmin: true,
    building: b._id,
  });

  // Regular user
  await User.create({
    name: 'Бат-Эрдэнэ',
    email: 'bat@sokh.mn',
    password: 'user123',
    phone: '99112233',
    unit: 45,
    block: 'A',
    isAdmin: false,
    building: b._id,
  });
  console.log('Users created');

  // Units
  const units = await Unit.insertMany([
    { number: 45, block: 'A', floor: 4, size: 65, type: 'Owner', residents: 3, parking: '#12', paid: true, building: b._id },
    { number: 46, block: 'A', floor: 4, size: 70, type: 'Owner', residents: 2, parking: '#13', paid: false, building: b._id },
    { number: 47, block: 'A', floor: 5, size: 60, type: 'Tenant', residents: 4, parking: '-', paid: true, building: b._id },
    { number: 32, block: 'B', floor: 3, size: 55, type: 'Owner', residents: 2, parking: '#08', paid: false, building: b._id },
    { number: 33, block: 'B', floor: 3, size: 80, type: 'Tenant', residents: 1, parking: '#09', paid: true, building: b._id },
    { number: 51, block: 'A', floor: 5, size: 72, type: 'Owner', residents: 3, parking: '#15', paid: false, building: b._id },
  ]);
  console.log(`${units.length} units created`);

  // Residents
  const residents = await Resident.insertMany([
    { name: 'Бат-Эрдэнэ', phone: '99112233', unit: 45, block: 'A', type: 'Owner', regNo: 'УБ99112233', members: 3, moveIn: '2020.06', car: 'УБА 1234', parking: '#12', building: b._id },
    { name: 'Сарангэрэл', phone: '88445566', unit: 46, block: 'A', type: 'Owner', regNo: 'УБ88445566', members: 2, moveIn: '2021.01', car: 'УБЕ 5678', parking: '#13', building: b._id },
    { name: 'Тэмүүлэн', phone: '95667788', unit: 47, block: 'A', type: 'Tenant', regNo: 'ДО95667788', members: 4, moveIn: '2024.03', car: '-', parking: '-', building: b._id },
    { name: 'Мөнхбаяр', phone: '99887766', unit: 32, block: 'B', type: 'Owner', regNo: 'УБ99887766', members: 2, moveIn: '2019.11', car: 'УБГ 9012', parking: '#08', building: b._id },
    { name: 'Оюунчимэг', phone: '88991122', unit: 33, block: 'B', type: 'Tenant', regNo: 'ХО88991122', members: 1, moveIn: '2025.08', car: '-', parking: '#09', building: b._id },
    { name: 'Ганбаатар', phone: '95443322', unit: 51, block: 'A', type: 'Owner', regNo: 'УБ95443322', members: 3, moveIn: '2022.05', car: 'УБД 3456', parking: '#15', building: b._id },
  ]);
  console.log(`${residents.length} residents created`);

  // Payments
  const payments = await Payment.insertMany([
    { unit: 45, block: 'A', month: '2026.03', label: 'СӨХ төлбөр', amount: 80000, paid: false, building: b._id },
    { unit: 45, block: 'A', month: '2026.02', label: 'СӨХ төлбөр', amount: 80000, paid: true, paidDate: '2026.02.10', building: b._id },
    { unit: 45, block: 'A', month: '2026.01', label: 'СӨХ төлбөр', amount: 80000, paid: true, paidDate: '2026.01.15', building: b._id },
    { unit: 46, block: 'A', month: '2026.03', label: 'СӨХ төлбөр', amount: 80000, paid: false, building: b._id },
    { unit: 46, block: 'A', month: '2026.02', label: 'СӨХ төлбөр', amount: 80000, paid: false, building: b._id },
    { unit: 47, block: 'A', month: '2026.03', label: 'СӨХ төлбөр', amount: 80000, paid: true, paidDate: '2026.03.01', building: b._id },
    { unit: 32, block: 'B', month: '2026.03', label: 'СӨХ төлбөр', amount: 80000, paid: false, building: b._id },
    { unit: 33, block: 'B', month: '2026.03', label: 'СӨХ төлбөр', amount: 80000, paid: true, paidDate: '2026.03.05', building: b._id },
    { unit: 51, block: 'A', month: '2026.03', label: 'СӨХ төлбөр', amount: 80000, paid: false, building: b._id },
  ]);
  console.log(`${payments.length} payments created`);

  // Requests
  const requests = await Request.insertMany([
    { unit: 45, block: 'A', cat: 'Лифт', title: 'Лифт эвдэрсэн', desc: '3-р давхрын лифт ажиллахгүй байна', status: 'progress', date: '2026.03.10', building: b._id },
    { unit: 45, block: 'A', cat: 'Цэвэрлэгээ', title: 'Цэвэрлэгээ муу', desc: 'Шатны цэвэрлэгээ хийгдээгүй', status: 'done', date: '2026.03.05', building: b._id },
    { unit: 32, block: 'B', cat: 'Ус', title: 'Ус алдаж байна', desc: 'Угаалгын өрөөнөөс ус гоожиж байна', status: 'open', date: '2026.03.13', building: b._id },
    { unit: 46, block: 'A', cat: 'Бусад', title: 'Хаалга эвдэрсэн', desc: 'Оролтын хаалганы түгжээ ажиллахгүй', status: 'open', date: '2026.03.11', building: b._id },
  ]);
  console.log(`${requests.length} requests created`);

  // Announcements
  const announcements = await Announcement.insertMany([
    { icon: '💧', text: 'Маргааш 10:00-18:00 ус тасарна', date: '2026.03.14', urgent: true, building: b._id },
    { icon: '🏢', text: 'СӨХ хурал 03/20-нд болно', date: '2026.03.12', urgent: false, building: b._id },
    { icon: '⚡', text: 'Цахилгааны тариф шинэчлэгдлээ', date: '2026.03.10', urgent: false, building: b._id },
    { icon: '🔧', text: 'Лифтний засвар ажил хийгдэнэ', date: '2026.03.15', urgent: true, building: b._id },
  ]);
  console.log(`${announcements.length} announcements created`);

  // Expenses
  const expenses = await Expense.insertMany([
    { label: 'Цэвэрлэгээ', amount: 500000, icon: '🧹', month: '2026.03', building: b._id },
    { label: 'Харуул хамгаалалт', amount: 800000, icon: '🛡️', month: '2026.03', building: b._id },
    { label: 'Засвар үйлчилгээ', amount: 300000, icon: '🔧', month: '2026.03', building: b._id },
    { label: 'Цахилгаан', amount: 450000, icon: '⚡', month: '2026.03', building: b._id },
    { label: 'Лифт засвар', amount: 200000, icon: '🛗', month: '2026.03', building: b._id },
    { label: 'Ус, дулаан', amount: 350000, icon: '💧', month: '2026.03', building: b._id },
  ]);
  console.log(`${expenses.length} expenses created`);

  console.log('\n✅ Seed complete!');
  console.log('Login: admin@sokh.mn / admin123 (Админ)');
  console.log('Login: bat@sokh.mn / user123 (Оршин суугч)');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
