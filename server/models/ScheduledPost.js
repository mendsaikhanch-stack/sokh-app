import mongoose from 'mongoose';

const scheduledPostSchema = new mongoose.Schema({
  product:   { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  time:      { type: String, required: true },
  status:    { type: String, enum: ['pending', 'scheduled', 'posted'], default: 'pending' },
  platforms: [{ type: String }],
  date:      { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('ScheduledPost', scheduledPostSchema);
