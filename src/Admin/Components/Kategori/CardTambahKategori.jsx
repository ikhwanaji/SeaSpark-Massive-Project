import React, { useState } from 'react';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const CardTambahKategori = () => {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi input
    if (!nama.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nama kategori tidak boleh kosong!'
      });
      return;
    }

    try {
      // Kirim data ke backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/kategoris`, {
        nama: nama.trim(),
        deskripsi: deskripsi.trim()
      });
      
      // Tampilkan success message
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Kategori berhasil ditambahkan',
        showConfirmButton: false,
        timer: 1500
      });
      
      // Redirect ke halaman daftar kategori
      navigate('/kategori-produk');
    } catch (error) {
      // Tangani error
      const errorMessage = error.response?.data?.message || 'Gagal menambahkan kategori';
      
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: errorMessage
      });
      
      console.error('Error creating kategori:', error);
      setError(errorMessage);
    }
  };

  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Tambah Kategori Produk</h2>
      <hr />
      
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-sky-900 font-semibold mb-2">Nama Kategori</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            placeholder="Masukkan nama kategori"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-sky-900 font-semibold mb-2">Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900 min-h-[120px]"
            placeholder="Masukkan deskripsi kategori"
            rows="5"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Link to="/kategori-produk">
            <Button label="Kembali" type="back" />
          </Link>
          <Button 
            label="Simpan" 
            type="save" 
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default CardTambahKategori;