import React from 'react';
import Button from '../Components/Button';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import Footer from '../Components/Footer';
import CardLayanan from '../Components/CardLayanan';

const Layanan = () => {
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

  const data = [
    { imageSrc: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg', title: 'Penyebab timbulnya penyakit pada ikan kerapu', description: '' },
    { imageSrc: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg', title: 'Penyakit umum menyerang ikan kerapu dalam budidaya', description: '' },
    { imageSrc: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg', title: 'Gejala awal penyakit pada ikan kerapu', description: '' },
    { imageSrc: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg', title: 'Penyakit Sleepy Grouper Disease (SGD) pada ikan Kerapu', description: '' },
    { imageSrc: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg', title: 'Cara merawat ikan kerapu agar terhindar dari penyakit', description: '' },
    { imageSrc: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg', title: 'Penyebaran Virus SGD pada ikan kerapu', description: '' },
    { imageSrc: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg', title: 'Strategi penanganan penyakit ikan kerapu yang paling efektif', description: '' },
    { imageSrc: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg', title: 'Penanganan penyakit pada ikan kerapu', description: '' },
    { imageSrc: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg', title: 'Penyebab parasit pada benih ikan kerapu yang menular', description: '' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {' '}
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
      <div className="flex-grow bg-gray-100 py-20">
        {' '}
        <div className="container mx-auto px-8 mt-6" >
          <div className="min-h-screen bg-blue-100 flex flex-col items-center p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {data.map((item, index) => (
                <CardLayanan key={index} imageSrc={item.imageSrc} title={item.title} description={item.description} />
              ))}
            </div>
            <br />
            <br />
            <Button>Kembali ke Beranda</Button>
          </div>
        </div>
      </div>
      <Footer infoLinks={infoLinks} isUserPage={true} />
    </div>
  );
};

export default Layanan;
