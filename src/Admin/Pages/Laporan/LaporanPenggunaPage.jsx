import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CardLaporanPengguna from "../../Components/Laporan/CardLaporanPengguna";

const LaporanPengguna = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Laporan Pengguna" />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <CardLaporanPengguna />
        </div>
      </div>
    </div>
  );
};

export default LaporanPengguna;