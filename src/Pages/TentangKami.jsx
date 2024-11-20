import React from 'react';
import { useLocation } from 'react-router-dom';
import { FiUserCheck } from 'react-icons/fi';
import Navbar from '../Components/Navbar';
import TentangKami from '../Components/TentangKami';
import Footer from '../Components/Footer';

function TentangKamiPage() {
  const location = useLocation();

  const navigation = [
    { name: 'Beranda', type: 'link', path: '/' },
    { name: 'Layanan', type: 'link', path: '/layanan' },
    { name: 'Produk', type: 'link', path: '/produk' },
    { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
    { name: 'Kontak', type: 'link', path: '/kontak' },
  ];

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
        navigation={navigation}
        buttonName="Masuk"
        useIcon={false}
        icon={<FiUserCheck size={24} />}
        backgroundColor="bg-white"
        textColor="text-black-500"
        hoverColor="hover:text-blue-500"
        buttonColor="bg-blue-500"
        buttonHoverColor="bg-blue-700"
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
