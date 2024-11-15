import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-sky-900 flex justify-between items-center p-4">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src="/src/Assets/img/logo2.png" alt="Logo" className="w-36 h-12 mr-2" />
      </div>

      {/* Right Side: Search Bar and Profile Icon */}
      <div className="flex items-center space-x-4">
        {/* Search Bar with Icon */}
        <div className="flex items-center bg-white rounded-md overflow-hidden">
          <FaSearch className="text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Pencarian"
            className="p-2 focus:outline-none"
          />
        </div>

        {/* Profile Icon without Frame */}
        <img
          src="/src/Assets/img/timkami.jpg"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
