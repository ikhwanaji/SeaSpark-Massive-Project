// Components/BackHomeButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Button = ({
  buttonText = 'Kembali ke Beranda',
  to = '/',
  backgroundColor = 'bg-blue-700',
  hoverColor = 'hover:bg-blue-500',
  textColor = 'text-white',
  padding = 'py-2 px-4',
  margin = 'mt-8',
  alignment = 'text-center',
  rounded = 'rounded',
  fontWeight = 'font-bold',
  customClassName = '',
  position = 'center',
  height = 'auto',
  fullWidth = false, // Menambahkan prop fullWidth dengan default false
}) => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate(to);
  };

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
          ${fullWidth ? 'w-full' : ''}  
          transition duration-300 ease-in-out
        `}
        style={{ height }}
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
  position: PropTypes.oneOf(['left', 'right', 'center']),
  height: PropTypes.string,
  fullWidth: PropTypes.bool, 
};

export default Button;
