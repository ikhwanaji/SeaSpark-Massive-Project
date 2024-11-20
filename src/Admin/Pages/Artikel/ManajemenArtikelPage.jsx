import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CardArtikel from "../../Components/Artikel/CardArtikel";

const ManajemenArtikel = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Manajemen Artikel" />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <CardArtikel />
        </div>
      </div>
    </div>
  );
};

export default ManajemenArtikel;