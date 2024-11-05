import React from 'react';

const TimKami = () => {
  return (
    <div className="bg-blue-50 py-20">
      <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start gap-10">
        {/* Image with size adjusted to align with text height */}
        <img src="/src/Assets/img/timkami.jpg" alt="Team Member" className="rounded-full h-80 w-80 object-cover" />
        
        {/* Text Section */}
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tim Kami</h2>
          <p className="text-gray-600 text-lg mb-6">
          Kami adalah tim pengembang yang berkomitmen untuk menciptakan pengalaman terbaik bagi pengguna DoKer. Kami berupaya keras menghadirkan platform yang tidak hanya mudah diakses, tetapi juga memberikan manfaat yang maksimal, guna membantu Anda dalam mengatasi berbagai masalah penyakit yang sering dialami ikan kerapu.
          </p>
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
            Kenali Tim Kami
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimKami;
