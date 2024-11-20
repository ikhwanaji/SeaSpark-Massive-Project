import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CardMetodePembayaran from "../../Components/Pembayaran/CardMetodePembayaran";

const Pembayaran = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Metode Pembayaran" />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <CardMetodePembayaran />
        </div>
      </div>
    </div>
  );
};

export default Pembayaran;