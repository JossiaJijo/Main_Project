import apiClient from "./apiClient"; // Ensure apiClient.js exists

export const getAllUsers = async () => {
  return await apiClient.get("/admin/users");
};

export const deleteUser = async (userId) => {
  return await apiClient.delete(`/admin/users/${userId}`);
};

export const toggleUserBan = async (userId) => {
  return await apiClient.put(`/admin/users/ban/${userId}`);
};

export const getAdminStats = async () => {
  return await apiClient.get("/admin/stats");
};

export const getAllSponsorships = async () => {
  return await apiClient.get("/sponsorships/all");
};

// ✅ Add this missing function
export const deleteSponsorship = async (sponsorshipId) => {
  return await apiClient.delete(`/admin/sponsorships/${sponsorshipId}`);
};
