import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import CardTambahPesananSatuan from '../Components/CardTambahPesananSatuan';

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Manajemen Order" />
        <div className="flex-1 p-6 overflow-y-auto">
          <CardTambahPesananSatuan />
        </div>
      </div>
    </div>
  );
};

export default App;
