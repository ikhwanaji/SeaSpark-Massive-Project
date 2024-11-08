import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const CardItem = ({ item }) => (
  <li className="flex items-start mb-2">
    <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size="16" />
    <span>{item}</span>
  </li>
);

const CardPaketan = ({ title, price, image, items }) => (
  <div className="bg-white rounded-lg shadow-lg p-4 w-80">
    <img src={image} alt={title} className="rounded-t-lg w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
      <p className="text-center text-gray-700 mb-4">{price}</p>
      <button className="bg-blue-500 text-white w-full py-2 rounded-lg mb-4 hover:bg-blue-600 transition-colors duration-300">Beli Sekarang</button>
      <ul className="text-gray-700">
        {items.map((item, idx) => (
          <CardItem key={idx} item={item} />
        ))}
      </ul>
    </div>
  </div>
);

export default CardPaketan;
