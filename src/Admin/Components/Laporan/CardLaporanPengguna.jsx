import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../Table';
import Button from '../../components/Button'; // Sesuaikan path
import Swal from 'sweetalert2'; // Import SweetAlert2

const CardLaporan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = ['No. Laporan', 'Nama', 'Email', 'Pesan', 'Tanggal', 'Aksi'];

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/laporan`);
        setData(response.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLaporan();
  }, []);

  const handleDelete = async (laporanId) => {
    // Menampilkan popup konfirmasi
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus pesan ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    });

    // Jika pengguna mengkonfirmasi penghapusan
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/auth/laporan/${laporanId}`);
        // Setelah berhasil menghapus, refresh data
        setData(data.filter((item) => item.laporanId !== laporanId));
        Swal.fire('Dihapus!', 'Pesan telah dihapus.', 'success'); // Menampilkan notifikasi sukses
      } catch (err) {
        setError(err.message);
        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus pesan.', 'error'); // Menampilkan notifikasi gagal
      }
    }
  };

  const renderActions = (row) => (
    <div className="flex flex-row gap-2 justify-center">
      <Button label="Hapus" type="delete" onClick={() => handleDelete(row.laporanId)} />
    </div>
  );

  if (loading) {
    return <div>Loading...</div>; // Tampilkan loading saat data diambil
  }

  if (error) {
    return <div>Error: {error}</div>; // Tampilkan error jika ada
  }

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Laporan Pengguna</h2>
      <hr />
      <div className="overflow-x-auto mt-6">
        <Table headers={headers} data={data} renderActions={renderActions} />
      </div>
    </div>
  );
};

export default CardLaporan;