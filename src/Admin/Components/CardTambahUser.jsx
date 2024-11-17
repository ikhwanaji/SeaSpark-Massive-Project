import React from "react";
import { Link } from "react-router-dom";

const CardTambahUser = () => {
  return (
    <div className=" min-h-screen p-6">
      {/* Heading di luar form */}
      <div className="p-4 rounded-md shadow-none mb-6">
        <h2 className="text-2xl text-slate-950 font-semibold">
          Tambah Pengguna
        </h2>
      </div>

      {/* Form Tambah Pengguna */}
      <div className="border rounded-md p-6 bg-white shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sky-900 font-semibold mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan Nama"
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              />
            </div>
            <div>
              <label className="block text-sky-900 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Masukkan Username"
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              />
            </div>
            <div>
              <label className="block text-sky-900 font-semibold mb-2">
                No Telephone
              </label>
              <input
                type="text"
                placeholder="Masukkan No. Hp"
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              />
            </div>
            <div>
              <label className="block text-sky-900 font-semibold mb-2">
                Detail Alamat
              </label>
              <textarea
                placeholder="Masukkan Alamat Lengkap"
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
                <option>Pilih Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <label className="block text-sky-900 font-semibold mb-2">
                E-mail
              </label>
              <input
                type="email"
                placeholder="Masukkan E-mail"
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              />
            </div>
            <div>
              <label className="block text-sky-900 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan Password"
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
    </div>
  );
};

export default CardTambahUser;
