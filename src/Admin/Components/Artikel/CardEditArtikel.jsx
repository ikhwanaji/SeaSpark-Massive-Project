import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardEditPenyakit = () => {
  const { penyakitId } = useParams();
  const navigate = useNavigate();

  // State untuk form - sesuai dengan struktur backend
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
    preview: null,
  });

  // State untuk error handling
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ambil data penyakit yang akan diedit
  useEffect(() => {
    const fetchPenyakitDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/penyakit/getById/${penyakitId}`);
        const penyakit = response.data;

        // Set form data sesuai dengan struktur backend
        setFormData({
          nama: penyakit.nama || '',
          kategori: penyakit.kategori || '',
          deskripsi: penyakit.deskripsi || '',
          penyebab: penyakit.penyebab || '',
          gejala: penyakit.gejala || '',
          pencegahan: penyakit.pencegahan || '',
          pengobatan: penyakit.pengobatan || '',
          referensi: penyakit.referensi || '',
          info_tambahan: penyakit.info_tambahan || '',
          gambar: penyakit.gambar || null,
          preview: penyakit.gambar ? `${import.meta.env.VITE_BACKEND_URL}/penyakit/images/${penyakit.gambar}` : null,
        });
        setLoading(false);
      } catch (err) {
        console.error('Gagal mengambil detail penyakit:', err);
        setError('Gagal memuat data penyakit');
        setLoading(false);
      }
    };

    if (penyakitId) {
      fetchPenyakitDetail();
    }
  }, [penyakitId]);

  // Handler perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler upload gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('Tipe file tidak didukung. Gunakan JPEG, JPG, atau PNG.');
        return;
      }

      // Validasi ukuran file (maksimal 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file terlalu besar. Maksimal 5MB.');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        gambar: file,
        preview: URL.createObjectURL(file),
      }));
      setError(null);
    }
  };

  // Handler submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validasi form
      if (!formData.nama.trim()) {
        setError('Nama penyakit harus diisi');
        setLoading(false);
        return;
      }

      // Buat form data sesuai dengan struktur backend
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('nama', formData.nama);
      formDataToSubmit.append('kategori', formData.kategori);
      formDataToSubmit.append('deskripsi', formData.deskripsi);
      formDataToSubmit.append('penyebab', formData.penyebab);
      formDataToSubmit.append('gejala', formData.gejala);
      formDataToSubmit.append('pencegahan', formData.pencegahan);
      formDataToSubmit.append('pengobatan', formData.pengobatan);
      formDataToSubmit.append('referensi', formData.referensi);
      formDataToSubmit.append('info_tambahan', formData.info_tambahan);

      // Tambahkan gambar jika ada file baru
      if (formData.gambar instanceof File) {
        formDataToSubmit.append('gambar', formData.gambar);
      }

      // Kirim data ke endpoint yang benar
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/penyakit/put/${penyakitId}`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Navigasi kembali setelah berhasil
      navigate('/manajemen-penyakit');
    } catch (err) {
      console.error('Gagal update penyakit:', err);
      setError(err.response?.data?.error || 'Gagal memperbarui penyakit');
      setLoading(false);
    }
  };

  // Tampilan loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Edit Penyakit</h2>
      <hr />

      {/* Tampilkan pesan error */}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="gap-6 mt-6">
        {/* Nama Penyakit */}
        <div className="mb-4">
          <label className="block text-sky-900 font-semibold mb-2">Nama Penyakit *</label>
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="p-2 border rounded-md w-full shadow-md border-sky-900" required placeholder="Masukkan nama penyakit" />
        </div>

        {/* Kategori */}
        <div className="mb-4">
          <label className="block text-sky-900 font-semibold mb-2">Kategori</label>
          <input type="text" name="kategori" value={formData.kategori} onChange={handleChange} className="p-2 border rounded-md w-full shadow-md border-sky-900" placeholder="Masukkan kategori penyakit" />
        </div>

        {/* Deskripsi */}
        <div className="mb-4">
          <label className="block text-sky-900 font-semibold mb-2">Deskripsi</label>
          <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} className="p-3 border rounded-md w-full shadow-md border-sky-900" rows="4" placeholder="Deskripsi singkat tentang penyakit" />
        </div>

        {/* Penyebab */}
        <div className="mb-4">
          <label className="block text-sky-900 font-semibold mb-2">Penyebab</label>
          <textarea name="penyebab" value={formData.penyebab} onChange={handleChange} className="p-3 border rounded-md w-full shadow-md border-sky-900" rows="3" placeholder="Penyebab dari penyakit ini" />
        </div>

        {/* Gejala */}
        <div className="mb-4">
          <label className="block text-sky-900 font-semibold mb-2">Gejala</label>
          <textarea name="gejala" value={formData.gejala} onChange={handleChange} className="p-3 border rounded-md w-full shadow-md border-sky-900" rows="4" placeholder="Gejala-gejala yang muncul" />
        </div>

        {/* Pencegahan */}
        <div className="mb-4">
          <label className="block text-sky-900 font-semibold mb-2">Pencegahan</label>
          <textarea name="pencegahan" value={formData.pencegahan} onChange={handleChange} className="p-3 border rounded-md w-full shadow-md border-sky-900" rows="4" placeholder="Cara-cara pencegahan" />
        </div>

        {/* Pengobatan */}
        <div className="mb-4">
          <label className="block text-sky-900 font-semibold mb-2">Pengobatan</label>
          <textarea name="pengobatan" value={formData.pengobatan} onChange={handleChange} className="p-3 border rounded-md w-full shadow-md border-sky-900" rows="4" placeholder="Metode pengobatan" />
        </div>

        {/* Referensi */}
        <div className="mb-4">
          <label className="block text-sky-900 font-semibold mb-2">Referensi</label>
          <textarea name="referensi" value={formData.referensi} onChange={handleChange} className="p-3 border rounded-md w-full shadow-md border-sky-900" rows="3" placeholder="Sumber referensi" />
        </div>

        {/* Info Tambahan */}
        <div className="mb-4">
          <label className="block text-sky-900 font-semibold mb-2">Informasi Tambahan</label>
          <textarea name="info_tambahan" value={formData.info_tambahan} onChange={handleChange} className="p-3 border rounded-md w-full shadow-md border-sky-900" rows="3" placeholder="Informasi tambahan lainnya" />
        </div>

        {/* Gambar */}
        <div className="mb-4">
          <label className="block text-sky-900 font-semibold mb-2">Gambar</label>
          <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={handleFileChange} className="p-2 border rounded-md w-full shadow-md border-sky-900" />
          <p className="text-sm text-gray-600 mt-1">Format: JPEG, JPG, PNG. Maksimal 5MB.</p>
          {formData.preview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Preview Gambar:</p>
              <img src={formData.preview} alt="Preview Gambar" className="w-40 h-40 object-cover rounded border shadow-md" />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Link to="/manajemen-penyakit">
            <Button label="Kembali" type="back" />
          </Link>
          <Button label={loading ? 'Menyimpan...' : 'Simpan'} type="save" disabled={loading} />
        </div>
      </form>
    </div>
  );
};

export default CardEditPenyakit;
