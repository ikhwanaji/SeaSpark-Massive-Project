import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { fetchKategori, tambahProduk } from '../../services/produkService';

const CardTambahProduk = () => {
  const navigate = useNavigate();
  const [kategoris, setKategoris] = useState([]);
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    kategoriId: '',
    harga: '',
    stok: '',
    gambar: null
  });

  useEffect(() => {
    const loadKategori = async () => {
      const data = await fetchKategori();
      setKategoris(data);
    };
    loadKategori();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'gambar') {
      setFormData(prev => ({
        ...prev,
        gambar: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Konversi harga ke number
      const dataToSubmit = {
        ...formData,
        harga: parseFloat(formData.harga),
        stok: parseInt(formData.stok) || 0
      };

      await tambahProduk(dataToSubmit);
      navigate('/manajemen-produk');
    } catch (error) {
      console.error('Gagal menambahkan produk', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Tambah Produk</h2>
      <hr />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Nama Produk</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900"
              rows="5"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Kategori</label>
            <select 
              name="kategoriId"
              value={formData.kategoriId}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            >
              <option value="">Pilih Kategori</option>
              {kategoris.map(kategori => (
                <option 
                  key={kategori.kategoriId} 
                  value={kategori.kategoriId}
                >
                  {kategori.nama}
                </option>
              ))}
            </select>
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
              required
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Stok</label>
            <input
              type="number"
              name="stok"
              value={formData.stok}
              onChange={handleChange}
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Gambar</label>
            <input
              type="file"
              name="gambar"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleChange}
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
        <Button 
          label="Simpan" 
          type="save" 
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default CardTambahProduk;