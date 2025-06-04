const API_BASE_URL = 'http://localhost:5004/api';

export const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  
  if (!headers.has('Content-Type') && options.body) {
    headers.append('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }

  return await response.json();
};