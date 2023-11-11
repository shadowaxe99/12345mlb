import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { API_URL, AUTH_TOKEN } from './ApiService';

const AuthService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { token } = response.data;
      await AsyncStorage.setItem(AUTH_TOKEN, token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Login failed');
    }
  },

  async register(username, email, password) {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
  },

  async logout() {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN);
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      throw new Error('Logout failed');
    }
  },

  async getToken() {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN);
      return token;
    } catch (error) {
      throw new Error('Getting token failed');
    }
  },

  async isAuthenticated() {
    try {
      const token = await this.getToken();
      return !!token;
    } catch (error) {
      throw new Error('Authentication check failed');
    }
  },
};

export default AuthService;