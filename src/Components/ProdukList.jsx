import React from 'react';
import PropTypes from 'prop-types';

const ProdukList = ({ kategori, nama, harga, gambar,deskripsi,stok, onBeli }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-4">
      {' '}
      <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
        <img src={gambar} alt={nama} className="w-full h-48 object-cover mb-4 rounded-lg" />
        <div className="text-center flex-grow">
          <h3 className="text-gray-500 text-sm mb-2">{kategori}</h3>
          <h2 className="text-lg font-semibold mb-2">{nama}</h2>
        </div>
        <div className="mt-auto">
          <p className="text-blue-500 text-lg font-semibold mb-4 text-center">Rp {harga.toLocaleString()}</p>
          <button onClick={() => onBeli({ kategori, nama, harga, gambar ,deskripsi, stok })} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out w-full">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

ProdukList.propTypes = {
  kategori: PropTypes.string.isRequired,
  nama: PropTypes.string.isRequired,
  harga: PropTypes.number.isRequired,
  gambar: PropTypes.string.isRequired,
  onBeli: PropTypes.func.isRequired,
};

export default ProdukList;
