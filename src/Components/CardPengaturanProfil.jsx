import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext'; // Sesuaikan path

const ProfilePage = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nama: '',
    email: '',
    alamat: '',
    no_hp: '',
    gambar: null,
  });
  const [initialProfile, setInitialProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [initialPreviewImage, setInitialPreviewImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile`, {
          headers: {
            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          },
        });

        const mergedProfile = {
          ...response.data.user,
          nama: response.data.user.nama || user?.nama || user?.name,
          email: response.data.user.email || user?.email,
          alamat: response.data.user.alamat || '',
          no_hp: response.data.user.no_hp || '',
        };

        setProfile(mergedProfile);
        setInitialProfile(mergedProfile);

        const profileImageUrl = response.data.user.gambar ? `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile-image/${response.data.user.gambar}` : user?.picture || user?.gambar || null;

        setPreviewImage(profileImageUrl);
        setInitialPreviewImage(profileImageUrl);
      } catch (error) {
        console.error('Gagal mengambil profil:', error);
        if (user) {
          const fallbackProfile = {
            nama: user.nama || user.name,
            email: user.email,
            alamat: '',
            no_hp: '',
            gambar: user.picture || user.gambar,
          };
          setProfile(fallbackProfile);
          setInitialProfile(fallbackProfile);
          setPreviewImage(user.picture || user.gambar);
          setInitialPreviewImage(user.picture || user.gambar);
        }
      }
    };

    fetchProfile();
  }, [token, user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setProfile(initialProfile);
    setPreviewImage(initialPreviewImage);
    setSelectedFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('gambar', selectedFile);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      const newImageUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile-image/${response.data.data.gambar}`;
      setProfile((prev) => ({ ...prev, gambar: response.data.data.gambar }));
      setInitialProfile((prev) => ({ ...prev, gambar: response.data.data.gambar }));
      setPreviewImage(newImageUrl);
      setInitialPreviewImage(newImageUrl);
      setSelectedFile(null);
      Swal.fire('Berhasil', 'Foto profil berhasil diunggah.', 'success');
    } catch (error) {
      console.error('Gagal mengunggah gambar:', error);
      Swal.fire('Gagal', error.response?.data?.message || 'Gagal mengunggah gambar', 'error');
    }
  };

  const handleDeleteImage = async () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus foto profil ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile/upload-image`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire('Berhasil!', 'Foto profil telah dihapus.', 'success');
          setProfile((prev) => ({ ...prev, gambar: null }));
          setInitialProfile((prev) => ({ ...prev, gambar: null }));
          setPreviewImage(null);
          setInitialPreviewImage(null);
        } catch (error) {
          Swal.fire('Gagal!', error.response?.data?.message || 'Gagal menghapus gambar.', 'error');
          console.error('Gagal menghapus gambar:', error);
        }
      }
    });
  };

  const handleSaveProfile = async () => {
    if (!profile.nama || !profile.email) {
      Swal.fire('Peringatan!', 'Nama dan Email tidak boleh kosong.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Sedang Menyimpan...',
      text: 'Mohon tunggu',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      if (selectedFile) {
        await handleUploadImage();
      }

      const response = await axios.put(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire('Berhasil!', 'Profil berhasil diperbarui.', 'success');
      setProfile(response.data.user);
      setInitialProfile(response.data.user);
      setIsEditing(false);
      setSelectedFile(null);
    } catch (error) {
      Swal.fire('Gagal!', error.response?.data?.message || 'Gagal memperbarui profil.', 'error');
      console.error('Gagal memperbarui profil:', error);
    }
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
          {/* --- BAGIAN FOTO PROFIL & TOMBOL EDIT --- */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <img src={previewImage || 'https://placehold.co/150x150'} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              {isEditing && (
                <div className="flex flex-row justify-center items-stretch font-semibold space-x-2">
                  <label htmlFor="imageUpload" className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 cursor-pointer">
                    Unggah foto baru
                    <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                  {selectedFile && (
                    <button onClick={handleUploadImage} className="bg-green-500 text-white py-2 px-4 rounded-lg">
                      Simpan Foto
                    </button>
                  )}
                  <button onClick={handleDeleteImage} className="bg-gray-300 text-black py-2 px-4 rounded-lg text-center hover:bg-red-500 hover:text-white transition-colors duration-300">
                    Hapus
                  </button>
                </div>
              )}
            </div>
            {!isEditing && (
              <button onClick={handleEditClick} className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                </svg>
              </button>
            )}
          </div>

          {/* --- FORM FIELDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-black mb-2 text-left">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={profile.nama}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? 'bg-gray-200 border-gray-200 cursor-default' : 'border-gray-400'}`}
              />
            </div>
            <div>
              <label className="block text-black mb-2 text-left">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? 'bg-gray-200 border-gray-200 cursor-default' : 'border-gray-400'}`}
              />
            </div>
            <div>
              <label className="block text-black mb-2 text-left">Alamat</label>
              <input
                type="text"
                name="alamat"
                value={profile.alamat || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? 'bg-gray-200 border-gray-200 cursor-default' : 'border-gray-400'}`}
              />
            </div>
            <div>
              <label className="block text-black mb-2 text-left">No. Hp</label>
              <input
                type="text"
                name="no_hp"
                value={profile.no_hp || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? 'bg-gray-200 border-gray-200 cursor-default' : 'border-gray-400'}`}
              />
            </div>
          </div>

          {/* --- TOMBOL AKSI --- */}
          <div className="flex justify-end space-x-4 mt-6 font-semibold">
            {isEditing && (
              <>
                <button onClick={handleCancelClick} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">
                  Batal
                </button>
                <button onClick={handleSaveProfile} className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300">
                  Simpan Perubahan
                </button>
              </>
            )}
            {/* Tombol Keluar selalu terlihat */}
            <Link to="/akun" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400">
              Keluar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
