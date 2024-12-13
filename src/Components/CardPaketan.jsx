import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CardItem = ({ item, index }) => (
  <li className="flex items-start mb-2">
    <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size="16" />
    <span>{item}</span>
  </li>
);

const CardPaketan = ({paketId, title, price, image, items }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/pemesanan', {
      state: {
        title,
        price,
        image,
        items,
      },
    });
  };

  // Debug log
  console.log('CardPaketan Props:', { paketId, title, items });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 transform transition-transform hover:scale-105">
      <img src={image} alt={title} className="rounded-t-lg w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
        <p className="text-center text-gray-700 mb-4">{price}</p>
        <button onClick={handleBuyNow} className="bg-blue-500 text-white w-full py-2 rounded-lg mb-4 hover:bg-blue-700 transition-colors duration-300">
          Beli Sekarang
        </button>
        <ul className="text-gray-700">
          {items.map((item, idx) => (
            <CardItem 
              key={`${paketId}-${idx}`} // Kombinasi paketId dan index
              item={item} 
              index={idx} 
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardPaketan;