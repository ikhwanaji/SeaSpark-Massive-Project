import React from 'react';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import CardPaketan from '../Components/CardPaketan';
import Footer from '../Components/Footer';

function ProdukPaketan() {
  const navigation = [
    { name: 'Beranda', type: 'link', path: '/beranda-pengguna' },
    { name: 'Layanan', type: 'link', path: '/layanan' },
    { name: 'Produk', type: 'link', path: '/produk' },
    { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
    { name: 'Kontak', type: 'link', path: '/kontak' },
  ];

  const infoLinks = [
    { text: 'Beranda', path: '/beranda-user', href: '#beranda' },
    { text: 'Layanan', path: '/layanan', href: '#layanan' },
    { text: 'Produk', path: '/produk', href: '#produk' },
    { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
    { text: 'Kontak', path: '/kontak', href: '#kontak' },
  ];

  const Paketan = [
    {
      title: 'PAKET BAKTERI',
      price: 'Rp. 800.000',
      image: '/src/Assets/img/PaketBakteri.png',
      items: [
        'Buku panduan: Mengenal Penyakit Bakteri pada Ikan Kerapu',
        'Alat uji Kualitas Air: AquaTest Kit Complete',
        'Obat-obatan: Erythromycin Aquatic',
        'Probiotik dan suplemen: ProbiotikB Plus',
        'Perawatan luka: Marine Shrimp & Fish Wound Recovery Gel',
      ],
    },
    {
      title: 'PAKET PARASIT',
      price: 'Rp. 500.000',
      image: '/src/Assets/img/PaketParasit.png',
      items: ['Buku panduan: Penyakit Parasit pada Ikan Kerapu', 'Alat diagnose: Parasite Test Kit', 'Obat-obatan: Formalin', 'Probiotik dan suplemen: Vitamin C', 'Perawatan luka: Marine Kerapu Wound Healing Spray'],
    },
    {
      title: 'PAKET JAMUR',
      price: 'Rp. 700.000',
      image: '/src/Assets/img/PaketJamur.png',
      items: ['Buku panduan: Penyakit Jamur pada Ikan Kerapu', 'Alat diagnose: Fungal Test Kit', 'Obat-obatan: Copper sulfate', 'Probiotik dan suplemen: Omega-3', 'Perawatan luka: Marine Shrimp & Fish Wound Recovery Gel'],
    },
  ];
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
        <div className="bg-blue-50 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Pemesanan Paketan</h1>
            <div className="flex flex-wrap justify-center gap-8">
              {Paketan.map((pkg, index) => (
                <CardPaketan key={index} title={pkg.title} price={pkg.price} image={pkg.image} items={pkg.items} />
              ))}
            </div>
          </div>
        </div>
        <Footer infoLinks={infoLinks} isUserPage={true} />
      </div>
    </>
  );
}

export default ProdukPaketan;
