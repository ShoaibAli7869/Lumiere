import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true, maxlength: 100 },
    body: { type: String, required: true, trim: true, maxlength: 1000 },
    verifiedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// One review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Recalculate product rating after save/delete
async function updateProductRating(productId) {
  const Product = mongoose.model("Product");
  const stats = await mongoose
    .model("Review")
    .aggregate([
      { $match: { product: productId } },
      {
        $group: {
          _id: "$product",
          avgRating: { $avg: "$rating" },
          numReviews: { $sum: 1 },
        },
      },
    ]);
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      numReviews: stats[0].numReviews,
    });
  } else {
    await Product.findByIdAndUpdate(productId, { rating: 0, numReviews: 0 });
  }
}

reviewSchema.post("save", (doc) => updateProductRating(doc.product));
reviewSchema.post("findOneAndDelete", (doc) => {
  if (doc) updateProductRating(doc.product);
});

export default mongoose.model("Review", reviewSchema);
