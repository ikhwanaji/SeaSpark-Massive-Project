import React from 'react';


const HeroSection = () => {
  return (
    <div className="relative max-w-2xll mx-20 mt-11 rounded-md ">
      <img className="h-96 w-full object-cover rounded-md" src="/src/Assets/img/HeroSection.jpg" alt="Hero Section" />
      <div className="absolute inset-0 flex items-center justify-between text-white font-bold text-3xl bottom-10 left-10 pb-16">
        <p>
          Kesehatan <span className="text-blue-500 ">Ikan Kerapu</span>
          <br />
          Kesejahteraan <span className="text-blue-500">Peternak!</span>
        </p>
      </div>
      <div className="absolute bottom-16 left-10 text-white">
        <p className="text-sm">
          Selamat datang di Doker, platform yang dirancang khusus <br />
          untuk memenuhi semua kebutuhan ikan kerapu Anda!
        </p>
        <p className="text-sm">
          Temukan alat, bahan, dan panduan lengkap untuk mengatasi <br /> berbagai masalah kesehatan ikan kerapu 
        </p>
        <div className="mt-4"> {/* Menambahkan margin-top di sini */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Produk Kami</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
