// PembayaranPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import Footer from '../Components/Footer';
import PembayaranForm from '../Components/formpemesanan'; // Import komponen form
import { useAuth } from '../context/AuthContext';

function PemesananPage() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handler submit form
  const handleSubmit = (formData) => {
    // Validasi form
    const { namaLengkap, noHp, alamat, provinsi, kotaKabupaten, kecamatan, kelurahan, kodePos, metodePembayaran } = formData;

    if (!namaLengkap || !noHp || !alamat || !provinsi || !kotaKabupaten || !kecamatan || !kelurahan || !kodePos || !metodePembayaran) {
      alert('Harap lengkapi semua field');
      return;
    }

    // Lanjutkan ke proses selanjutnya
    navigate('/konfirmasi-pembayaran', {
      state: {
        ...formData,
        produk: location.state?.produk,
      },
    });
  };

  // Ambil data produk dari navigasi sebelumnya
  const produk = location.state?.produk;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        buttonName={isLoggedIn ? "Keluar" : "Masuk"} // Mengubah nama tombol berdasarkan status login
        // useIcon={isLoggedIn} // Gunakan icon jika sudah login
        // icon={isLoggedIn ? <FiUserCheck size={24} /> : null}
        // Tambahkan prop untuk status login
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout} // Pastikan fungsi logout dipanggil saat tombol diklik
      />

      <div className="flex-grow bg-blue-50 pt-24 pb-12 flex justify-center items-center">
        <PembayaranForm onSubmit={handleSubmit} produk={produk} />
      </div>

      {/* Footer */}
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
