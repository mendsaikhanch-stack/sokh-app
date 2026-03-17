import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  unit:     { type: Number, required: true },
  block:    { type: String, default: 'A' },
  month:    { type: String, required: true },
  label:    { type: String, default: 'СӨХ төлбөр' },
  amount:   { type: Number, required: true },
  paid:     { type: Boolean, default: false },
  paidDate: { type: String, default: '' },
  method:   { type: String, default: '' },
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
