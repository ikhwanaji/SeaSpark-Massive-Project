import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';


const CardArtikel = () => {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Header tabel
  const headers = ['No', 'Judul', 'Konten', 'Gambar', 'Status', 'Tanggal', 'Aksi'];

  // Fetch data artikel
  const fetchArtikel = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/artikel`);

      // Debug: Cek struktur data
      console.log('Respons API:', response.data);

      // Normalisasi data
      const artikelData = Array.isArray(response.data) ? response.data : response.data.data || [];

      // Transform data artikel
      const artikelWithDetails = artikelData.map((item) => ({
        artikelId: item.artikelId || item.id,
        judul: item.judul || 'Tidak ada judul',
        konten: item.konten ? (item.konten.length > 50 ? item.konten.substring(0, 50) + '...' : item.konten) : 'Tidak ada konten',
        gambar: item.gambar || 'Tidak ada gambar',
        status: item.status || 'Draft',
        tanggal: item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Tanggal tidak tersedia',
      }));

      setArtikel(artikelWithDetails);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching artikel:', err);

      // Tangani error dengan detail
      if (err.response) {
        console.error('Error response:', err.response.data);
        console.error('Error status:', err.response.status);

        setError(err.response.data.message || 'Gagal mengambil data artikel');
      } else if (err.request) {
        console.error('Error request:', err.request);
        setError('Tidak dapat terhubung ke server');
      } else {
        console.error('Error message:', err.message);
        setError('Terjadi kesalahan saat memuat artikel');
      }

      setLoading(false);
    }
  };

  // Hapus artikel
  const handleDelete = async (artikelId) => {
    try {
      const konfirmasi = window.confirm('Yakin hapus artikel ini?');
      if (!konfirmasi) return;

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/auth/artikel/${artikelId}`);
      fetchArtikel(); // Refresh data
    } catch (err) {
      console.error('Gagal menghapus artikel:', err);

      alert(err.response?.data?.message || 'Gagal menghapus artikel');
    }
  };

  // Render gambar
  const renderGambar = (gambar) => {
    const isValidImage = gambar && typeof gambar === 'string' && gambar !== 'Tidak ada gambar';

    const imageUrl = isValidImage ? (gambar.startsWith('http') ? gambar : `${import.meta.env.VITE_BACKEND_URL}/auth/artikel/images/${gambar}`) : '/src/Assets/img/artikelimg.png';

    return (
      <div className="flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Gambar Artikel"
          className="w-20 h-20 object-cover rounded"
          onError={(e) => {
            console.error('Gagal memuat gambar:', imageUrl);
            e.target.onerror = null;
            e.target.src = '/src/Assets/img/artikelimg.png';
          }}
        />
      </div>
    );
  };

  // Ambil data saat komponen dimuat
  useEffect(() => {
    fetchArtikel();
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
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Manajemen Artikel</h2>
      <hr />

      {/* Tombol Tambah Artikel */}
      <div className="flex justify-between items-center mb-4 mt-6">
        <Link to="/tambah-artikel">
          <Button label="Tambah Artikel" type="add" />
        </Link>
      </div>

      {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={fetchArtikel} className="ml-4 bg-red-500 text-white px-2 py-1 rounded">
            Coba Lagi
          </button>
        </div>
      )}

      {/* Tampilkan pesan jika tidak ada artikel */}
      {!loading && artikel.length === 0 && <div className="text-center text-gray-500 py-4">Tidak ada artikel ditemukan</div>}

      {/* Tampilkan tabel jika ada artikel */}
      {artikel.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-sky-200">
                {headers.map((header, index) => (
                  <th key={index} className="border border-sky-900 p-2 text-sky-900 text-center">
                    {header === 'ID' ? 'No' : header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {artikel.map((item, index) => (
                <tr key={index} className="hover:bg-sky-50">
                  <td className="border border-sky-900 p-2 text-center">{index + 1}</td>
                  <td className="border border-sky-900 p-2">{item.judul}</td>
                  <td className="border border-sky-900 p-2">{item.konten}</td>
                  <td className="border border-sky-900 p-2 flex justify-center">{renderGambar(item.gambar)}</td>
                  <td className="border border-sky-900 p-2 text-center">{item.status}</td>
                  <td className="border border-sky-900 p-2 text-center">{item.tanggal}</td>
                  <td className="border border-sky-900 p-2">
                    <div className="flex flex-row gap-2 justify-center">
                      <Link to={`/edit-artikel/${item.artikelId}`}>
                        <Button label="Edit" type="edit" />
                      </Link>
                      <Button label="Hapus" type="delete" onClick={() => handleDelete(item.artikelId)} />
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

export default CardArtikel;
