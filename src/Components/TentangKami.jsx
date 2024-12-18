import React from 'react';
import Button from '../Components/Button';

const TentangKami = () => {
  const teamMembers = [
    { name: 'Noudia Inex Pasiakan', img: '/src/Assets/img/inexx.jpg' },
    { name: 'Ikhwan Aji Pratama', img: '/src/Assets/img/iwan.jpg' },
    { name: 'Celestina Florecita Mariwy', img: '/src/Assets/img/florr.jpg' },
    { name: 'Anis Putri Purwanti', img: '/src/Assets/img/anis.jpg' },
    { name: 'Ahmad Fadli', img: '/src/Assets/img/fadli.jpg' },
    { name: 'Nur Syahidah', img: '/src/Assets/img/syaa.jpg' },
  ];

  return (
    <div className="w-full min-h-screen bg-blue-50 p-12 mt-14">
      {/* DoKer Section */}
      <div className="mx-auto w-4/5 sm:w-2/3 text-center mb-24 flex flex-col sm:flex-row items-center justify-center sm:space-x-8">
        <img src="/src/Assets/img/seaspark.jpg" alt="Underwater scene" className="w-full sm:w-full h-[500px] object-cover rounded-lg shadow-md" />
        <div className="mt-4 sm:mt-0 text-left">
          <h1 className="text-blue-500 text-4xl font-bold">DoKer</h1>
          <p className="text-gray-700 mt-4 text-lg text-justify">
            Website DoKer adalah platform inovatif yang dirancang khusus untuk membantu para peternak ikan kerapu dalam menangani berbagai penyakit yang dapat mengancam kesehatan ikan mereka. Dengan menawarkan berbagai alat, bahan, dan
            panduan lengkap, DoKer memudahkan peternak untuk mengobati penyakit ikan kerapu secara efektif. Kami menyediakan informasi terkini terkait penyakit ikan kerapu, serta produk berkualitas yang dibutuhkan untuk menjaga
            keberlangsungan usaha peternakan ikan kerapu. Dengan DoKer, peternak dapat meningkatkan hasil panen dan memastikan kesejahteraan ikan secara optimal.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center">
        <h2 className="text-4xl text-blue-500 font-bold mb-6">Tim Kami</h2>
        {/* Adjusted width here */}
        <div className="mx-auto w-4/5 sm:w-2/3 grid grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center py-8">
              <img src={member.img} alt={member.name} className="rounded-full h-60 w-60 object-cover mx-auto" />
              <p className="text-gray-700 text-lg font-semibold mt-4">{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-8">
        <Button buttonText="Kembali ke Beranda" to="/" position="center" />
      </div>
    </div>
  );
};

export default TentangKami;
