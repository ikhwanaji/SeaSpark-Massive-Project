// PembayaranPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import Footer from '../Components/Footer';
import PembayaranForm from '../Components/formpembayaran'; // Import komponen form

function PembayaranPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Beranda', type: 'link', path: '/beranda-pengguna' },
    { name: 'Layanan', type: 'link', path: '/layanan' },
    { name: 'Pemesanan', type: 'link', path: '/pemesanan' },
    { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
    { name: 'Kontak', type: 'link', path: '/kontak' },
  ];

  // Daftar bank tambahan
  // const additionalBanks = [
  //   {
  //     value: 'bca',
  //     name: 'Bank BCA',
  //     logo: '/src/Assets/img/bca.jpg',
  //   },
  //   // ... bank lainnya
  // ];

  // Handler submit form
  const handleSubmit = (formData) => {
    // Validasi form
    const { namaDepan, namaBelakang, alamat, provinsi, kotaKabupaten, kecamatan, kelurahan, kodePos, metodePembayaran } = formData;

    if (!namaDepan || !namaBelakang || !alamat || !provinsi || !kotaKabupaten || !kecamatan || !kelurahan || !kodePos || !metodePembayaran) {
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
        navigation={navigation}
        buttonName="Profil User"
        useIcon={true}
        icon={<FiUserCheck size={24} />}
        backgroundColor="bg-white"
        textColor="text-black-500"
        hoverColor="hover:text-blue-500"
        buttonColor="bg-blue-500"
        buttonHoverColor="bg-blue-700"
      />

      <div className="flex-grow bg-blue-50 pt-24 pb-12 flex justify-center items-center">
        <PembayaranForm onSubmit={handleSubmit} produk={produk}  />
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

export default PembayaranPage;
