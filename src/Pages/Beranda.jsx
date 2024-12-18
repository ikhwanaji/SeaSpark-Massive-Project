import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import Footer from '../Components/Footer';
import LayananKami from '../Components/LayananKami';
import TimKami from '../Components/TimKami';
import UlasanGrid from '../Components/UlasanGrid';
import CardProduk from '../Components/CardProduk';
import Button from '../Components/Button';
import { useAuth } from '../context/AuthContext';

function Beranda() {
  const { isLoggedIn, user, logout } = useAuth();

  const infoLinks = [
    { text: 'Beranda', path: '/beranda-pengguna', href: '#beranda' },
    { text: 'Layanan', path: '/layanan', href: '#layanan' },
    { text: 'Produk', path: '/produk', href: '#produk-kami' },
    { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
    { text: 'Kontak', path: '/kontak', href: '#kontak' },
  ];

  const ulasanCards = [
    {
      title: 'Doni Putra',
      content: 'Setelah menggunakan layanan DoKer ini, kondisi ikan kerapu saya membaik secara signifikan. Saya merasa lebih percaya diri dalam merawat ikan saya.',
      date: '27-01-2023',
    },
    {
      title: 'Doni Putra',
      content: 'Setelah menggunakan layanan DoKer ini, kondisi ikan kerapu saya membaik secara signifikan. Saya merasa lebih percaya diri dalam merawat ikan saya.',
      date: '02-02-2023',
    },
    {
      title: 'Doni Putra',
      content: 'Setelah menggunakan layanan DoKer ini, kondisi ikan kerapu saya membaik secara signifikan. Saya merasa lebih percaya diri dalam merawat ikan saya.',
      date: '03-03-2023',
    },
    {
      title: 'Doni Putra',
      content: 'Setelah menggunakan layanan DoKer ini, kondisi ikan kerapu saya membaik secara signifikan. Saya merasa lebih percaya diri dalam merawat ikan saya.',
      date: '03-03-2023',
    },
    {
      title: 'Doni Putra',
      content: 'Setelah menggunakan layanan DoKer ini, kondisi ikan kerapu saya membaik secara signifikan. Saya merasa lebih percaya diri dalam merawat ikan saya.',
      date: '03-03-2023',
    },
    {
      title: 'Doni Putra',
      content: 'Setelah menggunakan layanan DoKer ini, kondisi ikan kerapu saya membaik secara signifikan. Saya merasa lebih percaya diri dalam merawat ikan saya.',
      date: '03-03-2023',
    },
  ];

  const products = [
    {
      image: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg',
      title: 'PAKET BAKTERI',
      price: 'Rp. 800.000',
    },
    {
      image: 'https://storage.googleapis.com/a1aa/image/ZRr01s99tUKzM5ILf6aBsNUmv8bo6MlS8DIfOnmMreh1D8bnA.jpg',
      title: 'PAKET PARASIT',
      price: 'Rp. 500.000',
    },
    {
      image: 'https://storage.googleapis.com/a1aa/image/23Kbg3w9F6INNZNAnpW6ggu4uteCso7i7WrVTJ8pTcD8AftTA.jpg',
      title: 'PAKET JAMUR',
      price: 'Rp. 700.000',
    },
  ];

  return (
    <>
      <Navbar
        buttonName={isLoggedIn ? "Keluar" : "Masuk"} // Mengubah nama tombol berdasarkan status login
        // useIcon={isLoggedIn} // Gunakan icon jika sudah login
        // icon={isLoggedIn ? <FiUserCheck size={24} /> : null}
        // Tambahkan prop untuk status login
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout} // Pastikan fungsi logout dipanggil saat tombol diklik
      />
      <main>
        <section id="beranda">
          <HeroSection to="/login" />
        </section>
        <section id="layanan">
          <LayananKami />
        </section>
        <section id="produk-kami">
          <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="text-center mb-2">
              <h2 className="text-4xl font-bold text-gray-800">Produk Terbaik Kami</h2>
            </div>
            <div className="flex space-x-4 p-4 mb-6">
              {products.map((product, index) => (
                <CardProduk key={index} image={product.image} title={product.title} price={product.price} />
              ))}
            </div>
            <Button buttonText="Pesan Sekarang" to="/login" />
          </div>
        </section>
        <section id="tentang-kami">
          <TimKami />
        </section>
        <section id="ulasan">
          <UlasanGrid title="Ulasan" subtitle="Apa Pendapat Mereka??" cards={ulasanCards} />
        </section>
      </main>
      <Footer infoLinks={infoLinks} />
    </>
  );
}

export default Beranda;
