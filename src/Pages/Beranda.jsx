import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import Footer from '../Components/Footer';

function Beranda() {
  const navigation = [{ name: 'Beranda' }, { name: 'Layanan' }, { name: 'Ulasan' }, { name: 'Tentang Kami' }];

  const infoLinks = navigation.map((nav) => ({
    href: `/#${nav.name.toLowerCase().replace(/\s+/g, '-')}`,
    text: nav.name,
  }));

  return (
    <>
      <Navbar navigation={navigation} />
      <main>
        <section id="beranda">
          <HeroSection />
        </section>
        <section id="layanan">
          <HeroSection />
        </section>
        <section id="ulasan">{/* Konten Ulasan */}</section>
        <section id="tentang-kami">{/* Konten Tentang Kami */}</section>
      </main>
      <Footer infoLinks={infoLinks} />
    </>
  );
}

export default Beranda;
