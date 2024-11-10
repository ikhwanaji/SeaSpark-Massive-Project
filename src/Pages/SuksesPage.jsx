import React from 'react';
import { FiUserCheck } from 'react-icons/fi';
import Navbar from '../Components/Navbar';
import CardSukses from '../Components/CardSukses';
import Footer from '../Components/Footer';

const navigation = [
  { name: 'Beranda', type: 'link', path: '/beranda-pengguna' },
  { name: 'Layanan', type: 'link', path: '/layanan' },
  { name: 'Pemesanan', type: 'link', path: '/pemesanan' },
  { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
  { name: 'Kontak', type: 'link', path: '/kontak' },
];

const infoLinks = [
  { text: 'Beranda', path: '/beranda-user', href: '#beranda' },
  { text: 'Layanan', path: '/layanan', href: '#layanan' },
  { text: 'Pemesanan', path: '/pemesanan', href: '#pemesanan' },
  { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
  { text: 'Kontak', path: '/kontak', href: '#kontak' },
];

const KontakKami = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Tambahkan logika submit form di sini
  };

  return (
    <div className="min-h-screen flex flex-col">
      {' '}
      <Navbar
        navigation={navigation}
        buttonName="Profil User"
        useIcon={true}
        icon={<FiUserCheck size={24} />}
        backgroundColor="bg-white"
        textColor="text-black-500"
        hoverColor="hover:text-blue-500"
        buttonColor="bg-blue-500"
        buttonHoverColor="bg-blue-700"
      />
        <div className="flex-grow bg-blue-100 py-20">
            {' '}
            <div className="container mx-auto px-8">
                <CardSukses />
            </div>
        </div>
      <Footer infoLinks={infoLinks} />
    </div>
  );
};

export default KontakKami;
