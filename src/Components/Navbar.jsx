import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({
  navigation = [
    { name: 'Beranda', type: 'scroll' },
    { name: 'Layanan', type: 'scroll' },
    { name: 'Ulasan', type: 'scroll' },
    { name: 'Tentang Kami', type: 'scroll' },
    
  ],
  buttonName = 'Masuk',
  useIcon = false,
  icon = null,
  onLoginClick,
  backgroundColor = 'bg-white',
  textColor = 'text-black-500',
  hoverColor = 'hover:text-blue-500',
  buttonColor = 'bg-blue-500',
  buttonHoverColor = 'bg-blue-700',
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
    } else {
      const targetId = item.name.toLowerCase().replace(/\s+/g, '-');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

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
    <nav className={`fixed w-full transition-all py-5 shadow-md top-0 left-0 right-0 z-50 ${backgroundColor}`}>
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
              <img className="w-1/3 md:w-1/4" src="/src/Assets/img/logo.png" alt="Logo" />
            </a>
          </div>
          <div className="hidden md:flex items-center justify-between flex-grow">
            <div className="flex-grow flex justify-center">
              <ul className="flex gap-10">
                {navigation.map((nav, index) => (
                  <li key={index}>
                    <a href={nav.type === 'link' ? nav.path : `#${nav.name.toLowerCase()}`} onClick={(e) => handleNavClick(e, nav)} className={`font-medium ${textColor} ${hoverColor} transition duration-300`}>
                      {nav.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ml-4">{renderLoginButton()}</div>
          </div>
          <button onClick={toggleMenu} className={`md:hidden ${textColor} focus:outline-none`}>
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={`md:hidden ${backgroundColor}`}>
          <ul className="flex flex-col items-center gap-4 py-4">
            {navigation.map((nav, index) => (
              <li key={index}>
                <a href={nav.type === 'link' ? nav.path : `#${nav.name.toLowerCase()}`} onClick={(e) => handleNavClick(e, nav)} className={`font-medium ${textColor} ${hoverColor} transition duration-300`}>
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

Navbar.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['scroll', 'link']),
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
};

export default Navbar;
