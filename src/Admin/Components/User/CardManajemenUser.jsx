import React from "react";
import Table from "../Table";
import Button from "../Button";
import { Link } from "react-router-dom";

const CardUser = () => {
  const headers = [
    "No.",
    "Nama",
    "Email",
    "Password",
    "Gambar",
    "No. Hp",
    "Role",
    "Aksi",
  ];

  const data = [
    {
      no: 1,
      nama: "",
      email: "",
      password: "",
      gambar: "",
      no_hp: "",
      role: "",
    },
  ];

  const renderActions = (row) => (
    <div className="flex flex-row gap-2 justify-center">
      <Link to="/edit-user">
        <Button label="Edit" type="edit" />
      </Link>
      <Button label="Hapus" type="delete" onClick={() => {}} />
    </div>
  );

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">
        Manajemen User
      </h2>
      <hr />
      <div className="overflow-x-auto">
        <Table headers={headers} data={data} renderActions={renderActions} />
      </div>
    </div>
  );
};

export default CardUser;
