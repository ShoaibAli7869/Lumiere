import { Router } from "express";
import {
  getWishlist,
  toggleWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);
router.get("/", getWishlist);
router.post("/:productId", toggleWishlist);

export default router;
