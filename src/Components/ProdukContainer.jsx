import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ProdukList from './ProdukList';

const ProdukContainer = ({ onBeli, searchTerm = '', selectedCategories = [] }) => {
  const [produks, setProduks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/produks`);
        setProduks(response.data.produk);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduks();
  }, []);

  // Memoized filtering
  const filteredProduks = useMemo(() => {
    return produks.filter((produk) => {
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(produk.kategoriNama);
      const matchSearch = produk.nama.toLowerCase().includes(searchTerm.toLowerCase()) || produk.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [produks, selectedCategories, searchTerm]);

  // Function to handle adding to cart
  const handleTambahKeranjang = (produk) => {
    console.log("Produk ditambahkan ke keranjang:", produk);
    // Add logic to handle adding to cart
  };

  // Function to update cart count
  const updateCartCount = () => {
    console.log("Keranjang diperbarui");
    // Add logic to update cart count
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (filteredProduks.length === 0) {
    return <div className="text-center text-gray-500">Tidak ada produk yang ditemukan</div>;
  }

  return (
    <div className="flex flex-wrap -mx-4">
      {filteredProduks.map((produk) => (
        <ProdukList
          key={produk.produkId}
          produkId={produk.produkId}
          kategori={produk.kategoriNama}
          nama={produk.nama}
          harga={produk.harga}
          gambar={`${import.meta.env.VITE_API_URL}/api/produks/images/${produk.gambar}`}
          deskripsi={produk.deskripsi}
          stok={produk.stok}
          onBeli={onBeli}
          onTambahKeranjang={handleTambahKeranjang} // Pass the function
          updateCartCount={updateCartCount} // Pass the function
        />
      ))}
    </div>
  );
};

export default ProdukContainer;