import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    qty: { type: Number, required: true, min: 1 }
  }],
  address: { type: String },
  status: { type: String, enum: ['PLACED','PREPARING','READY','DELIVERED','CANCELLED'], default: 'PLACED' },
  total: { type: Number, required: true }
}, { timestamps: true });

orderSchema.index({ createdAt: -1 });

export default mongoose.model('Order', orderSchema);
