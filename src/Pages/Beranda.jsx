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
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      title: 'Ahmad Rizki',
      content: 'DoKer memberikan solusi yang tepat untuk masalah parasit pada ikan kerapu saya. Harga terjangkau dengan hasil yang memuaskan.',
      date: '02-02-2023',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      title: 'Siti Aminah',
      content: 'Berkat DoKer, saya bisa mendiagnosa penyakit ikan kerapu dengan cepat. Pelayanannya sangat professional dan produknya berkualitas.',
      date: '03-03-2023',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      title: 'Budi Santoso',
      content: 'Mudah digunakan dan sangat informatif. Saya jadi lebih paham tentang perawatan ikan kerapu yang baik dan benar.',
      date: '15-03-2023',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
      title: 'Dewi Anggraini',
      content: 'Paket produk dari DoKer sangat efektif mengatasi masalah jamur pada ikan kerapu. Hasilnya terlihat dalam waktu singkat.',
      date: '28-03-2023',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    {
      title: 'Rudi Hartono',
      content: 'DoKer adalah solusi terbaik untuk budidaya ikan kerapu. Konsultasi dengan ahlinya sangat membantu permasalahan saya.',
      date: '10-04-2023',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
  ];

  const products = [
    {
      image: 'https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg',
      title: 'PAKET BAKTERI',
      price: 'Rp. 800.000',
      description: 'Solusi lengkap untuk mengatasi infeksi bakteri pada ikan kerapu',
      rating: 4.8,
    },
    {
      image: 'https://storage.googleapis.com/a1aa/image/ZRr01s99tUKzM5ILf6aBsNUmv8bo6MlS8DIfOnmMreh1D8bnA.jpg',
      title: 'PAKET PARASIT',
      price: 'Rp. 500.000',
      description: 'Perlindungan efektif dari serangan parasit eksternal dan internal',
      rating: 4.6,
    },
    {
      image: 'https://storage.googleapis.com/a1aa/image/23Kbg3w9F6INNZNAnpW6ggu4uteCso7i7WrVTJ8pTcD8AftTA.jpg',
      title: 'PAKET JAMUR',
      price: 'Rp. 700.000',
      description: 'Formulasi khusus untuk mengatasi infeksi jamur pada ikan kerapu',
      rating: 4.7,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />

      <main className="flex-grow">
        <section id="beranda" className="relative">
          <HeroSection />
        </section>

        <section id="layanan">
          <LayananKami />
        </section>

        <section id="produk-kami" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Produk Terbaik Kami</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Solusi lengkap untuk kesehatan dan pertumbuhan optimal ikan kerapu Anda</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {products.map((product, index) => (
                <CardProduk key={index} image={product.image} title={product.title} price={product.price} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                buttonText="Pesan Sekarang"
                to={isLoggedIn ? '/produk/produk-paketan' : '/login'}
                className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center"
              />
            </div>
          </div>
        </section>

        <section id="tentang-kami">
          <TimKami />
        </section>

        <section id="ulasan" className="py-16 md:py-24 bg-blue-50">
          <UlasanGrid title="Ulasan Pelanggan" subtitle="Apa Pendapat Mereka Tentang DoKer?" cards={ulasanCards} />
        </section>
      </main>

      <Footer infoLinks={infoLinks} />
    </div>
  );
}

export default Beranda;
