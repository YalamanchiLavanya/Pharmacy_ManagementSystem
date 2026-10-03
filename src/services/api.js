import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001"
});

export const getMedicines = () =>
  api.get("/medicines");

export const getMedicine = (id) =>
  api.get(`/medicines/${id}`);

export const addMedicine = (medicine) =>
  api.post("/medicines", medicine);

export const updateMedicine = (id, medicine) =>
  api.put(`/medicines/${id}`, medicine);

export const deleteMedicine = (id) =>
  api.delete(`/medicines/${id}`);

// Customers
export const getCustomers = () =>
  api.get("/customers");

export const addCustomer = (customer) =>
  api.post("/customers", customer);

export const updateCustomer = (id, customer) =>
  api.put(`/customers/${id}`, customer);

export const deleteCustomer = (id) =>
  api.delete(`/customers/${id}`);

export const getOrders = () =>
  api.get("/orders");

export const createOrder = (order) => {
  return api.post("/orders", order);
};

export default api;