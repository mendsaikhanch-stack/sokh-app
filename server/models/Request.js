import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  unit:     { type: Number, required: true },
  block:    { type: String, default: 'A' },
  cat:      { type: String, required: true },
  title:    { type: String, required: true },
  desc:     { type: String, default: '' },
  status:   { type: String, enum: ['open', 'progress', 'done'], default: 'open' },
  date:     { type: String, default: '' },
  photo:    { type: String, default: '' },
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
}, { timestamps: true });

export default mongoose.model('Request', requestSchema);
