import React, { useState } from 'react';
import Button from '../../Components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const CardTambahPenyakit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    deskripsi: '',
    penyebab: '',
    gejala: '',
    pencegahan: '',
    pengobatan: '',
    referensi: '',
    info_tambahan: '',
    gambar: null,
  });

  const [errors, setErrors] = useState({});

  // Daftar kategori penyakit
  const kategoriPenyakit = [
    'bakteri', 
    'jamur', 
    'virus', 
    'parasit', 
    'nutrisi',
    'Lainnya',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error saat user mulai mengetik
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Validasi file
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Format File Tidak Valid',
          text: 'Hanya file JPEG, JPG, dan PNG yang diperbolehkan',
          confirmButtonColor: '#3085d6',
        });
        return;
      }

      if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: 'Ukuran File Terlalu Besar',
          text: 'Ukuran file maksimal 5MB',
          confirmButtonColor: '#3085d6',
        });
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      gambar: file,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validasi field wajib
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama penyakit harus diisi';
    }

    if (!formData.kategori) {
      newErrors.kategori = 'Kategori harus dipilih';
    }

    if (!formData.deskripsi.trim()) {
      newErrors.deskripsi = 'Deskripsi harus diisi';
    }

    if (!formData.penyebab.trim()) {
      newErrors.penyebab = 'Penyebab harus diisi';
    }

    if (!formData.gejala.trim()) {
      newErrors.gejala = 'Gejala harus diisi';
    }

    if (!formData.pencegahan.trim()) {
      newErrors.pencegahan = 'Pencegahan harus diisi';
    }

    if (!formData.pengobatan.trim()) {
      newErrors.pengobatan = 'Pengobatan harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validasi Gagal',
        text: 'Mohon lengkapi semua field yang wajib diisi',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Konfirmasi sebelum submit
    const confirmSubmit = await Swal.fire({
      icon: 'question',
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin ingin menyimpan data penyakit ini?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Simpan!',
      cancelButtonText: 'Batal',
    });

    if (!confirmSubmit.isConfirmed) return;

    // Buat FormData untuk mengirim file
    const formDataUpload = new FormData();
    formDataUpload.append('nama', formData.nama);
    formDataUpload.append('kategori', formData.kategori);
    formDataUpload.append('deskripsi', formData.deskripsi);
    formDataUpload.append('penyebab', formData.penyebab);
    formDataUpload.append('gejala', formData.gejala);
    formDataUpload.append('pencegahan', formData.pencegahan);
    formDataUpload.append('pengobatan', formData.pengobatan);
    formDataUpload.append('referensi', formData.referensi);
    formDataUpload.append('info_tambahan', formData.info_tambahan);

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
        },
      });

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/penyakit/tambah-penyakit`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Tutup loading
      Swal.close();

      // Tampilkan success
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data penyakit berhasil disimpan',
        confirmButtonColor: '#3085d6',
      });

      // Navigate ke halaman manajemen penyakit
      navigate('/manajemen-penyakit');
    } catch (error) {
      console.error('Error creating penyakit:', error);

      // Tutup loading
      Swal.close();

      // Tampilkan error
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Gagal menyimpan data penyakit';

      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan',
        text: errorMessage,
        confirmButtonColor: '#3085d6',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Tambah Data Penyakit</h2>
      <hr />

      <div className="gap-6 mt-6 space-y-4">
        {/* Nama Penyakit */}
        <div>
          <label className="block text-sky-900 font-semibold mb-2">
            Nama Penyakit <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            className={`p-2 border rounded-md w-full shadow-md mb-2 ${errors.nama ? 'border-red-500' : 'border-sky-900'}`}
            placeholder="Masukkan nama penyakit"
            required
          />
          {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sky-900 font-semibold mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select name="kategori" value={formData.kategori} onChange={handleInputChange} className={`p-2 border rounded-md w-full shadow-md mb-2 ${errors.kategori ? 'border-red-500' : 'border-sky-900'}`} required>
            <option value="">Pilih Kategori</option>
            {kategoriPenyakit.map((kategori, index) => (
              <option key={index} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
          {errors.kategori && <p className="text-red-500 text-sm">{errors.kategori}</p>}
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-sky-900 font-semibold mb-2">
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full shadow-md mb-2 ${errors.deskripsi ? 'border-red-500' : 'border-sky-900'}`}
            rows="4"
            placeholder="Masukkan deskripsi penyakit"
            required
          />
          {errors.deskripsi && <p className="text-red-500 text-sm">{errors.deskripsi}</p>}
        </div>

        {/* Penyebab */}
        <div>
          <label className="block text-sky-900 font-semibold mb-2">
            Penyebab <span className="text-red-500">*</span>
          </label>
          <textarea
            name="penyebab"
            value={formData.penyebab}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full shadow-md mb-2 ${errors.penyebab ? 'border-red-500' : 'border-sky-900'}`}
            rows="3"
            placeholder="Masukkan penyebab penyakit"
            required
          />
          {errors.penyebab && <p className="text-red-500 text-sm">{errors.penyebab}</p>}
        </div>

        {/* Gejala */}
        <div>
          <label className="block text-sky-900 font-semibold mb-2">
            Gejala <span className="text-red-500">*</span>
          </label>
          <textarea
            name="gejala"
            value={formData.gejala}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full shadow-md mb-2 ${errors.gejala ? 'border-red-500' : 'border-sky-900'}`}
            rows="3"
            placeholder="Masukkan gejala-gejala penyakit"
            required
          />
          {errors.gejala && <p className="text-red-500 text-sm">{errors.gejala}</p>}
        </div>

        {/* Pencegahan */}
        <div>
          <label className="block text-sky-900 font-semibold mb-2">
            Pencegahan <span className="text-red-500">*</span>
          </label>
          <textarea
            name="pencegahan"
            value={formData.pencegahan}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full shadow-md mb-2 ${errors.pencegahan ? 'border-red-500' : 'border-sky-900'}`}
            rows="3"
            placeholder="Masukkan cara pencegahan penyakit"
            required
          />
          {errors.pencegahan && <p className="text-red-500 text-sm">{errors.pencegahan}</p>}
        </div>

        {/* Pengobatan */}
        <div>
          <label className="block text-sky-900 font-semibold mb-2">
            Pengobatan <span className="text-red-500">*</span>
          </label>
          <textarea
            name="pengobatan"
            value={formData.pengobatan}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full shadow-md mb-2 ${errors.pengobatan ? 'border-red-500' : 'border-sky-900'}`}
            rows="3"
            placeholder="Masukkan cara pengobatan penyakit"
            required
          />
          {errors.pengobatan && <p className="text-red-500 text-sm">{errors.pengobatan}</p>}
        </div>

        {/* Referensi */}
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Referensi</label>
          <textarea name="referensi" value={formData.referensi} onChange={handleInputChange} className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900" rows="2" placeholder="Masukkan sumber referensi (opsional)" />
        </div>

        {/* Info Tambahan */}
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Informasi Tambahan</label>
          <textarea name="info_tambahan" value={formData.info_tambahan} onChange={handleInputChange} className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900" rows="2" placeholder="Masukkan informasi tambahan (opsional)" />
        </div>

        {/* Gambar */}
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Gambar</label>
          <input type="file" name="gambar" accept="image/jpeg, image/png, image/jpg" onChange={handleFileChange} className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" />
          <p className="text-sm text-gray-600">Format: JPEG, JPG, PNG. Maksimal 5MB</p>
          {formData.gambar && (
            <div className="mt-2">
              <p className="text-sm text-green-600">File terpilih: {formData.gambar.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Link to="/manajemen-penyakit">
          <Button label="Kembali" type="back" />
        </Link>
        <Button label="Simpan" type="save" onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default CardTambahPenyakit;
