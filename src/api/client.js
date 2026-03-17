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

// Building (settings)
export const fetchBuilding = () => request('/buildings');
export const saveBuilding = (data) => request('/buildings', { method: 'PUT', body: JSON.stringify(data) });

// Units
export const fetchUnits = (params = '') => request(`/units${params ? '?' + params : ''}`);
export const createUnit = (data) => request('/units', { method: 'POST', body: JSON.stringify(data) });
export const updateUnit = (id, data) => request(`/units/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteUnit = (id) => request(`/units/${id}`, { method: 'DELETE' });

// Residents
export const fetchResidents = (params = '') => request(`/residents${params ? '?' + params : ''}`);
export const createResident = (data) => request('/residents', { method: 'POST', body: JSON.stringify(data) });
export const bulkImportResidents = (residents) => request('/residents/bulk', { method: 'POST', body: JSON.stringify({ residents }) });
export const updateResident = (id, data) => request(`/residents/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteResident = (id) => request(`/residents/${id}`, { method: 'DELETE' });

// Payments
export const fetchPayments = (params = '') => request(`/payments${params ? '?' + params : ''}`);
export const createPayment = (data) => request('/payments', { method: 'POST', body: JSON.stringify(data) });
export const generatePayments = (data) => request('/payments/generate', { method: 'POST', body: JSON.stringify(data) });
export const updatePayment = (id, data) => request(`/payments/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deletePayment = (id) => request(`/payments/${id}`, { method: 'DELETE' });

// Requests (maintenance)
export const fetchRequests = (params = '') => request(`/requests${params ? '?' + params : ''}`);
export const createRequest = (data) => request('/requests', { method: 'POST', body: JSON.stringify(data) });
export const updateRequest = (id, data) => request(`/requests/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteRequest = (id) => request(`/requests/${id}`, { method: 'DELETE' });

// Announcements
export const fetchAnnouncements = () => request('/announcements');
export const createAnnouncement = (data) => request('/announcements', { method: 'POST', body: JSON.stringify(data) });
export const updateAnnouncement = (id, data) => request(`/announcements/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAnnouncement = (id) => request(`/announcements/${id}`, { method: 'DELETE' });

// Expenses
export const fetchExpenses = (params = '') => request(`/expenses${params ? '?' + params : ''}`);
export const createExpense = (data) => request('/expenses', { method: 'POST', body: JSON.stringify(data) });
export const updateExpense = (id, data) => request(`/expenses/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteExpense = (id) => request(`/expenses/${id}`, { method: 'DELETE' });
