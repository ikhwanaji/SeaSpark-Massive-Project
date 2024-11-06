import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CardPemesanan from '../Components/CardPemesanan';
import { FiUserCheck } from 'react-icons/fi';
import backgroundImage from '/src/assets/img/HeroSection.jpg'; // Sesuaikan dengan path gambar background Anda

function Pemesanan() {
  const pemesananData = [
    {
      id: '1',
      title: 'Pemesanan Satuan',
      description: 'Pesan ikan hias satuan sesuai dengan kebutuhan Anda',
      image: '/src/assets/img/Satuan.png', // Sesuaikan dengan path gambar Anda
    },
    {
      id: '2',
      title: 'Pemesanan Paketan',
      description: 'Pesan paket ikan hias dengan harga yang lebih hemat',
      image: '/src/assets/img/Paketan.png', // Sesuaikan dengan path gambar Anda
    },
  ];

  const navigation = [
    { name: 'Beranda', type: 'link', path: '/beranda-user' },
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

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar
        navigation={navigation}
        buttonName="Profil User"
        useIcon={true}
        icon={<FiUserCheck size={24} />}
        backgroundColor="bg-gray-100"
        textColor="text-black-500"
        hoverColor="hover:text-blue-500"
        buttonColor="bg-blue-500"
        buttonHoverColor="bg-blue-700"
      />
      <div className="flex-grow bg-gradient-to-b from-sky-400 to-sky-800 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-white">Pilih Jenis Pemesanan</h1>
          <div className="flex flex-col items-center space-y-6">
            {pemesananData.map((pemesanan) => (
              <CardPemesanan
                key={pemesanan.id}
                id={pemesanan.id}
                title={pemesanan.title}
                description={pemesanan.description}
                image={pemesanan.image}
                imageAlt={`Pemesanan ${pemesanan.title}`}
                // Custom styling
                containerClassName="flex justify-center items-center w-full"
                cardClassName="flex flex-col sm:flex-row  bg-white bg-opacity-20 rounded-full py-4 px-4 w-full max-w-xl text-center sm:text-left relative cursor-pointer hover:bg-opacity-30 transition-all duration-300"
                imageContainerClassName="sm:absolute -left-4 top-1/2 transform -translate-y-1/2 w-24 h-24 mx-auto sm:mx-0 mb-4 sm:mb-0"
                imageClassName="w-full h-full rounded-full object-cover "
                contentClassName="flex flex-col sm:pl-24 space-y-2"
                titleClassName="text-4xl font-semibold text-white"
                descriptionClassName="text-sm text-white"
              />
            ))}
          </div>
        </div>
      </div>      
    </div>
    <Footer infoLinks={infoLinks} isUserPage={true} />
    </>
  );
}

export default Pemesanan;
