import React, { useState, useEffect } from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const CardPaket = () => {
  const [pakets, setPakets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data paket
  const fetchPakets = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/paket`);
      setPakets(response.data);
      setLoading(false);
    } catch (err) {
      setError("Gagal mengambil data paket");
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus paket
  const handleDeletePaket = async (paketId) => {
    // Tampilkan konfirmasi SweetAlert
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda tidak akan dapat mengembalikan paket ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/paket/${paketId}`);
          // Refresh data setelah menghapus
          fetchPakets();
          
          // Tampilkan pesan berhasil
          Swal.fire(
            'Dihapus!',
            'Paket telah berhasil dihapus.',
            'success'
          );
        } catch (err) {
          // Tampilkan pesan error
          Swal.fire(
            'Gagal!',
            'Tidak dapat menghapus paket.',
            'error'
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchPakets();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-500 mt-10">
      {error}
    </div>
  );

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">
        Manajemen Paket
      </h2>
      <hr />
      <div className="flex justify-between items-center mb-4 mt-6">
        <Link to="/tambah-paket">
          <Button label="Tambah Paket" type="add" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">No.</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Deskripsi</th>
              <th className="border p-2">Harga</th>
              <th className="border p-2">Gambar</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pakets.map((paket, index) => (
              <tr key={paket.paketId} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{paket.title}</td>
                <td className="border p-2">{paket.items.replace(/[\[\]"]/g, '').split(',').join(', ')}</td>
                <td className="border p-2">Rp {paket.harga.toLocaleString()}</td>
                <td className="border p-2">
                  {paket.gambar ? (
                    <img 
                      src={`${import.meta.env.VITE_BACKEND_URL}/paket/images/${paket.gambar}`} 
                      alt={paket.title} 
                      className="w-20 h-20 object-cover mx-auto"
                    />
                  ) : (
                    "Tidak ada gambar"
                  )}
                </td>
                <td className="border p-2">
                  <div className="flex flex-row gap-2 justify-center">
                    <Link to={`/edit-paket/${paket.paketId}`}>
                      <Button label="Edit" type="edit" />
                    </Link>
                    <Button 
                      label="Hapus" 
                      type="delete" 
                      onClick={() => handleDeletePaket(paket.paketId)} 
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardPaket;