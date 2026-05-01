import api from "./api";

export const productService = {
  getAll: async (params) => {
    return api.get("/products", { params });
  },

  getOne: async (id) => {
    return api.get(`/products/${id}`);
  },

  getCategories: async () => {
    return api.get("/products/categories");
  },

  create: (data) => api.post("/products", data),
  update: (id, data) => api.patch(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
};
