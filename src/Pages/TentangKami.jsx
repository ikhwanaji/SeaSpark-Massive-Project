import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import TentangKami from '../Components/TentangKami';
import Footer from '../Components/Footer';
import { useAuth } from '../context/AuthContext';

function TentangKamiPage() {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();  
  const infoLinks = [
    {
      text: 'Beranda',
      path: location.pathname === '/tentang-kami' ? '/' : '/',
      href: location.pathname === '/' ? '#beranda' : '/',
    },
    {
      text: 'Layanan',
      path: '/layanan',
      href: location.pathname === '/' ? '#layanan' : '/layanan',
    },
    {
      text: 'Produk',
      path: '/produk',
      href: location.pathname === '/' ? '#produk' : '/produk',
    },
    {
      text: 'Tentang Kami',
      path: '/tentang-kami',
      href: location.pathname === '/' ? '#tentang-kami' : '/tentang-kami',
    },
    {
      text: 'Kontak',
      path: '/kontak',
      href: location.pathname === '/' ? '#kontak' : '/kontak',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
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
      <main className="flex-grow">
        <section>
          <TentangKami />
        </section>
      </main>
      <Footer infoLinks={infoLinks} isUserPage={true} />
    </div>
  );
}

export default TentangKamiPage;
