import React from 'react';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import Footer from '../Components/Footer';
import CardDetail from '../Components/CardDetail';

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

const Detail = () => {
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
        <div className="flex-grow bg-gray-200 py-20">
          {' '}
          <div className="container mx-auto px-8">
            <div className="min-h-screen bg-gray-200 flex flex-col items-center p-8">
                <CardDetail />
            </div>
          </div>
        </div>
      <Footer infoLinks={infoLinks} />
      </div> 
    );
};

export default Detail;
