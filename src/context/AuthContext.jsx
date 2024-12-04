import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Buat context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Konfigurasi default axios header
  useEffect(() => {
    if (token) {
      // Tambahkan prefix Bearer jika tidak ada
      const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      axios.defaults.headers.common['Authorization'] = formattedToken;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Cek status login saat komponen dimuat
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (storedToken && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsedUser);
        setToken(storedToken);
      } catch (error) {
        // Jika parsing gagal, logout
        logout();
      }
    }
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/login`, {
        email,
        password,
      });

      const { token, user: userData } = response.data;

      // Simpan token dan user data di localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Set state
      setIsLoggedIn(true);
      setUser(userData);
      setToken(token);

      // Set default axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return userData;
    } catch (error) {
      // Tangani error login secara detail
      if (error.response) {
        console.error('Login error:', error.response.data);
        throw new Error(error.response.data.message || 'Login gagal');
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('Tidak ada respon dari server');
      } else {
        console.error('Error', error.message);
        throw new Error('Terjadi kesalahan saat login');
      }
    }
  };

  // Logout handler
  const logout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Reset state
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);

    // Hapus default axios header
    delete axios.defaults.headers.common['Authorization'];
  };

  // Nilai context
  const value = {
    isLoggedIn,
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook untuk menggunakan auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
