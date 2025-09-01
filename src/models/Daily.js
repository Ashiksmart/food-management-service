import mongoose from 'mongoose';

const dailySchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  rawMaterial: { type: Number, default: 0 },
  wastage: { type: Number, default: 0 },
  otherExpenses: { type: Number, default: 0 },
  platesSold: { type: Number, default: 0 },
  sellingPricePerPlate: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  netProfit: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Daily', dailySchema);
