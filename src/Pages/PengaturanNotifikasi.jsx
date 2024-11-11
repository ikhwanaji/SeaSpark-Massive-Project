import React from 'react';
import Navbar from '../Components/Navbar';
import { FiUserCheck } from 'react-icons/fi';
import CardPengaturanNotifikasi from '../Components/CardPengaturanNotifikasi';

const navigation = [
  { name: 'Beranda', type: 'link', path: '/beranda-pengguna' },
  { name: 'Layanan', type: 'link', path: '/layanan' },
  { name: 'Pemesanan', type: 'link', path: '/pemesanan' },
  { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
  { name: 'Kontak', type: 'link', path: '/kontak' },
];

const PengaturanNotifikasi = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
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

            {/* Main content */}
            <div className="flex-grow w-full px-8 py-8 bg-gray-100">
                <div className="flex items-center justify-center w-full">
                    <CardPengaturanNotifikasi />
                </div>
            </div>
        </div>
    );
};

export default PengaturanNotifikasi;
