import React from 'react';
import Button from '../Components/Button';

const HeroSection = ({ to }) => {
  return (
    <div className="relative max-w-2xll mt-20 rounded-md">
      <img className="w-full h-[80vh] object-cover" src="/src/Assets/img/HeroSection.jpg" alt="Hero Section" />
      <div className="absolute inset-0 flex items-center justify-around text-white">
        <div className="w-1/2 pr-8">
          {' '}
          <h2 className="font-bold text-4xl mb-4">
            Kesehatan <span className="text-blue-500">Ikan Kerapu</span>
            <br />
            Kesejahteraan <span className="text-blue-500">Peternak!</span>
          </h2>
          <div className="text-base max-w-md">
            {' '}
            <p className="mb-2">Selamat datang di Doker, platform yang dirancang khusus untuk memenuhi semua kebutuhan ikan kerapu Anda!</p>
            <p>Temukan alat, bahan, dan panduan lengkap untuk mengatasi berbagai masalah kesehatan ikan kerapu.</p>
          </div>
          <div className="mt-4">
            <Button buttonText="Pesan Sekarang" to={to} position="left" /> {/* Menggunakan prop to */}
          </div>
        </div>
        <div className="w-1/3">{/* <img src="/src/Assets/img/logo.png" alt="Logo" className="w-full" /> */}</div>
      </div>
    </div>
  );
};

export default HeroSection;
