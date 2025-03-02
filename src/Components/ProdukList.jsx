import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoCartOutline } from 'react-icons/io5';
import { RiShoppingBag4Line } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProdukList = ({ produkId, kategori, nama, harga, gambar, deskripsi, stok, onBeli }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleTambahKeranjang = () => {
    const product = { produkId, kategori, nama, harga, gambar, stok };
    console.log('Produk yang ditambahkan:', product); // Debugging

    addToCart({ produkId, kategori, nama, harga, gambar, stok });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
        <img src={gambar} alt={nama} className="w-full h-48 object-cover mb-4 rounded-lg" />
        <div className="text-center flex-grow">
          <h3 className="text-gray-500 text-sm mb-2">{kategori}</h3>
          <h2 className="text-lg font-semibold mb-2">{nama}</h2>
        </div>
        <div className="mt-auto">
          <p className="text-blue-500 text-lg font-semibold mb-4 text-center">Rp {harga.toLocaleString()}</p>
          <div className="flex gap-2">
            <motion.button
              onClick={handleTambahKeranjang}
              className="group bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out w-1/2 flex items-center justify-center gap-2"
              animate={{ scale: isAdded ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <IoCartOutline className="text-lg" />
              <span className="w-0 overflow-hidden group-hover:w-auto group-hover:overflow-visible transition-all duration-300">Cart</span>
            </motion.button>
            <button
              onClick={() => onBeli({ produkId, kategori, nama, harga, gambar, deskripsi, stok })}
              className="group bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out w-1/2 flex items-center justify-center gap-2"
            >
              <RiShoppingBag4Line className="text-xl" />
              <span className="w-0 overflow-hidden group-hover:w-auto group-hover:overflow-visible transition-all duration-300">Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProdukList.propTypes = {
  produkId: PropTypes.number.isRequired,
  kategori: PropTypes.string.isRequired,
  nama: PropTypes.string.isRequired,
  harga: PropTypes.number.isRequired,
  gambar: PropTypes.string.isRequired,
  deskripsi: PropTypes.string,
  stok: PropTypes.number,
  onBeli: PropTypes.func.isRequired,
};

export default ProdukList;
