import { API_URL, AUTH_TOKEN } from '../config/constants';

const ApiService = {
  async registerUser(userData) {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  async loginUser(credentials) {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  async uploadVideo(videoData, token) {
    try {
      const response = await fetch(`${API_URL}/videos/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token || AUTH_TOKEN}`,
        },
        body: videoData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  },

  async getFeedback(videoId, token) {
    try {
      const response = await fetch(`${API_URL}/feedback/${videoId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token || AUTH_TOKEN}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching feedback:', error);
      throw error;
    }
  },

  async getUserProfile(userId, token) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token || AUTH_TOKEN}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  async updateUserProfile(userId, updateData, token) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || AUTH_TOKEN}`,
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },
};

export default ApiService;