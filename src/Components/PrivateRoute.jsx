import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const PrivateRoute = () => {
  const { isLoggedIn, token } = useAuth();

  if (!isLoggedIn || !token) {
    // Tampilkan pesan peringatan sebelum redirect
    Swal.fire({
      icon: 'warning',
      title: 'Akses Dibatasi',
      text: 'Anda harus login terlebih dahulu untuk mengakses halaman ini.',
      confirmButtonText: 'Login Sekarang',
      showCancelButton: true,
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect ke halaman login
        window.location.href = '/login';
      }
    });

    // Redirect ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, render child routes
  return <Outlet />;
};

export default PrivateRoute;