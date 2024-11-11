import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { FiUserCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Footer from '../Components/Footer';

function PembayaranPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // State untuk form
  const [formData, setFormData] = useState({
    namaDepan: '',
    namaBelakang: '',
    alamat: '',
    provinsi: '',
    kotaKabupaten: '',
    kecamatan: '',
    kelurahan: '',
    kodePos: '',
    metodePembayaran: '',
  });

  // State untuk dropdown metode pembayaran
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown
  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handler untuk perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Tutup dropdown setelah memilih metode pembayaran
    if (name === 'metodePembayaran') {
      setIsDropdownOpen(false);
    }
  };

  // Handler submit form
  const handleSubmit = (e) => {
    e.preventDefault();

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

  // Daftar bank tambahan
  const additionalBanks = [
    {
      value: 'bca',
      name: 'Bank BCA',
      logo: '/src/Assets/img/bca.jpg',
    },
    {
      value: 'bni',
      name: 'Bank BNI',
      logo: '/src/Assets/img/bni.jpg',
    },
    {
      value: 'cimb',
      name: 'Bank CIMB Niaga',
      logo: '/src/Assets/img/cimb.jpg',
    },
    {
      value: 'danamon',
      name: 'Bank Danamon',
      logo: '/src/Assets/img/danamon.jpg',
    },
  ];

  const navigation = [
    { name: 'Beranda', type: 'link', path: '/beranda-pengguna' },
    { name: 'Layanan', type: 'link', path: '/layanan' },
    { name: 'Pemesanan', type: 'link', path: '/pemesanan' },
    { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
    { name: 'Kontak', type: 'link', path: '/kontak' },
  ];

  const infoLinks = [
    { text: 'Beranda', path: '/beranda-pengguna', href: '#beranda' },
    { text: 'Layanan', path: '/layanan', href: '#layanan' },
    { text: 'Pemesanan', path: '/pemesanan', href: '#pemesanan' },
    { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
    { text: 'Kontak', path: '/kontak', href: '#kontak' },
  ];

  // Ambil data produk dari navigasi sebelumnya
  const produk = location.state?.produk;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        navigation={navigation}
        buttonName="Masuk"
        useIcon={true}
        icon={<FiUserCheck size={24} />}
        backgroundColor="bg-white"
        textColor="text-black-500"
        hoverColor="hover:text-blue-500"
        buttonColor="bg-blue-500"
        buttonHoverColor="bg-blue-700"
      />

      <div className="flex-grow bg-blue-50 pt-24 pb-12 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Detail Pembelian</h2>

          {/* Tampilkan ringkasan produk jika ada */}
          {produk && (
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <h3 className="font-semibold">Produk yang Dibeli</h3>
              <div className="flex items-center">
                <img src={produk.gambar} alt={produk.nama} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <p className="font-bold">{produk.nama}</p>
                  <p>Harga: Rp {produk.harga.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Nama Depan and Nama Belakang */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium">Nama Depan*</label>
                <input type="text" name="namaDepan" value={formData.namaDepan} onChange={handleChange} placeholder="Masukkan nama depan" className="border border-gray-300 rounded-md w-full p-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium">Nama Belakang*</label>
                <input type="text" name="namaBelakang" value={formData.namaBelakang} onChange={handleChange} placeholder="Masukkan nama belakang" className="border border-gray-300 rounded-md w-full p-2" required />
              </div>
            </div>

            {/* Alamat */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Alamat*</label>
              <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" className="border border-gray-300 rounded-md w-full p-2" required />
            </div>

            {/* Provinsi */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Provinsi*</label>
              <input type="text" name="provinsi" value={formData.provinsi} onChange={handleChange} placeholder="Provinsi" className="border border-gray-300 rounded-md w-full p-2" required />
            </div>

            {/* Kota/Kabupaten */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Kab/kota*</label>
              <input type="text" name="kotaKabupaten" value={formData.kotaKabupaten} onChange={handleChange} placeholder="Kab/kota" className="border border-gray-300 rounded-md w-full p-2" required />
            </div>

            {/* Kecamatan */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Kecamatan*</label>
              <input type="text" name="kecamatan" value={formData.kecamatan} onChange={handleChange} placeholder="Kecamatan" className="border border-gray-300 rounded-md w-full p-2" required />
            </div>

            {/* Kelurahan dan Kode Pos */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium">Kelurahan*</label>
                <input type="text" name="kelurahan" value={formData.kelurahan} onChange={handleChange} placeholder="Kelurahan" className="border border-gray-300 rounded-md w-full p-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium">Kode Pos*</label>
                <input type="number" name="kodePos" value={formData.kodePos} onChange={handleChange} placeholder="Kode Pos" className="border border-gray-300 rounded-md w-full p-2" required />
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold">Metode Pembayaran</h2>
              </div>
              <div className="text-sm text-gray-800 hover:underline flex justify-end items-center">
                <button type="button" onClick={handleButtonClick} className="text-sm text-gray-800 font-bold hover:underline flex items-center">
                  Lihat Selengkapnya
                  {isDropdownOpen ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
                </button>
              </div>
            </div>

            {/* Bank Selection */}
            <div className="mb-4">
              {/* Bank Utama */}
              <label className="flex items-center mb-2">
                <input type="radio" name="metodePembayaran" value="bri" checked={formData.metodePembayaran === 'bri'} onChange={handleChange} className="mr-2" />
                <img src="/src/Assets/img/bri.jpg" alt="Bank BRI" className="w-8 h-8 mr-2" />
                Bank BRI
              </label>
              <label className="flex items-center mb-2">
                <input type="radio" name="metodePembayaran" value="mandiri" checked={formData.metodePembayaran === 'mandiri'} onChange={handleChange} className="mr-2" />
                <img src="/src/Assets/img/mandiri.jpg" alt="Bank Mandiri" className="w-8 h-8 mr-2" />
                Bank Mandiri
              </label>

              {/* Dropdown Bank Tambahan */}
              {isDropdownOpen && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-md font-semibold mb-3">Bank Lainnya</h3>
                  {additionalBanks.map((bank) => (
                    <label key={bank.value} className="flex items-center mb-2">
                      <input type="radio" name="metodePembayaran" value={bank.value} checked={formData.metodePembayaran === bank.value} onChange={handleChange} className="mr-2" />
                      <img src={bank.logo} alt={bank.name} className="w-8 h-8 mr-2" />
                      {bank.name}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-md mt-4 hover:bg-blue-700">
              Pesan Sekarang
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer infoLinks={infoLinks} isUserPage={true} />
    </div>
  );
}

export default PembayaranPage;
