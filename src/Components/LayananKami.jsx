import React from 'react';
import Button from '../Components/Button';

const LayananKami = () => {
  return (
    <div className="bg-blue-50 py-20 ">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Layanan Kami</h2>
        <p className="text-gray-600 text-lg">Kami menyediakan layanan</p>
      </div>

      <div className="flex flex-wrap justify-center gap-24">
        {/* Artikel & Blog Card */}
        <div className="bg-blue-100 p-8 rounded-2xl shadow-lg w-80 flex flex-col items-center text-center ">
          <div className="flex justify-center mb-6 ">
            <img src="/src/Assets/img/artikel.jpg" alt="Artikel & Blog Icon" className="h-24 w-24 object-contain" />
          </div>
          <h3 className="text-xl font-semibold text-sky-500 mb-3">ARTIKEL & BLOG</h3>
          <p className="text-gray-600 text-base mb-6 flex-grow">Kami menyediakan artikel ilmiah dan panduan praktis tentang berbagai penyakit umum yang terjadi pada ikan kerapu</p>
          <Button buttonText="Selengkapnya" to="/" />
        </div>

        {/* Katalog Alat & Bahan Card */}
        <div className="bg-blue-100 p-8 rounded-2xl shadow-lg w-80 flex flex-col items-center text-center">
          <div className="flex justify-center mb-6">
            <img src="/src/Assets/img/katalog.jpg" alt="Katalog Alat & Bahan Icon" className="h-24 w-24 object-contain" />
          </div>
          <h3 className="text-xl font-semibold text-sky-500 mb-3">KATALOG ALAT & BAHAN</h3>
          <p className="text-gray-600 text-base mb-6 flex-grow">Kami menawarkan alat, bahan, dan panduan untuk menangani penyakit ikan kerapu.</p>
          <Button buttonText="Selengkapnya" to="/login" />
        </div>
      </div>
    </div>
  );
};

export default LayananKami;
