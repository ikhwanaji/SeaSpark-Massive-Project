import React from "react";
import Navbar from "./../Components/Navbar";
import Sidebar from "./../Components/Sidebar";
import CardBarang from "../Components/CardBarang";

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Manajemen Barang" />
        <div className="flex-1 p-6 overflow-y-auto mt-6">
          <CardBarang />
        </div>
      </div>
    </div>
  );
};

export default App;
