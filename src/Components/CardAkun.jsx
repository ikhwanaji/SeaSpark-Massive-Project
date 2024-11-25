import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Akun = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Panggil fungsi logout dari konteks
    navigate('/'); // Navigasi ke halaman beranda setelah logout
  };

  return (
    <div className="py-12">
      <div className="flex flex-col items-center justify-center">
        <img src="/src/Assets/img/timkami.jpg" alt="Tim Member" className="rounded-full h-64 w-64 object-cover" />
        <div className="flex flex-col justify-center items-stretch w-64 space-y-2 mt-10 font-semibold">
          <Link to="/PengaturanProfil" className="bg-blue-500 text-white w-full py-2 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300">
            Pengaturan Akun
          </Link>
          <button onClick={handleLogout} className="bg-blue-500 text-white w-full py-2 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300">
            Keluarkan Akun
          </button>
        </div>
      </div>
    </div>
  );
};

export default Akun;
