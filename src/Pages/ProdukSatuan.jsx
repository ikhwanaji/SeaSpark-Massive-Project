import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
// Komponen
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProdukContainer from '../Components/ProdukContainer';
import KategoriProduct from '../Components/KategoriProduct';
import { useAuth } from '../context/AuthContext';

// Data
import { INFO_LINKS } from '../utils/constants';

function ProdukSatuan() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  // State Management
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Handlers
  const handleBeli = (produk) => {
    navigate('/produk/produk-satuan/pemesanan', { state: { produk } });
  };

  // Handler untuk memilih kategori
  const handleCategorySelect = (categoryName) => {
    setSelectedCategories((prevCategories) => (prevCategories.includes(categoryName) ? prevCategories.filter((cat) => cat !== categoryName) : [...prevCategories, categoryName]));
  };

  // Reset kategori yang dipilih
  const handleResetCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />

      {/* Konten Utama */}
      <main className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-6 mt-6">Pemesanan Satuan</h1>

        {/* Pencarian */}
        <div className="mb-6 relative">
          <input type="text" placeholder="Cari produk..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Kategori */}
          <div className="w-full lg:w-1/4">
            <KategoriProduct onCategorySelect={handleCategorySelect} selectedCategories={selectedCategories} onResetCategories={handleResetCategories} />
          </div>

          {/* Daftar Produk */}
          <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-sm">
            <ProdukContainer onBeli={handleBeli} searchTerm={searchTerm} selectedCategories={selectedCategories} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer infoLinks={INFO_LINKS} isUserPage={true} />
    </div>
  );
}

export default ProdukSatuan;
