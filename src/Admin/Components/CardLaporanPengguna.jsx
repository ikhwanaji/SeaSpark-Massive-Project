import React from "react";
import Button from "./Button";
import Breadcrumb from "./Breadcrumb";

const CardLaporanPengguna = () => {
  const laporanList = [
    {
      no: 1,
      nama: "Doni Putra",
      email: "doniputra011@gmail.com",
      pesan:
        "Setelah menggunakan layanan DoKer ini, kondisi ikan kerapu saya membaik secara signifikan. Saya merasa lebih percaya diri dalam merawat ikan saya.",
    },
    {
      no: 2,
      nama: "Aki Ahmad",
      email: "akiahmad023@gmail.com",
      pesan:
        "Saya sangat terkesan dengan layanan website DoKer yang menyediakan panduan penanganan hama dan penyakit ikan. Informasi yang lengkap dan mudah dipahami sangat membantu saya dalam mengatasi masalah pada ikan kerapu saya. Selain itu, kemudahan untuk mendapatkan alat dan bahan yang diperlukan dalam penanganan membuat proses ini menjadi lebih efisien.",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-slate-950 font-bold mb-6">
        Laporan Pengguna
      </h2>
      <div className="border rounded-md p-4 mb-8 bg-white shadow">
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="cari..."
            className="p-2 border border-black rounded-md w-64"
          />
        </div>

        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-white">
              <th className="border border-black p-2 text-black text-center">
                No
              </th>
              <th className="border border-black p-2 text-black text-center">
                Nama
              </th>
              <th className="border border-black p-2 text-black text-center">
                E-mail
              </th>
              <th className="border border-black p-2 text-black text-center">
                Pesan
              </th>
              <th className="border border-black p-2 text-black text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {laporanList.map((laporan, index) => (
              <tr key={index}>
                <td className="border border-black p-2 text-black text-center">
                  {laporan.no}
                </td>
                <td className="border border-black p-2 text-black text-center">
                  {laporan.nama}
                </td>
                <td className="border border-black p-2 text-black text-center">
                  {laporan.email}
                </td>
                <td className="border border-black p-2 text-black text-left">
                  {laporan.pesan}
                </td>
                <td className="border border-black p-2 text-black text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Button label="Email" type="process" />
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

export default CardLaporanPengguna;
