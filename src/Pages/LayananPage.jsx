import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/CardLayanan';
import { useAuth } from '../context/AuthContext';
import bakteriImg from '../Assets/img/bakteri.png';
import jamurImg from '../Assets/img/jamur.png';
import virusImg from '../Assets/img/virus.png';
import parasitImg from '../Assets/img/parasit.png';
import nutrisiImg from '../Assets/img/nutrisi.png';

const Layanan = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [penyakitData, setPenyakitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kategori gambar default mapping
  const defaultImages = {
    Bakteri: bakteriImg,
    Jamur: jamurImg,
    Virus: virusImg,
    Parasit: parasitImg,
    Nutrisi: nutrisiImg,
  };

  useEffect(() => {
    const fetchPenyakit = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/penyakit/getallPenyakit`);
        setPenyakitData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching penyakit data:', err);
        setError('Gagal memuat data penyakit');
        setLoading(false);
      }
    };

    fetchPenyakit();
  }, []);

  const infoLinks = [
    {
      text: 'Beranda',
      path: location.pathname === '/tentang-kami' ? '/' : '/',
      href: location.pathname === '/' ? '#beranda' : '/',
    },
    {
      text: 'Layanan',
      path: '/layanan',
      href: location.pathname === '/' ? '#layanan' : '/layanan',
    },
    {
      text: 'Produk',
      path: '/produk',
      href: location.pathname === '/' ? '#produk' : '/produk',
    },
    {
      text: 'Tentang Kami',
      path: '/tentang-kami',
      href: location.pathname === '/' ? '#tentang-kami' : '/tentang-kami',
    },
    {
      text: 'Kontak',
      path: '/kontak',
      href: location.pathname === '/' ? '#kontak' : '/kontak',
    },
  ];

  const getImageForPenyakit = (penyakit) => {
    
    if (penyakit.gambar) {
      return `${import.meta.env.VITE_BACKEND_URL}/penyakit/images/${penyakit.gambar}`;
    }

    
    return defaultImages[penyakit.kategori] || bakteriImg; // Default to bakteri if category not found
  };

  //function untuk menampilkan data penyakit 3 array saja
  const formatPenyebab = (penyebabText) => {
    if (!penyebabText) return '';

    
    let penyebabArray = [];
    try {
      if (penyebabText.startsWith('[') && penyebabText.endsWith(']')) {
        penyebabArray = JSON.parse(penyebabText);
      } else {
        // If not JSON, split by commas or other delimiter if needed
        penyebabArray = penyebabText.split(',');
      }
    } catch (err) {
      // If parsing fails, treat as plain text
      return penyebabText;
    }

    // Take only first 3 items
    const limitedArray = penyebabArray.slice(0, 3);

    // Join without quotes or brackets
    return limitedArray.join(', ');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />
      <div className="flex-grow bg-blue-100 py-20">
        <div className="text-center text-2xl pt-10 font-extrabold text-gray-800">
          <h1>Penyakit Ikan Kerapu</h1>
        </div>
        <div className="p-6 flex flex-col items-center gap-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Memuat data penyakit...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            penyakitData.map((penyakit) => (
              <div key={penyakit.PenyakitId} className="w-full max-w-xl">
                <Card
                  id={penyakit.PenyakitId.toString()}
                  imageSrc={getImageForPenyakit(penyakit)}
                  title={`Penyakit ${penyakit.kategori}: ${penyakit.nama}`}
                  description={`Penyebab Penyakit: ${formatPenyebab(penyakit.penyebab)}`}
                  linkText="Baca lebih lanjut..."
                />
              </div>
            ))
          )}
        </div>
      </div>
      <Footer infoLinks={infoLinks} isUserPage={true} />
    </div>
  );
};

export default Layanan;
