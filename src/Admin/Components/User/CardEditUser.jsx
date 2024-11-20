import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';

const CardEditUser = () => {
  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Edit User</h2>
      <hr />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
              <label className="block text-sky-900 font-semibold mb-2">Nama Lengkap</label>
              <input
                type="text"
                value=""
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Email</label>
            <input
              type="email"
              value=""
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
              <label className="block text-sky-900 font-semibold mb-2">Password</label>
              <input
                type="password"
                value=""
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Gambar</label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              className="p-2 border rounded-md w-full shadow-md mb-1 border-sky-900"
            />
          </div>
          <div>
              <label className="block text-sky-900 font-semibold mb-2">No. Handphone</label>
              <input
                type="text"
                value=""
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              />
          </div>
        <div>
          <label className="block text-sky-900 font-semibold mb-2">Role</label>
          <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" defaultValue="user">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Link to="/manajemen-User">
          <Button label="Kembali" type="back" />
        </Link>
        <Link to="/manajemen-User">
          <Button label="Simpan" type="save" />
        </Link>
      </div>
    </div>
  );
};

export default CardEditUser;
