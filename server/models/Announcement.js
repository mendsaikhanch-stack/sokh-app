import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  icon:     { type: String, default: '📢' },
  text:     { type: String, required: true },
  date:     { type: String, required: true },
  urgent:   { type: Boolean, default: false },
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
}, { timestamps: true });

export default mongoose.model('Announcement', announcementSchema);
