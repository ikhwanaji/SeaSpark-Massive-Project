import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaBox, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ currentPage }) => {
  const [selectedMenu, setSelectedMenu] = useState(currentPage);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Manajemen Order', icon: <FaShoppingCart className="w-5 h-5" />, to: '/manajemen-order' },
    { name: 'Manajemen User', icon: <FaUser className="w-5 h-5" />, to: '/manajemen-user' },
    { name: 'Manajemen Barang', icon: <FaBox className="w-5 h-5" />, to: '/manajemen-barang' },
    { name: 'Laporan Pengguna', icon: <FaChartBar className="w-5 h-5" />, to: '/laporan-pengguna' },
  ];

  useEffect(() => {
    setSelectedMenu(currentPage);
  }, [currentPage]);

  const handleMenuClick = (item) => {
    setSelectedMenu(item.name);
    navigate(item.to); // Navigate to the route specified in the `to` property
  };

  return (
    <aside className="bg-sky-600 text-white w-64 h-full p-4 relative">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => handleMenuClick(item)}
            className={`mb-4 font-semibold flex items-center cursor-pointer p-2 rounded-md ${
              selectedMenu === item.name ? 'bg-sky-400 text-sky-900' : 'hover:bg-sky-500'
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      
      <div
        className="absolute bottom-0 left-0 w-full flex items-center font-semibold p-2 cursor-pointer hover:bg-sky-500 bg-sky-700 mb-6"
        onClick={() => navigate('/logout')}
      >
        <FaSignOutAlt className="w-5 h-5 mr-2" />
        <span>Keluar</span>
      </div>
    </aside>
  );
};

export default Sidebar;
