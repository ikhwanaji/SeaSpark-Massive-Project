import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';

const CardEditProduk = () => {
  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Edit Produk</h2>
      <hr />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
              <label className="block text-sky-900 font-semibold mb-2">Nama Produk</label>
              <input
                type="text"
                value=""
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              />
          </div>
          <div>
              <label className="block text-sky-900 font-semibold mb-2">Deskripsi</label>
              <textarea
                value=""
                className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
                rows="5"
              />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Kategori</label>
            <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900">
              <option value="">Obat</option>
              <option value="">Alat</option>
              <option value="">Panduan</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Harga</label>
            <input
              type="text"
              value=""
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Stok</label>
            <input
              type="number"
              value=""
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Gambar</label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Link to="/manajemen-produk">
          <Button label="Kembali" type="back" />
        </Link>
        <Link to="/manajemen-produk">
          <Button label="Simpan" type="save" />
        </Link>
      </div>
    </div>
  );
};

export default CardEditProduk;
