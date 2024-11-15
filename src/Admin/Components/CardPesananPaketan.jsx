import React from 'react';
import Button from './Button';
import Breadcrumb from './Breadcrumb';
import { Link } from 'react-router-dom';


const CardPesananPaketan = () => {
  return (
    <div className="border rounded-md p-4 bg-white shadow">
      {/* Card Title */}
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Manajemen Pesanan Paketan</h2>
      <hr />

      <div className="flex justify-between items-center mb-4 mt-6">
        <Link to="/tambah-pesanan-paketan">
            <Button label="+ Tambah Pesanan" type="add" />
        </Link>
        <input
          type="text"
          placeholder="Ketik Pencarian"
          className="p-2 border border-sky-900 rounded-md w-1/4"
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
            <tr className="bg-sky-200">
            <th className="border border-sky-900 p-2 text-sky-900">No.</th>
            <th className="border border-sky-900 p-2 text-sky-900">Nama</th>
            <th className="border border-sky-900 p-2 text-sky-900">No. Hp</th>
            <th className="border border-sky-900 p-2 text-sky-900">Alamat</th>
            <th className="border border-sky-900 p-2 text-sky-900">Status Pesanan</th>
            <th className="border border-sky-900 p-2 text-sky-900">Jenis Paket</th>
            <th className="border border-sky-900 p-2 text-sky-900">Jumlah</th>
            <th className="border border-sky-900 p-2 text-sky-900">Harga Total</th>
            <th className="border border-sky-900 p-2 text-sky-900">Aksi</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td className="border border-sky-900 p-2 text-sky-900 text-center">1</td>
            <td className="border border-sky-900 p-2 text-sky-900">Mang Ojak</td>
            <td className="border border-sky-900 p-2 text-sky-900 text-center">08123456789</td>
            <td className="border border-sky-900 p-2 text-sky-900">Bekasi</td>
            <td className="border border-sky-900 p-2 text-sky-900">Pesanan Selesai</td>
            <td className="border border-sky-900 p-2 text-sky-900">Paket Bakteri</td>
            <td className="border border-sky-900 p-2 text-sky-900 text-center">1</td>
            <td className="border border-sky-900 p-2 text-sky-900 text-center">600.000</td>           
            <td className="border border-sky-900 p-2 text-sky-900 flex gap-2 justify-center">
                <Link to="/detail-pesanan-paketan">
                    <Button label="Detail" type="details" />
                </Link>
                <Button label="Hapus" type="delete" onClick={() => {}} />
            </td>
            </tr>
            <tr>
            <td className="border border-sky-900 p-2 text-sky-900 text-center">2</td>
            <td className="border border-sky-900 p-2 text-sky-900">Mang Sukiman</td>
            <td className="border border-sky-900 p-2 text-sky-900 text-center">08123456789</td>
            <td className="border border-sky-900 p-2 text-sky-900">Tangerang</td>
            <td className="border border-sky-900 p-2 text-sky-900">Menunggu Pembayaran</td>
            <td className="border border-sky-900 p-2 text-sky-900">Paket Jamur</td>
            <td className="border border-sky-900 p-2 text-sky-900 text-center">1</td>
            <td className="border border-sky-900 p-2 text-sky-900 text-center">700.000</td>           
            <td className="border border-sky-900 p-2 text-sky-900 flex gap-2 justify-center">
                <Link to="/detail-pesanan-paketan">
                    <Button label="Detail" type="details" />
                </Link>
                <Button label="Hapus" type="delete" onClick={() => {}} />
            </td>
            </tr>
        </tbody>
        </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Breadcrumb></Breadcrumb>
      </div>
    </div>
  );
};

export default CardPesananPaketan;