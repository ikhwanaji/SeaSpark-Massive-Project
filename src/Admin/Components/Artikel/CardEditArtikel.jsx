import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardEditArtikel = () => {
  const { artikelId } = useParams();
  const navigate = useNavigate();

  // State untuk form
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    status: 'Draft',
    gambar: null,
    preview: null,
  });

  // State untuk error handling
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ambil data artikel yang akan diedit
  useEffect(() => {
    const fetchArtikelDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/artikel/${artikelId}`);
        const artikel = response.data;

        // Set form data
        setFormData({
          judul: artikel.judul || '',
          konten: artikel.konten || '',
          status: artikel.status || 'Draft',
          gambar: artikel.gambar || null,
          preview: artikel.gambar ? `${import.meta.env.VITE_BACKEND_URL}/auth/artikel/images/${artikel.gambar}` : null,
        });
        setLoading(false);
      } catch (err) {
        console.error('Gagal mengambil detail artikel:', err);
        setError('Gagal memuat data artikel');
        setLoading(false);
      }
    };

    fetchArtikelDetail();
  }, [artikelId]);

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
      setFormData((prev) => ({
        ...prev,
        gambar: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  // Handler submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Buat form data
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('judul', formData.judul);
      formDataToSubmit.append('konten', formData.konten);
      formDataToSubmit.append('status', formData.status);

      // Tambahkan gambar jika ada file baru
      if (formData.gambar instanceof File) {
        formDataToSubmit.append('gambar', formData.gambar);
      }

      // Kirim data
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/auth/artikel/${artikelId}`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Navigasi kembali setelah berhasil
      navigate('/manajemen-artikel');
    } catch (err) {
      console.error('Gagal update artikel:', err);
      setError(err.response?.data?.error || 'Gagal memperbarui artikel');
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
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Edit Artikel</h2>
      <hr />

      {/* Tampilkan pesan error */}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="gap-6 mt-6">
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Judul Artikel</label>
          <input type="text" name="judul" value={formData.judul} onChange={handleChange} className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" required />
        </div>
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Konten</label>
          <textarea name="konten" value={formData.konten} onChange={handleChange} className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900" rows="5" required />
        </div>
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Gambar</label>
          <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleFileChange} className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" />
          {formData.preview && (
            <div className="mt-2">
              <img src={formData.preview} alt="Preview Gambar" className="w-40 h-40 object-cover rounded" />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900">
            <option value="Draft">Draft</option>
            <option value="published">Publikasi</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Link to="/manajemen-artikel">
            <Button label="Kembali" type="back" />
          </Link>
          <Button label="Simpan" type="save" disabled={loading} />
        </div>
      </form>
    </div>
  );
};

export default CardEditArtikel;
