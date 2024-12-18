import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/CardLayanan';
import { useAuth } from '../context/AuthContext';

const Layanan = () => {
  const { isLoggedIn, user, logout } = useAuth(); 

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

  const layananData = [
    {
      id: '1', // Tambahkan ID unik
      imageSrc: '/Assets/img/bakteri.png',
      title: 'Penyakit Bakteri',
      description: 'Penyebab Penyakit: Vibrio spp. (Vibrio alginolyticus, Vibrio harveyi)',
      linkText: 'Baca lebih lanjut...',
    },
    {
      id: '2', // Tambahkan ID unik
      imageSrc: '/Assets/img/jamur.png',
      title: 'Penyakit Jamur',
      description: 'Penyebab Penyakit: Aphanomyces spp., Saprolegnia spp.',
      linkText: 'Baca lebih lanjut...',
    },
    {
      id: '3', // Tambahkan ID unik
      imageSrc: '/Assets/img/virus.png',
      title: 'Penyakit Virus',
      description: 'Penyebab Penyakit: White Spot Syndrome Virus (WSSV).',
      linkText: 'Baca lebih lanjut...',
    },
    {
      id: '4', // Tambahkan ID unik
      imageSrc: '/Assets/img/parasit.png',
      title: 'Penyakit Parasit',
      description: 'Penyebab Penyakit: Protozoa Cryptocaryon irritans (penyakit bintik putih), Amyloodinium ocellatum (velvet disease), dan Trichodina spp.',
      linkText: 'Baca lebih lanjut...',
    },
    {
      id: '5', // Tambahkan ID unik
      imageSrc: '/Assets/img/nutrisi.png',
      title: 'Penyakit Nutrisi',
      description: 'Penyebab Penyakit: Kekurangan protein, Defisiensi vitamin, Kekurangan mineral, Kandungan pakan tidak seimbang',
      linkText: 'Baca lebih lanjut...',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        // Ubah prop untuk mendukung kondisi login
        buttonName={isLoggedIn ? "Keluar" : "Masuk"} // Mengubah nama tombol berdasarkan status login
        // useIcon={isLoggedIn} // Gunakan icon jika sudah login
        // icon={isLoggedIn ? <FiUserCheck size={24} /> : null}
        // Tambahkan prop untuk status login
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout} // Pastikan fungsi logout dipanggil saat tombol diklik
      />
      <div className="flex-grow bg-blue-100 py-20">
        <div className='text-center text-2xl pt-10 font-extrabold text-gray-800'>
          <h1>Penyakit Ikan Kerapu</h1>
        </div>
        <div className="p-6 flex flex-col items-center gap-6">
          {layananData.map((layanan) => (
            <div key={layanan.id} className="w-full max-w-xl">
              <Card id={layanan.id} imageSrc={layanan.imageSrc} title={layanan.title} description={layanan.description} linkText={layanan.linkText} />
            </div>
          ))}
        </div>
      </div>
      <Footer infoLinks={infoLinks} isUserPage={true} />
    </div>
  );
};

export default Layanan;
