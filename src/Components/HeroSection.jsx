import React from 'react';
import Button from '../Components/Button';

const HeroSection = () => {
  return (
    <div className="relative max-w-2xll mt-20 rounded-md">
      <img className="h-full w-full object-cover " src="/src/Assets/img/HeroSection.jpg" alt="Hero Section" />
      <div className="absolute inset-0 flex items-center justify-around text-white">
        <div className="w-1/2 pr-8">
          {' '}
          {/* Menambahkan padding-right */}
          <h2 className="font-bold text-3xl mb-4">
            Kesehatan <span className="text-blue-500">Ikan Kerapu</span>
            <br />
            Kesejahteraan <span className="text-blue-500">Peternak!</span>
          </h2>
          <div className="text-base max-w-md">
            {' '}
            {/* Menambahkan max-width */}
            <p className="mb-2">Selamat datang di Doker, platform yang dirancang khusus untuk memenuhi semua kebutuhan ikan kerapu Anda!</p>
            <p>Temukan alat, bahan, dan panduan lengkap untuk mengatasi berbagai masalah kesehatan ikan kerapu.</p>
          </div>
          <div className="mt-4">
            <Button buttonText="Pesan Sekarang" to="/login" position="left" />
          </div>
        </div>
        <div className="w-1/3">{/* <img src="/src/Assets/img/logo.png" alt="Logo" className="w-full" /> */}</div>
      </div>
    </div>
  );
};

export default HeroSection;
