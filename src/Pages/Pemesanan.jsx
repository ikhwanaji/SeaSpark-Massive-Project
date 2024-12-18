import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FormPemesanan from '../Components/formpemesanan';
import { useAuth } from '../context/AuthContext';

function PemesananPage() {
  const { isLoggedIn, user, token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data produk dari navigasi sebelumnya
  const produk = location.state?.produk;

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

  const handleSubmit = async (formData) => {
    try {
      if (!user || !user.id) {
        throw new Error('User ID tidak ditemukan. Silakan login ulang.');
      }

      // Ambil biaya pengiriman dari metode pengiriman yang dipilih
      const metodePengiriman = formData.metodePengiriman;

      const shippingResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/shipping-methods/${metodePengiriman}`, {
        headers: {
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
        },
      });

      const biayaPengiriman = shippingResponse.data.biaya || 0;

      const hargaProduk = produk.harga * formData.jumlahProduk;

      // Tambahkan biaya pengiriman
      const totalHarga = hargaProduk + biayaPengiriman;

      const payload = {
        userId: user.id,
        produkId: produk.produkId,
        jumlah: formData.jumlahProduk,
        total_harga: totalHarga,
        metode_pembayaran: 'midtrans',
        shippingId: formData.metodePengiriman,
        metodePengiriman: formData.metodePengirimanKode,
        catatan: formData.catatan || '',
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pemesanan/create`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
        },
      });

      console.log('Response dari backend:', response.data);

      // Pastikan Midtrans script sudah dimuat
      if (window.snap && response.data.midtransToken) {
        // Langsung panggil snap.pay
        window.snap.pay(response.data.midtransToken, {
          onSuccess: async (result) => {
            try {
              // Kirim update status pembayaran ke backend
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/pemesanan/update-payment-status`,
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

              // Handle pembayaran berhasil
              Swal.fire({
                icon: 'success',
                title: 'Pembayaran Berhasil',
                text: 'Terima kasih atas pembayaran Anda.',
              }).then(() => {
                navigate('/riwayat-pembayaran', {
                  state: {
                    paymentSuccess: true,
                    orderId: response.data.orderId,
                  },
                });
              });
            } catch (updateError) {
              console.error('Error updating payment status:', updateError);
              // Tetap tampilkan pesan sukses meskipun update status gagal
              Swal.fire({
                icon: 'success',
                title: 'Pembayaran Berhasil',
                text: 'Namun terjadi masalah saat memperbarui status pembayaran.',
              });
            }
          },
          onPending: async (result) => {
            try {
              // Kirim update status pembayaran ke backend
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/pemesanan/update-payment-status`,
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
              // Kirim update status pembayaran ke backend
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/pemesanan/update-payment-status`,
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
              // Kirim update status pembayaran ke backend
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/pemesanan/update-payment-status`,
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
    <div className="min-h-screen flex flex-col">
      <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />

      <div className="flex-grow bg-blue-50 pt-24 pb-12 flex justify-center items-center">
        <FormPemesanan onSubmit={handleSubmit} produk={produk} />
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

export default PemesananPage;
