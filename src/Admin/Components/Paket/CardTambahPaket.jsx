import React, { useState } from 'react';
import Button from '../../Components/Button'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardTambahPaket = () => {
  const [formData, setFormData] = useState({
    title: "",
    harga: "",
    items: "",
  });
  const [gambar, setGambar] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setGambar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const processedItems = formData.items
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== '')
    .map(item => `"${item}"`);
    
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("harga", formData.harga);
    formDataToSubmit.append("items", `[${processedItems.join(',')}]`);
    if (gambar) {
      formDataToSubmit.append("gambar", gambar);
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/paket`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate("/manajemen-paket");
    } catch (error) {
      alert("Gagal menambahkan paket: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Tambah Paket</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sky-900 font-semibold mb-2">Nama Paket</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
                required
              />
            </div>
            <div>
              <label className="block text-sky-900 font-semibold mb-2">Deskripsi</label>
              <textarea
                name="items"
                value={formData.items}
                onChange={handleChange}
                className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900"
                rows="5"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sky-900 font-semibold mb-2">Harga</label>
              <input
                type="number"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
                required
              />
            </div>
            
            <div>
              <label className="block text-sky-900 font-semibold mb-2">Gambar</label>
              <input
                type="file"
                name="gambar"
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/jpg"
                className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Link to="/manajemen-paket">
            <Button label="Kembali" type="back" />
          </Link>
          <Button 
            label="Simpan" 
            type="save" 
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default CardTambahPaket;