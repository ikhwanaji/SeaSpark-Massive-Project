import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from '../../Components/Button';
import Swal from 'sweetalert2'; // Pastikan sudah install sweetalert2

const CardKategori = () => {
  const [kategoris, setKategoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data kategori dari API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/kategoris`);
      
      // Tambahkan pengecekan struktur response
      const kategoriData = response.data.data || response.data || [];
      
      setKategoris(kategoriData);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Gagal memuat kategori');
      setLoading(false);
      console.error(err); // Log error untuk debugging
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fungsi hapus kategori
  const handleDeleteKategori = async (kategoriId) => {
    // Tampilkan konfirmasi sebelum menghapus
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda tidak akan dapat mengembalikan data ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    // Jika user mengkonfirmasi
    if (result.isConfirmed) {
      try {
        // Kirim request hapus ke backend
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/kategoris/${kategoriId}`);
        
        // Refresh daftar kategori setelah hapus
        fetchCategories();

        // Tampilkan notifikasi berhasil
        Swal.fire(
          'Terhapus!',
          'Kategori berhasil dihapus.',
          'success'
        );
      } catch (error) {
        // Tangani error
        Swal.fire(
          'Gagal!',
          error.response?.data?.message || 'Gagal menghapus kategori',
          'error'
        );
        console.error('Error deleting kategori:', error);
      }
    }
  };

  // Render loading
  if (loading) return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
    </div>
  );

  // Render error
  if (error) return (
    <div className="text-red-500 bg-red-100 p-4 rounded">
      Error: {error}
    </div>
  );

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
      
      {/* Tambahkan pengecekan array sebelum rendering */}
      {!Array.isArray(kategoris) || kategoris.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          Tidak ada data kategori
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-sky-200">
                <th className="border border-sky-900 p-2 text-sky-900 text-center">No</th>
                <th className="border border-sky-900 p-2 text-sky-900 text-center">Nama</th>
                <th className="border border-sky-900 p-2 text-sky-900 text-center">Deskripsi</th>
                <th className="border border-sky-900 p-2 text-sky-900 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kategoris.map((kategori, index) => (
                <tr key={kategori.kategoriId || index}>
                  <td className="text-center border border-sky-900 p-2 text-sky-900">{index + 1}</td>
                  <td className="border border-sky-900 p-2 text-sky-900">{kategori.nama}</td>
                  <td className="border border-sky-900 p-2 text-sky-900">{kategori.deskripsi}</td>
                  <td className="border border-sky-900 p-2 text-sky-900 flex justify-center space-x-2">
                    <Link to={`/edit-kategori/${kategori.kategoriId}`}>
                      <Button label="Edit" type="edit">
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      label="Hapus" 
                      type="delete"
                      onClick={() => handleDeleteKategori(kategori.kategoriId)}
                    >
                      Hapus
                    </Button>
                  </td>
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