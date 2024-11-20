import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ id, imageSrc, title, description, linkText,  }) => {
  return (
    <div className="flex flex-col sm:flex-row bg-gray-50 border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Bagian Gambar */}
      <img src={imageSrc} alt={title} className="w-full sm:w-1/3 object-cover transform hover:scale-105 transition-transform duration-300" />
      {/* Bagian Konten */}
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

// Default Props
// PropTypes
Card.propTypes = {
  id: PropTypes.string,
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
};

export default Card;
