import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaUser, FaStore, FaChartBar, FaSignOutAlt, FaFileAlt, FaCreditCard, FaTags, FaBox, FaBars, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ currentPage }) => {
  const [selectedMenu, setSelectedMenu] = useState(currentPage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Kategori Produk', icon: <FaTags className="w-5 h-5" />, to: '/kategori-produk' },
    { name: 'Manajemen Produk', icon: <FaStore className="w-5 h-5" />, to: '/manajemen-produk' },
    { name: 'Manajemen Paket', icon: <FaBox className="w-5 h-5" />, to: '/manajemen-paket' },
    { name: 'Daftar Pesanan', icon: <FaShoppingCart className="w-5 h-5" />, to: '/daftar-pesanan' },
    { name: 'Metode Pembayaran', icon: <FaCreditCard className="w-5 h-5" />, to: '/metode-pembayaran' },
    { name: 'Manajemen Penyakit', icon: <FaFileAlt className="w-5 h-5" />, to: '/manajemen-penyakit' },
    { name: 'Laporan Pengguna', icon: <FaChartBar className="w-5 h-5" />, to: '/laporan-pengguna' },
    { name: 'Manajemen User', icon: <FaUser className="w-5 h-5" />, to: '/manajemen-user' },
  ];

  useEffect(() => {
    setSelectedMenu(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Close mobile menu when window is resized to desktop size
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = (item) => {
    setSelectedMenu(item.name);
    navigate(item.to);
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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
    <>
      {/* Mobile menu toggle button */}
      <button className="lg:hidden fixed top-4 left-4 z-50 bg-sky-600 text-white p-2 rounded-md" onClick={toggleMobileMenu} aria-label="Toggle menu">
        {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

      {/* Desktop Collapse Toggle Button */}
      <button className="hidden lg:flex fixed top-4 left-4 z-50 bg-sky-600 text-white p-2 rounded-md" onClick={toggleCollapse} style={{ left: isCollapsed ? '4rem' : '16rem' }}>
        {isCollapsed ? <FaChevronRight className="w-4 h-4" /> : <FaChevronLeft className="w-4 h-4" />}
      </button>

      {/* Sidebar for both mobile and desktop */}
      <aside
        className={`bg-sky-600 text-white h-full p-4 relative z-40 transition-all duration-300 
        ${isMobileMenuOpen ? 'fixed left-0 top-0 w-64' : 'fixed -left-64 top-0 lg:left-0 lg:relative'} 
        ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}`}
      >
        <div className="flex justify-between items-center mb-6 lg:mb-2">
          {!isCollapsed && <h2 className="font-bold text-xl">Admin Panel</h2>}
          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <ul className="overflow-y-auto max-h-[calc(100vh-120px)] lg:max-h-[calc(100vh-160px)]">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleMenuClick(item)}
              className={`mb-4 font-semibold flex items-center cursor-pointer p-2 rounded-md transition-all 
              ${selectedMenu === item.name ? 'bg-sky-400 text-sky-900' : 'hover:bg-sky-500'}
              ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.name : ''}
            >
              <span className={isCollapsed ? '' : 'mr-2'}>{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </li>
          ))}
        </ul>

        <div
          className={`flex gap-2 absolute bottom-0 left-0 w-full justify-center items-center font-medium p-2 cursor-pointer hover:bg-sky-700 bg-sky-900 mb-6 text-white ${isCollapsed ? 'px-0' : ''}`}
          onClick={handleLogout}
          title={isCollapsed ? 'Keluar' : ''}
        >
          <FaSignOutAlt className="w-5 h-5" />
          {!isCollapsed && <span>Keluar</span>}
        </div>
      </aside>

      {/* Spacer for mobile view to ensure content doesn't get hidden under the toggle button */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default Sidebar;
