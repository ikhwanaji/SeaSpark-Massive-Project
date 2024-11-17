import React from "react";
import { Link } from "react-router-dom";

const CardTambahBarang = () => {
  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      {/* Memindahkan header di luar grid */}
      <h2 className="text-2xl text-slate-950 font-medium mb-6">
        Tambah Barang
      </h2>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">
              Kode Barang
            </label>
            <input
              type="text"
              placeholder="Masukkan Kode Barang"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">
              Srock barang
            </label>
            <input
              type="text"
              placeholder="Masukkan Srock Barang"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">
              Nama Barang
            </label>
            <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900">
              <option>Pilih Nama Barang</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Link to="/manajemen-barang">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Kembali
              </button>
            </Link>
            <Link to="/manajemen-barang">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Simpan
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTambahBarang;
