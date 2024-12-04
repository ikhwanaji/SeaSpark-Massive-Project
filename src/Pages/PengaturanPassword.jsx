import React from 'react';
import Navbar from '../Components/Navbar';
import CardPengaturanPassword from '../Components/CardPengaturanPassword';
import { useAuth } from '../context/AuthContext';

const PengaturanPassword = () => {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar
        // Ubah prop untuk mendukung kondisi login
        buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} // Mengubah nama tombol berdasarkan status login
        // useIcon={isLoggedIn} // Gunakan icon jika sudah login
        // icon={isLoggedIn ? <FiUserCheck size={24} /> : null}
        // Tambahkan prop untuk status login
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout} // Pastikan fungsi logout dipanggil saat tombol diklik
      />

      {/* Main content */}
      <div className="flex-grow w-full px-8 py-8 bg-gray-100">
        <div className="flex items-center justify-center w-full">
          <CardPengaturanPassword />
        </div>
      </div>
    </div>
  );
};

export default PengaturanPassword;
