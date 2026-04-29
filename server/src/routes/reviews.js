import { Router } from "express";
import {
  getReviews,
  createReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = Router({ mergeParams: true });

router.get("/", getReviews);
router.post("/", protect, createReview);
router.delete("/:id", protect, isAdmin, deleteReview);

export default router;
