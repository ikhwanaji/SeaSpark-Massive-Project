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
    { name: 'Ulasan', type: 'link', path: '/' },
    { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
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
      text: 'Ulasan',
      path: '/',
      href: location.pathname === '/' ? '#ulasan' : '/',
    },
    {
      text: 'Tentang Kami',
      path: '/tentang-kami',
      href: location.pathname === '/' ? '#tentang-kami' : '/tentang-kami',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        navigation={navigation}
        buttonName="Masuk"
        useIcon={true}
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