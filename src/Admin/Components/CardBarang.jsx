import React from "react";
import Button from "./Button";
import Breadcrumb from "./Breadcrumb";
import { Link } from "react-router-dom";

const CardBarang = () => {
  const barangList = [
    { kode: "A001", nama: "Obat Jamur Ikan Kerapu", stock: 50 },
    { kode: "A002", nama: "Obat Parasit", stock: 50 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-slate-950 font-bold mb-6">
        Manajemen Barang
      </h2>
      <div className="border rounded-md p-4 mb-8 bg-white shadow">
        <div className="flex justify-between items-center mb-10 mt-6">
          <Link to="/tambah-barang">
            <Button label="Tambah Barang" type="add" />
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="cari..."
              className="p-2 border border-black rounded-md w-64"
            />
          </div>
        </div>

        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-white">
              <th className="border border-black p-2 text-black text-center">
                Kode Barang
              </th>
              <th className="border border-black p-2 text-black text-center">
                Nama Barang
              </th>
              <th className="border border-black p-2 text-black text-center">
                Stock Barang
              </th>
              <th className="border border-black p-2 text-black text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {barangList.map((barang, index) => (
              <tr key={index}>
                <td className="border border-black p-2 text-black text-center">
                  {barang.kode}
                </td>
                <td className="border border-black p-2 text-black text-center">
                  {barang.nama}
                </td>
                <td className="border border-black p-2 text-black text-center">
                  {barang.stock}
                </td>
                <td className="border border-black p-2 text-black text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Button label="edit" type="process" />
                    <Button label="Hapus" type="delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Breadcrumb />
        </div>
      </div>
    </div>
  );
};

export default CardBarang;
