import React, { useState } from 'react';
import Button from '../Components/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LayananKami = ({ to }) => {
  const images = ['/src/Assets/img/artikelimg.png', '/src/Assets/img/artikelimg2.png', '/src/Assets/img/artikelimg3.png', '/src/Assets/img/artikelimg4.png', '/src/Assets/img/artikelimg5.png'];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="bg-blue-50 flex items-center justify-center min-h-screen">
      <div className="text-center ">
        <h2 className="text-4xl font-bold text-gray-600 mb-8">Layanan Kami</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg flex max-w-3xl items-center ">
          <div className="w-1/2 relative group">
            <div className="relative overflow-hidden rounded-lg">
              <img src={images[currentImageIndex]} alt="Layanan Ikan Kerapu" className="w-full h-auto transition-all duration-500 ease-in-out" />
              {/* Tombol Prev */}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 
                           bg-white/50 rounded-full p-2 
                           opacity-0 group-hover:opacity-100 
                           transition-all duration-300 ease-in-out"
              >
                <FaChevronLeft className="text-sky-500 text-xl" />
              </button>

              {/* Tombol Next */}
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 
                           bg-white/50 rounded-full p-2 
                           opacity-0 group-hover:opacity-100 
                           transition-all duration-300 ease-in-out"
              >
                <FaChevronRight className="text-sky-500 text-xl" />
              </button>
            </div>

            {/* Indikator Pagination */}
            <div className="flex justify-center mt-2 space-x-2">
              {images.map((_, index) => (
                <span key={index} className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-sky-500' : 'bg-gray-300'}`}></span>
              ))}
            </div>
          </div>
          <div className="w-1/2 pl-6 pr-4 items-center">
            <h2 className="text-sky-500 font-bold text-2xl mb-2 text-left">
              Kenali Penyakit <br /> Ikan Kerapu Anda!
            </h2>
            <p className="text-gray-700 text-justify">
              Merasa bingung dengan gejala yang dialami ikan kerapu Anda? Yuk, temukan penyakit yang mungkin mengancam dengan layanan ini untuk mendapatkan informasi yang Anda butuhkan untuk menjaga kesehatan ikan kerapu Anda.
            </p>
            <Button to="/layanan" buttonText="Cari Tahu Sekarang" fullWidth={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayananKami;
