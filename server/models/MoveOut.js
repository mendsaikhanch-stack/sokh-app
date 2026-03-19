import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
  label:    { type: String, required: true },
  amount:   { type: Number, required: true },
  paid:     { type: Boolean, default: false },
  paidDate: { type: String, default: '' },
  method:   { type: String, default: '' },
}, { _id: true });

const checklistItemSchema = new mongoose.Schema({
  key:       { type: String, required: true },
  label:     { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedDate: { type: String, default: '' },
  notes:     { type: String, default: '' },
}, { _id: false });

const moveOutSchema = new mongoose.Schema({
  // Resident info (denormalized)
  resident:      { type: mongoose.Schema.Types.ObjectId, ref: 'Resident' },
  residentName:  { type: String, required: true },
  phone:         { type: String, default: '' },
  unit:          { type: Number, required: true },
  block:         { type: String, default: 'A' },
  residentType:  { type: String, default: 'Owner' },

  // Status flow: pending → checklist → invoiced → settling → completed / cancelled
  status: {
    type: String,
    enum: ['pending', 'checklist', 'invoiced', 'settling', 'completed', 'cancelled'],
    default: 'pending',
  },

  // Dates
  requestDate:    { type: String, default: '' },
  plannedDate:    { type: String, default: '' },
  actualDate:     { type: String, default: '' },

  // Checklist
  checklist: [checklistItemSchema],

  // Invoices / fees
  invoices: [invoiceItemSchema],
  totalAmount: { type: Number, default: 0 },
  paidAmount:  { type: Number, default: 0 },

  // Deposit
  depositAmount:  { type: Number, default: 0 },
  depositAction:  { type: String, enum: ['return', 'deduct', 'none'], default: 'none' },
  depositNotes:   { type: String, default: '' },

  // API / Webhook
  webhookUrl:    { type: String, default: '' },
  webhookSecret: { type: String, default: '' },
  webhookEvents: [{ type: String }],  // ['status_changed', 'invoice_paid', 'completed']
  lastWebhookAt: { type: String, default: '' },

  notes:    { type: String, default: '' },
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
}, { timestamps: true });

export default mongoose.model('MoveOut', moveOutSchema);
