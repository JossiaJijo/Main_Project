// src/components/dashboard/dashboardService.js

import apiClient from '../../services/apiClient';

// Fetch sponsorship data
export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
};

// Fetch detailed sponsorship information
export const getSponsorshipDetails = async (id) => {
  try {
    const response = await apiClient.get(`/sponsorships/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch sponsorship details:', error);
    throw error;
  }
};
