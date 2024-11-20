import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CardTambahMetode from "../../Components/Pembayaran/CardTambahMetode";

const TambahMetode = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Metode Pembayaran" />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <CardTambahMetode />
        </div>
      </div>
    </div>
  );
};

export default TambahMetode;