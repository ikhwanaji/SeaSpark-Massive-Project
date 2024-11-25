import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardEditUser = ({ userId }) => {
  const navigate = useNavigate();

  // State for form input
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    no_hp: '',
    role: 'user',
    gambar: null,
  });

  // State for image preview and loading
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('ID Pengguna tidak valid');
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/users/${userId}`);
        const userData = response.data.data;

        setFormData({
          nama: userData.nama,
          email: userData.email,
          no_hp: userData.no_hp,
          role: userData.role,
          password: '', // Clear password field
          gambar: userData.gambar,
        });

        // Set image preview if available
        if (userData.gambar) {
          setImagePreview(`/uploads/${userData.gambar}`);
        }
      } catch (error) {
        setError(handleErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle error messages
  const handleErrorMessage = (error) => {
    if (error.response) {
      return error.response.data.message || 'Terjadi kesalahan tidak dikenal.';
    } else if (error.request) {
      return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
    } else {
      return 'Terjadi kesalahan saat memproses permintaan.';
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setError(null); // Reset error on input change

    if (name === 'gambar') {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        gambar: file,
      }));

      // Preview image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError('ID Pengguna tidak valid');
      return;
    }

    if (!formData.nama || !formData.email || !formData.no_hp) {
      setError('Nama, Email, dan Nomor HP harus diisi');
      return;
    }

    // Prepare form data for submission
    const submitData = new FormData();
    submitData.append('nama', formData.nama);
    submitData.append('email', formData.email);
    submitData.append('no_hp', formData.no_hp);
    submitData.append('role', formData.role);

    // Include password if provided
    if (formData.password) {
      submitData.append('password', formData.password);
    }

    // Include image if provided
    if (formData.gambar instanceof File) {
      submitData.append('gambar', formData.gambar);
    }

    try {
      setIsLoading(true);
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/auth/users/${userId}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // If successful, navigate back or give feedback
      alert('Berhasil memperbarui pengguna');
      navigate('/manajemen-User ');
    } catch (error) {
      setError(handleErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Edit User</h2>

      {/* Display error message if any */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <hr />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Nama Lengkap</label>
            <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" required disabled={isLoading} />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" required disabled={isLoading} />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Password (Opsional)</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" disabled={isLoading} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Gambar</label>
            <input type="file" name="gambar" accept="image/jpeg, image/png, image/jpg" onChange={handleChange} className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" disabled={isLoading} />
            {imagePreview && (
              <div className="mt-2 flex justify-center">
                <img src={imagePreview} alt="Preview Gambar" className="w-48 h-48 object-cover rounded-md shadow-md" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Nomor HP</label>
            <input type="tel" name="no_hp" value={formData.no_hp} onChange={handleChange} className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" disabled={isLoading} />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" disabled={isLoading}>
              <option value="user">User </option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Buttons with loading condition */}
        <div className="flex justify-end gap-4 mt-6">
          <Link to="/manajemen-User ">
            <Button label="Kembali" type="back" disabled={isLoading} />
          </Link>
          <Button label={isLoading ? 'Menyimpan...' : 'Simpan'} type="save" onClick={handleSubmit} disabled={isLoading} />
        </div>
      </div>
    </form>
  );
};

export default CardEditUser;
