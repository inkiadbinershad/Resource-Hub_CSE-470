const API_BASE_URL = 'http://localhost:5000/api';

// Register new user
export const register = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
};

// Login user
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

// Get all resources with optional search and category filters
export const getResources = async (search = '', category = 'All') => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (category && category !== 'All') params.append('category', category);

  const response = await fetch(`${API_BASE_URL}/resources?${params.toString()}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch resources');
  }

  return data;
};

// Get resource by ID
export const getResourceById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/resources/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch resource');
  }

  return data;
};

// Create a new booking
export const createBooking = async (resource_id, resource_name, date, start_time, end_time, token) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ resource_id, resource_name, date, start_time, end_time }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create booking');
  }

  return data;
};

// Get current user's bookings
export const getMyBookings = async (token) => {
  const response = await fetch(`${API_BASE_URL}/bookings/my`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch bookings');
  }

  return data;
};

// Cancel a booking
export const cancelBooking = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}/cancel`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to cancel booking');
  }

  return data;
};

// Get dashboard statistics
export const getDashboardStats = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch dashboard stats');
  }

  return data;
};

// Upload a file
export const uploadFile = async (formData, token) => {
  const response = await fetch(`${API_BASE_URL}/uploads`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to upload file');
  }

  return data;
};
