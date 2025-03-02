import React from 'react';
import { RiUserLine } from 'react-icons/ri';
import '../Assets/img/css/ulasan.css';

const UlasanGrid = ({ title, subtitle, cards }) => {
  return (
    <div className="bg-blue-50 min-h-screen p-4">
      <div className="container mx-auto pt-12 pb-20">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">{title}</h1>
        <p className="text-gray-700 text-lg text-left mb-12">{subtitle}</p>

        <div className="overflow-hidden relative">
          <div className="animate-scroll whitespace-nowrap">
            {cards.map((card, index) => (
              <div key={index} className="inline-block px-3">
                <div className="w-64 h-auto max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out p-6">
                  <div className="flex items-center mb-4">
                    <RiUserLine className="text-gray-600 mr-2" size={24} />
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
                      <p className="text-sm text-gray-600">Peternak Ikan</p>
                    </div>
                  </div>
                  <p className="text-gray-700 break-words overflow-wrap break-word whitespace-normal">
                    {card.content}
                  </p>
                  <p className="text-gray-500 text-sm mt-4">{card.date}</p>
                </div>
              </div>
            ))}
            {/* Duplicate cards to create seamless loop */}
            {cards.map((card, index) => (
              <div key={`duplicate-${index}`} className="inline-block px-3">
                <div className="w-64 h-auto max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out p-6">
                  <div className="flex items-center mb-4">
                    <RiUserLine className="text-gray-600 mr-2" size={24} />
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
                      <p className="text-sm text-gray-600">Peternak Ikan</p>
                    </div>
                  </div>
                  <p className="text-gray-700 break-words overflow-wrap break-word whitespace-normal ">
                    {card.content}
                  </p>
                  <p className="text-gray-500 text-sm mt-4">{card.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UlasanGrid;