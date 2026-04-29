import { Router } from "express";
import { uploadImage, deleteImage } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

router.post("/", protect, isAdmin, upload.single("image"), uploadImage);
router.delete("/", protect, isAdmin, deleteImage);

export default router;
