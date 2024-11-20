import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUserCheck, FiSearch } from 'react-icons/fi';

// Komponen
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProdukList from '../Components/ProdukList';
import KategoriProduct from '../Components/KategoriProduct';

// Data
import { NAVIGATION_LINKS, INFO_LINKS, PRODUK_DATA, KATEGORI_PRODUK } from '../utils/constants';

function ProdukSatuan() {
  const navigate = useNavigate();

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

  // Memoized Filter
  const filteredProduk = useMemo(() => {
    return PRODUK_DATA.filter((produk) => {
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(produk.kategori);

      const matchSearch = produk.nama.toLowerCase().includes(searchTerm.toLowerCase()) || produk.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategories, searchTerm]);

  // Render Categories
  const categories = KATEGORI_PRODUK.map((kategori) => ({
    ...kategori,
    count: PRODUK_DATA.filter((p) => p.kategori === kategori.name).length,
    onSelect: handleCategorySelect,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar
        navigation={NAVIGATION_LINKS}
        buttonName="Profil User"
        useIcon={true}
        icon={<FiUserCheck size={24} />}
        backgroundColor="bg-white"
        textColor="text-black-500"
        hoverColor="hover:text-blue-500"
        buttonColor="bg-blue-500"
        buttonHoverColor="bg-blue-700"
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
            <ProdukSection produk={filteredProduk} onBeli={handleBeli} />
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
    <input type="text" placeholder="Cari produk..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
);

// Komponen Daftar Produk
const ProdukSection = ({ produk, onBeli }) => {
  if (produk.length === 0) {
    return <div className="text-center text-gray-500">Tidak ada produk yang ditemukan</div>;
  }

  return (
    <div className="flex flex-wrap -mx-4">
      {produk.map((item) => (
        <ProdukList key={item.id} {...item} onBeli={onBeli} />
      ))}
    </div>
  );
};

export default ProdukSatuan;
