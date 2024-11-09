import React from 'react';
import Navbar from '../Components/Navbar';
import TentangKami from '../Components/TentangKami';
import Footer from '../Components/Footer';
import { FiUser Check } from 'react-icons/fi';

// Define the navigation array if it’s not imported from another file
const navigation = [
  { name: 'Beranda', type: 'link', path: '/beranda-pengguna' },
  { name: 'Layanan', type: 'link', path: '/layanan' },
  { name: 'Pemesanan', type: 'link', path: '/pemesanan' },
  { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
  { name: 'Kontak', type: 'link', path: '/kontak' },
];

function TentangKamiPage() {
  const infoLinks = navigation
    .filter((nav) => nav.type === 'scroll')
    .map((nav) => ({
      href: `/#${nav.name.toLowerCase().replace(/\s+/g, '-')}`,
      text: nav.name,
    }));

  return (
    <>
      <Navbar
        navigation={navigation}
        buttonName="Profil User" // Menjaga tombol "Profil User"
        useIcon={true} // Menjaga penggunaan ikon
        icon={<FiUser Check size={24} />} // Menjaga ikon pengguna
        backgroundColor="bg-gray-100" // Menjaga warna latar belakang
        textColor="text-black-500" // Menjaga warna teks
        hoverColor="hover:text-blue-500" // Menjaga efek hover
        buttonColor="bg-blue-500" // Menjaga warna tombol
        buttonHoverColor="bg-blue-700" // Menjaga efek hover pada tombol
      />
      <main>
        <section>
          <TentangKami />
        </section>
      </main>
      <Footer infoLinks={infoLinks} />
    </>
  );
}

export default TentangKamiPage;