import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({
  navigation = [{ name: 'Beranda' }, { name: 'Layanan' }, { name: 'Ulasan' }, { name: 'Tentang Kami' }],
  buttonName = 'Masuk',
  onLoginClick,
  backgroundColor = 'bg-gray-100',
  textColor = 'text-black-500',
  hoverColor = 'text-blue-500',
  buttonColor = 'bg-blue-500',
  buttonHoverColor = 'bg-blue-700',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
            <a href="/">
              <img className="w-1/3 md:w-1/4" src="/src/Assets/img/logo.png" alt="Logo" />
            </a>
          </div>
          <div className="hidden md:flex items-center justify-between flex-grow">
            <div className="flex-grow flex justify-center">
              <ul className="flex gap-10">
                {navigation.map((nav, index) => (
                  <li key={index}>
                    <a href={`#${nav.name}`} className={`font-medium ${textColor} hover:${hoverColor}`}>
                      {nav.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button onClick={handleLogin} className={`${buttonColor} hover:${buttonHoverColor} text-white font-bold py-2 px-4 rounded-full`}>
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
                <a href={`#${nav.name}`} className={`font-medium ${textColor} hover:${hoverColor}`}>
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
