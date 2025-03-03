import React, { useState } from 'react';
import Button from '../Components/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import artikelImg from '../Assets/img/artikelimg.png';
import artikelImg2 from '../Assets/img/artikelimg2.png';
import artikelImg3 from '../Assets/img/artikelimg3.png';
import artikelImg4 from '../Assets/img/artikelimg4.png';
import artikelImg5 from '../Assets/img/artikelimg5.png';

const LayananKami = ({ to }) => {
  const images = [artikelImg, artikelImg2, artikelImg3, artikelImg4, artikelImg5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="bg-blue-50 flex items-center justify-center min-h-screen py-10">
      <div className="text-center w-full px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">Layanan Kami</h2>
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Section 1 */}
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-sky-500 font-bold text-xl md:text-2xl mb-2 text-left">Ketahui Penyakit Yang Menyerang Ikan Kerapu Anda!</h2>
            <p className="text-gray-700 text-justify">
              Tidak sadar dan tidak tahu penyakit yang menyerang ikan kerapu kesayangan Anda, membuat usaha budidaya Anda hancur. Yuk, ketahui penyakit-penyakit apa saja yang sering menyerang ikan kerapu.
            </p>
            <div className="flex justify-left w-full">
              <Button to="/layanan2" buttonText="Ketahui Sekarang" fullWidth={true} />
            </div>
          </div>

          {/* Section 2 (Image Carousel) */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-lg">
              <img src={images[currentImageIndex]} alt="Layanan Ikan Kerapu" className="w-full h-auto transition-all duration-500 ease-in-out" />
              {/* Tombol Prev */}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 
                  bg-white/50 rounded-full p-2 opacity-0 group-hover:opacity-100 
                  transition-all duration-300 ease-in-out"
              >
                <FaChevronLeft className="text-sky-500 text-xl" />
              </button>

              {/* Tombol Next */}
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 
                  bg-white/50 rounded-full p-2 opacity-0 group-hover:opacity-100 
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

          {/* Section 3 */}
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-sky-500 font-bold text-xl md:text-2xl mb-2 text-left">
              Kenali Penyakit <br /> Ikan Kerapu Anda!
            </h2>
            <p className="text-gray-700 text-justify">
              Merasa bingung dengan gejala yang dialami ikan kerapu Anda? Yuk, temukan penyakit yang mungkin mengancam dengan layanan ini untuk mendapatkan informasi yang Anda butuhkan untuk menjaga kesehatan ikan kerapu Anda.
            </p>
            <div className="flex justify-left w-full">
              <Button to="/layanan" buttonText="Kenali Sekarang" fullWidth={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayananKami;
