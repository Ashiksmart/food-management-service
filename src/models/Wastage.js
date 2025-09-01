import mongoose from "mongoose";

const WastageSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  wastedQty: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Wastage = mongoose.model("Wastage", WastageSchema);

export default Wastage;