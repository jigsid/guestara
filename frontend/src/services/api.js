import axios from "axios";

const API_URL = "http://localhost:3000/api";

const api = {
  // Categories
  getAllCategories: () => axios.get(`${API_URL}/categories`),
  createCategory: (data) => axios.post(`${API_URL}/categories`, data),
  updateCategory: (id, data) => axios.put(`${API_URL}/categories/${id}`, data),
  getCategoryById: (id) => axios.get(`${API_URL}/categories/${id}`),

  // Subcategories
  getAllSubcategories: () => axios.get(`${API_URL}/subcategories`),
  getSubcategoriesByCategory: (categoryId) =>
    axios.get(`${API_URL}/subcategories/category/${categoryId}`),
  createSubcategory: (data) => axios.post(`${API_URL}/subcategories`, data),
  updateSubcategory: (id, data) =>
    axios.put(`${API_URL}/subcategories/${id}`, data),

  // Items
  getAllItems: () => axios.get(`${API_URL}/items`),
  getItemsByCategory: (categoryId) =>
    axios.get(`${API_URL}/items/category/${categoryId}`),
  getItemsBySubcategory: (subcategoryId) =>
    axios.get(`${API_URL}/items/subcategory/${subcategoryId}`),
  createItem: (data) => axios.post(`${API_URL}/items`, data),
  updateItem: (id, data) => axios.put(`${API_URL}/items/${id}`, data),
  searchItems: (query) => axios.get(`${API_URL}/items/search?name=${query}`),
};

export default api;
