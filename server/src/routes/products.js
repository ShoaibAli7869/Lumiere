import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/:id", getProduct);
router.post("/", protect, isAdmin, createProduct);
router.patch("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.post("/categories", protect, isAdmin, createCategory);

export default router;
