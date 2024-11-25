import React from 'react';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import CardAkun from '../Components/CardAkun';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Beranda', type: 'link', path: '/beranda-pengguna' },
  { name: 'Layanan', type: 'link', path: '/layanan' },
  { name: 'Pemesanan', type: 'link', path: '/pemesanan' },
  { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
  { name: 'Kontak', type: 'link', path: '/kontak' },
];

const Akun = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        navigation={navigation}
        // Ubah prop untuk mendukung kondisi login
        buttonName={isLoggedIn ? "Keluar" : "Masuk"} // Mengubah nama tombol berdasarkan status login
        useIcon={isLoggedIn} // Gunakan icon jika sudah login
        icon={isLoggedIn ? <FiUserCheck size={24} /> : null}
        backgroundColor="bg-white"
        textColor="text-black-500"
        hoverColor="hover:text-blue-500"
        buttonColor="bg-blue-500"
        buttonHoverColor="bg-blue-700"
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