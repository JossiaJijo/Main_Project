import apiClient from './apiClient';

// Fetch sponsor-specific sponsorships
export const getMySponsorships = async () => {
  return await apiClient.get('/sponsorships/my-sponsorships');
};

// Fetch sponsor-specific proposals
export const getMyProposals = async () => {
  return await apiClient.get('/sponsorships/my-proposals');
};

// Add a new sponsorship
export const addSponsorship = async (sponsorshipData) => {
  return await apiClient.post('/sponsorships', sponsorshipData);
};

// Delete a sponsorship by ID
export const deleteSponsorship = async (id) => {
  return await apiClient.delete(`/sponsorships/${id}`);
};

// Update a sponsorship by ID
export const updateSponsorship = async (id, sponsorshipData) => {
  return await apiClient.put(`/sponsorships/${id}`, sponsorshipData);
};

// Accept a proposal
export const acceptProposal = async (proposalId) => {
  return await apiClient.put(`/proposals/accept/${proposalId}`);
};

// Dismiss a proposal
export const dismissProposal = async (proposalId) => {
  return await apiClient.put(`/proposals/dismiss/${proposalId}`);
};
