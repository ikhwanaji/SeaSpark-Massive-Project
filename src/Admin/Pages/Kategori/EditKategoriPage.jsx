import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CardEditKategori from "../../Components/Kategori/CardEditKategori";

const EditKategori = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Kategori Produk" />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <CardEditKategori />
        </div>
      </div>
    </div>
  );
};

export default EditKategori;