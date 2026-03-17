import mongoose from 'mongoose';

const buildingSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  address:   { type: String, default: '' },
  phone:     { type: String, default: '' },
  email:     { type: String, default: '' },
  logo:      { type: String, default: '' },
  color:     { type: String, default: '#2563EB' },
  blocks:    { type: String, default: 'A, B' },
  totalUnits:{ type: Number, default: 0 },
  floors:    { type: Number, default: 0 },
  monthlyFee:{ type: Number, default: 80000 },
  bankName:  { type: String, default: '' },
  accountNo: { type: String, default: '' },
  accountHolder: { type: String, default: '' },
  adminPin:  { type: String, default: '1234' },
}, { timestamps: true });

export default mongoose.model('Building', buildingSchema);
