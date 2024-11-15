import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const CardDetailPembelianPaketan = () => {
  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Detail Pembelian Paketan</h2>
      <hr />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Nama Lengkap</label>
            <input
              type="text"
              value="Mang Ojak"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">No. Telephone</label>
            <input
              type="text"
              value="08123456789"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Detail Alamat</label>
            <textarea
              value="Jl. Mangga IV Block F 01 No 10 Cikarang Barat, Bekasi"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Status Pesanan</label>
            <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" defaultValue="Status2" disabled>
              <option value="Status1">Menunggu Pembayaran</option>
              <option value="Status2">Sedang Di Proses</option>
              <option value="Status3">Pesanan Selesai</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Jumlah Paket</label>
            <input
              type="number"
              defaultValue={1}
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              disabled
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Jenis Paket</label>
            <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" defaultValue="PJamur" disabled>
              <option value="PJamur">Paket Jamur</option>
              <option value="PBakteri">Paket Bakteri</option>
              <option value="PParasit">Paket Parasit</option>
            </select>
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Total Bayar</label>
            <input
              type="text"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
              value="Rp. 700.000"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Link to="/manajemen-order">
          <Button label="Kembali" type="back" />
        </Link>
        <Link to="#">
            <Button label="Proses" type="process" />
        </Link>
      </div>
    </div>
  );
};

export default CardDetailPembelianPaketan;
