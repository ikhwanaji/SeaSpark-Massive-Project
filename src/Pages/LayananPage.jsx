import React from 'react'
import Navbar from '../Components/Navbar'
import { FiUserCheck } from 'react-icons/fi';

function LayananPage() {
    const navigation = [
        { name: 'Beranda', type: 'link', path: '/beranda-user' },
        { name: 'Layanan', type: 'link', path: '/layanan' },
        { name: 'Pemesanan', type: 'link', path: '/pemesanan' },
        { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
        { name: 'Kontak', type: 'link', path: '/kontak' },
      ];
  return (
    <div>
      <Navbar 
      navigation={navigation}
      buttonName="Profil User"
      useIcon={true}
      icon={<FiUserCheck size={24} />}
      backgroundColor="bg-gray-100"
      textColor="text-black-500"
      hoverColor="hover:text-blue-500"
      buttonColor="bg-blue-500"
      buttonHoverColor="bg-blue-700"
      />
    </div>
  )
}

export default LayananPage
