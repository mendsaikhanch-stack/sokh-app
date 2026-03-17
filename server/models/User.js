import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  phone:    { type: String, default: '' },
  password: { type: String, required: true, minlength: 6 },
  unit:     { type: Number, default: 0 },
  block:    { type: String, default: '' },
  isAdmin:  { type: Boolean, default: false },
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.model('User', userSchema);
