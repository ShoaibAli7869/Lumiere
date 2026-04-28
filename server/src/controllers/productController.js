import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { ApiError } from "../utils/ApiError.js";

export const getProducts = async (req, res) => {
  const {
    page = 1,
    limit = 12,
    category,
    minPrice,
    maxPrice,
    sort = "createdAt",
    order = "desc",
    search,
    featured,
  } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (featured === "true") filter.featured = true;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  if (search) filter.$text = { $search: search };

  const sortObj = { [sort]: order === "asc" ? 1 : -1 };
  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit))
      .populate("category", "name slug"),
    Product.countDocuments(filter),
  ]);

  res.json({
    success: true,
    products,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name slug",
  );
  if (!product) throw new ApiError("Product not found", 404);
  res.json({ success: true, product });
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new ApiError("Product not found", 404);
  res.json({ success: true, product });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError("Product not found", 404);
  res.json({ success: true, message: "Product deleted" });
};

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort("name");
  res.json({ success: true, categories });
};

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, category });
};
