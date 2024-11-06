// Components/BackHomeButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Button = ({
  buttonText = 'Kembali ke Beranda',
  to = '/',
  backgroundColor = 'bg-blue-500',
  hoverColor = 'hover:bg-blue-700',
  textColor = 'text-white',
  padding = 'py-2 px-4',
  margin = 'mt-8',
  alignment = 'text-center',
  rounded = 'rounded',
  fontWeight = 'font-bold',
  customClassName = '',
  position = 'center', // Menambahkan prop position dengan default 'center'
}) => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate(to);
  };

  // Menentukan kelas posisi berdasarkan prop position
  const getPositionClass = () => {
    switch (position) {
      case 'left':
        return 'justify-start';
      case 'right':
        return 'justify-end';
      case 'center':
      default:
        return 'justify-center';
    }
  };

  return (
    <div className={`${margin} ${alignment} flex ${getPositionClass()}`}>
      <button
        onClick={handleButton}
        className={`
          ${backgroundColor}
          ${hoverColor}
          ${textColor}
          ${padding}
          ${rounded}
          ${fontWeight}
          ${customClassName}
          transition duration-300 ease-in-out
        `}
      >
        {buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string,
  to: PropTypes.string,
  backgroundColor: PropTypes.string,
  hoverColor: PropTypes.string,
  textColor: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  alignment: PropTypes.string,
  rounded: PropTypes.string,
  fontWeight: PropTypes.string,
  customClassName: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right', 'center']), // Menambahkan PropTypes untuk position
};

export default Button;
