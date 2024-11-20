import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CardPesananSatuan from "../../Components/Pesanan/CardPesananSatuan";
import CardPesananPaketan from "../../Components/Pesanan/CardPesananPaketan";

const DaftarPesanan = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Daftar Pesanan" />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[300px]">
              <CardPesananSatuan />
            </div>
            <div className="flex-1 min-w-[300px]">
              <CardPesananPaketan />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarPesanan;

