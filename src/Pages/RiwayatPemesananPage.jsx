import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { List, Grid, Search, Info, Filter, ChevronDown, CheckCircle2, X, ArrowLeft } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Order Details Modal Component
const OrderDetailsModal = ({ order, onClose }) => {
  const getImageUrl = (filename) => {
    return `${import.meta.env.VITE_API_URL}/api/produks/images/${filename}`;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-blue-50 p-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-blue-800">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors rounded-full p-2 hover:bg-blue-100">
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          {/* Order Overview */}
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="text-gray-600">Order Number</p>
              <p className="font-semibold">{order.midtrans_order_id}</p>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className={`mr-2 ${order.status_pembayaran === 'success' ? 'text-green-500' : 'text-yellow-500'}`} />
              <span className={`font-medium ${order.status_pembayaran === 'success' ? 'text-green-800' : 'text-yellow-800'}`}>{order.status_pembayaran}</span>
            </div>
          </div>
          {/* Product Details */}
          <div className="flex items-center space-x-4 border-b pb-4">
            <img src={getImageUrl(order.gambar_produk)} alt={order.nama_produk} className="w-24 h-24 object-cover rounded-xl shadow-md" />
            <div>
              <h3 className="font-bold text-lg">{order.nama_produk}</h3>
              <p className="text-gray-600">Jumlah: {order.jumlah}</p>
              <p className="text-gray-600">Harga: Rp {order.harga.toLocaleString()}</p>
            </div>
          </div>

          {/* Shipping Details Section (kept original) */}
          <div className=" border-gray-200 space-y-2 ">
            <h3 className="text-lg font-semibold mb-3">Detail Pengiriman</h3>
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggal Pemesanan</span>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Metode Pengiriman ({order.nama_shipping})</span>
              <span>Rp {order.biaya_pengiriman.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status Pengiriman</span>
              <span>{order.status_pengiriman}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>Rp {(order.harga * order.jumlah).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>Rp {order.total_harga.toLocaleString()}</span>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

function RiwayatPemesananPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    sortBy: 'newest', // Add sorting functionality
  });

  const { token, isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch order history (same as before)
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pemesanan/riwayat`, {
        headers: {
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
        },
      });

      const cleanedOrders = response.data.data
        .filter((order) => order.status_pembayaran === 'success')
        .map((order) => ({
          ...order,
          harga: order.harga || 0,
          jumlah: order.jumlah || 1,
          total_harga: order.total_harga || (order.harga || 0) * (order.jumlah || 1),
          gambar_produk: order.gambar_produk || '/path/to/placeholder-image.jpg',
          nama_produk: order.nama_produk || 'Unknown Product',
          midtrans_order_id: order.midtrans_order_id || 'N/A',
        }));

      // Sort orders
      const sortedOrders = cleanedOrders.sort((a, b) => {
        return filters.sortBy === 'newest' ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at);
      });

      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch order history',
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [token, filters.sortBy]);

  // Filter and search logic
  const filteredOrders = orders.filter((order) => !filters.searchTerm || order.nama_produk.toLowerCase().includes(filters.searchTerm.toLowerCase()) || order.midtrans_order_id.includes(filters.searchTerm));

  const getImageUrl = (filename) => {
    return `${import.meta.env.VITE_API_URL}/api/produks/images/${filename}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col pt-16">
      <Navbar buttonName={isLoggedIn ? 'Logout' : 'Login'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-0">Order History</h1>

            {/* View and Filter Controls */}
            <div className="flex items-center space-x-4">
              {/* View Mode Buttons */}
              <div className="flex bg-white rounded-lg shadow-sm p-1">
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
                  <List />
                </button>
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
                  <Grid />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full" />
            </div>
          ) : filteredOrders.length === 0 ? (
            // Empty State
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center bg-white rounded-2xl shadow-md p-12">
              <Info className="mx-auto mb-4 text-blue-400" size={64} />
              <p className="text-xl text-gray-600">No order history found</p>
              <p className="text-gray-500 mt-2">Start shopping to see your orders here!</p>
            </motion.div>
          ) : viewMode === 'list' ? (
            // List View
            <motion.div layout className="space-y-4">
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <motion.div key={order.midtrans_order_id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img src={getImageUrl(order.gambar_produk)} alt={order.nama_produk} className="w-20 h-20 object-cover rounded-xl" />
                        <div>
                          <h3 className="font-bold text-lg">{order.nama_produk}</h3>
                          <p className="text-gray-600">
                            {order.jumlah} x Rp {order.harga.toLocaleString()}
                          </p>
                          <p className="text-gray-600">Total: Rp {order.total_harga.toLocaleString()}</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedOrder(order)} className="text-blue-500 hover:text-blue-700 font-medium flex items-center">
                        Details <ArrowLeft className="ml-2" size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            // Grid View
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <motion.div
                    key={order.midtrans_order_id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="p-4 text-center">
                      <img src={getImageUrl(order.gambar_produk)} alt={order.nama_produk} className="w-full h-48 object-cover rounded-xl mb-4" />
                      <h3 className="font-bold mb-2">{order.nama_produk}</h3>
                      <p className="text-gray-600 mb-1">
                        {order.jumlah} x Rp {order.harga.toLocaleString()}
                      </p>
                      <p className="text-gray-600 mb-3">Total: Rp {order.total_harga.toLocaleString()}</p>
                      <button onClick={() => setSelectedOrder(order)} className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Order Details Modal */}
        <AnimatePresence>{selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}</AnimatePresence>
      </motion.div>

      <Footer
        infoLinks={[
          { text: 'Home', path: '/beranda-pengguna', href: '#beranda' },
          { text: 'Services', path: '/layanan', href: '#layanan' },
          { text: 'Products', path: '/produk', href: '#produk-kami' },
          { text: 'About Us', path: '/tentang-kami', href: '#tentang-kami' },
          { text: 'Contact', path: '/kontak', href: '#kontak' },
        ]}
        isUserPage={true}
      />
    </div>
  );
}

export default RiwayatPemesananPage;
