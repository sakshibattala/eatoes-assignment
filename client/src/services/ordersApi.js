import { apiBaseUrl } from "./api.js";

export const getAllOrders = (params) => {
  return apiBaseUrl.get("/orders", { params });
};

export const getOrderById = (id) => {
  return apiBaseUrl.get(`/orders/${id}`);
};

export const createOrder = (data) => {
  return apiBaseUrl.post("/orders", data);
};

export const updateOrderStatus = (id, status) => {
  return apiBaseUrl.patch(`/orders/${id}/status`, { status });
};
