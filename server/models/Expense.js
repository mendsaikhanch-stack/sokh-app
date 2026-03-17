import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  label:    { type: String, required: true },
  amount:   { type: Number, required: true },
  icon:     { type: String, default: '' },
  month:    { type: String, required: true },
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);
