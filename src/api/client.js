const BASE = '/api';

function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`);
  return data;
}

// Auth
export const login = (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const register = (name, email, password) => request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
export const getMe = () => request('/auth/me');

// Products
export const fetchProducts = () => request('/products');
export const createProduct = (data) => request('/products', { method: 'POST', body: JSON.stringify(data) });
export const updateProduct = (id, data) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProduct = (id) => request(`/products/${id}`, { method: 'DELETE' });
export const updateStock = (id, stock) => request(`/products/${id}/stock`, { method: 'PATCH', body: JSON.stringify({ stock }) });

// Orders
export const placeOrder = (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) });
export const fetchOrders = () => request('/orders');
export const updateOrderStatus = (id, status) => request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });

// Settings
export const fetchSettings = () => request('/settings');
export const saveSettings = (data) => request('/settings', { method: 'PUT', body: JSON.stringify(data) });

// Upload
export async function uploadImage(file) {
  const token = getToken();
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || 'Upload failed');
  return data;
}

// Scheduled Posts
export const fetchScheduledPosts = () => request('/scheduled-posts');
export const createScheduledPost = (data) => request('/scheduled-posts', { method: 'POST', body: JSON.stringify(data) });
export const updateScheduledPost = (id, data) => request(`/scheduled-posts/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteScheduledPost = (id) => request(`/scheduled-posts/${id}`, { method: 'DELETE' });

// Services
export const fetchServices = () => request('/services');
export const updateService = (id, data) => request(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) });
