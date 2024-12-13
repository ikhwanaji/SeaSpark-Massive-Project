import React from 'react';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import CardAkun from '../Components/CardAkun';
import { useAuth } from '../context/AuthContext';



const Akun = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        buttonName={isLoggedIn ? "Keluar" : "Masuk"} // Mengubah nama tombol berdasarkan status login
        // useIcon={isLoggedIn} // Gunakan icon jika sudah login
        // icon={isLoggedIn ? <FiUserCheck size={24} /> : null}
        // Tambahkan prop untuk status login
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout} // Pastikan fungsi logout dipanggil saat tombol diklik
      />
      <div className="flex-grow bg-gray-100 py-20">
        <div className="container mx-auto px-8">
          <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
            <CardAkun />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Akun;