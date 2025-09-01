import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },  // e.g., "Chicken Biryani
  category: { type: String, enum: ["veg", "non-veg"], required: true },
  variants: [
    {
      type: { type: String, enum: ["plate", "kg"], required: true },
      qty: { type: Number, required: true },  // e.g., 1 plate = 1, 1 kg = 1
      price: { type: Number, required: true } // e.g., ₹120 (plate), ₹800 (kg)
    }
  ],
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
