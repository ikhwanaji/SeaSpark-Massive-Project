import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({
  navigation = [{ name: 'Beranda' }, { name: 'Layanan' }, { name: 'Ulasan' }, { name: 'Tentang Kami' }],
  buttonName = 'Masuk',
  onLoginClick,
  backgroundColor = 'bg-gray-100',
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

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Menutup menu mobile setelah klik
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className={`fixed w-full transition-all py-5 shadow-md top-0 left-0 right-0 z-50 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="logo">
            <a href="/" onClick={(e) => handleNavClick(e, 'beranda')}>
              <img className="w-1/3 md:w-1/4" src="/src/Assets/img/logo.png" alt="Logo" />
            </a>
          </div>
          <div className="hidden md:flex items-center justify-between flex-grow">
            <div className="flex-grow flex justify-center">
              <ul className="flex gap-10">
                {navigation.map((nav, index) => (
                  <li key={index}>
                    <a href={`#${nav.name.toLowerCase()}`} onClick={(e) => handleNavClick(e, nav.name)} className={`font-medium ${textColor} ${hoverColor} transition duration-300`}>
                      {nav.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button onClick={handleLogin} className={`${buttonColor} hover:${buttonHoverColor} text-white font-bold py-2 px-4 rounded-lg`}>
                {buttonName}
              </button>
            </div>
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
                <a href={`#${nav.name.toLowerCase()}`} onClick={(e) => handleNavClick(e, nav.name)} className={`font-medium ${textColor} ${hoverColor} transition duration-300`}>
                  {nav.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            <button onClick={handleLogin} className={`${buttonColor} hover:${buttonHoverColor} text-white font-bold py-2 px-4 rounded-full`}>
              {buttonName}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  buttonName: PropTypes.string,
  onLoginClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonHoverColor: PropTypes.string,
};

export default Navbar;
