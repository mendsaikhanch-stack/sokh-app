import mongoose from 'mongoose';

const residentSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  phone:    { type: String, required: true },
  unit:     { type: Number, required: true },
  block:    { type: String, default: 'A' },
  type:     { type: String, enum: ['Owner', 'Tenant'], default: 'Owner' },
  regNo:    { type: String, default: '' },
  members:  { type: Number, default: 1 },
  moveIn:   { type: String, default: '' },
  photo:    { type: String, default: '' },
  car:      { type: String, default: '' },
  parking:  { type: String, default: '' },
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
}, { timestamps: true });

export default mongoose.model('Resident', residentSchema);
