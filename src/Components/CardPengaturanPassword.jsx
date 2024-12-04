import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext'; // Sesuaikan path

const PasswordPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        nama: '',
        email: '',
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

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // Validasi input di frontend
        if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Semua field harus diisi'
            });
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Konfirmasi password tidak sesuai'
            });
            return;
        }

        try {
            // Kirim request ke backend
            const response = await axios.put(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/change-password`, 
                {
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                    confirmPassword: passwords.confirmPassword
                },
                {
                    headers: {
                        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                    }
                }
            );

            // Tampilkan pesan sukses
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: response.data.message
            }).then(() => {
                // Redirect ke halaman Pengaturan Profil
                navigate('/PengaturanProfil');
            });

        } catch (error) {
            // Tangani error dari backend
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: error.response?.data?.message || 'Gagal mengubah password'
            });
        }
    };

    return (
        <div className="p-8 min-h-screen w-full flex flex-col">
            <div className="relative w-full h-60 bg-cover bg-center rounded-t-lg mt-8" 
                    style={{ backgroundImage: 'url(/src/Assets/img/HeroSection.jpg)' }}>
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
                    <img src={previewImage || 'https://placehold.co/150x150'} alt="Profile" className="w-48 h-48 rounded-full border-4 border-gray-100 object-cover" />
                </div>
            </div>

            <div className="mt-20 text-center">
                {/* User Name and Email */}
                <div className="justify-center mt-8">
                    <h1 className="text-3xl font-bold">{profile.nama}</h1>
                    <p className="text-gray-500 font-semibold">{profile.email}</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center mt-8 space-x-8">
                    <Link to="/PengaturanProfil" className="text-black hover:text-blue-500 font-semibold">Profil</Link>
                    <Link to="/PengaturanPassword" className="text-blue-500 font-semibold border-b-2 border-blue-500">Kata Sandi</Link>
                    <Link to="/PengaturanNotifikasi" className="text-black hover:text-blue-500 font-semibold">Notifikasi</Link>
                </div>

                {/* Password Form */}
                <form onSubmit={handleChangePassword} className="mt-8 bg-gray-100 shadow-md rounded-lg p-8 w-full mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="relative col-span-2 mb-4">
                            <label className="block text-black mb-2 text-left">Kata Sandi Lama</label>
                            <input 
                                type="password" 
                                name="currentPassword"
                                value={passwords.currentPassword}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Masukkan kata sandi lama"
                                required
                            />
                        </div>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:col-span-2 mb-2">
                            <div className="relative flex-1">
                                <label className="block text-black mb-2 text-left">Kata Sandi Baru</label>
                                <input 
                                    type="password" 
                                    name="newPassword"
                                    value={passwords.newPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="Masukkan kata sandi baru"
                                    required
                                />
                            </div>
                            <div className="relative flex-1">
                                <label className="block text-black mb-2 text-left">Konfirmasi Kata Sandi</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword"
                                    value={passwords.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="Konfirmasi kata sandi baru"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-12 font-semibold">
                        <button 
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300"
                        >
                            Simpan Perubahan
                        </button>
                        <Link to="/akun" className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Keluar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordPage;