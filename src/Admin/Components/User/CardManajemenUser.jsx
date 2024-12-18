import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CardUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/users`);

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        setError('Format data tidak valid');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message || 'Gagal mengambil data pengguna');
      setLoading(false);
    }
  };

  // Fungsi hapus user
  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda tidak dapat mengembalikan data yang dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/auth/users/${userId}`);
          setUsers(users.filter((user) => user.userId !== userId));
          Swal.fire('Dihapus!', 'Data pengguna berhasil dihapus.', 'success');
        } catch (error) {
          Swal.fire('Gagal!', 'Tidak dapat menghapus pengguna.', 'error');
          console.error('Error deleting user:', error);
        }
      }
    });
  };

  // Efek untuk fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  // Render loading
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );

  // Render error
  if (error)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );

  return (
    <div className="border rounded-md p-4 bg-white shadow mb-6">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">
        Manajemen User
      </h2>
      <hr />

      {users.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          Tidak ada data pengguna
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-sky-200">
                <th className="border border-sky-900 p-2 text-sky-900 text-center">No</th>
                <th className="border border-sky-900 p-2 text-sky-900 text-center">Nama</th>
                <th className="border border-sky-900 p-2 text-sky-900 text-center">Email</th>
                <th className="border border-sky-900 p-2 text-sky-900 text-center">No. HP</th>
                <th className="border border-sky-900 p-2 text-sky-900 text-center">Role</th>
                <th className="border border-sky-900 p-2 text-sky-900 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.userId || index}>
                  <td className="text-center border border-sky-900 p-2 text-sky-900">{index + 1}</td>
                  <td className="border border-sky-900 p-2 text-sky-900">{user.nama}</td>
                  <td className="border border-sky-900 p-2 text-sky-900">{user.email}</td>
                  <td className="border border-sky-900 p-2 text-sky-900">{user.no_hp}</td>
                  <td className="border border-sky-900 p-2 text-sky-900">{user.role}</td>
                  <td className="border border-sky-900 p-2 text-sky-900">
                    <div className="flex flex-row gap-2 justify-center">
                      <Link to={`/edit-user/${user.userId}`}>
                        <Button label="Edit" type="edit" />
                      </Link>
                      <Button label="Hapus" type="delete" onClick={() => handleDeleteUser(user.userId)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CardUser;