import React from "react";
import Button from "./Button";
import Breadcrumb from "./Breadcrumb";
import { Link } from "react-router-dom";

const CardUser = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-slate-950 font-bold mb-6">Manajemen User</h2>
      <div className="border rounded-md p-4 mb-8 bg-white shadow">
        <div className="flex justify-between items-center mb-10 mt-6">
          <Link to="/tambah-user">
            <Button label="Tambah User" type="add" />
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="cari..."
              className="p-2 border border-black rounded-md w-64" // Mengubah border menjadi hitam
            />
          </div>
        </div>

        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-white">
              <th className="border border-black p-2 text-black">Nama</th>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <th className="border border-black p-2 text-black">
                E-mail
              </th>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <th className="border border-black p-2 text-black">
                Password
              </th>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <th className="border border-black p-2 text-black">Role</th>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <th className="border border-black p-2 text-black">Aksi</th>{" "}
              {/* Mengubah border dan text menjadi hitam */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2 text-black">wak haji</td>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <td className="border border-black p-2 text-black">
                wakaji99@gmail.com
              </td>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <td className="border border-black p-2 text-black">
                $$2y$10$D7t5IwLJKIMssIA$opScszx^%61
              </td>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <td className="border border-black p-2 text-black">Admin</td>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <td className="border border-black p-2 text-black">
                <div className="flex flex-col gap-2">
                  <Link to="/ubah-user">
                    <Button label="Proses" type="process" />
                  </Link>
                  <Button label="Hapus" type="delete" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-black">lalalili</td>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <td className="border border-black p-2 text-black">
                lalalili221@gmail.com
              </td>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <td className="border border-black p-2 text-black">
                9eu9RlAb.buX9y5IwLJs10$cs$2y$10$EIOPl
              </td>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <td className="border border-black p-2 text-black">
                Pengguna
              </td>{" "}
              {/* Mengubah border dan text menjadi hitam */}
              <td className="border border-black p-2 text-black">
                <div className="flex flex-col gap-2">
                  <Link to="/ubah-user">
                    <Button label="Proses" type="process" />
                  </Link>
                  <Button label="Hapus" type="delete" />
                </div>
              </td>
            </tr>
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

export default CardUser;
