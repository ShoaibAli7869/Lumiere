import { ApiError } from "../utils/ApiError.js";

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin")
    throw new ApiError("Admin access required", 403);
  next();
};
