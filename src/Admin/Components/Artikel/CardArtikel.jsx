import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';

const CardPenyakit = () => {
  const [penyakit, setPenyakit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Header tabel sesuai dengan struktur data penyakit
  const headers = ['No', 'Nama', 'Kategori', 'Deskripsi', 'Gambar', 'Tanggal', 'Aksi'];

  // Fetch data penyakit
  const fetchPenyakit = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/penyakit/getallPenyakit`);

      // Debug: Cek struktur data
      console.log('Respons API:', response.data);

      // Normalisasi data
      const penyakitData = Array.isArray(response.data) ? response.data : response.data.data || [];

      // Transform data penyakit
      const penyakitWithDetails = penyakitData.map((item) => ({
        penyakitId: item.PenyakitId || item.id,
        nama: item.nama || 'Tidak ada nama',
        kategori: item.kategori || 'Tidak ada kategori',
        deskripsi: item.deskripsi ? (item.deskripsi.length > 100 ? item.deskripsi.substring(0, 100) + '...' : item.deskripsi) : 'Tidak ada deskripsi',
        penyebab: item.penyebab || 'Tidak ada data penyebab',
        gejala: item.gejala || 'Tidak ada data gejala',
        pencegahan: item.pencegahan || 'Tidak ada data pencegahan',
        pengobatan: item.pengobatan || 'Tidak ada data pengobatan',
        referensi: item.referensi || 'Tidak ada referensi',
        info_tambahan: item.info_tambahan || 'Tidak ada info tambahan',
        gambar: item.gambar || 'Tidak ada gambar',
        tanggal: item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Tanggal tidak tersedia',
      }));

      setPenyakit(penyakitWithDetails);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching penyakit:', err);

      // Tangani error dengan detail
      if (err.response) {
        console.error('Error response:', err.response.data);
        console.error('Error status:', err.response.status);

        setError(err.response.data.error || 'Gagal mengambil data penyakit');
      } else if (err.request) {
        console.error('Error request:', err.request);
        setError('Tidak dapat terhubung ke server');
      } else {
        console.error('Error message:', err.message);
        setError('Terjadi kesalahan saat memuat penyakit');
      }

      setLoading(false);
    }
  };

  // Hapus penyakit
  const handleDelete = async (penyakitId) => {
    try {
      const konfirmasi = window.confirm('Yakin hapus data penyakit ini?');
      if (!konfirmasi) return;

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/penyakit/delete-penyakit/${penyakitId}`);
      fetchPenyakit(); // Refresh data
      alert('Penyakit berhasil dihapus');
    } catch (err) {
      console.error('Gagal menghapus penyakit:', err);

      const errorMessage = err.response?.data?.error || 'Gagal menghapus penyakit';
      alert(errorMessage);
    }
  };

  // Render gambar
  const renderGambar = (gambar) => {
    const isValidImage = gambar && typeof gambar === 'string' && gambar !== 'Tidak ada gambar';

    const imageUrl = isValidImage ? (gambar.startsWith('http') ? gambar : `${import.meta.env.VITE_BACKEND_URL}/penyakit/images/${gambar}`) : '/src/Assets/img/penyakitimg.png'; // Default image untuk penyakit

    return (
      <div className="flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Gambar Penyakit"
          className="w-20 h-20 object-cover rounded"
          onError={(e) => {
            console.error('Gagal memuat gambar:', imageUrl);
            e.target.onerror = null;
            e.target.src = '/src/Assets/img/penyakitimg.png';
          }}
        />
      </div>
    );
  };

  // Ambil data saat komponen dimuat
  useEffect(() => {
    fetchPenyakit();
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
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Manajemen Data Penyakit</h2>
      <hr />

      {/* Tombol Tambah Penyakit */}
      <div className="flex justify-between items-center mb-4 mt-6">
        <Link to="/tambah-penyakit">
          <Button label="Tambah Penyakit" type="add" />
        </Link>
      </div>

      {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={fetchPenyakit} className="ml-4 bg-red-500 text-white px-2 py-1 rounded">
            Coba Lagi
          </button>
        </div>
      )}

      {/* Tampilkan pesan jika tidak ada penyakit */}
      {!loading && penyakit.length === 0 && <div className="text-center text-gray-500 py-4">Tidak ada data penyakit ditemukan</div>}

      {/* Tampilkan tabel jika ada penyakit */}
      {penyakit.length > 0 && (
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
              {penyakit.map((item, index) => (
                <tr key={item.penyakitId} className="hover:bg-sky-50">
                  <td className="border border-sky-900 p-2 text-center">{index + 1}</td>
                  <td className="border border-sky-900 p-2 font-medium">{item.nama}</td>
                  <td className="border border-sky-900 p-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">{item.kategori}</span>
                  </td>
                  <td className="border border-sky-900 p-2 max-w-xs">
                    <div className="text-sm text-gray-700" title={item.deskripsi}>
                      {item.deskripsi}
                    </div>
                  </td>
                  <td className="border border-sky-900 p-2 flex justify-center">{renderGambar(item.gambar)}</td>
                  <td className="border border-sky-900 p-2 text-center">{item.tanggal}</td>
                  <td className="border border-sky-900 p-2">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Link to={`/detail-penyakit/${item.penyakitId}`}>
                        <Button label="" type="view" />
                      </Link>
                      <Link to={`/edit-penyakit/${item.penyakitId}`}>
                        <Button label="Edit" type="edit" />
                      </Link>
                      <Button label="Hapus" type="delete" onClick={() => handleDelete(item.penyakitId)} />
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

export default CardPenyakit;
