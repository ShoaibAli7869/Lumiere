import { Router } from "express";
import {
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = Router();
router.use(protect);
router.get("/my", getMyOrders);
router.get("/:id", getOrder);
router.get("/", isAdmin, getAllOrders);
router.patch("/:id", isAdmin, updateOrderStatus);

export default router;
