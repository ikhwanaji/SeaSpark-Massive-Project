import React from "react";
import Table from "../Table";
import Button from "../Button";
import { Link } from "react-router-dom";

const CardArtikel = () => {
  const headers = [
    "No.",
    "Judul",
    "Konten",
    "Gambar",
    "Status",
    "Tanggal Publikasi",
    "Aksi",
  ];

  const data = [
    {
      no: 1,
      judul: "",
      konten: "",
      gambar: "",
      status: "",
      tanggal: "",
    },
  ];

  const renderActions = (row) => (
    <div className="flex flex-row gap-2 justify-center">
      <Link to="/edit-artikel">
        <Button label="Edit" type="edit" />
      </Link>
      <Button label="Hapus" type="delete" onClick={() => {}} />
    </div>
  );

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">
        Manajemen Artikel
      </h2>
      <hr />
      <div className="flex justify-between items-center mb-4 mt-6">
        <Link to="/tambah-artikel">
          <Button label="Tambah Artikel" type="add" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table headers={headers} data={data} renderActions={renderActions} />
      </div>
    </div>
  );
};

export default CardArtikel;
