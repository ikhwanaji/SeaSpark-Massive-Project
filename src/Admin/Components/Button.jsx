import React from 'react';

const Button = ({ label, type, onClick }) => {
  const buttonStyles = {
    delete: 'bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-400',
    add: 'bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-400',
    save: 'bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-400',
    process: 'bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-400',
    back: 'bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-400',
    details: 'bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-400',
    edit: 'bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-400',
  };

  return (
    <button onClick={onClick} className={buttonStyles[type]}>
      {label}
    </button>
  );
};

export default Button;