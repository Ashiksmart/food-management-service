import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  preparedQty: { type: Number, required: true }, // e.g., 60 plates prepared
  remainingQty: { type: Number, required: true }, // auto-decreases when sales happen
  date: { type: Date, default: Date.now }
});

const Stock = mongoose.model("Stock", StockSchema);

export default Stock;
