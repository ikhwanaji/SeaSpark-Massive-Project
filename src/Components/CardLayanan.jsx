import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ 
  id, 
  imageSrc = '/src/Assets/img/default.png', // Default value for imageSrc
  title, 
  description = '', // Default value for description
  linkText = 'Baca lebih lanjut...' // Default value for linkText
}) => {
  // Handle error when loading images
  const handleImageError = (e) => {
    let fallbackImage = '/src/Assets/img/default.png'; // Default fallback

    const titleLower = title.toLowerCase();
    if (titleLower.includes('bakteri')) {
      fallbackImage = '/src/Assets/img/bakteri.png';
    } else if (titleLower.includes('jamur')) {
      fallbackImage = '/src/Assets/img/jamur.png';
    } else if (titleLower.includes('virus')) {
      fallbackImage = '/src/Assets/img/virus.png';
    } else if (titleLower.includes('parasit')) {
      fallbackImage = '/src/Assets/img/parasit.png';
    } else if (titleLower.includes('nutrisi')) {
      fallbackImage = '/src/Assets/img/nutrisi.png';
    }

    e.target.src = fallbackImage;
  };

  

  return (
    <div className="flex flex-col sm:flex-row bg-gray-50 border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="w-full sm:w-1/3 h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
          onError={handleImageError} 
        />
      </div>
      <div className="p-4 flex flex-col justify-between w-full sm:w-2/3 align-middle">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">
            {description}{' '}
            <Link to={`/layanan/detail/${id}`} className="text-blue-500 text-sm mt-4 hover:underline">
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// PropTypes
Card.propTypes = {
  id: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  linkText: PropTypes.string,
};

export default Card;
