// src/utils/axiosInterceptor.js
import axios from 'axios';
import AuthService from '../services/AuthService';

// Konfigurasi Interceptor
const setupInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle token expired
      if (error.response && error.response.status === 401) {
        AuthService.logout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;

// Di main.js atau App.js
import setupInterceptors from './utils/axiosInterceptor';
setupInterceptors();