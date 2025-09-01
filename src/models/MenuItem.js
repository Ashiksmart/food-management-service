import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true, index: true },
  plateType: { type: String, enum: ['Half','Full'], required: true },
  price: { type: Number, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

menuItemSchema.index({ itemName: 1, plateType: 1 }, { unique: true });

export default mongoose.model('MenuItem', menuItemSchema);
