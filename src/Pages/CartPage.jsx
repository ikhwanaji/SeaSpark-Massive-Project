import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

import Footer from '../Components/Footer';
import { IoTrashBinOutline } from 'react-icons/io5';
import { FiTruck, FiMapPin, FiUser, FiPhone, FiShoppingBag } from 'react-icons/fi';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const CartPage = () => {
  const { isLoggedIn, user, logout, token } = useAuth();
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const [shippingMethods, setShippingMethods] = useState([]);
  const [shippingMethod, setShippingMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Add useForm hook
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama: user?.nama || '',
      no_hp: user?.no_hp || '',
      alamat: user?.alamat || '',
    },
  });

  // Kode untuk load Midtrans script
  useEffect(() => {
    const loadMidtransScript = () => {
      return new Promise((resolve, reject) => {
        // Cek apakah script Midtrans sudah ada
        if (window.snap) {
          resolve(window.snap);
          return;
        }

        // Buat script elemen
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
        script.async = true;

        // Handler ketika script berhasil dimuat
        script.onload = () => {
          console.log('Midtrans Snap Script Loaded');
          resolve(window.snap);
        };

        // Handler jika script gagal dimuat
        script.onerror = (error) => {
          console.error('Failed to load Midtrans Snap Script', error);
          reject(error);
        };

        // Tambahkan script ke dokumen
        document.body.appendChild(script);
      });
    };

    // Muat script Midtrans
    loadMidtransScript()
      .then((snap) => {
        console.log('Midtrans Snap initialized successfully');
      })
      .catch((error) => {
        console.error('Midtrans Snap initialization failed', error);
      });
  }, []);

  // Kode untuk Shipping Method
  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shipping-methods`, {
          headers: {
            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          },
        });
        setShippingMethods(response.data.data);
        if (response.data.data.length > 0) {
          setShippingMethod(response.data.data[0].kode);
        }
      } catch (error) {
        console.error('Gagal mengambil metode pengiriman:', error.response?.data || error.message);
      }
    };

    fetchShippingMethods();
  }, [token]);

  // Fetch Profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: {
            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          },
        });
        setValue('nama', response.data.user.nama);
        setValue('no_hp', response.data.user.no_hp);
        setValue('alamat', response.data.user.alamat);
      } catch (error) {
        console.error('Gagal mengambil profil:', error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token, setValue]);

  const calculateShipping = () => {
    const selectedMethod = shippingMethods.find((method) => method.kode === shippingMethod);
    return selectedMethod ? selectedMethod.biaya : 0;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.harga * item.quantity, 0);
  const shipping = calculateShipping();
  const total = subtotal + shipping;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const showAddressEditModal = () => {
    Swal.fire({
      title: 'Edit Alamat Pengiriman',
      html: `
        <div class="space-y-3 w-full">
          <div class="w-full mb-2">
            <label for="swal-input-nama" class="block text-left font-semibold mb-2 text-gray-700">Nama Lengkap</label>
            <input id="swal-input-nama" class="swal2-input w-full p-2 border rounded" placeholder="Nama Lengkap" value="${watch('nama')}" required>
          </div>
          <div class="w-full mb-2">
            <label for="swal-input-hp" class="block text-left font-semibold mb-2 text-gray-700">Nomor HP</label>
            <input id="swal-input-hp" class="swal2-input w-full p-2 border rounded" placeholder="Nomor HP" value="${watch('no_hp')}" type="tel" required>
          </div>
          <div class="w-full mb-2">
            <label for="swal-input-alamat" class="block text-left font-semibold mb-2 text-gray-700">Alamat Lengkap</label>
            <textarea id="swal-input-alamat" class="swal2-textarea w-full p-2 border rounded" placeholder="Alamat Lengkap" rows="3" required>${watch('alamat')}</textarea>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      preConfirm: () => {
        const nama = document.getElementById('swal-input-nama').value;
        const no_hp = document.getElementById('swal-input-hp').value;
        const alamat = document.getElementById('swal-input-alamat').value;

        if (!nama || !no_hp || !alamat) {
          Swal.showValidationMessage('Semua field harus diisi');
          return false;
        }

        return { nama, no_hp, alamat };
      },
      customClass: {
        popup: 'rounded-lg',
        confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded',
        cancelButton: 'bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2',
      },
    }).then(async (result) => {
      if (result.value) {
        try {
          const profileResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
            headers: {
              Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            },
          });
          const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/auth/profile`,
            {
              nama: result.value.nama,
              email: profileResponse.data.user.email,
              no_hp: result.value.no_hp,
              alamat: result.value.alamat,
              username: profileResponse.data.user.nama,
            },
            {
              headers: {
                Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          setValue('nama', response.data.user.nama);
          setValue('no_hp', response.data.user.no_hp);
          setValue('alamat', response.data.user.alamat);
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Profil berhasil diperbarui',
          });
        } catch (error) {
          console.error('Gagal memperbarui profil:', error.response?.data || error.message);
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: error.response?.data?.message || 'Gagal memperbarui profil',
          });
        }
      }
    });
  };

  // Fungsi untuk memproses pembayaran
  const handleProceedToPayment = async () => {
    try {
      if (!user || !user.id) {
        throw new Error('User ID tidak ditemukan. Silakan login ulang.');
      }

      setIsLoading(true);

      // Ambil data metode pengiriman
      const selectedShippingMethod = shippingMethods.find((method) => method.kode === shippingMethod);
      if (!selectedShippingMethod) {
        throw new Error('Metode pengiriman tidak valid');
      }

      // Buat pesanan untuk setiap item di keranjang
      const orders = await Promise.all(
        cartItems.map(async (item) => {
          const payload = {
            userId: user.id,
            produkId: item.produkId,
            jumlah: item.quantity,
            total_harga: item.harga * item.quantity + selectedShippingMethod.biaya,
            metode_pembayaran: 'midtrans',
            shippingId: selectedShippingMethod.shippingId,
            metodePengiriman: selectedShippingMethod.kode,
            catatan: '',
          };

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pemesanan/create`, payload, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            },
          });

          return response.data;
        })
      );

      // Ambil token Midtrans dari order pertama
      const firstOrder = orders[0];
      const midtransToken = firstOrder.midtransToken;
      const midtransOrderId = firstOrder.midtransOrderId;

      // Pastikan Midtrans script sudah dimuat
      if (window.snap && midtransToken) {
        // Panggil snap.pay
        window.snap.pay(midtransToken, {
          onSuccess: async (result) => {
            try {
              // Update status pembayaran untuk semua pesanan
              await Promise.all(
                orders.map(async (order) => {
                  await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/pemesanan/update-payment-status`,
                    {
                      orderId: order.midtransOrderId,
                      status: 'success',
                    },
                    {
                      headers: {
                        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                      },
                    }
                  );
                })
              );

              // Bersihkan keranjang
              clearCart();

              // Tampilkan notifikasi
              Swal.fire({
                icon: 'success',
                title: 'Pembayaran Berhasil',
                text: 'Terima kasih atas pembayaran Anda.',
              }).then(() => {
                navigate('/riwayat-pembayaran', {
                  state: {
                    paymentSuccess: true,
                    orderId: firstOrder.orderId,
                  },
                });
              });
              // Bersihkan keranjang
              clearCart();
            } catch (updateError) {
              console.error('Error updating payment status:', updateError);
              Swal.fire({
                icon: 'success',
                title: 'Pembayaran Berhasil',
                text: 'Namun terjadi masalah saat memperbarui status pembayaran.',
              });
            } finally {
              setIsLoading(false);
            }
          },
          onPending: async (result) => {
            try {
              // Update status pembayaran untuk semua pesanan
              await Promise.all(
                orders.map(async (order) => {
                  await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/pemesanan/update-payment-status`,
                    {
                      orderId: order.midtransOrderId,
                      status: 'pending',
                    },
                    {
                      headers: {
                        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                      },
                    }
                  );
                })
              );

              Swal.fire({
                icon: 'info',
                title: 'Pembayaran Tertunda',
                text: 'Silakan selesaikan pembayaran Anda.',
              });
            } catch (updateError) {
              console.error('Error updating payment status:', updateError);
            } finally {
              setIsLoading(false);
            }
          },
          onError: async (result) => {
            try {
              // Update status pembayaran untuk semua pesanan
              await Promise.all(
                orders.map(async (order) => {
                  await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/pemesanan/update-payment-status`,
                    {
                      orderId: order.midtransOrderId,
                      status: 'failed',
                    },
                    {
                      headers: {
                        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                      },
                    }
                  );
                })
              );

              Swal.fire({
                icon: 'error',
                title: 'Pembayaran Gagal',
                text: 'Terjadi kesalahan dalam proses pembayaran.',
              });
            } catch (updateError) {
              console.error('Error updating payment status:', updateError);
            } finally {
              setIsLoading(false);
            }
          },
          onClose: async () => {
            try {
              // Update status pembayaran untuk semua pesanan
              await Promise.all(
                orders.map(async (order) => {
                  await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/pemesanan/update-payment-status`,
                    {
                      orderId: order.midtransOrderId,
                      status: 'cancelled',
                    },
                    {
                      headers: {
                        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                      },
                    }
                  );
                })
              );

              Swal.fire({
                icon: 'warning',
                title: 'Pembayaran Dibatalkan',
                text: 'Anda menutup popup pembayaran sebelum menyelesaikan.',
              });
            } catch (updateError) {
              console.error('Error updating payment status:', updateError);
            } finally {
              setIsLoading(false);
            }
          },
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Pembayaran Tidak Tersedia',
          text: 'Sistem pembayaran sedang mengalami gangguan.',
        });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memproses Pembayaran',
        text: error.response?.data?.message || error.message || 'Terjadi kesalahan',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const infoLinks = [
    { text: 'Beranda', path: '/beranda-pengguna' },
    { text: 'Layanan', path: '/layanan' },
    { text: 'Produk', path: '/produk' },
    { text: 'Tentang Kami', path: '/tentang-kami' },
    { text: 'Kontak', path: '/kontak' },
  ];

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center py-16">
            <FiShoppingBag className="text-gray-300 text-7xl mb-6" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-600 text-center mb-4">Keranjang Anda Masih Kosong</h1>
            <p className="text-gray-500 text-center mb-8">Jelajahi produk kami dan temukan yang Anda butuhkan</p>
            <button onClick={() => navigate('/produk')} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg">
              Jelajahi Produk
            </button>
          </div>
        </div>
        <Footer infoLinks={infoLinks} />
      </>
    );
  }

  return (
    <>
      <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col pt-20 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Keranjang Belanja</h1>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-full">{cartItems.length} item</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="w-full lg:w-2/3 space-y-4">
            {cartItems.map((item) => (
              <div key={item.produkId} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                  <div className="relative w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                    <img src={item.gambar} alt={item.nama} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">{item.kategori}</span>
                      <h2 className="font-medium text-gray-800">{item.nama}</h2>
                      <p className="text-lg font-bold text-gray-800 mt-1 sm:hidden">Rp {formatCurrency(item.harga * item.quantity)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-row items-center justify-between w-full sm:w-auto gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <button
                      onClick={() => item.quantity > 1 && updateCartItemQuantity(item.produkId, item.quantity - 1)}
                      className="text-gray-600 hover:text-blue-600 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                      disabled={isLoading}
                      aria-label="Kurangi jumlah"
                    >
                      <span className="text-lg font-medium">-</span>
                    </button>
                    <span className="text-gray-800 w-6 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItemQuantity(item.produkId, item.quantity + 1)}
                      className="text-gray-600 hover:text-blue-600 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                      disabled={isLoading}
                      aria-label="Tambah jumlah"
                    >
                      <span className="text-lg font-medium">+</span>
                    </button>
                  </div>

                  <p className="hidden sm:block font-bold text-gray-800 min-w-28 text-right">Rp {formatCurrency(item.harga * item.quantity)}</p>

                  <button onClick={() => removeFromCart(item.produkId)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors" disabled={isLoading} aria-label="Hapus item">
                    <IoTrashBinOutline className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                  <FiMapPin className="text-blue-600" />
                  <span>Informasi Pengiriman</span>
                </h2>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-700">Alamat Pengiriman</h3>
                  <button type="button" onClick={showAddressEditModal} className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline flex items-center gap-1" disabled={isLoading}>
                    Ubah
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                  <div className="flex items-start gap-2">
                    <FiUser className="text-gray-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-800 font-medium">{watch('nama') || 'Belum diisi'}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiPhone className="text-gray-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-800 font-medium">{watch('no_hp') || 'Belum diisi'}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiMapPin className="text-gray-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-800 font-medium">{watch('alamat') || 'Belum diisi'}</p>
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                <FiShoppingBag className="text-blue-600" />
                <span>Ringkasan Pesanan</span>
              </h2>

              <div className="max-h-40 overflow-y-auto mb-4 pr-2 scrollbar-thin">
                {cartItems.map((item) => (
                  <div key={item.produkId} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">{item.nama}</span>
                      <span className="text-xs text-gray-500">x{item.quantity}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">Rp {formatCurrency(item.harga * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">Rp {formatCurrency(subtotal)}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="flex items-center gap-1">
                      <FiTruck className="text-blue-600" />
                      <span>Pengiriman</span>
                    </span>
                    <span className="font-medium">Rp {formatCurrency(shipping)}</span>
                  </div>
                  <select
                    value={shippingMethod}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                    disabled={isLoading}
                  >
                    {shippingMethods.map((method) => (
                      <option key={method.shippingId} value={method.kode}>
                        {method.nama} (Rp {formatCurrency(method.biaya)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <hr className="my-4 border-t border-gray-200" />

              <div className="flex justify-between font-bold text-lg text-gray-800 mb-6">
                <span>Total</span>
                <span>Rp {formatCurrency(total)}</span>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={isLoading || !watch('nama') || !watch('no_hp') || !watch('alamat')}
                className={`w-full ${
                  isLoading || !watch('nama') || !watch('no_hp') || !watch('alamat') ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center gap-2`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Memproses...</span>
                  </>
                ) : (
                  'Lanjut ke Pembayaran'
                )}
              </button>

              {(!watch('nama') || !watch('no_hp') || !watch('alamat')) && <p className="text-xs text-red-600 mt-2 text-center">Mohon lengkapi alamat pengiriman terlebih dahulu</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer infoLinks={infoLinks} />
    </>
  );
};

export default CartPage;
