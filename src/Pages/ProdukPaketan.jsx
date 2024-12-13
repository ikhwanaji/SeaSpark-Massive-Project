import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import CardPaketan from '../Components/CardPaketan';
import Footer from '../Components/Footer';
import { useAuth } from '../context/AuthContext';

function ProdukPaketan() {
  const { isLoggedIn, user, logout } = useAuth();
  const [paketan, setPaketan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const infoLinks = [
    { text: 'Beranda', path: '/beranda-user', href: '#beranda' },
    { text: 'Layanan', path: '/layanan', href: '#layanan' },
    { text: 'Produk', path: '/produk', href: '#produk' },
    { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
    { text: 'Kontak', path: '/kontak', href: '#kontak' },
  ];

  useEffect(() => {
    const fetchPaketan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/paket`);
        
        // Transform data untuk memastikan kompatibilitas
        const transformedPaketan = response.data.map((paket, index) => ({
          paketId: paket.paketId || index, // Fallback ke index jika tidak ada id
          title: paket.title,
          price: `Rp.${paket.harga.toLocaleString()}`,
          image: `${import.meta.env.VITE_BACKEND_URL}/paket/images/${paket.gambar}`,
          items: Array.isArray(paket.items) 
            ? paket.items 
            : JSON.parse(paket.items || '[]')
        }));

        // Debug log
        console.log('Transformed Paketan:', transformedPaketan);

        setPaketan(transformedPaketan);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching paket:', error);
        setError('Gagal mengambil data paket');
        setLoading(false);
      }
    };

    fetchPaketan();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar
          buttonName={isLoggedIn ? 'Keluar' : 'Masuk'}
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={logout}
        />
        <div className="bg-blue-50 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Pemesanan Paketan</h1>
            <div className="flex flex-wrap justify-center gap-8">
              {paketan.map((pkg, index) => (
                <CardPaketan 
                  key={pkg.paketId || index} // Fallback ke index jika tidak ada paketId
                  paketId={pkg.paketId || index}
                  title={pkg.title} 
                  price={pkg.price} 
                  image={pkg.image} 
                  items={pkg.items} 
                />
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