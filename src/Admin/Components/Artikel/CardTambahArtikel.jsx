import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';

const CardTambahArtikel = () => {
  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Tambah Artikel</h2>
      <hr />
      <div className="gap-6 mt-6">
        <div>
            <label className="block text-sky-900 font-semibold mb-2">Judul Artikel</label>
            <input
              type="text"
              value=""
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
        </div>
        <div>
            <label className="block text-sky-900 font-semibold mb-2">Konten</label>
            <textarea
              value=""
              className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
              rows="5"
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
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Status</label>
          <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900">
            <option value="">Draf</option>
            <option value="">Publikasi</option>
          </select>
        </div>
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Tanggal Publikasi</label>
          <input
            type="date"
            value=""
            className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Link to="/manajemen-artikel">
          <Button label="Kembali" type="back" />
        </Link>
        <Link to="/manajemen-artikel">
          <Button label="Simpan" type="save" />
        </Link>
      </div>
    </div>
  );
};

export default CardTambahArtikel;
