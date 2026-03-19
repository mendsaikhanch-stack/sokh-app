import mongoose from 'mongoose';

const parkingSchema = new mongoose.Schema({
  spotNumber:   { type: String, required: true },
  zone:         { type: String, default: 'A' },
  type:         { type: String, enum: ['standard', 'covered', 'underground', 'disabled', 'ev'], default: 'standard' },
  status:       { type: String, enum: ['available', 'occupied', 'reserved', 'maintenance'], default: 'available' },
  // Assignment
  unit:         { type: Number, default: 0 },
  block:        { type: String, default: '' },
  residentName: { type: String, default: '' },
  residentPhone:{ type: String, default: '' },
  // Vehicle info
  vehiclePlate: { type: String, default: '' },
  vehicleModel: { type: String, default: '' },
  vehicleColor: { type: String, default: '' },
  // Fees
  monthlyFee:   { type: Number, default: 0 },
  paid:         { type: Boolean, default: false },
  paidUntil:    { type: String, default: '' },
  // Dates
  assignedDate: { type: String, default: '' },
  expiryDate:   { type: String, default: '' },
  // Extras
  notes:        { type: String, default: '' },
  building:     { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
}, { timestamps: true });

export default mongoose.model('Parking', parkingSchema);
