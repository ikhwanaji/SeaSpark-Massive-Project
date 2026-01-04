import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiUser, FiUserCheck, FiClock, FiMenu, FiX, FiHome, FiInfo } from 'react-icons/fi';
import { IoCartOutline } from 'react-icons/io5';
import { MdOutlineContactSupport, MdOutlineHomeRepairService, MdOutlineInventory2 } from 'react-icons/md';
import Logo from '../Assets/img/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const DEFAULT_NAVIGATION = [
  { name: 'Beranda', path: '/', icon: <FiHome className="w-5 h-5" /> },
  { name: 'Layanan', path: '/layanan', icon: <MdOutlineHomeRepairService className="w-5 h-5" /> },
  { name: 'Produk', path: '/produk', icon: <MdOutlineInventory2 className="w-5 h-5" /> },
  { name: 'Tentang Kami', path: '/tentang-kami', icon: <FiInfo className="w-5 h-5" /> },
  { name: 'Kontak', path: '/kontak', icon: <MdOutlineContactSupport className="w-5 h-5" /> },
];

function Navbar({ navigation = DEFAULT_NAVIGATION, buttonName = 'Masuk', backgroundColor = 'bg-white', textColor = 'text-black', logo = Logo, isLoggedIn = false, user = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  // Close sidebar when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const menuButton = document.getElementById('menu-button');

      if (isOpen && sidebar && !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setCartBump(true);
      const timeout = setTimeout(() => setCartBump(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cartItems.length]);

  // Block body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getUserName = () => (isLoggedIn && user?.nama ? user.nama : 'Pengguna');

  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const overlayVariants = {
    open: { opacity: 0.5 },
    closed: { opacity: 0 },
  };

  return (
    <nav className={`fixed w-full py-4 shadow-md top-0 z-40 ${backgroundColor}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" onClick={(e) => handleNavClick(e, '/')}>
          <img className="w-24 md:w-32" src={logo} alt="Logo" />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 md:gap-10">
          {navigation.map((nav, index) => (
            <li key={index}>
              <a
                href={nav.path}
                onClick={(e) => handleNavClick(e, nav.path)}
                className={`transition duration-300 ${location.pathname === nav.path || location.pathname.startsWith(nav.path + '/') ? 'text-blue-500' : textColor} hover:text-blue-500`}
              >
                {nav.name}
              </a>
            </li>
          ))}
        </ul>

        {/* User & Cart Section - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              {/* Riwayat Pemesanan Icon */}
              <a href="/riwayat-pemesanan" onClick={(e) => handleNavClick(e, '/riwayat-pemesanan')} className={`relative ${location.pathname === '/riwayat-pemesanan' ? 'text-blue-500' : ''}`} title="Riwayat Pemesanan">
                <FiClock className="w-6 h-6 hover:text-blue-500" />
              </a>

              {/* Cart Icon */}
              <motion.div animate={{ scale: cartBump ? 1.2 : 1 }} transition={{ duration: 0.3 }}>
                <a href="/keranjang" onClick={(e) => handleNavClick(e, '/keranjang')} className={`relative ${location.pathname === '/keranjang' ? 'text-blue-500' : ''}`} title="Keranjang">
                  <IoCartOutline className="w-6 h-6 hover:text-blue-500" />
                  {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">{cartItems.length}</span>}
                </a>
              </motion.div>
              <span>Halo, {getUserName()}</span>
            </div>
          )}
          <button onClick={() => navigate(isLoggedIn ? '/akun' : '/login')} className={`p-2 rounded-full hover:bg-gray-100 transition-all ${location.pathname === '/akun' ? 'text-blue-500' : ''}`} title={isLoggedIn ? 'Akun' : buttonName}>
            {isLoggedIn ? <FiUserCheck className="w-6 h-6 hover:text-blue-500" /> : <FiUser className="w-6 h-6 hover:text-blue-500" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {isLoggedIn && (
            <motion.div animate={{ scale: cartBump ? 1.2 : 1 }} transition={{ duration: 0.3 }}>
              <a href="/keranjang" onClick={(e) => handleNavClick(e, '/keranjang')} className="relative" title="Keranjang">
                <IoCartOutline className="w-6 h-6" />
                {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">{cartItems.length}</span>}
              </a>
            </motion.div>
          )}
          <button id="menu-button" onClick={() => setIsOpen(!isOpen)} className="text-xl focus:outline-none p-2" aria-label="Toggle menu">
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar and Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark overlay */}
            <motion.div className="fixed inset-0 bg-black z-40 md:hidden" initial="closed" animate="open" exit="closed" variants={overlayVariants} onClick={() => setIsOpen(false)} />

            {/* Sidebar */}
            <motion.div id="mobile-sidebar" className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-xl z-50 md:hidden flex flex-col" initial="closed" animate="open" exit="closed" variants={sidebarVariants}>
              {/* Sidebar header */}
              <div className="flex items-center justify-between p-5 border-b">
                <img className="w-24" src={logo} alt="Logo" />
                <button onClick={() => setIsOpen(false)} className="text-xl">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* User info if logged in */}
              {isLoggedIn && (
                <div className="p-5 border-b">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <FiUserCheck className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Halo, {getUserName()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation links */}
              <div className="flex-grow overflow-y-auto">
                <ul className="py-2">
                  {navigation.map((nav, index) => (
                    <li key={index}>
                      <a
                        href={nav.path}
                        onClick={(e) => handleNavClick(e, nav.path)}
                        className={`flex items-center gap-3 px-5 py-3 hover:bg-gray-50 ${location.pathname === nav.path || location.pathname.startsWith(nav.path + '/') ? 'text-blue-500 bg-blue-50' : ''}`}
                      >
                        {nav.icon}
                        <span>{nav.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom actions */}
              {isLoggedIn ? (
                <div className="p-5 border-t">
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="/riwayat-pemesanan"
                      onClick={(e) => handleNavClick(e, '/riwayat-pemesanan')}
                      className={`flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-50 ${location.pathname === '/riwayat-pemesanan' ? 'text-blue-500 bg-blue-50' : ''}`}
                    >
                      <FiClock className="w-6 h-6" />
                      <span className="text-xs">Riwayat</span>
                    </a>
                    <a href="/akun" onClick={(e) => handleNavClick(e, '/akun')} className={`flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-50 ${location.pathname === '/akun' ? 'text-blue-500 bg-blue-50' : ''}`}>
                      <FiUser className="w-6 h-6" />
                      <span className="text-xs">Profil</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-5 border-t">
                  <button onClick={() => navigate('/login')} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    {buttonName}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

Navbar.propTypes = {
  navigation: PropTypes.array,
  buttonName: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  logo: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
};

export default Navbar;
