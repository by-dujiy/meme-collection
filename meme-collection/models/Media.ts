import mongoose, { Schema, models } from 'mongoose';

const MediaSchema = new Schema({
  title: { type: String, default: '' },
  tags: [String],
  type: { type: String, enum: ['image', 'video', 'gif'] },
  url: String,
  cloudinaryId: String,
  createdAt: { type: Date, default: Date.now },
});

const Media = models.Media || mongoose.model('Media', MediaSchema);

export default Media;