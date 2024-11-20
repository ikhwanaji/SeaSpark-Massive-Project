import React from "react";
import Table from "../Table";
import Button from "../Button";
import { Link } from "react-router-dom";

const CardPesananSatuan = () => {
  const headers = [
    "No.",
    "Nama",
    "No. Hp",
    "Provinsi",
    "Kabupaten/Kota",
    "Kecamatan",
    "Kelurahan",
    "Kode Pos",
    "Alamat",
    "Produk",
    "Jumlah",
    "Total Harga",
    "Metode Pembayaran",
    "Status",
    "Tanggal Pemesanan",
    "Aksi",
  ];

  const data = [
    {
      no: 1,
      nama: "",
      noHp: "",
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      kelurahan: "",
      kodePos: "",
      alamat: "",
      produk: "",
      jumlah: "",
      totalHarga: "",
      metodePembayaran: "",
      status: "",
      tanggalPemesanan: "",
    },
  ];

  const renderActions = (row) => (
    <div className="flex flex-row gap-2 justify-center">
      <Link to="/detail-pesanan-satuan">
        <Button label="Detail" type="details" />
      </Link>
      <Button label="Hapus" type="delete" onClick={() => {}} />
    </div>
  );

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      {/* Card Title */}
      <h2 className="text-2xl text-sky-900 font-bold mb-4">
        Manajemen Pesanan Satuan
      </h2>
      <hr />

      {/* Table with Horizontal Scroll */}
      <div className="overflow-x-auto mt-6">
        <Table headers={headers} data={data} renderActions={renderActions} />
      </div>
    </div>
  );
};

export default CardPesananSatuan;
