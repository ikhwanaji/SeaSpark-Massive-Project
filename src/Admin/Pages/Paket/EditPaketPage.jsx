import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CardEditPaket from "../../Components/Paket/CardEditPaket";

const EditPaket = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentPage="Manajemen Paket" />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <CardEditPaket />
        </div>
      </div>
    </div>
  );
};

export default EditPaket;