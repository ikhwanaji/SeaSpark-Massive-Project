import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';

const gambarTim = [
  '/Assets/img/anis.jpg',
  '/Assets/img/florr.jpg',
  '/Assets/img/inexx.jpg',
  '/Assets/img/iwan.jpg',
  '/Assets/img/syaa.jpg',
  '/Assets/img/fadli.jpg',
];

const TimKami = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Interval untuk berganti gambar setiap 5 detik
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gambarTim.length);
    }, 5000);

    // Membersihkan interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-blue-50 py-20">
      <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start gap-10">
        <div className="relative">
          <img key={currentImageIndex} src={gambarTim[currentImageIndex]} alt="Tim Member" className="rounded-full h-80 w-80 object-cover transition-all duration-700 ease-in-out transform hover:scale-105" />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tim Kami</h2>
          <p className="text-gray-600 text-lg mb-6 text-justify">
            Kami adalah Tim pengembang yang berkomitmen untuk menciptakan pengalaman terbaik bagi pengguna DoKer. Kami berupaya keras menghadirkan platform yang tidak hanya mudah diakses, tetapi juga memberikan manfaat yang maksimal, guna
            membantu Anda dalam mengatasi berbagai masalah penyakit yang sering dialami ikan kerapu.
          </p>
          <Button buttonText="Kenali Tim Kami" to="/tentang-kami" position="left" />
        </div>
      </div>

      {/* Indikator navigasi */}
      {/* <div className="flex justify-center mt-6">
        {gambarTim.map((_, index) => (
          <button key={index} onClick={() => setCurrentImageIndex(index)} className={`h-3 w-3 mx-2 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`} />
        ))}
      </div> */}
    </div>
  );
};

export default TimKami;
