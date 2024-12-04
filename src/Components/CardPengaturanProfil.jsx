import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext'; // Sesuaikan path

const ProfilePage = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    nama: '',
    email: '',
    alamat: '',
    no_hp: '',
    gambar: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Ambil profil saat komponen dimuat
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

  // Handler untuk perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler untuk unggah gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Buat preview gambar
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handler untuk mengunggah gambar
  const handleUploadImage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('gambar', selectedFile);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
        },
      });

      // Update preview gambar
      setProfile((prev) => ({
        ...prev,
        gambar: response.data.data.gambar,
      }));
      setSelectedFile(null);
    } catch (error) {
      console.error('Gagal mengunggah gambar:', error);
      alert(error.response?.data?.message || 'Gagal mengunggah gambar');
    }
  };

  // Handler untuk menghapus gambar
  const handleDeleteImage = async () => {
    // Tampilkan konfirmasi menggunakan SweetAlert2
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus foto profil ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile/upload-image`, {
            headers: {
              Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            },
          });

          // Tampilkan pesan sukses
          Swal.fire({
            title: 'Berhasil!',
            text: 'Foto profil telah dihapus.',
            icon: 'success',
          });

          // Reset state gambar
          setProfile((prev) => ({
            ...prev,
            gambar: null,
          }));
          setPreviewImage(null);
        } catch (error) {
          // Tampilkan pesan error
          Swal.fire({
            title: 'Gagal!',
            text: error.response?.data?.message || 'Gagal menghapus gambar',
            icon: 'error',
          });
          console.error('Gagal menghapus gambar:', error);
        }
      }
    });
  };

  // Handler untuk menyimpan perubahan profil
  const handleSaveProfile = async () => {
    // Validasi input sebelum menyimpan
    if (!profile.nama || !profile.email) {
      Swal.fire({
        title: 'Peringatan!',
        text: 'Nama dan Email tidak boleh kosong',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    // Konfirmasi penyimpanan
    Swal.fire({
      title: 'Simpan Perubahan?',
      text: 'Anda akan menyimpan perubahan profil',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Simpan!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Tampilkan loading
          Swal.fire({
            title: 'Sedang Menyimpan...',
            text: 'Mohon tunggu',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          const response = await axios.put(
            `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile`, 
            profile
          );

          // Tutup loading dan tampilkan sukses
          Swal.fire({
            title: 'Berhasil!',
            text: 'Profil berhasil diperbarui',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          // Update profil lokal
          setProfile(response.data.user);
        } catch (error) {
          // Tampilkan pesan error
          Swal.fire({
            title: 'Gagal!',
            text: error.response?.data?.message || 'Gagal memperbarui profil',
            icon: 'error',
            confirmButtonText: 'Coba Lagi'
          });
          console.error('Gagal memperbarui profil:', error);
        }
      }
    });
  };

  
  

  return (
    <div className="p-8 min-h-screen w-full flex flex-col">
      <div className="relative w-full h-60 bg-cover bg-center rounded-t-lg mt-8" style={{ backgroundImage: 'url(/src/Assets/img/HeroSection.jpg)' }}>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
          <img src={previewImage || 'https://placehold.co/150x150'} alt="Profile" className="w-48 h-48 rounded-full border-4 border-gray-100 object-cover" />
        </div>
      </div>
      <div className="mt-20 text-center">
        <div className="justify-center mt-8">
          <h1 className="text-3xl font-bold">{profile.nama}</h1>
          <p className="text-gray-500 font-semibold">{profile.email}</p>
        </div>

        {/* Navigation Tabs - sama seperti sebelumnya */}
        <div className="flex justify-center mt-8 space-x-8">
          <Link to="/PengaturanProfil" className="text-blue-500 font-semibold border-b-2 border-blue-500">
            Profil
          </Link>
          <Link to="/PengaturanPassword" className="text-black hover:text-blue-500 font-semibold">
            Kata Sandi
          </Link>
          <Link to="/PengaturanNotifikasi" className="text-black hover:text-blue-500 font-semibold">
            Notifikasi
          </Link>
        </div>

        <div className="mt-8 bg-gray-100 shadow-md rounded-lg p-8 w-full mx-auto">
          <div className="flex items-center space-x-4">
            <img src={previewImage || 'https://placehold.co/150x150'} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
            <div className="flex flex-row justify-center items-stretch font-semibold space-x-2">
              <label htmlFor="imageUpload" className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 cursor-pointer">
                Unggah foto baru
                <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
              {selectedFile && (
                <button onClick={handleUploadImage} className="bg-green-500 text-white py-2 px-4 rounded-lg">
                  Simpan
                </button>
              )}
              <button onClick={handleDeleteImage} className="bg-gray-300 text-black py-2 px-4 rounded-lg text-center hover:bg-red-500 hover:text-white transition-colors duration-300">
                Hapus
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="relative">
              <label className="block text-black mb-2 text-left">Nama Lengkap</label>
              <input type="text" name="nama" value={profile.nama} onChange={handleInputChange} className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="relative">
              <label className="block text-black mb-2 text-left">Email</label>
              <input type="email" name="email" value={profile.email} onChange={handleInputChange} className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="relative">
              <label className="block text-black mb-2 text-left">Alamat</label>
              <input type="text" name="alamat" value={profile.alamat || ''} onChange={handleInputChange} className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="relative">
              <label className="block text-black mb-2 text-left">No. Hp</label>
              <input type="text" name="no_hp" value={profile.no_hp || ''} onChange={handleInputChange} className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6 font-semibold">
            <button onClick={handleSaveProfile} className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300">
              Simpan Perubahan
            </button>
            <Link to="/akun" className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Keluar</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
