// src/pages/RiwayatPemesananPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useAuth } from '../context/AuthContext';

// Komponen Detail Pesanan
const DetailPesananModal = ({ pesanan, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Detail Pesanan</h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold">Nomor Pesanan:</span>
            <span>{pesanan.midtrans_order_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tanggal Pesanan:</span>
            <span>{new Date(pesanan.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status Pembayaran:</span>
            <span
              className={`
              px-2 py-1 rounded text-sm
              ${pesanan.status_pembayaran === 'success' ? 'bg-green-100 text-green-800' : pesanan.status_pembayaran === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}
            `}
            >
              {pesanan.status_pembayaran}
            </span>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Detail Produk</h3>
            <div className="flex justify-between">
              <span>Nama Produk:</span>
              <span>{pesanan.nama_produk}</span>
            </div>
            <div className="flex justify-between">
              <span>Jumlah:</span>
              <span>{pesanan.jumlah}</span>
            </div>
            <div className="flex justify-between">
              <span>Harga Satuan:</span>
              <span>Rp {pesanan.harga.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Informasi Pengiriman</h3>
            <div className="flex justify-between">
              <span>Metode Pengiriman:</span>
              <span>{pesanan.nama_shipping}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Harga:</span>
              <span>Rp {pesanan.total_harga.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Tutup
        </button>
      </div>
    </div>
  );
};

// Komponen Utama Riwayat Pemesanan
function RiwayatPemesananPage() {
  const { isLoggedIn, user, token, logout } = useAuth();
  const [pesananList, setPesananList] = useState([]);
  const [selectedPesanan, setSelectedPesanan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fungsi ambil riwayat pemesanan
  const fetchRiwayatPemesanan = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pemesanan/riwayat`, {
        headers: {
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
        },
        params: {
          page,
          limit: 10, // Jumlah item per halaman
        },
      });

      setPesananList(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Gagal mengambil riwayat pemesanan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Tidak dapat mengambil riwayat pemesanan',
      });
      setLoading(false);
    }
  };

  // Panggil fetchRiwayatPemesanan saat komponen dimuat
  useEffect(() => {
    if (isLoggedIn) {
      fetchRiwayatPemesanan();
    }
  }, [isLoggedIn, token]);

  // Fungsi untuk membuka modal detail pesanan
  const handleDetailPesanan = (pesanan) => {
    setSelectedPesanan(pesanan);
  };

  // Fungsi untuk menutup modal detail pesanan
  const handleCloseModal = () => {
    setSelectedPesanan(null);
  };

  // Fungsi untuk mengganti halaman
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchRiwayatPemesanan(newPage);
    }
  };

  // Render status pembayaran dengan warna
  const renderStatusBadge = (status) => {
    const statusColors = {
      success: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };

    return <span className={`px-2 py-1 rounded text-xs ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />

      <div className="flex-grow bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Riwayat Pemesanan</h1>

          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
          ) : pesananList.length === 0 ? (
            <div className="text-center text-gray-600">Anda belum memiliki riwayat pemesanan.</div>
          ) : (
            <>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                  // Lanjutan dari kode sebelumnya
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="p-3 text-left">Nomor Pesanan</th>
                      <th className="p-3 text-left">Tanggal</th>
                      <th className="p-3 text-left">Produk</th>
                      <th className="p-3 text-left">Total Harga</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pesananList.map((pesanan) => (
                      <tr key={pesanan.midtrans_order_id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <span className="text-sm font-medium">{pesanan.midtrans_order_id}</span>
                        </td>
                        <td className="p-3">{new Date(pesanan.created_at).toLocaleDateString()}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <img src={pesanan.gambar_produk} alt={pesanan.nama_produk} className="w-10 h-10 object-cover rounded mr-2" />
                            <span className="text-sm">{pesanan.nama_produk}</span>
                          </div>
                        </td>
                        <td className="p-3">Rp {pesanan.total_harga.toLocaleString()}</td>
                        <td className="p-3">{renderStatusBadge(pesanan.status_pembayaran)}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => handleDetailPesanan(pesanan)} className="text-blue-500 hover:text-blue-700 text-sm">
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6 space-x-2">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
                  Sebelumnya
                </button>
                <span className="px-4 py-2 bg-gray-100 rounded">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
                  Selanjutnya
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal Detail Pesanan */}
        {selectedPesanan && <DetailPesananModal pesanan={selectedPesanan} onClose={handleCloseModal} />}
      </div>

      <Footer
        infoLinks={[
          { text: 'Beranda', path: '/beranda-pengguna', href: '#beranda' },
          { text: 'Layanan', path: '/layanan', href: '#layanan' },
          { text: 'Pemesanan', path: '/pemesanan', href: '#pemesanan' },
          { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
          { text: 'Kontak', path: '/kontak', href: '#kontak' },
        ]}
        isUserPage={true}
      />
    </div>
  );
}

export default RiwayatPemesananPage;
