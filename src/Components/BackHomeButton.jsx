// Components/BackHomeButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const BackHomeButton = ({
  buttonText = 'Kembali ke Beranda',
  backgroundColor = 'bg-blue-500',
  hoverColor = 'hover:bg-blue-700',
  textColor = 'text-white',
  padding = 'py-2 px-4',
  margin = 'mt-8',
  alignment = 'text-center',
  rounded = 'rounded',
  fontWeight = 'font-bold',
  customClassName = '',
}) => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className={`${margin} ${alignment}`}>
      <button
        onClick={handleBackHome}
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

BackHomeButton.propTypes = {
  buttonText: PropTypes.string,
  backgroundColor: PropTypes.string,
  hoverColor: PropTypes.string,
  textColor: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  alignment: PropTypes.string,
  rounded: PropTypes.string,
  fontWeight: PropTypes.string,
  customClassName: PropTypes.string,
};

export default BackHomeButton;
