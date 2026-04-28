import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number, default: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    material: { type: String, default: "" },
    images: [{ url: String, publicId: String }],
    stock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    tags: [String],
  },
  { timestamps: true },
);

productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ category: 1, price: 1 });

export default mongoose.model("Product", productSchema);
