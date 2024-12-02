import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const CardKategori = () => {
  const [kategoris, setKategoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data kategori dari API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/kategori`); // Tanpa autentikasi
        setKategoris(response.data.data); // Ambil data dari response
        setLoading(false); // Hentikan loading
      } catch (err) {
        setError(err.message || 'Gagal memuat kategori');
        setLoading(false); // Hentikan loading meskipun ada error
      }
    };

    fetchCategories();
  }, []);

  // Render loading
  if (loading) return <div>Memuat data...</div>;

  // Render error
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">
        Kategori Produk
      </h2>
      <hr />
      <div className="flex justify-between items-center mb-4 mt-6">
        <Link to="/tambah-kategori">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Tambah Kategori
          </button>
        </Link>
      </div>
      {kategoris.length === 0 ? (
        <div>Tidak ada data kategori</div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-sky-200">
                <th className="border border-sky-900 p-2 text-sky-900 text-center">No</th>
                <th className="border border-sky-900 p-2 text-sky-900 text-center">Nama</th>
                <th className="border border-sky-900 p-2 text-sky-900 text-center">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {kategoris.map((kategori, index) => (
                <tr key={kategori.kategoriId}>
                  <td className="text-center border border-sky-900 p-2 text-sky-900">{index + 1}</td>
                  <td className="border border-sky-900 p-2 text-sky-900">{kategori.nama}</td>
                  <td className="border border-sky-900 p-2 text-sky-900">{kategori.deskripsi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CardKategori;
