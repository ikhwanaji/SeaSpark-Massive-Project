import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import backgroundImage from '../Assets/img/HeroSection.jpg';
import { useAuth } from '../context/AuthContext';
import satuanImg from '../Assets/img/Satuan.png';
import paketanImg from '../Assets/img/Paketan.png';

function Produk() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleCardClick = (id) => {
    if (id === '1') {
      navigate('/produk/produk-satuan');
    } else if (id === '2') {
      navigate('/produk/produk-paketan');
    }
  };

  const pemesananData = [
    {
      id: '1',
      title: 'Produk Satuan',
      description: 'Pesan alat dan bahan ikan kerapu satuan sesuai dengan kebutuhan Anda',
      image: satuanImg,
    },
    {
      id: '2',
      title: 'Produk Paketan',
      description: 'Pesan paket penanganan penyakit ikan kerapu dengan harga yang lebih hemat',
      image: paketanImg,
    },
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
        <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />
        <div className="flex-grow bg-gradient-to-b from-sky-400 to-sky-800 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-white mb-4">Pilih Jenis Pemesanan</h1>
            <p className="text-xl text-center text-white mb-8">Silahkan pilih jenis pemesanan yang Anda inginkan</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {pemesananData.map((pemesanan) => (
                <div key={pemesanan.id} onClick={() => handleCardClick(pemesanan.id)} className="cursor-pointer">
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row items-center bg-white bg-opacity-20 rounded-xl p-6 hover:bg-opacity-30 transition-all duration-300">
                      <div className="w-24 h-24 mb-4 sm:mb-0 sm:mr-6">
                        <img src={pemesanan.image} alt={`Pemesanan ${pemesanan.title}`} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h4 className="text-2xl font-semibold text-white">{pemesanan.title}</h4>
                        <p className="text-sm text-white">{pemesanan.description}</p>
                      </div>
                    </div>
                  </div>
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
