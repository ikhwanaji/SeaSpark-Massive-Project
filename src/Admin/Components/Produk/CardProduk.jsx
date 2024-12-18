import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '../../Components/Button';
import Swal from 'sweetalert2';

const CardProduk = () => {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Header tabel
  const headers = ['No', 'Nama', 'Deskripsi', 'Kategori', 'Harga', 'Stok', 'Gambar', 'Aksi'];

  // Fetch produk dari backend
  const fetchProduk = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/produks`);

      // Transform data untuk disesuaikan dengan struktur tabel
      const transformedData = response.data.produk.map((item, index) => ({
        produkId: item.produkId,
        no: index + 1,
        nama: item.nama,
        deskripsi: item.deskripsi.length > 50 
          ? item.deskripsi.substring(0, 50) + '...' 
          : item.deskripsi,
        kategori: item.kategoriNama,
        harga: new Intl.NumberFormat('id-ID', { 
          style: 'currency', 
          currency: 'IDR' 
        }).format(item.harga),
        stok: item.stok,
        gambar: item.gambar
      }));

      setProduk(transformedData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching produk:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengambil Data',
        text: err.message || 'Gagal mengambil data produk',
        confirmButtonText: 'Coba Lagi',
        showCancelButton: true,
        cancelButtonText: 'Tutup'
      }).then((result) => {
        if (result.isConfirmed) {
          fetchProduk();
        }
      });
      setLoading(false);
    }
  };

  // Hapus produk dengan SweetAlert
  const handleHapusProduk = async (produkId) => {
    try {
      // Konfirmasi hapus dengan SweetAlert
      const result = await Swal.fire({
        title: 'Konfirmasi Hapus',
        text: 'Apakah Anda yakin ingin menghapus produk ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      });

      // Jika dikonfirmasi
      if (result.isConfirmed) {
        // Proses penghapusan
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/produks/${produkId}`);
        
        // Tampilkan notifikasi sukses
        Swal.fire({
          icon: 'success',
          title: 'Produk Berhasil Dihapus',
          showConfirmButton: false,
          timer: 1500
        });

        // Refresh data
        fetchProduk();
      }
    } catch (err) {
      console.error('Gagal menghapus produk:', err);
      
      // Tampilkan error dengan SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menghapus Produk',
        text: err.response?.data?.message || 'Gagal menghapus produk',
        confirmButtonText: 'Tutup'
      });
    }
  };

  // Render gambar
  const renderGambar = (gambar) => {
    const imageUrl = gambar 
      ? `${import.meta.env.VITE_BACKEND_URL}/produks/images/${gambar}`
      : '/default-produk.jpg';

    return (
      <div 
        className="flex items-center justify-center cursor-pointer"
        onClick={() => {
          Swal.fire({
            imageUrl: imageUrl,
            imageAlt: 'Gambar Produk',
            showConfirmButton: false,
            width: '80%',
            padding: '0',
            background: 'transparent',
          });
        }}
      >
        <img
          src={imageUrl}
          alt="Gambar Produk"
          className="w-20 h-20 object-cover rounded"
          onError={(e) => {
            e.target.src = '/default-produk.jpg';
          }}
        />
      </div>
    );
  };

  // Ambil data saat komponen dimuat
  useEffect(() => {
    fetchProduk();
  }, []);

  // Tampilan loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Manajemen Produk</h2>
      <hr />

      {/* Tombol Tambah Produk */}
      <div className="flex justify-between items-center mb-4 mt-6">
        <Link to="/tambah-produk">
          <Button label="Tambah Produk" type="add" />
        </Link>
      </div>

      {/* Tampilkan pesan jika tidak ada produk */}
      {!loading && produk.length === 0 && (
        <div className="text-center text-gray-500 py-4">Tidak ada produk ditemukan</div>
      )}

      {/* Tampilkan tabel jika ada produk */}
      {produk.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-sky-200">
                {headers.map((header, index) => (
                  <th key={index} className="border border-sky-900 p-2 text-sky-900 text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {produk.map((item) => (
                <tr key={item.produkId} className="hover:bg-sky-50">
                  <td className="border border-sky-900 p-2 text-center">{item.no}</td>
                  <td className="border border-sky-900 p-2">{item.nama}</td>
                  <td className="border border-sky-900 p-2">{item.deskripsi}</td>
                  <td className="border border-sky-900 p-2">{item.kategori}</td>
                  <td className="border border-sky-900 p-2 text-right">{item.harga}</td>
                  <td className="border border-sky-900 p-2 text-center">{item.stok}</td>
                  <td className="border border-sky-900 p-2">{renderGambar(item.gambar)}</td>
                  <td className="border border-sky-900 p-2">
                  <div className="flex flex-row gap-2 justify-center">
                      <Link to={`/edit-produk/${item.produkId}`}>
                        <Button label="Edit" type="edit" />
                      </Link>
                      <Button 
                        label="Hapus" 
                        type="delete" 
                        onClick={() => handleHapusProduk(item.produkId)} 
                      />
                    </div>
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

export default CardProduk;