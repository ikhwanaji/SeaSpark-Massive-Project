import React from 'react';
import Button from '../Components/Button';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import Footer from '../Components/Footer';
import CardLayanan2 from '../Components/CardLayanan2';

const Layanan = () => {
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
    <div className="min-h-screen flex flex-col">
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
      <div className="flex-grow bg-blue-100 py-20">
        <div className='text-center text-2xl pt-10 font-extrabold text-gray-800'>
          <h1>Penyakit Yang Umumnya<br/>Menyerang Ikan Kerapu</h1>
        </div>
        <div className="p-6 flex flex-col items-center gap-6">
          <CardLayanan2 />
        </div>
      </div>
      <Footer infoLinks={infoLinks} isUserPage={true} />
    </div>
  );
};

export default Layanan;
