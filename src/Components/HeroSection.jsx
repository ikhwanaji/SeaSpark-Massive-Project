import React from 'react';
import Button from '../Components/Button';
import HeroSectionImg from '../Assets/img/HeroSection.jpg';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className="relative w-full h-[80vh] rounded-md overflow-hidden">
      <img className="w-full h-full object-cover" src={HeroSectionImg} alt="Hero Section" />
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-around text-white p-4">
        <div className="w-full md:w-1/2 pr-0 md:pr-8 text-center md:text-left">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">
            Kesehatan <span className="text-yellow-400">Ikan Kerapu</span>
            <br />
            Kesejahteraan <span className="text-yellow-400">Peternak!</span>
          </h2>
          <div className="text-base max-w-md mx-auto md:mx-0">
            <p className="mb-2">Selamat datang di Doker, platform yang dirancang khusus untuk memenuhi semua kebutuhan ikan kerapu Anda!</p>
            <p>Temukan alat, bahan, dan panduan lengkap untuk mengatasi berbagai masalah kesehatan ikan kerapu.</p>
          </div>
          <div className="mt-4">
            <Button buttonText="Pesan Sekarang" to={isLoggedIn ? '/produk/produk-satuan' : '/login'} position="left" />
          </div>
        </div>
        <div className="w-1/3 hidden md:block">{/* <img src="/src/Assets/img/logo.png" alt="Logo" className="w-full" /> */}</div>
      </div>
    </div>
  );
};

export default HeroSection;
