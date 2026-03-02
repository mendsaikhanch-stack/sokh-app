import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId:  { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  phone:    { type: String, required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name:    { mn: String, en: String },
    emoji:   String,
    price:   Number,
    qty:     Number,
  }],
  total:    { type: Number, required: true },
  status:   { type: String, enum: ['new', 'processing', 'delivered'], default: 'new' },
  pay:      { type: String, default: 'qpay' },
  date:     { type: String, default: () => new Date().toISOString().slice(0, 10) },
  delivery: {
    method:   { type: String, default: 'ub' },
    fee:      { type: Number, default: 0 },
    address:  String,
    district: String,
    khoroo:   String,
    building: String,
    apartment: String,
    note:     String,
    phone2:   String,
  },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
