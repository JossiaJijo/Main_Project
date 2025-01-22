import axios from 'axios';

export const login = async (username, password) => {
  return await axios.post('http://localhost:5000/api/auth/login', { username, password });
};

export const register = async (username, password, role) => {
  return await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
};
