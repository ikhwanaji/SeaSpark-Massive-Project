import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';

const CardEditMetode = () => {
  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Edit Metode Pembayaran</h2>
      <hr />
        <div className="mt-4">
            <label className="block text-sky-900 font-semibold mb-2">Metode</label>
            <input
                type="text"
                value=""
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
        </div>
        <div className="mt-4">
            <label className="block text-sky-900 font-semibold mb-2">Deskripsi</label>
            <textarea
              value=""
              className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly min-h-[120px]"
              rows="5"
            />
        </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Link to="/metode-pembayaran">
          <Button label="Kembali" type="back" />
        </Link>
        <Link to="/metode-pembayaran">
          <Button label="Simpan" type="save" />
        </Link>
      </div>
    </div>
  );
};

export default CardEditMetode;
