import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const createThread = async () => {
  return axios.get(`${API_BASE_URL}/thread`);
};

export const postMessage = async (threadId, message) => {
  return axios.post(`${API_BASE_URL}/message`, { threadId, message });
};
