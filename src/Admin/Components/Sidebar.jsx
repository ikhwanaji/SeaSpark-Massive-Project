import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaUser, FaStore, FaChartBar, FaSignOutAlt, FaFileAlt, FaCreditCard, FaTags, FaBox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ currentPage }) => {
  const [selectedMenu, setSelectedMenu] = useState(currentPage);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Kategori Produk', icon: <FaTags className="w-5 h-5" />, to: '/kategori-produk' },
    { name: 'Manajemen Produk', icon: <FaStore className="w-5 h-5" />, to: '/manajemen-produk' },
    { name: 'Manajemen Paket', icon: <FaBox className="w-5 h-5" />, to: '/manajemen-paket' },
    { name: 'Daftar Pesanan', icon: <FaShoppingCart className="w-5 h-5" />, to: '/daftar-pesanan' },
    { name: 'Metode Pembayaran', icon: <FaCreditCard className="w-5 h-5" />, to: '/metode-pembayaran' },
    { name: 'Manajemen Artikel', icon: <FaFileAlt className="w-5 h-5" />, to: '/manajemen-artikel' },
    { name: 'Laporan Pengguna', icon: <FaChartBar className="w-5 h-5" />, to: '/laporan-pengguna' },
    { name: 'Manajemen User', icon: <FaUser className="w-5 h-5" />, to: '/manajemen-user' },
  ];

  useEffect(() => {
    setSelectedMenu(currentPage);
  }, [currentPage]);

  const handleMenuClick = (item) => {
    setSelectedMenu(item.name);
    navigate(item.to);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
  
    // Konfirmasi logout
    const confirmLogout = window.confirm('Apakah Anda yakin ingin logout?');
    if (!confirmLogout) return;
  
    if (!token) {
      // Jika tidak ada token, langsung arahkan ke login
      navigate('/login-admin');
      return;
    }
  
    try {
      // Panggil endpoint logout
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/admin/logout`, // Sesuaikan dengan route di backend
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sesuaikan dengan format yang digunakan di middleware
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Periksa respons dari backend
      if (response.data.status === 'success') {
        // Hapus token dari localStorage
        localStorage.removeItem('token');
  
        // Tampilkan pesan sukses
        alert(response.data.message || 'Logout berhasil');
  
        // Navigasi ke halaman login
        navigate('/login-admin');
      }
    } catch (error) {
      console.error('Logout error:', error);
  
      // Tangani berbagai skenario error
      if (error.response) {
        switch (error.response.status) {
          case 401: // Unauthorized
            alert('Sesi Anda telah berakhir. Silakan login kembali.');
            break;
          case 403: // Forbidden
            alert('Akses ditolak. Silakan login kembali.');
            break;
          default:
            alert(error.response.data.message || 'Terjadi kesalahan saat logout.');
        }
      } else if (error.request) {
        // Tidak ada respon dari server
        alert('Tidak ada koneksi ke server. Silakan periksa koneksi internet Anda.');
      } else {
        // Error lainnya
        alert('Terjadi kesalahan. Silakan coba lagi.');
      }
  
      // Hapus token dan navigasi ke login dalam kondisi apapun
      localStorage.removeItem('token');
      navigate('/login-admin');
    }
  };

  return (
    <aside className="bg-sky-600 text-white w-64 h-full p-4 relative">
      <ul>
        {menuItems.map((item) => (
          <li key={item.name} onClick={() => handleMenuClick(item)} className={`mb-4 font-semibold flex items-center cursor-pointer p-2 rounded-md ${selectedMenu === item.name ? 'bg-sky-400 text-sky-900' : 'hover:bg-sky-500'}`}>
            <span className="mr-2">{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 absolute bottom-0 left-0 w-full justify-center items-center font-medium p-2 cursor-pointer hover:bg-sky-700 bg-sky-900 mb-6 text-white" onClick={handleLogout}>
        <FaSignOutAlt className="w-5 h-5" />
        <span>Keluar</span>
      </div>
    </aside>
  );
};

export default Sidebar;
