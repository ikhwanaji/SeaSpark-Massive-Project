import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import Footer from '../Components/Footer';
import LayananKami from '../Components/LayananKami';
import TimKami from '../Components/Timkami';
import UlasanGrid from '../Components/UlasanGrid';
import CardProduk from '../Components/CardProduk';
import Button from '../Components/Button';

function Beranda() {
  const navigation = [
    { name: 'Beranda', type: 'scroll' },
    { name: 'Layanan', type: 'scroll' },
    { name: 'Ulasan', type: 'scroll' },
    { name: 'Tentang Kami', type: 'scroll' },
  ];

  const infoLinks = navigation
    .filter((nav) => nav.type === 'scroll')
    .map((nav) => ({
      href: `/#${nav.name.toLowerCase().replace(/\s+/g, '-')}`,
      text: nav.name,
    }));

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
      <Navbar navigation={navigation} buttonName="Masuk" backgroundColor="bg-white" textColor="text-black-500" hoverColor="hover:text-blue-500" buttonColor="bg-blue-500" buttonHoverColor="bg-blue-700" />
      <main>
        <section id="beranda">
          <HeroSection to="/login" />
        </section>
        <section id="layanan">
          <LayananKami to="/login" />
        </section>
        <section id="tentang-kami">
          <TimKami />
        </section>
        <section id="produk-kami">
          <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="text-center mb-12">
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
        <section id="ulasan">
          <UlasanGrid title="Ulasan" subtitle="Apa Pendapat Mereka??" cards={ulasanCards} />
        </section>
      </main>
      <Footer infoLinks={infoLinks} />
    </>
  );
}

export default Beranda;
