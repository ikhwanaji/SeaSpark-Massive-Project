import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <img className="h-full w-full object-cover" src="/src/Assets/img/HeroSection.jpg" alt="Hero Section" />
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="absolute inset-0 flex flex-col items-start justify-center text-white font-bold text-4xl px-10">
        <p className="mb-4">
          Kesehatan <span className="text-sky-500">Ikan Kerapu</span>
          <br />
          Kesejahteraan <span className="text-sky-500">Peternak!</span>
        </p>
      </div>
      <div className="absolute bottom-16 left-10 text-white w-3/4">
        <p className="text-lg mb-2">
          Selamat datang di Doker, platform yang dirancang khusus <br />
          untuk memenuhi semua kebutuhan ikan kerapu Anda!
        </p>
        <p className="text-lg mb-4">
          Temukan alat, bahan, dan panduan lengkap untuk mengatasi <br /> berbagai masalah kesehatan ikan kerapu.
        </p>
        <div className="mt-4">
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">Produk Kami</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
