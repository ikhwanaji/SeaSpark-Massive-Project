import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Akun = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [profile, setProfile] = useState({
    gambar: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile`, {
          headers: {
            // Pastikan format Bearer
            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          },
        });
        setProfile(response.data.user);

        const profileImageUrl = response.data.user.gambar ? `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile-image/${response.data.user.gambar}` : null;

        setPreviewImage(profileImageUrl);
      } catch (error) {
        console.error('Gagal mengambil profil:', error);
      }
    };

    fetchProfile();
  }, [token]);

  const { logout } = useAuth();
  const handleLogout = () => {
    logout(); // Panggil fungsi logout dari konteks
    navigate('/'); // Navigasi ke halaman beranda setelah logout
  };

  return (
    <div className="py-12">
      <div className="flex flex-col items-center justify-center">
        <img src={previewImage || 'https://placehold.co/150x150'} alt="Tim Member" className="rounded-full h-64 w-64 object-cover" />
        <div className="flex flex-col justify-center items-stretch w-64 space-y-2 mt-10 font-semibold">
          <Link to="/PengaturanProfil" className="bg-blue-500 text-white w-full py-2 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300">
            Pengaturan Akun
          </Link>
          <button onClick={handleLogout} className="bg-blue-500 text-white w-full py-2 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300">
            Keluarkan Akun
          </button>
        </div>
      </div>
    </div>
  );
};

export default Akun;
