import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import Footer from '../Components/Footer';
import ProdukList from '../Components/ProdukList';
import KategoriProduct from '../Components/KategoriProduct';

function PemesananSatuan() {
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
    },
    {
      id: 2,
      kategori: 'Buku Panduan',
      nama: 'Panduan Penyakit Parasit pada Ikan Kerapu: Identifikasi dan Pengobatan',
      harga: 100000,
      gambar: 'https://placehold.co/150x150',
    },
    {
      id: 3,
      kategori: 'Obat-Obatan',
      nama: 'Red Blue Dox',
      harga: 30000,
      gambar: 'https://placehold.co/150x150',
    },
    {
      id: 4,
      kategori: 'Obat-Obatan',
      nama: 'Red Blue Dox',
      harga: 30000,
      gambar: 'https://placehold.co/150x150',
    },
    {
      id: 5,
      kategori: 'Obat-Obatan',
      nama: 'Red Blue Dox',
      harga: 30000,
      gambar: 'https://placehold.co/150x150',
    },
    // Tambahkan produk lainnya di sini
  ];

  const handleBeli = (produk) => {
    setProdukTerpilih(produk);
    console.log('Produk terpilih:', produk);
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
    { name: 'Alat', count: daftarProduk.filter((p) => p.kategori === 'Alat').length, onSelect: handleCategorySelect },
    { name: 'Obat-Obatan', count: daftarProduk.filter((p) => p.kategori === 'Obat-Obatan').length, onSelect: handleCategorySelect },
    { name: 'Buku Panduan', count: daftarProduk.filter((p) => p.kategori === 'Buku Panduan').length, onSelect: handleCategorySelect },
  ];

  const filteredProduk = selectedCategories.length > 0 ? daftarProduk.filter((produk) => selectedCategories.includes(produk.kategori)) : daftarProduk;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar
          navigation={navigation}
          buttonName="Profil User"
          useIcon={true}
          icon={<FiUserCheck size={24} />}
          backgroundColor="bg-gray-100"
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
                  <ProdukList key={produk.id} {...produk} onBeli={handleBeli} />
                ))}
              </div>
            </div>
          </div>
          {produkTerpilih && (
            <div className="mt-8 p-4 bg-green-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Produk Terpilih:</h2>
              <p>Nama: {produkTerpilih.nama}</p>
              <p>Harga: Rp {produkTerpilih.harga.toLocaleString()}</p>
            </div>
          )}
        </div>
        <Footer infoLinks={infoLinks} isUserPage={true} />
      </div>
    </>
  );
}

export default PemesananSatuan;
