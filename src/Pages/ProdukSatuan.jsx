import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
// Komponen
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProdukContainer from '../Components/ProdukContainer';
import KategoriProduct from '../Components/KategoriProduct';
import { useAuth } from '../context/AuthContext';

// Data
import { INFO_LINKS, KATEGORI_PRODUK } from '../utils/constants';

function ProdukSatuan() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth(); 

  // State Management
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Handlers
  const handleBeli = (produk) => {
    navigate('/pemesanan', { state: { produk } });
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategories((prevCategories) => (prevCategories.includes(categoryName) ? prevCategories.filter((cat) => cat !== categoryName) : [...prevCategories, categoryName]));
  };

  // Render Categories
  const categories = KATEGORI_PRODUK.map((kategori) => ({
    ...kategori,
    onSelect: handleCategorySelect,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar
        buttonName={isLoggedIn ? "Keluar" : "Masuk"}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout}
      />

      {/* Konten Utama */}
      <main className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-6 mt-6">Pemesanan Satuan</h1>

        {/* Pencarian */}
        <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="flex gap-14">
          {/* Kategori */}
          <div className="w-1/6 sticky top-4">
            <KategoriProduct categories={categories} />
          </div>

          {/* Daftar Produk */}
          <div className="w-4/5 bg-white p-6 rounded-lg shadow-sm">
            <ProdukContainer 
              onBeli={handleBeli} 
              searchTerm={searchTerm}
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer infoLinks={INFO_LINKS} isUserPage={true} />
    </div>
  );
}

// Komponen Pencarian
const SearchInput = ({ searchTerm, onSearchChange }) => (
  <div className="mb-4 relative">
    <input 
      type="text" 
      placeholder="Cari produk..." 
      value={searchTerm} 
      onChange={(e) => onSearchChange(e.target.value)} 
      className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
    />
    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
);

export default ProdukSatuan;