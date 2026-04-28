import Order from "../models/Order.js";
import { ApiError } from "../utils/ApiError.js";

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.json({ success: true, orders });
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "items.product",
    "name images",
  );
  if (!order) throw new ApiError("Order not found", 404);
  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  )
    throw new ApiError("Not authorized", 403);
  res.json({ success: true, order });
};

export const getAllOrders = async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const filter = status ? { orderStatus: status } : {};
  const orders = await Order.find(filter)
    .populate("user", "name email")
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await Order.countDocuments(filter);
  res.json({ success: true, orders, total });
};

export const updateOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus },
    { new: true },
  );
  if (!order) throw new ApiError("Order not found", 404);
  res.json({ success: true, order });
};
