import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mode: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
  items: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true }, // e.g., "Chicken Biryani
      category: { type: String, enum: ["veg", "non-veg"], required: true },
      variant: {
        type: { type: String, enum: ["plate", "kg"], required: true },
        qty: { type: Number, required: true }, // e.g., 1 plate = 1, 1 kg = 1
        price: { type: Number, required: true }, // e.g., ₹120 (plate), ₹800 (kg)
        display: {
          type: String,
          enum: ["full", "half", "quarter"],
          required: true,
        },
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },

      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      variantOptions: [
        {
          type: { type: String, enum: ["plate", "kg"], required: true },
          qty: { type: Number, required: true }, // e.g., 1 plate = 1, 1 kg = 1
          price: { type: Number, required: true }, // e.g., ₹120 (plate), ₹800 (kg)
          display: {
            type: String,
            enum: ["full", "half", "quarter"],
            required: true,
          },
        },
      ],
    },
  ],
  totalAmount: { type: Number, default: 0 },
  // 🔄 Status workflow
  status: {
    type: String,
    enum: ["cart", "checkedout", "cancelled"],
    default: "cart",
  },
  // Payment info only relevant if "checkedout"
  paymentMethod: {
    type: String,
    enum: ["cash", "upi", "card", null],
    default: null,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", null],
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
