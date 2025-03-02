import React from 'react';

const CardProduk = ({ image, title, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src={image} alt={title} className="w-full h-48 md:h-64 object-cover rounded-t-lg" />
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-700">{price}</p>
      </div>
    </div>
  );
};

export default CardProduk;
