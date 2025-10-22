import api from './api';

// --- Auth Services ---
export const loginUser = (credentials) => api.post('/users', credentials); // Note: json-server uses GET for login simulation
export const registerUser = (userData) => api.post('/users', userData);

// --- Customer Services ---
export const fetchCustomers = (page = 1, limit = 10, search = '') =>
  api.get(`/customers?_page=${page}&_limit=${limit}&q=${search}`);
export const getCustomerById = (id) => api.get(`/customers/${id}`);
export const createCustomer = (customerData) => api.post('/customers', customerData);
export const updateCustomer = (id, customerData) => api.put(`/customers/${id}`, customerData);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

// --- Lead Services ---
export const fetchLeadsForCustomer = (customerId) => api.get(`/leads?customerId=${customerId}`);
export const createLead = (leadData) => api.post('/leads', leadData);
export const updateLead = (id, leadData) => api.put(`/leads/${id}`, leadData);
export const deleteLead = (id) => api.delete(`/leads/${id}`);