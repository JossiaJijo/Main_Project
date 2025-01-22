import apiClient from './apiClient';

export const getHomePageData = async () => {
  return await apiClient.get('/home');
};
