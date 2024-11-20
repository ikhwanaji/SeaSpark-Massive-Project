import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CardTambahArtikel from "../../Components/Artikel/CardTambahArtikel";

const TambahArtikel = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Manajemen Artikel" />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <CardTambahArtikel />
        </div>
      </div>
    </div>
  );
};

export default TambahArtikel;