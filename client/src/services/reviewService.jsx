import api from "./api";

export const getReviews = (productId) =>
  api.get(`/reviews/${productId}`).then((r) => r.data);
export const createReview = (productId, data) =>
  api.post(`/reviews/${productId}`, data).then((r) => r.data);
export const deleteReview = (id) =>
  api.delete(`/reviews/${id}`).then((r) => r.data);
