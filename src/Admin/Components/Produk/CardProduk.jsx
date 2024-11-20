import React from "react";
import Table from "../Table";
import Button from "../Button";
import { Link } from "react-router-dom";

const CardProduk = () => {
  const headers = [
    "No.",
    "Nama",
    "Deskripsi",
    "Kategori",
    "Harga",
    "Stok",
    "Gambar",
    "Aksi",
  ];

  const data = [
    {
      no: 1,
      nama: "",
      deskripsi: "",
      kategori: "",
      harga: "",
      stok: "",
      gambar: "",
    },
  ];

  const renderActions = (row) => (
    <div className="flex flex-row gap-2 justify-center">
      <Link to="/edit-produk">
        <Button label="Edit" type="edit" />
      </Link>
      <Button label="Hapus" type="delete" onClick={() => {}} />
    </div>
  );

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">
        Manajemen Produk
      </h2>
      <hr />
      <div className="flex justify-between items-center mb-4 mt-6">
        <Link to="/tambah-produk">
          <Button label="Tambah Produk" type="add" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table headers={headers} data={data} renderActions={renderActions} />
      </div>
    </div>
  );
};

export default CardProduk;
