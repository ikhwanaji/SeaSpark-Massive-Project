import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import Footer from '../Components/Footer';
import ProdukList from '../Components/ProdukList';
import KategoriProduct from '../Components/KategoriProduct';

function PemesananSatuan() {
  const navigate = useNavigate();

  const navigation = [
    { name: 'Beranda', type: 'link', path: '/beranda-pengguna' },
    { name: 'Layanan', type: 'link', path: '/layanan' },
    { name: 'Pemesanan', type: 'link', path: '/pemesanan' },
    { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
    { name: 'Kontak', type: 'link', path: '/kontak' },
  ];

  const infoLinks = [
    { text: 'Beranda', path: '/beranda-user', href: '#beranda' },
    { text: 'Layanan', path: '/layanan', href: '#layanan' },
    { text: 'Pemesanan', path: '/pemesanan', href: '#pemesanan' },
    { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
    { text: 'Kontak', path: '/kontak', href: '#kontak' },
  ];

  const [produkTerpilih, setProdukTerpilih] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const daftarProduk = [
    {
      id: 1,
      kategori: 'Alat',
      nama: 'Jaring Ikan Kantong',
      harga: 30000,
      gambar: 'https://placehold.co/150x150',
      deskripsi: 'Jaring ikan berkualitas untuk kegiatan perikanan',
      stok: 50
    },
    {
      id: 2,
      kategori: 'Buku Panduan',
      nama: 'Panduan Penyakit Parasit pada Ikan Kerapu: Identifikasi dan Pengobatan',
      harga: 100000,
      gambar: 'https://placehold.co/150x150',
      deskripsi: 'Buku panduan lengkap untuk identifikasi dan pengobatan penyakit ikan kerapu',
      stok: 20
    },
    {
      id: 3,
      kategori: 'Obat-Obatan',
      nama: 'Red Blue Dox',
      harga: 30000,
      gambar: 'https://placehold.co/150x150',
      deskripsi: 'Obat untuk mengatasi penyakit ikan',
      stok: 100
    },
    {
      id: 4,
      kategori: 'Obat-Obatan',
      nama: 'Vitamin Ikan',
      harga: 30000,
      gambar: 'https://placehold.co/150x150',
      deskripsi: 'Suplemen untuk meningkatkan kesehatan ikan',
      stok: 75
    },
    {
      id: 5,
      kategori: 'Obat-Obatan',
      nama: 'Antibiotik Ikan',
      harga: 50000,
      gambar: 'https://placehold.co/150x150',
      deskripsi: 'Obat untuk mengobati infeksi bakteri pada ikan',
      stok: 60
    },
  ];

  const handleBeli = (produk) => {
    // Navigasi ke halaman pembayaran dengan membawa data produk
    navigate('/pembayaran', { 
      state: { 
        produk: produk 
      } 
    });
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryName)) {
        return prevCategories.filter((cat) => cat !== categoryName);
      } else {
        return [...prevCategories, categoryName];
      }
    });
  };

  const categories = [
    { 
      name: 'Alat', 
      count: daftarProduk.filter((p) => p.kategori === 'Alat').length, 
      onSelect: handleCategorySelect 
    },
    { 
      name: 'Obat-Obatan', 
      count: daftarProduk.filter((p) => p.kategori === 'Obat-Obatan').length, 
      onSelect: handleCategorySelect 
    },
    { 
      name: 'Buku Panduan', 
      count: daftarProduk.filter((p) => p.kategori === 'Buku Panduan').length, 
      onSelect: handleCategorySelect 
    },
  ];

  const filteredProduk = selectedCategories.length > 0 
    ? daftarProduk.filter((produk) => selectedCategories.includes(produk.kategori)) 
    : daftarProduk;

  return (
    <>
      <div className="flex flex-col min-h-screen">
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
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Pemesanan Satuan</h1>
          <div className="flex gap-14">
            <div className="w-1/6 sticky top-4">
              <KategoriProduct categories={categories} />
            </div>
            <div className="w-4/5 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-wrap -mx-4">
                {filteredProduk.map((produk) => (
                  <ProdukList 
                    key={produk.id} 
                    {...produk} 
                    onBeli={handleBeli} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer infoLinks={infoLinks} isUserPage={true} />
    </>
  );
}

export default PemesananSatuan;