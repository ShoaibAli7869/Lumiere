import api from "./api";

export const getReviews = async (productId) => {
  const { data } = await api.get(`/reviews/${productId}`);
  return data;
};

export const createReview = async (productId, reviewData) => {
  const { data } = await api.post(`/reviews/${productId}`, reviewData);
  return data;
};

export const deleteReview = async (id) => {
  const { data } = await api.delete(`/reviews/${id}`);
  return data;
};
