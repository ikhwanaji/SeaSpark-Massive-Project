import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useAuth } from '../context/AuthContext';

function SuksesPage() {
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get data from navigation state
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('order_id');
  const statusCode = queryParams.get('status_code');
  const transactionStatus = queryParams.get('transaction_status');

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pemesanan/${orderId}`);
        setOrderData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Gagal memuat detail pesanan');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount).replace(/\,00$/, '');
  };

  const handleContinueShopping = () => {
    navigate('/produk/produk-satuan');
  };

  const getImageUrl = (filename) => {
    // Pastikan filename tidak undefined atau null
    if (!filename) {
      // Anda bisa return gambar placeholder jika filename tidak ada
      return 'https://via.placeholder.com/150';
    }
    return `${import.meta.env.VITE_API_URL}/api/produks/images/${filename}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer
          infoLinks={[
            { text: 'Beranda', path: '/', href: '#beranda' },
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
        <Footer
          infoLinks={[
            { text: 'Beranda', path: '/', href: '#beranda' },
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />

      <div className="flex-grow bg-gray-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-8 text-center border-b">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Terima kasih atas pesanan Anda!</h1>
            <p className="text-gray-600 mt-2">Pesanan Anda telah berhasil diproses</p>
            <div className="mt-3 inline-block bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              Nomor Pesanan: <span className="font-bold">{orderData?.orderNumber || orderId}</span>
            </div>
          </div>

          {/* Order Details */}
          {orderData && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Order Items */}
                <div className="md:col-span-2">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Detail Produk</h2>
                    <div className="space-y-4">
                      {orderData.items.map((item, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4">
                            <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                            {item.notes && <p className="text-sm text-gray-500">{item.notes}</p>}
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-sm text-gray-500">
                                {item.qty} x {formatCurrency(item.price)}
                              </p>
                              <p className="font-medium text-gray-800">{formatCurrency(item.subtotal)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Payment & Shipping */}
                <div className="md:col-span-1">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Rincian Pembayaran</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center pb-2">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">{formatCurrency(orderData.summary.subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2">
                          <span className="text-gray-600">Pengiriman</span>
                          <span className="font-medium">{formatCurrency(orderData.summary.shipping)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="font-bold text-gray-800">Total</span>
                          <span className="font-bold text-gray-800">{formatCurrency(orderData.summary.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Informasi Pengiriman</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="mb-4">
                        <p className="font-semibold text-gray-800">{orderData.customer.name}</p>
                        <p className="text-gray-600 text-sm mt-1">{orderData.customer.address}</p>
                        <p className="text-gray-600 text-sm">{orderData.customer.country}</p>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                            />
                          </svg>
                          <span className="font-medium text-gray-700">{orderData.shipping.method}</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600">Estimasi tiba: {orderData.shipping.estimatedDelivery}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={handleContinueShopping}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Lanjutkan Belanja
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer
        infoLinks={[
          { text: 'Beranda', path: '/', href: '#beranda' },
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

export default SuksesPage;
