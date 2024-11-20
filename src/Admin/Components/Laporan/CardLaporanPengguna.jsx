import React from "react";
import Table from "../Table";
import Button from "../Button";
// import { Link } from "react-router-dom";

const CardLaporan = () => {
  const headers = [
    "No.",
    "Nama",
    "Email",
    "Pesan",
    "Aksi",
  ];

  const data = [
    {
      no: 1,
      nama: "",
      email: "",
      pesan: "",
    },
  ];

  const renderActions = (row) => (
    <div className="flex flex-row gap-2 justify-center">
      <Button label="Hapus" type="delete" onClick={() => {}} />
    </div>
  );

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">
        Laporan Pengguna
      </h2>
      <hr />
      <div className="overflow-x-auto">
        <Table headers={headers} data={data} renderActions={renderActions} />
      </div>
    </div>
  );
};

export default CardLaporan;
