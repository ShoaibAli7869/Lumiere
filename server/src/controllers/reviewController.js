import Review from "../models/Review.js";
import Order from "../models/Order.js";
import { ApiError } from "../utils/ApiError.js";

// GET /api/reviews/:productId
export const getReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate("user", "name")
    .sort("-createdAt")
    .lean();
  res.json(reviews);
};

// POST /api/reviews/:productId
export const createReview = async (req, res) => {
  const { rating, title, body } = req.body;
  if (!rating || !body)
    throw new ApiError("Rating and review body are required", 400);

  // Check verified purchase
  const hasBought = await Order.exists({
    user: req.user._id,
    "items.product": req.params.productId,
    paymentStatus: "paid",
  });

  const existing = await Review.findOne({
    product: req.params.productId,
    user: req.user._id,
  });
  if (existing)
    throw new ApiError("You have already reviewed this product", 400);

  const review = await Review.create({
    product: req.params.productId,
    user: req.user._id,
    rating: Number(rating),
    title: title?.trim(),
    body: body.trim(),
    verifiedPurchase: !!hasBought,
  });

  await review.populate("user", "name");
  res.status(201).json(review);
};

// DELETE /api/reviews/:productId/:id  (admin only) -- actually wait, we just use /api/reviews/:id usually...
// let's look at router.
export const deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) throw new ApiError("Review not found", 404);
  res.json({ message: "Review deleted" });
};
