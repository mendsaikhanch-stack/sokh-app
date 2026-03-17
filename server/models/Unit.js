import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
  number:    { type: Number, required: true },
  block:     { type: String, default: 'A' },
  floor:     { type: Number, default: 1 },
  size:      { type: Number, default: 0 },
  type:      { type: String, enum: ['Owner', 'Tenant'], default: 'Owner' },
  residents: { type: Number, default: 1 },
  parking:   { type: String, default: '-' },
  paid:      { type: Boolean, default: false },
  building:  { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
}, { timestamps: true });

export default mongoose.model('Unit', unitSchema);
