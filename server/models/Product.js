import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    mn: { type: String, required: true },
    en: { type: String, required: true },
  },
  price:    { type: Number, required: true },
  model:    { type: String, required: true },
  cat:      { type: String, required: true },
  rating:   { type: Number, default: 0 },
  stock:    { type: Number, default: 0 },
  cond:     { type: String, enum: ['new', 'used'], default: 'used' },
  img:      { type: String, default: '' },
  emoji:    { type: String, default: '' },
  desc: {
    mn: { type: String, default: '' },
    en: { type: String, default: '' },
  },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
