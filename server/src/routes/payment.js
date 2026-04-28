import { Router } from "express";
import {
  createPaymentIntent,
  webhook,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const router = Router();

// webhook needs raw body — must be before express.json()
router.post("/webhook", express.raw({ type: "application/json" }), webhook);
router.post("/create-intent", protect, createPaymentIntent);

export default router;
