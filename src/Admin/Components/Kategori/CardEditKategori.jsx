import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardEditKategori = () => {
  const [nama, setNama] = useState(''); // Inisialisasi dengan string kosong
  const [deskripsi, setDeskripsi] = useState(''); // Inisialisasi dengan string kosong
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state loading
  const { kategoriId } = useParams();
  const navigate = useNavigate();

  // Fetch kategori details when component mounts
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/kategoris/${kategoriId}`);
        const { nama, deskripsi } = response.data;
        
        // Pastikan nama dan deskripsi selalu string
        setNama(nama || '');
        setDeskripsi(deskripsi || '');
      } catch (error) {
        setError('Gagal mengambil data kategori');
        console.error('Error fetching kategori:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKategori();
  }, [kategoriId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/kategoris/${kategoriId}`, {
        nama: nama || '', // Pastikan tidak null
        deskripsi: deskripsi || '' // Pastikan tidak null
      });
      
      // Redirect back to kategori list after successful update
      navigate('/kategori-produk');
    } catch (error) {
      setError('Gagal mengupdate kategori');
      console.error('Error updating kategori:', error);
    }
  };

  // Tampilkan loading jika sedang mengambil data
  if (isLoading) {
    return (
      <div className="border rounded-md p-6 bg-white shadow-lg">
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Edit Kategori Produk</h2>
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
            value={nama || ''} // Tambahkan fallback ke string kosong
            onChange={(e) => setNama(e.target.value)}
            className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-sky-900 font-semibold mb-2">Deskripsi</label>
          <textarea
            value={deskripsi || ''} // Tambahkan fallback ke string kosong
            onChange={(e) => setDeskripsi(e.target.value)}
            className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900 min-h-[120px]"
            rows="5"
            required
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

export default CardEditKategori;