import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KategoriProduct = ({ onCategorySelect, selectedCategories }) => {
  const [kategoris, setKategoris] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch kategoris
  const fetchKategoris = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/kategoris`);
      setKategoris(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Gagal memuat kategori');
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchKategoris();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 w-full max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Daftar Kategori</h1>

      {/* List Kategori */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
        <ul className="divide-y divide-gray-200 w-full">
          {kategoris.map((kategori) => (
            <li 
              key={kategori.kategoriId} 
              className={`
                px-6 py-4 
                transition-colors 
                w-full 
                cursor-pointer 
                ${selectedCategories.includes(kategori.nama) 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-50'}
              `}
              onClick={() => onCategorySelect(kategori.nama)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex-1 min-w-0 w-full pr-4">
                  <p className="text-sm font-medium text-gray-900 break-words w-full">
                    {kategori.nama}
                  </p>
                  {kategori.deskripsi && (
                    <p className="text-sm text-gray-500 break-words w-full">
                      {kategori.deskripsi}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0 ml-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {kategori.count || 0} 
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Tampilan jika tidak ada kategori */}
        {kategoris.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada kategori tersedia</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KategoriProduct;