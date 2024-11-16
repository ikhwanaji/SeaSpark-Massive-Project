import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const CardTambahPembelianPaketan = () => {
  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Tambah Pembelian Paketan</h2>
      <hr />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan Nama"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">No. Telephone</label>
            <input
              type="text"
              placeholder="Masukkan No. Hp"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Detail Alamat</label>
            <textarea
              placeholder="Masukkan Alamat Lengkap"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Status Pesanan</label>
            <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900">
              <option>Menunggu Pembayaran</option>
              <option>Sedang Di Tambah</option>
              <option>Pesanan Selesai</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Jumlah Paket</label>
            <input
              type="number"
              placeholder="Masukkan Jumlah Paket"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Jenis Paket</label>
            <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900">
              <option>Paket Jamur</option>
              <option>Paket Bakteri</option>
              <option>Paket Parasit</option>
            </select>
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Total Bayar</label>
            <input
              type="text"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
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
        <Link to="/manajemen-order">
            <Button label="Simpan" type="save" />
        </Link>
      </div>
    </div>
  );
};

export default CardTambahPembelianPaketan;
