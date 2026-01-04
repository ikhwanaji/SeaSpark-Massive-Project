import React from 'react';
import Button from '../Components/Button';
import HeroSectionImg from '../Assets/img/HeroSection.jpg';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => {
  const { isLoggedIn } = useAuth();

  return (
    // --- PERUBAHAN RESPONSIF ---
    // Tinggi diubah agar tidak terlalu besar di mobile (h-[70vh]) dan lebih ideal di layar besar (md:h-[80vh])
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <img className="w-full h-full object-cover" src={HeroSectionImg} alt="Budidaya Ikan Kerapu" />
      {/* Menambahkan overlay gelap untuk kontras teks */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* --- PERUBAHAN RESPONSIF --- */}
      {/* Mengubah flexbox, padding, dan alignment teks */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center md:flex-row md:justify-around md:text-left text-white p-4 sm:p-8">
        <div className="w-full md:w-1/2 lg:w-2/5">
          {/* Ukuran font disesuaikan untuk mobile dan desktop */}
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
            Kesehatan <span className="text-yellow-400">Ikan Kerapu,</span>
            <br />
            Kesejahteraan <span className="text-yellow-400">Anda!</span>
          </h2>
          <div className="text-base sm:text-lg max-w-md mx-auto md:mx-0">
            <p className="mb-2">Selamat datang di DoKer, platform yang dirancang khusus untuk memenuhi semua kebutuhan ikan kerapu Anda!</p>
            <p>Temukan alat, bahan, dan panduan lengkap untuk mengatasi berbagai masalah kesehatan ikan kerapu.</p>
          </div>
          <div className="mt-6">
            <Button buttonText="Pesan Sekarang" to={isLoggedIn ? '/produk/produk-satuan' : '/login'} position="left" />
          </div>
        </div>
        {/* Logo disembunyikan di mobile dan tablet, muncul di layar besar */}
        <div className="w-1/3 hidden lg:block">{/* <img src="/src/Assets/img/logo.png" alt="Logo" className="w-full" /> */}</div>
      </div>
    </div>
  );
};

export default HeroSection;
