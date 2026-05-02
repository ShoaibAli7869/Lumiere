import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import uploadRoutes from "./routes/upload.js";
import paymentRoutes from "./routes/payment.js";
import reviewRoutes from "./routes/reviews.js";
import reviewRouter from "./routes/reviews.js";
import wishlistRoutes from "./routes/wishlist.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: true, // Automatically reflects the request origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.options("*", cors()); // Explicitly handle preflight requests
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews/:productId", reviewRouter);

// Handle root and favicon requests to prevent Vercel 404 CSP errors
app.get("/", (req, res) => {
  res.status(200).json({ message: "Lumiere API is running" });
});
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.use(errorMiddleware);

if (
  process.env.NODE_ENV !== "production" ||
  process.env.SERVER_ONLY === "true"
) {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`),
  );
}

export default app;
