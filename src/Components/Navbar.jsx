import React from 'react';

function Navbar() {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="w-12 h-12" />
        <span className="text-xl font-bold text-blue-500 ml-2">DOOKER.COM</span>
      </div>
      <div className="flex space-x-4">
        <button className="text-sm font-medium text-black-500 hover:text-blue-500">Beranda</button>
        <button className="text-sm font-medium text-black-500 hover:text-blue-500">Layanan</button>
        <button className="text-sm font-medium text-black-500 hover:text-blue-500">Ulasan</button>
        <button className="text-sm font-medium text-black-500 hover:text-blue-500">Tentang Kami</button>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Masuk</button>
    </div>
  );
}

export default Navbar;
