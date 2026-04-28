import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { ApiError } from "../utils/ApiError.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new ApiError("All fields required", 400);

  const exists = await User.findOne({ email });
  if (exists) throw new ApiError("Email already registered", 400);

  const user = await User.create({ name, email, password });
  const token = generateToken(res, user._id);

  res.status(201).json({ success: true, token, user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError("All fields required", 400);

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    throw new ApiError("Invalid email or password", 401);

  const token = generateToken(res, user._id);
  res.json({ success: true, token, user });
};

export const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

export const updateProfile = async (req, res) => {
  const { name, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  );
  res.json({ success: true, user });
};
