import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
  id: { type: String, required: true },
  transactionId: { type: String, ref: "Transaction", required: true },
  deliveryAddress: {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
  },

  assignedTo: { type: String, ref: "User" }, // Delivery boy / staff

  status: {
    type: String,
    enum: ["pending", "out-for-delivery", "delivered", "cancelled"],
    default: "pending"
  },

  expectedDeliveryTime: { type: Date },
  deliveredAt: { type: Date },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Delivery = mongoose.model("Delivery", DeliverySchema);

export default Delivery;
