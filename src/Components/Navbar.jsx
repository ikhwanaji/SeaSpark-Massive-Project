import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiUser } from "react-icons/fi";
import { FiUserCheck } from 'react-icons/fi';

const DEFAULT_NAVIGATION = [
  { name: 'Beranda', type: 'link', path: '/' },
  { name: 'Layanan', type: 'link', path: '/layanan' },
  { name: 'Produk', type: 'link', path: '/produk' },
  { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
  { name: 'Kontak', type: 'link', path: '/kontak' },
];

function Navbar({
  navigation = DEFAULT_NAVIGATION,
  buttonName = 'Masuk',
  backgroundColor = 'bg-white',
  textColor = 'text-black-500',
  hoverColor = 'hover:text-blue-700',
  logo = '../Assets/img/logo.png',
  isLoggedIn = false,
  user = null,
  onLogout = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getUserName = () => {
    return isLoggedIn && user && user.name ? user.name : 'Pengguna';
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(item.path);
  };

  const renderLoginButton = () => {
    return (
      <div
        onClick={isLoggedIn ? () => navigate('/akun') : () => navigate('/login')}
        className={`cursor-pointer ${textColor} ${hoverColor} transition-all duration-300 hover:bg-gray-100 p-2 rounded-full`}
        title={isLoggedIn ? "Akun" : buttonName}
      >
        {isLoggedIn ? (
          <FiUserCheck className="w-6 h-6" />
        ) : (
          <FiUser className="w-6 h-6" />
        )}
      </div>
    );
  };

  return (
    <nav className={`fixed w-full transition-all py-5 shadow-md top-0 left-0 right-0 z-50 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="logo">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              <img className="w-1/3 md:w-1/4" src={logo} alt="Logo" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-grow">
            <div className="flex-grow flex justify-center">
              <ul className="flex gap-10">
                {navigation.map((nav, index) => (
                  <li key={index}>
                    <a href={nav.path} onClick={(e) => handleNavClick(e, nav)} className={location.pathname === nav.path ? 'text-blue-500' : textColor}>
                      {nav.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ml-4 flex items-center space-x-4">
              {isLoggedIn && <div className="text-sm text-gray-700">Halo, {getUserName()}</div>}
              {renderLoginButton()}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden ${textColor} focus:outline-none`}>
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
        </div>

{/* Mobile Navigation Dropdown */}
{isOpen && (
  <div className={`md:hidden ${backgroundColor}`}>
    <ul className="flex flex-col items-center gap-4 py-4">
      {navigation.map((nav, index) => (
        <li key={index}>
          <a
            href={nav.path}
            onClick={(e) => handleNavClick(e, nav)}
            className={location.pathname === nav.path ? 'text-blue-500' : textColor}
          >
            {nav.name}
          </a>
        </li>
      ))}
    </ul>
    <div className="flex flex-col items-center mt-4 pb-4 space-y-2">
      {isLoggedIn && <div className="text-sm text-gray-700">Halo, {getUserName()}</div>}
      {renderLoginButton()}
    </div>
  </div>
)}
</nav>
);
}

// PropTypes untuk validasi prop
Navbar.propTypes = {
navigation: PropTypes.arrayOf(
PropTypes.shape({
name: PropTypes.string.isRequired,
type: PropTypes.oneOf(['scroll', 'link']).isRequired,
path: PropTypes.string,
})
),
buttonName: PropTypes.string,
backgroundColor: PropTypes.string,
textColor: PropTypes.string,
hoverColor: PropTypes.string,
logo: PropTypes.string,
isLoggedIn: PropTypes.bool,
user: PropTypes.shape({
name: PropTypes.string,
// Tambahkan properti lain sesuai kebutuhan
}),
onLogout: PropTypes.func,
};

export default Navbar;