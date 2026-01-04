import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import FormPemesanan from '../Components/formpemesanan'; // Import FormPemesanan component

const CardItem = ({ item, index }) => (
  <li className="flex items-start mb-2">
    <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size="16" />
    <span>{item}</span>
  </li>
);

// Modal Form Component


const CardPaketan = ({ paketId, title, price, image, items, stok }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user, token } = useAuth();
  const [midtransLoaded, setMidtransLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Parse price for FormPemesanan
  const getNumericPrice = () => {
    return parseInt(price.replace('Rp.', '').replace(/\./g, ''), 10);
  };

  // Create product object for FormPemesanan
  const productData = {
    nama: title,
    harga: getNumericPrice(),
    gambar: image,
    stok: stok, 
    item: items
  };

  useEffect(() => {
    const loadMidtransScript = () => {
      return new Promise((resolve, reject) => {
        // Cek apakah script Midtrans sudah ada
        if (window.snap) {
          resolve(window.snap);
          setMidtransLoaded(true);
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
          setMidtransLoaded(true);
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

    loadMidtransScript();
  }, []);

  const handleBuyNow = () => {
    // Validasi login
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Silakan Login',
        text: 'Anda harus login terlebih dahulu untuk melakukan pembelian.',
      });
      return;
    }

    // Show modal with FormPemesanan
    setShowModal(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Close the modal
      setShowModal(false);

      // Create the payload for the order
      const payload = {
        userId: user.id,
        paketId: paketId,
        total_harga: formData.totalBayar,
        metode_pembayaran: 'midtrans',
        nama: formData.nama,
        alamat: formData.alamat,
        no_hp: formData.no_hp,
        catatan: formData.catatan,
        jumlah: formData.jumlahProduk,
        shippingId: formData.metodePengiriman,
        ongkir: formData.ongkir,
      };

      // Send request to backend to create Midtrans token
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/order-paket/create-order`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
        },
      });

      // Ensure Midtrans script is loaded
      if (window.snap && response.data.midtransToken) {
        window.snap.pay(response.data.midtransToken, {
          onSuccess: async (result) => {
            try {
              // Send payment status update to backend
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/order-paket/update-payment-paket-status`,
                {
                  orderId: response.data.midtransOrderId,
                  status: 'success',
                },
                {
                  headers: {
                    Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                  },
                }
              );

              // Handle successful payment
              Swal.fire({
                icon: 'success',
                title: 'Pembayaran Berhasil',
                text: 'Terima kasih atas pembayaran Anda.',
              }).then(() => {
                navigate('/Sukses', {
                  state: {
                    paymentSuccess: true,
                    orderId: response.data.orderId,
                  },
                });
              });
            } catch (updateError) {
              console.error('Error updating payment status:', updateError);
              Swal.fire({
                icon: 'success',
                title: 'Pembayaran Berhasil',
                text: 'Namun terjadi masalah saat memperbarui status pembayaran.',
              });
            }
          },
          onPending: async (result) => {
            try {
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/order-paket/update-payment-paket-status`,
                {
                  orderId: response.data.midtransOrderId,
                  status: 'pending',
                },
                {
                  headers: {
                    Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                  },
                }
              );

              Swal.fire({
                icon: 'info',
                title: 'Pembayaran Tertunda',
                text: 'Silakan selesaikan pembayaran Anda.',
              });
            } catch (updateError) {
              console.error('Error updating payment status:', updateError);
            }
          },
          onError: async (result) => {
            try {
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/order-paket/update-payment-paket-status`,
                {
                  orderId: response.data.midtransOrderId,
                  status: 'failed',
                },
                {
                  headers: {
                    Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                  },
                }
              );

              Swal.fire({
                icon: 'error',
                title: 'Pembayaran Gagal',
                text: 'Terjadi kesalahan dalam proses pembayaran.',
              });
            } catch (updateError) {
              console.error('Error updating payment status:', updateError);
            }
          },
          onClose: async () => {
            try {
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/order-paket/update-payment-paket-status`,
                {
                  orderId: response.data.midtransOrderId,
                  status: 'cancelled',
                },
                {
                  headers: {
                    Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                  },
                }
              );

              Swal.fire({
                icon: 'warning',
                title: 'Pembayaran Dibatalkan',
                text: 'Anda menutup popup pembayaran sebelum menyelesaikan.',
              });
            } catch (updateError) {
              console.error('Error updating payment status:', updateError);
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
      console.error('Error creating order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Membuat Pesanan',
        text: error.response?.data?.message || 'Terjadi kesalahan',
      });
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 transform transition-transform hover:scale-105">
        <img src={image} alt={title} className="rounded-t-lg w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
          <p className="text-center text-gray-700 mb-4">{price}</p>
          <button onClick={handleBuyNow} className="bg-blue-500 text-white w-full py-2 rounded-lg mb-4 hover:bg-blue-700 transition-colors duration-300">
            Beli Sekarang
          </button>
          <ul className="text-gray-700">
            {items.map((item, idx) => (
              <CardItem key={`${paketId}-${idx}`} item={item} index={idx} />
            ))}
          </ul>
        </div>
      </div>

      {/* Modal for FormPemesanan */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="relative w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-4 right-4 z-10">
              <button onClick={() => setShowModal(false)} className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FormPemesanan produk={productData} onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}
    </>
  );
};

export default CardPaketan;
