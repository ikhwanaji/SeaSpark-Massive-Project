import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

const AdminOrderManagement = () => {
  const { token, isLoggedIn, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, dateFilter, token, isLoggedIn]);

  const fetchOrders = async () => {
  
    try {
      // Buat query parameter
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 10);

      if (statusFilter) {
        params.append('status', statusFilter);
      }

      if (dateFilter) {
        params.append('date', dateFilter);
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pemesanan/admin/all?${params.toString()}`, {
        headers: {
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data) {
        setOrders(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Gagal mengambil data pemesanan');
      setLoading(false);
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle shipping status update
  const updateShippingStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/pemesanan/admin/shipping/${orderId}`,
        { status_pengiriman: newStatus },
        {
          headers: {
            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          },
        }
      );
  
      if (response.data && response.data.success) {
        fetchOrders(); // Refresh data after successful update
      } else {
        alert('Gagal memperbarui status pengiriman: ' + response.data.message);
      }
    } catch (err) {
      console.error('Error updating shipping status:', err);
      alert('Gagal memperbarui status pengiriman: ' + (err.response?.data?.message || err.message));
    }
  };

  // Custom button component sebagai pengganti Button component
  const CustomButton = ({ label, type, onClick, disabled }) => {
    const getButtonStyle = () => {
      switch (type) {
        case 'primary':
          return 'bg-blue-500 hover:bg-blue-600 text-white';
        case 'secondary':
          return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
        case 'details':
          return 'bg-green-500 hover:bg-green-600 text-white';
        case 'delete':
          return 'bg-red-500 hover:bg-red-600 text-white';
        default:
          return 'bg-blue-500 hover:bg-blue-600 text-white';
      }
    };

    return (
      <button className={`px-3 py-1 rounded text-sm font-medium ${getButtonStyle()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    );
  };

  // Status badge component
  const StatusBadge = ({ status, type }) => {
    const getStatusStyle = () => {
      if (type === 'payment') {
        switch (status) {
          case 'success':
            return 'bg-green-100 text-green-800 border-green-200';
          case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
          case 'failed':
            return 'bg-red-100 text-red-800 border-red-200';
          case 'canceled':
            return 'bg-gray-100 text-gray-800 border-gray-200';
          default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
        }
      } else if (type === 'shipping') {
        switch (status) {
          case 'dikirim':
            return 'bg-blue-100 text-blue-800 border-blue-200';
          case 'selesai':
            return 'bg-green-100 text-green-800 border-green-200';
          case 'dibatalkan':
            return 'bg-red-100 text-red-800 border-red-200';
          case 'diproses':
          default:
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
      }
    };

    return <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusStyle()}`}>{status}</span>;
  };

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      {/* Card Title */}
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Manajemen Pemesanan Satuan</h2>
      <hr />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mt-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status Pembayaran</label>
          <select
            className="border rounded p-2"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1); // Reset ke halaman pertama saat filter berubah
            }}
          >
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
          <input
            type="date"
            className="border rounded p-2"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1); // Reset ke halaman pertama saat filter berubah
            }}
          />
        </div>

        <div className="self-end">
          <CustomButton
            label="Reset Filter"
            type="secondary"
            onClick={() => {
              setStatusFilter('');
              setDateFilter('');
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-center py-4">Memuat data...</p>}
      {error && <p className="text-center py-4 text-red-500">{error}</p>}

      {/* Custom Table Implementation */}
      {!loading && !error && (
        <div className="overflow-x-auto mt-6">
          {orders.length > 0 ? (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No.
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pelanggan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kontak
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produk
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Harga
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status Pembayaran
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status Pengiriman
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Pemesanan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr key={order.midtrans_order_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.midtrans_order_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.nama_pelanggan}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div>{order.email_pelanggan}</div>
                        <div>{order.no_hp_pelanggan}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{order.nama_produk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{order.jumlah}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(order.total_harga)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status_pembayaran} type="payment" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status_pengiriman || 'diproses'} type="shipping" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.created_at)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col gap-2">
                          <Link to={`/admin/pesanan/${order.midtrans_order_id}`}>
                            <CustomButton label="Detail" type="details" />
                          </Link>
                          <select className="border border-gray-300 rounded text-sm p-1" value={order.status_pengiriman || 'diproses'} onChange={(e) => updateShippingStatus(order.midtrans_order_id, e.target.value)}>
                            <option value="diproses">diproses</option>
                            <option value="dikirim">Dikirim</option>
                            <option value="selesai">Selesai</option>
                            <option value="dibatalkan">Dibatalkan</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-700">
                  Halaman {page} dari {totalPages}
                </div>
                <div className="flex gap-2">
                  <CustomButton label="Sebelumnya" type="secondary" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} />
                  <CustomButton label="Berikutnya" type="primary" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} />
                </div>
              </div>
            </>
          ) : (
            <p className="text-center py-4">Tidak ada data pemesanan</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrderManagement;
