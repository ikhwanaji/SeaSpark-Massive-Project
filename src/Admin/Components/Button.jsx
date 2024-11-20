import React from 'react';
import { FaTrash, FaPlus, FaSave, FaArrowLeft, FaPencilAlt, FaInfoCircle } from 'react-icons/fa';

const Button = ({ label, type, onClick }) => {
  const buttonStyles = {
    delete: 'bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-400 flex items-center gap-2',
    add: 'bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-400 flex items-center gap-2',
    save: 'bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-400 flex items-center gap-2',
    process: 'bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-400 flex items-center gap-2',
    back: 'bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-400 flex items-center gap-2',
    details: 'bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-400 flex items-center gap-2',
    edit: 'bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-400 flex items-center gap-2',
  };

  const icons = {
    delete: <FaTrash className="h-5 w-5" />,
    add: <FaPlus className="h-5 w-5" />,
    save: <FaSave className="h-5 w-5" />,
    process: <FaArrowLeft className="h-5 w-5" />,
    back: <FaArrowLeft className="h-5 w-5" />,
    details: <FaInfoCircle className="h-5 w-5" />,
    edit: <FaPencilAlt className="h-5 w-5" />,
  };

  return (
    <button onClick={onClick} className={buttonStyles[type]}>
      {icons[type]}
      {label}
    </button>
  );
};

export default Button;
