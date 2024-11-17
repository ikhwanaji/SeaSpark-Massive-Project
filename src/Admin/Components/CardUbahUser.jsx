import React from "react";
import { Link } from "react-router-dom";

const CardUbahUser = () => {
  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      {/* Memindahkan header di luar grid */}
      <h2 className="text-2xl text-slate-950 font-medium mb-6">Ubah User</h2>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              value="Wak Haji"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              value="Wakhaji098"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">
              No Telephone
            </label>
            <input
              type="text"
              value="081XXXXXXXXXX"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">
              Detail Alamat
            </label>
            <textarea
              value="Jl. Mangga IV Block F 01 No 10 Cikarang Barat, Bekasi"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              rows="3"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">
              Role
            </label>
            <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900">
              <option>Pelanggan</option>
            </select>
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">
              E-mail
            </label>
            <input
              type="email"
              value="wakhaji098@gmail.com"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value="wakhaji3301"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Link to="/manajemen-user">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Kembali
              </button>
            </Link>
            <Link to="/manajemen-user">
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

export default CardUbahUser;
