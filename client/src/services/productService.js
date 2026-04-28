import api from "./api";

// Dummy Categories
const DUMMY_CATEGORIES = [
  { _id: "c1", name: "Necklace" },
  { _id: "c2", name: "Rings" },
  { _id: "c3", name: "Earrings" },
  { _id: "c4", name: "Bracelets" },
];

// Dummy Products
const DUMMY_PRODUCTS = [
  {
    _id: "p1",
    name: "Stackable Bezel Ring",
    price: 49.0,
    comparePrice: 55.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      },
    ],
    category: DUMMY_CATEGORIES[1],
    description: "A beautiful stackable bezel ring made for everyday elegance.",
    material: "14k Gold Plated",
    stock: 10,
    badge: "Sale 10%",
  },
  {
    _id: "p2",
    name: "Golden Medallion Necklace",
    price: 89.0,
    comparePrice: 89.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      },
    ],
    category: DUMMY_CATEGORIES[0],
    description:
      "An elegant golden medallion necklace that catches the light beautifully on any occasion.",
    material: "18k Solid Gold",
    stock: 5,
  },
  {
    _id: "p3",
    name: "Diamond Drop Earrings",
    price: 120.0,
    comparePrice: 120.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      },
    ],
    category: DUMMY_CATEGORIES[2],
    description:
      "Stunning diamond drop earrings for your special occasions, designed to turn heads.",
    material: "Sterling Silver",
    stock: 12,
  },
  {
    _id: "p4",
    name: "Classic Chain Bracelet",
    price: 65.0,
    comparePrice: 75.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      },
    ],
    category: DUMMY_CATEGORIES[3],
    description:
      "A classic chain bracelet that seamlessly blends with any casual or formal outfit.",
    material: "14k Gold Plated",
    stock: 8,
  },
  {
    _id: "p5",
    name: "Sapphire Halo Ring",
    price: 299.0,
    comparePrice: 350.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      },
    ],
    category: DUMMY_CATEGORIES[1],
    description:
      "Breathtaking sapphire halo ring featuring a brilliant cut center stone surrounded by diamonds.",
    material: "White Gold",
    stock: 3,
    badge: "Save $51",
  },
  {
    _id: "p6",
    name: "Pearl Choker",
    price: 150.0,
    comparePrice: 150.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&q=80",
      },
    ],
    category: DUMMY_CATEGORIES[0],
    description:
      "A timeless pearl choker suitable for weddings, galas, and sophisticated evening wear.",
    material: "Freshwater Pearls",
    stock: 15,
  },
];

export const productService = {
  getAll: async (params) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filtered = [...DUMMY_PRODUCTS];

    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (params?.category) {
      filtered = filtered.filter(
        (p) =>
          p.category.name === params.category ||
          p.category._id === params.category,
      );
    }

    return {
      data: {
        products: filtered,
        total: filtered.length,
        pages: 1,
      },
    };
  },

  getOne: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const product = DUMMY_PRODUCTS.find((p) => p._id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return { data: { product } };
  },

  getCategories: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: { categories: DUMMY_CATEGORIES } };
  },

  // Keep API endpoints for mutations if needed in the future
  create: (data) => api.post("/products", data),
  update: (id, data) => api.patch(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
};
