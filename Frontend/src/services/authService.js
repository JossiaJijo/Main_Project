import apiClient from './apiClient';

export const login = async (username, password) => {
  return await apiClient.post('/auth/login', { username, password });
};

export const register = async (userData) => {
  return await apiClient.post('/auth/register', userData);
};

export const getUserProfile = async () => {
  return await apiClient.get('/auth/user');
};
