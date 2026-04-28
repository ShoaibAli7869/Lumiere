import api from "./api";

export const orderService = {
  createIntent: (data) => api.post("/payment/create-intent", data),
  getMyOrders: () => api.get("/orders/my"),
  getOrder: (id) => api.get(`/orders/${id}`),
};
