import React from 'react';
import Button from '../Components/Button';

const TimKami = () => {
  return (
    <div className="bg-blue-50 py-20">
      <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start gap-10">
        <img src="/src/Assets/img/timkami.jpg" alt="Tim Member" className="rounded-full h-80 w-80 object-cover" />

        {/* Text Section */}
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tim Kami</h2>
          <p className="text-gray-600 text-lg mb-6">
            Kami adalah Tim pengembang yang berkomitmen untuk menciptakan pengalaman terbaik bagi pengguna DoKer. Kami berupaya keras menghadirkan platform yang tidak hanya mudah diakses, tetapi juga memberikan manfaat yang maksimal, guna
            membantu Anda dalam mengatasi berbagai masalah penyakit yang sering dialami ikan kerapu.
          </p>
          <Button buttonText="Kenali Tim Kami" to="/tentang-kami" position='left' />
        </div>
      </div>
    </div>
  );
};

export default TimKami;
