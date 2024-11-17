import React from "react";
import {
  FaCheck,
  FaTrash,
  FaUserPlus,
  FaArrowLeft,
  FaSave,
  FaInfoCircle,
  FaCog,
} from "react-icons/fa";

const Button = ({ label, type, onClick }) => {
  const buttonStyles = {
    process:
      "bg-emerald-600 text-white px-2 py-1 rounded-md hover:bg-emerald-400 flex items-center justify-center m-0.5 text-sm",
    delete:
      "bg-rose-600 text-white px-2 py-1 rounded-md hover:bg-rose-400 flex items-center justify-center m-0.5 text-sm",
    add: "bg-sky-600 text-white px-2 py-1 rounded-md hover:bg-sky-400 flex items-center justify-center m-0.5 text-sm",
    back: "bg-sky-600 text-white px-2 py-1 rounded-md hover:bg-sky-400 flex items-center justify-center m-0.5 text-sm",
    details:
      "bg-sky-600 text-white px-2 py-1 rounded-md hover:bg-sky-400 flex items-center justify-center m-0.5 text-sm",
    save: "bg-emerald-600 text-white px-2 py-1 rounded-md hover:bg-emerald-400 flex items-center justify-center m-0.5 text-sm",
  };

  const icons = {
    process: <FaCog className="mr-1" />,
    delete: <FaTrash className="mr-1" />,
    add: <FaUserPlus className="mr-1" />,
    back: <FaArrowLeft className="mr-1" />,
    details: <FaInfoCircle className="mr-1" />,
    save: <FaSave className="mr-1" />,
    Check: <FaCheck className="mr-1" />,
  };

  return (
    <button onClick={onClick} className={buttonStyles[type]}>
      {icons[type]} {label}
    </button>
  );
};

export default Button;
