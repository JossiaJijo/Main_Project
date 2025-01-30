import apiClient from './apiClient';
import axios from 'axios'; // Ensure axios is imported for consistency

// Fetch sponsorships excluding submitted ones


export const getAllSponsorships = async () => {
  try {
    const response = await apiClient.get('/sponsorships/all'); // Ensure the endpoint matches
    return response.data.sponsorships; // Return sponsorships from the response
  } catch (error) {
    console.error('Error fetching sponsorships:', error.response?.data || error.message);
    throw error;
  }
};


// Submit a proposal for a sponsorship
export const submitProposal = async (data) => {
  try {
    const response = await apiClient.post('/sponsorships/submit-proposal', data);
    return response.data; // Return only the data for consistency
  } catch (error) {
    console.error('Error submitting proposal:', error);
    throw error; // Rethrow error for calling function to handle
  }
};

// Fetch seeker messages
export const getSeekerMessages = async (seekerId) => {
  try {
    const response = await apiClient.get(`/proposals/seeker-messages/${seekerId}`);
    return response.data; // Return only the data for consistency
  } catch (error) {
    console.error('Error fetching seeker messages:', error);
    throw error; // Rethrow error for calling function to handle
  }
};

// Fetch submissions for the logged-in seeker
/*export const getSeekerSubmissions = async () => {
 try {
    const response = await apiClient.get('/proposals/seeker-submissions');
    return response.data; // Return only the data for consistency
  } catch (error) {
    console.error('Error fetching seeker submissions:', error);
    throw error; // Rethrow error for calling function to handle
  }
};
*/
// Fetch a specific proposal by ID
export const getProposalById = async (proposalId) => {
  try {
    const response = await apiClient.get(`/proposals/${proposalId}`);
    return response.data; // Return only the proposal data for consistency
  } catch (error) {
    console.error('Error fetching proposal by ID:', error);
    throw error; // Rethrow error for calling function to handle
  }
};


// Fetch seeker submissions
/*export const getSeekerSubmissions = async () => {
  const token = localStorage.getItem('token'); // Use token for authentication
  const response = await axios.get('http://localhost:5000/api/proposals/seeker-submissions', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};*/



export const getSeekerSubmissions = async () => {
  const token = localStorage.getItem('token'); // Use token for authentication
  const response = await axios.get('http://localhost:5000/api/proposals/seeker-submissions', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};




