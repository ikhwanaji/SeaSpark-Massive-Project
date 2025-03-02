import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CardDetail from '../Components/CardDetail';
import { useAuth } from '../context/AuthContext';

const infoLinks = [
  { text: 'Beranda', path: '/', href: '#beranda' },
  { text: 'Layanan', path: '/layanan', href: '#layanan' },
  { text: 'Ulasan', path: '/', href: '#ulasan' },
  { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
];

const Detail = () => {
  const { isLoggedIn, user, logout } = useAuth(); 
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        // Ubah prop untuk mendukung kondisi login
        buttonName={isLoggedIn ? "Keluar" : "Masuk"} // Mengubah nama tombol berdasarkan status login
        // useIcon={isLoggedIn} // Gunakan icon jika sudah login
        // icon={isLoggedIn ? <FiUserCheck size={24} /> : null}
        // Tambahkan prop untuk status login
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout} // Pastikan fungsi logout dipanggil saat tombol diklik
      />
      <div className="flex-grow bg-blue-50 py-20">
        
        <div className="container mx-auto px-8">
          <div className="min-h-screen bg-blue-50 flex flex-col items-center p-8">
            <CardDetail />
          </div>
        </div>
      </div>
      <Footer infoLinks={infoLinks} />
    </div>
  );
};

export default Detail;
