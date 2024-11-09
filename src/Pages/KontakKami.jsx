import React from 'react';
import Button from '../Components/Button';
import { FiUserCheck } from 'react-icons/fi';
import Navbar from '../Components/Navbar';
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
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center max-w-[800px] mx-auto">
            {/* Bagian Gambar */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <img src="/src/Assets/img/Kontak.png" alt="Customer service representative" className="rounded-lg w-full" />
            </div>

            {/* Bagian Form */}
            <div className="w-full md:w-1/2 md:pl-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Kontak Kami Sekarang</h2>
              <p className="text-gray-700 mb-4">Silahkan tinggalkan pesan Anda pada kolom dibawah ini</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="fullName">
                    Nama Lengkap
                  </label>
                  <input type="text" id="fullName" name="fullName" autoComplete="name" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan nama lengkap" required />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input type="email" id="email" name="email" autoComplete="email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan alamat email" required />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="message">
                    Pesan / Pengaduan
                  </label>
                  <textarea id="message" name="message" autoComplete="off" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan pesan" rows="4" required></textarea>
                </div>

                <Button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
                  Kirim
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer infoLinks={infoLinks} />
    </div>
  );
};

export default KontakKami;
