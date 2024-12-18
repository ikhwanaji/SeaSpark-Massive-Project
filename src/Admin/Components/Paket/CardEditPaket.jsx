import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const CardEditPaket = () => {
  const [formData, setFormData] = useState({
    title: "",
    harga: "",
    items: "",
  });
  const [gambar, setGambar] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const navigate = useNavigate();
  const { paketId } = useParams();

  // Fungsi untuk mengambil data paket yang akan diedit
  const fetchPaketDetail = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/paket/${paketId}`);
      const paket = response.data;
      
      // Konversi items dari array string ke string biasa
      const formattedItems = paket.items
      ? paket.items.replace(/[\[\]"]/g, '').split(',').join(', ')
      : '';

      setFormData({
        title: paket.title,
        harga: paket.harga,
        items: formattedItems
      });
      setCurrentImage(paket.gambar);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Tidak dapat mengambil data paket'
      });
    }
  };

  useEffect(() => {
    fetchPaketDetail();
  }, [paketId]);

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
    
    // Proses items menjadi array string
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
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/paket/${paketId}`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Paket berhasil diupdate'
      }).then(() => {
        navigate("/manajemen-paket");
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: "Gagal mengupdate paket: " + (error.response?.data?.message || error.message)
      });
    }
  };

  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Edit Paket</h2>
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
                placeholder="Pisahkan setiap item dengan koma"
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
              {currentImage && (
                <div className="mt-2">
                  <p>Gambar Saat Ini:</p>
                  <img 
                    src={`${import.meta.env.VITE_BACKEND_URL}/paket/images/${currentImage}`} 
                    alt="Current" 
                    className="w-40 h-40 object-cover mt-2"
                  />
                </div>
              )}
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

export default CardEditPaket;