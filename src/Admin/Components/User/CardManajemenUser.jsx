import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../Button';
import { Link } from "react-router-dom";

const CardUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message || 'Gagal mengambil data pengguna');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Render loading
  if (loading) return <div>Memuat data...</div>;

  // Render error
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Daftar Pengguna</h2>

      {users.length === 0 ? (
        <div>Tidak ada data pengguna</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">No. HP</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.userId || index}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{user.nama}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.no_hp}</td>
                  <td className="border p-2">{user.role}</td>
                  <td>
                    {' '}
                    <div className="flex flex-row gap-2 justify-center">
                      <Link to={`/edit-user/${user.userId}`}>
                        <Button label="Edit" type="edit" />
                      </Link>
                      <Button label="Hapus" type="delete" onClick={() => {}} />
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
