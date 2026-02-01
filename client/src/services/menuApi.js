import { apiBaseUrl } from "./api";

export const getMenuItems = (params) => {
  return apiBaseUrl.get("/menu", { params });
};

export const searchMenuItems = (query) => {
  return apiBaseUrl.get("/menu/search", {
    params: { q: query },
  });
};

export const getMenuItemById = (id) => {
  return apiBaseUrl.get(`/menu/${id}`);
};

export const createMenuItem = (data) => {
  return apiBaseUrl.post("/menu", data);
};

export const updateMenuItem = (id, data) => {
  return apiBaseUrl.put(`/menu/${id}`, data);
};

export const deleteMenuItem = (id) => {
  return apiBaseUrl.delete(`/menu/${id}`);
};

export const toggleAvailabilityStatus = (id, isAvailable) => {
  return apiBaseUrl.patch(`/menu/${id}/availability`, { isAvailable });
};

export const getTopSellers = () => {
  return apiBaseUrl.get("/analytics/top-sellers");
};
