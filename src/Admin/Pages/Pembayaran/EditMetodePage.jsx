import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CardEditMetode from "../../Components/Pembayaran/CardEditMetode";

const EditMetode = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Metode Pembayaran" />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <CardEditMetode />
        </div>
      </div>
    </div>
  );
};

export default EditMetode;