// components/Card.js
import React from 'react';
import Button from '../Components/Button';

const Card = ({ imageSrc, title, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 max-w-xs flex flex-col">
            <img src={imageSrc} alt={title} className="rounded w-66 h-66 mx-auto mb-4 object-cover" />
            <h3 className="text-center font-semibold mb-2 min-h-[3rem]">{title}</h3>
            <p className="text-center text-sm text-gray-600 mb-4 min-h-[-1rem]">{description}</p>
            <Button buttonText="Selengkapnya" to="/detail" className="mt-auto" />
        </div>
    );
};

export default Card;
