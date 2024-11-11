import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({
  navigation = [
    { name: 'Beranda', type: 'scroll', path: '/' },
    { name: 'Layanan', type: 'link', path: '/layanan' },
    { name: 'Ulasan', type: 'scroll', path: '/#ulasan' },
    { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
  ],
  buttonName = 'Masuk',
  useIcon = false,
  icon = null,
  onLoginClick = null,
  backgroundColor = 'bg-white',
  textColor = 'text-black-500',
  hoverColor = 'hover:text-blue-500',
  buttonColor = 'bg-blue-500',
  buttonHoverColor = 'bg-blue-700',
  logo = '/src/Assets/img/logo.png',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleLogin = () => {
    if (buttonName === 'Profil User') {
      navigate('/akun');
    } else if (onLoginClick) {
      onLoginClick();
    } else {
      navigate('/login');
    }
  };  

  const handleNavClick = (e, item) => {
    e.preventDefault();

    if (item.type === 'link' && item.path) {
      navigate(item.path);
      setIsOpen(false);
      return;
    }

    const targetId = item.name.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const getNavItemClass = (nav) => {
    if (nav.type === 'link') {
      return location.pathname === nav.path ? 'font-medium text-blue-500 transition duration-300' : `font-medium ${textColor} ${hoverColor} transition duration-300`;
    }
    return `font-medium ${textColor} ${hoverColor} transition duration-300`;
  };

  const renderLoginButton = () => {
    if (useIcon && icon) {
      return (
        <div onClick={handleLogin} className={`cursor-pointer ${textColor} ${hoverColor} transition-all duration-300`} title={buttonName}>
          {icon}
        </div>
      );
    }

    return (
      <button onClick={handleLogin} className={`${buttonColor} hover:${buttonHoverColor} text-white font-bold py-2 px-4 rounded-lg`}>
        {buttonName}
      </button>
    );
  };

  return (
    <nav
      className={`
        fixed w-full transition-all py-5 shadow-md 
        top-0 left-0 right-0 z-50 ${backgroundColor}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="logo">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              <img className="w-1/3 md:w-1/4" src={logo} alt="Logo" />
            </a>
          </div>

          <div className="hidden md:flex items-center justify-between flex-grow">
            <div className="flex-grow flex justify-center">
              <ul className="flex gap-10">
                {navigation.map((nav, index) => (
                  <li key={index}>
                    <a href={nav.path} onClick={(e) => handleNavClick(e, nav)} className={getNavItemClass(nav)}>
                      {nav.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ml-4">{renderLoginButton()}</div>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className={`md:hidden ${textColor} focus:outline-none`}>
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
                <a href={nav.path} onClick={(e) => handleNavClick(e, nav)} className={getNavItemClass(nav)}>
                  {nav.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4 pb-4">{renderLoginButton()}</div>
        </div>
      )}
    </nav>
  );
}

// PropTypes untuk validasi props
Navbar.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['scroll', 'link']).isRequired,
      path: PropTypes.string,
    })
  ),
  buttonName: PropTypes.string,
  useIcon: PropTypes.bool,
  icon: PropTypes.element,
  onLoginClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonHoverColor: PropTypes.string,
  logo: PropTypes.string,
};

export default Navbar;
