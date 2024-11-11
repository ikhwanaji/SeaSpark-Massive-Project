import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    return (
        <div className="p-8 min-h-screen w-full flex flex-col">
            <div className="relative w-full h-60 bg-cover bg-center rounded-t-lg mt-8" 
                    style={{ backgroundImage: 'url(/src/Assets/img/HeroSection.jpg)' }}>
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
                    <img src="/src/Assets/img/timkami.jpg" alt="Profile" className="w-48 h-48 rounded-full border-4 border-white object-cover" />
                </div>
            </div>

            <div className="mt-20 text-center">
                {/* User Name and Email */}
                <div className="justify-center mt-8">
                    <h1 className="text-3xl font-bold">Alexa Rawles</h1>
                    <p className="text-gray-500 font-semibold">alexarawles78@gmail.com</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center mt-8 space-x-8">
                    <Link to="/PengaturanProfil" className="text-blue-500 font-semibold border-b-2 border-blue-500">Profil</Link>
                    <Link to="/PengaturanPassword" className="text-black hover:text-blue-500 font-semibold">Kata Sandi</Link>
                    <Link to="/PengaturanNotifikasi" className="text-black hover:text-blue-500 font-semibold">Notifikasi</Link>
                </div>

                {/* Profile Form */}
                <div className="mt-8 bg-gray-100 shadow-md rounded-lg p-8 w-full mx-auto">
                    <div className="flex items-center space-x-4">
                        <img src="/src/Assets/img/timkami.jpg" alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                        <div className="flex flex-row justify-center items-stretch font-semibold space-x-2">
                            <Link 
                                to="#" 
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300"
                            >
                                Unggah foto baru
                            </Link>
                            <Link 
                                to="/PengaturanAvatar" 
                                className="bg-gray-300 text-black py-2 px-4 rounded-lg text-center hover:bg-red-500 hover:text-white transition-colors duration-300"
                            >
                                Hapus
                            </Link>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="relative">
                            <label className="block text-black mb-2 text-left">Nama Lengkap</label>
                            <input 
                                type="text" 
                                value="Alexa Rawles" 
                                className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-black mb-2 text-left">Email</label>
                            <input 
                                type="email" 
                                value="alexarawles@gmail.com" 
                                className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-black mb-2 text-left">Nama Pengguna</label>
                            <input 
                                type="text" 
                                value="Alexa0220" 
                                className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-black mb-2 text-left">No. Hp</label>
                            <input 
                                type="text" 
                                value="081234567890" 
                                className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-6 font-semibold">
                        <Link 
                            to="/akun" 
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300"
                        >
                            Simpan Perubahan
                        </Link>
                        <Link to="/akun" className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Keluar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
