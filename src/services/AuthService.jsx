import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

class AuthService {
  // Register
  static async register(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Login Baru
  static async login(credentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Simpan token dan user info
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Logout
  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Cek Autentikasi
  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Dapatkan User Saat Ini
  static getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Error Handling Terpisah
  static handleError(error) {
    if (error.response) {
      // Server response error
      throw error.response.data;
    } else if (error.request) {
      // Request dibuat tapi tidak ada response
      throw new Error('Tidak dapat terhubung ke server');
    } else {
      // Error lainnya
      throw new Error('Terjadi kesalahan');
    }
  }
}

export default AuthService;