import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../components/Button'; // Sesuaikan path
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Pastikan sudah diinstal

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
    // Tampilkan konfirmasi SweetAlert
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
          // Proses penghapusan
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/auth/users/${userId}`);

          // Update state users setelah berhasil dihapus
          setUsers(users.filter((user) => user.userId !== userId));

          // Tampilkan pesan sukses
          Swal.fire('Dihapus!', 'Data pengguna berhasil dihapus.', 'success');
        } catch (error) {
          // Tampilkan pesan error jika gagal
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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Daftar Pengguna</h2>
        
      </div>

      {users.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">Tidak ada data pengguna</div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-white border-b">
              <tr>
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">No. HP</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.userId || index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.nama}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.no_hp}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
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
