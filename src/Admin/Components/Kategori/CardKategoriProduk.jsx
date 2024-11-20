import React from "react";
import Table from "../Table";
import Button from "../Button";
import { Link } from "react-router-dom";

const CardKategori = () => {
  const headers = [
    "No.",
    "Nama",
    "Deskripsi",
    "Aksi",
  ];

  const data = [
    {
      no: 1,
      nama: "",
      deskripsi: "",
    },
  ];

  const renderActions = (row) => (
    <div className="flex flex-row gap-2 justify-center">
      <Link to="/edit-kategori">
        <Button label="Edit" type="edit" />
      </Link>
      <Button label="Hapus" type="delete" onClick={() => {}} />
    </div>
  );

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">
        Kategori Produk
      </h2>
      <hr />
      <div className="flex justify-between items-center mb-4 mt-6">
        <Link to="/tambah-kategori">
          <Button label="Tambah Kategori" type="add" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table headers={headers} data={data} renderActions={renderActions} />
      </div>
    </div>
  );
};

export default CardKategori;
