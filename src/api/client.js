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
export const register = (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
export const getMe = () => request('/auth/me');

// Buildings
export const fetchBuildings = (params = '') => request(`/buildings${params ? '?' + params : ''}`);
export const fetchBuildingById = (id) => request(`/buildings/${id}`);
export const fetchLocations = (params = '') => request(`/buildings/locations${params ? '?' + params : ''}`);
export const saveBuilding = (id, data) => request(`/buildings/${id}`, { method: 'PUT', body: JSON.stringify(data) });

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

// Import (Excel)
export async function parseExcel(file) {
  const token = getToken();
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${BASE}/import/parse`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || 'Parse failed');
  return data;
}

export async function executeImport(file, type, sheetName, columnMapping, building) {
  const token = getToken();
  const form = new FormData();
  form.append('file', file);
  form.append('type', type);
  form.append('sheetName', sheetName);
  form.append('columnMapping', JSON.stringify(columnMapping));
  if (building) form.append('building', building);
  const res = await fetch(`${BASE}/import/execute`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || 'Import failed');
  return data;
}

export function autoDetectColumns(headers, type) {
  return request('/import/auto-detect', { method: 'POST', body: JSON.stringify({ headers, type }) });
}

// Parking
export const fetchParkingSpots = (params = '') => request(`/parking${params ? '?' + params : ''}`);
export const fetchParkingStats = () => request('/parking/stats');
export const fetchParkingSpot = (id) => request(`/parking/${id}`);
export const createParkingSpot = (data) => request('/parking', { method: 'POST', body: JSON.stringify(data) });
export const bulkCreateParkingSpots = (data) => request('/parking/bulk', { method: 'POST', body: JSON.stringify(data) });
export const updateParkingSpot = (id, data) => request(`/parking/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const assignParkingSpot = (id, data) => request(`/parking/${id}/assign`, { method: 'PUT', body: JSON.stringify(data) });
export const releaseParkingSpot = (id) => request(`/parking/${id}/release`, { method: 'PUT' });
export const updateParkingPayment = (id, data) => request(`/parking/${id}/payment`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteParkingSpot = (id) => request(`/parking/${id}`, { method: 'DELETE' });

// Expenses
export const fetchExpenses = (params = '') => request(`/expenses${params ? '?' + params : ''}`);
export const createExpense = (data) => request('/expenses', { method: 'POST', body: JSON.stringify(data) });
export const updateExpense = (id, data) => request(`/expenses/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteExpense = (id) => request(`/expenses/${id}`, { method: 'DELETE' });
