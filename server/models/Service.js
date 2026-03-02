import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  key:   { type: String, required: true, unique: true },
  icon:  { type: String, default: '' },
  price: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
