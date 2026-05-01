import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) throw new ApiError("Not authorized", 401);

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = await User.findById(decoded.userId || decoded.id);
    if (!req.user) throw new ApiError("User not found", 401);
    next();
  } catch (error) {
    throw new ApiError("Not authorized, token failed", 401);
  }
};
