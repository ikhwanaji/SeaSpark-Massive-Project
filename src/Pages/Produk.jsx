import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CardPemesanan from '../Components/CardPemesanan';
import { FiUserCheck } from 'react-icons/fi';
import backgroundImage from '/src/assets/img/HeroSection.jpg';

function Produk() {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Handler untuk navigasi
  const handleCardClick = (id) => {
    if (id === '1') {
      // ID untuk Pemesanan Paketan
      navigate('/produk-satuan');
      
    } else if (id === '2') {
      // ID untuk Pemesanan Satuan
      navigate('/produk-paketan');
    }
  };

  const pemesananData = [
    {
      id: '1',
      title: 'Pemesanan Satuan',
      description: 'Pesan alat dan bahan ikan kerapu satuan sesuai dengan kebutuhan Anda',
      image: '/src/assets/img/Satuan.png',
    },
    {
      id: '2',
      title: 'Pemesanan Paketan',
      description: 'Pesan paket penanganan penyakit ikan kerapu dengan harga yang lebih hemat',
      image: '/src/assets/img/Paketan.png',
    },
  ];

  const navigation = [
    { name: 'Beranda', type: 'link', path: '/' },
    { name: 'Layanan', type: 'link', path: '/layanan' },
    { name: 'Produk', type: 'link', path: '/produk' },
    { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
    { name: 'Kontak', type: 'link', path: '/kontak' },
  ];

  const infoLinks = [
    { text: 'Beranda', path: '/beranda-pengguna', href: '#beranda' },
    { text: 'Layanan', path: '/layanan', href: '#layanan' },
    { text: 'Produk', path: '/produk', href: '#produk' },
    { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
    { text: 'Kontak', path: '/kontak', href: '#kontak' },
  ];

  return (
    <>
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
        <div className="flex-grow bg-gradient-to-b from-sky-400 to-sky-800 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-white">Pilih Jenis Pemesanan</h1>
            <p className="text-2xl font-bold mb-8 text-center text-white">Silahkan pilih jenis pemesanan yang Anda inginkan</p>
            <div className="flex flex-col items-center space-y-6">
              {pemesananData.map((pemesanan) => (
                <div
                  key={pemesanan.id}
                  onClick={() => handleCardClick(pemesanan.id)} // Tambahkan onClick handler
                >
                  <CardPemesanan
                    id={pemesanan.id}
                    title={pemesanan.title}
                    description={pemesanan.description}
                    image={pemesanan.image}
                    imageAlt={`Pemesanan ${pemesanan.title}`}
                    containerClassName="flex justify-center items-center w-full"
                    cardClassName="flex flex-col sm:flex-row bg-white bg-opacity-20 rounded-full py-4 px-4 w-full max-w-xl text-center sm:text-left relative cursor-pointer hover:bg-opacity-30 transition-all duration-300"
                    imageContainerClassName="sm:absolute -left-4 top-1/2 transform -translate-y-1/2 w-24 h-24 mx-auto sm:mx-0 mb-4 sm:mb-0"
                    imageClassName="w-full h-full rounded-full object-cover pl-10"
                    contentClassName="flex flex-col sm:pl-24 space-y-2"
                    titleClassName="text-4xl font-semibold text-white"
                    descriptionClassName="text-sm text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer infoLinks={infoLinks} isUserPage={true} />
    </>
  );
}

export default Produk;
