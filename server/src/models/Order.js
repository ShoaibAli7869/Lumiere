import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  price: Number,
  qty: Number,
  image: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    paymentMethod: { type: String, default: "stripe" },
    stripePaymentIntentId: { type: String },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    subtotal: Number,
    shipping: { type: Number, default: 0 },
    total: Number,
    paidAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
