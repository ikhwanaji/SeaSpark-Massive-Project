import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NotifikasiPage() {
    const [settings, setSettings] = useState({
        orderStatus: true,
        articleUpdates: true,
        productOffers: true,
        discountPromo: true,
        shippingUpdates: true,
    });

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: checked,
        }));
    };

    return (
        <div className="p-8 min-h-screen w-full flex flex-col">
            <div 
                className="relative w-full h-60 bg-cover bg-center rounded-t-lg mt-8" 
                style={{ backgroundImage: 'url(/src/Assets/img/HeroSection.jpg)' }}
            >
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
                    <img 
                        src="/src/Assets/img/timkami.jpg" 
                        alt="Profile" 
                        className="w-48 h-48 rounded-full border-4 border-gray-100 object-cover" 
                    />
                </div>
            </div>

            <div className="mt-20">
                {/* User Name and Email */}
                <div className="justify-center text-center mt-8">
                    <h1 className="text-3xl font-bold">Alexa Rawles</h1>
                    <p className="text-gray-500 font-semibold">alexarawles78@gmail.com</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center mt-8 space-x-8">
                    <Link to="/PengaturanProfil" className="text-black hover:text-blue-500 font-semibold">Profil</Link>
                    <Link to="/PengaturanPassword" className="text-black hover:text-blue-500 font-semibold">Kata Sandi</Link>
                    <Link to="/PengaturanNotifikasi" className="text-blue-500 font-semibold border-b-2 border-blue-500">Notifikasi</Link>
                </div>

                <div className="mt-8 bg-gray-100 shadow-md rounded-lg p-8 w-full mx-auto">
                    <div className="flex items-left space-x-2 ml-12">
                        <h2 className="text-lg font-semibold mb-8">
                            Notifikasi & Pemberitahuan
                        </h2>
                    </div>
                    <div className="flex items-left space-x-2 ml-20">
                        <p className="text-gray-700">Email saya ketika:</p>
                    </div>
                    <div className="p-6 ml-24">
                        <div className="space-y-3">
                            <label className="flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    name="orderStatus" 
                                    checked={settings.orderStatus} 
                                    onChange={handleChange} 
                                    className="form-checkbox text-blue-500" 
                                />
                                <span className="text-gray-700">Ada pembaruan status pesanan saya</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    name="articleUpdates" 
                                    checked={settings.articleUpdates} 
                                    onChange={handleChange} 
                                    className="form-checkbox text-blue-500" 
                                />
                                <span className="text-gray-700">Dapatkan pemberitahuan artikel atau pembaruan produk terbaru</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    name="productOffers" 
                                    checked={settings.productOffers} 
                                    onChange={handleChange} 
                                    className="form-checkbox text-blue-500" 
                                />
                                <span className="text-gray-700">Mendapatkan notifikasi penawaran atau rekomendasi produk terbaik</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    name="discountPromo" 
                                    checked={settings.discountPromo} 
                                    onChange={handleChange} 
                                    className="form-checkbox text-blue-500" 
                                />
                                <span className="text-gray-700">Dapatkan pemberitahuan ketika ada diskon atau promo baru yang diadakan</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    name="shippingUpdates" 
                                    checked={settings.shippingUpdates} 
                                    onChange={handleChange} 
                                    className="form-checkbox text-blue-500" 
                                />
                                <span className="text-gray-700">Ada pembaruan status pengiriman untuk pesanan saya</span>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-12 font-semibold mr-12">
                        <Link 
                            to="/akun" 
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300"
                        >
                            Simpan Perubahan
                        </Link>
                        <Link 
                            to="/akun" 
                            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Keluar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotifikasiPage;
