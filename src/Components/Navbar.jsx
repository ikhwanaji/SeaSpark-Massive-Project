import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiUser, FiUserCheck } from 'react-icons/fi';
import { IoCartOutline } from 'react-icons/io5';
import Logo from '../Assets/img/logo.png';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const DEFAULT_NAVIGATION = [
  { name: 'Beranda', path: '/' },
  { name: 'Layanan', path: '/layanan' },
  { name: 'Produk', path: '/produk' },
  { name: 'Tentang Kami', path: '/tentang-kami' },
  { name: 'Kontak', path: '/kontak' },
];

function Navbar({ navigation = DEFAULT_NAVIGATION, buttonName = 'Masuk', backgroundColor = 'bg-white', textColor = 'text-black', logo = Logo, isLoggedIn = false, user = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  useEffect(() => {
    if (cartItems.length > 0) {
      setCartBump(true);
      const timeout = setTimeout(() => setCartBump(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cartItems.length]);

  const getUserName = () => (isLoggedIn && user?.name ? user.name : 'Pengguna');

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className={`fixed w-full py-4 shadow-md top-0 z-50 ${backgroundColor}`}>
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

        {/* User & Cart Section */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <motion.div animate={{ scale: cartBump ? 1.2 : 1 }} transition={{ duration: 0.3 }}>
                <a href="/keranjang" onClick={(e) => handleNavClick(e, '/keranjang')} className="relative">
                  <IoCartOutline className="w-6 h-6 hover:text-blue-500" />
                  {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">{cartItems.length}</span>}
                </a>
              </motion.div>
              <span>Halo, {getUserName()}</span>
            </div>
          )}
          <button onClick={() => navigate(isLoggedIn ? '/akun' : '/login')} className="p-2 rounded-full hover:bg-gray-100 transition-all" title={isLoggedIn ? 'Akun' : buttonName}>
            {isLoggedIn ? <FiUserCheck className="w-6 h-6 hover:text-blue-500" /> : <FiUser className="w-6 h-6 hover:text-blue-500" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-xl focus:outline-none">
          {isOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white w-full py-4 px-4 flex flex-col items-center">
          <ul className="flex flex-col items-center gap-4">
            {navigation.map((nav, index) => (
              <li key={index}>
                <a href={nav.path} onClick={(e) => handleNavClick(e, nav.path)} className="block text-lg text-black hover:text-blue-500">
                  {nav.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center mt-4 space-y-2">
            {isLoggedIn && (
              <div className="flex items-center text-sm text-gray-700">
                <a href="/keranjang" onClick={(e) => handleNavClick(e, '/keranjang')} className="relative">
                  <motion.div animate={{ scale: cartBump ? 1.2 : 1 }} transition={{ duration: 0.3 }}>
                    <IoCartOutline className="w-6 h-6 hover:text-blue-500" />
                  </motion.div>
                  {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">{cartItems.length}</span>}
                </a>
              </div>
            )}
            <button onClick={() => navigate(isLoggedIn ? '/akun' : '/login')} className="p-2 rounded-full hover:bg-gray-100 transition-all" title={isLoggedIn ? 'Akun' : buttonName}>
              {isLoggedIn ? <FiUserCheck className="w-6 h-6 hover:text-blue-500" /> : <FiUser className="w-6 h-6 hover:text-blue-500" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
