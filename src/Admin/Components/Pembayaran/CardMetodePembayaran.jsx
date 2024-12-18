import React from "react";
import Table from "../../Components/Table";
import Button from '../../Components/Button'; 
import { Link } from "react-router-dom";

const CardMetode = () => {
  const headers = [
    "No.",
    "Metode",
    "Deskripsi",
    "Aksi",
  ];

  const data = [
    {
      no: 1,
      metode: "",
      deskripsi: "",
    },
  ];

  const renderActions = (row) => (
    <div className="flex flex-row gap-2 justify-center">
      <Link to="/edit-metode">
        <Button label="Edit" type="edit" />
      </Link>
      <Button label="Hapus" type="delete" onClick={() => {}} />
    </div>
  );

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">
        Metode Pembayaran
      </h2>
      <hr />
      <div className="flex justify-between items-center mb-4 mt-6">
        <Link to="/tambah-metode">
          <Button label="Tambah Metode" type="add" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table headers={headers} data={data} renderActions={renderActions} />
      </div>
    </div>
  );
};

export default CardMetode;
