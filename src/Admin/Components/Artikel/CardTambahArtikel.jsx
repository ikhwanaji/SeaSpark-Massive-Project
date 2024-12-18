import React, { useState } from 'react';
import Button from '../../Components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const CardTambahArtikel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    gambar: null,
    status: 'draft',
    published: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      gambar: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.judul || !formData.konten) {
      Swal.fire({
        icon: 'error',
        title: 'Validasi Gagal',
        text: 'Judul dan konten harus diisi',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    // Konfirmasi sebelum submit
    const confirmSubmit = await Swal.fire({
      icon: 'question',
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin ingin menyimpan artikel?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Simpan!',
      cancelButtonText: 'Batal'
    });

    if (!confirmSubmit.isConfirmed) return;

    // Buat FormData untuk mengirim file
    const formDataUpload = new FormData();
    formDataUpload.append('judul', formData.judul);
    formDataUpload.append('konten', formData.konten);
    formDataUpload.append('status', formData.status);
    
    // Tambahkan gambar jika ada
    if (formData.gambar) {
      formDataUpload.append('gambar', formData.gambar);
    }

    try {
      // Tampilkan loading
      Swal.fire({
        title: 'Sedang Menyimpan...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/artikel`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Tutup loading
      Swal.close();

      // Tampilkan success
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Artikel berhasil dibuat',
        confirmButtonColor: '#3085d6'
      });

      // Navigate ke halaman manajemen artikel
      navigate('/manajemen-artikel');
    } catch (error) {
      console.error('Error creating artikel:', error);
      
      // Tampilkan error
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan',
        text: error.response?.data?.message || 'Gagal membuat artikel',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Tambah Artikel</h2>
      <hr />
      <div className="gap-6 mt-6">
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Judul Artikel</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            required
          />
        </div>
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Konten</label>
          <textarea
            name="konten"
            value={formData.konten}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900"
            rows="5"
            required
          />
        </div>
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Gambar</label>
          <input
            type="file"
            name="gambar"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleFileChange}
            className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
          />
        </div>
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Status</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
          >
            <option value="draft">Draft</option>
            <option value="published">Publikasi</option>
          </select>
        </div>
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Tanggal Publikasi</label>
          <input
            type="date"
            name="published"
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Link to="/manajemen-artikel">
          <Button label="Kembali" type="back" />
        </Link>
        <Button 
          label="Simpan" 
          type="save" 
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default CardTambahArtikel;