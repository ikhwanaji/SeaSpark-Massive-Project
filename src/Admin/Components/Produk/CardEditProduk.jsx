import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const CardEditProduk = () => {
  const [produk, setProduk] = useState({
    nama: '',
    deskripsi: '',
    kategoriId: '',
    harga: '',
    stok: '',
    gambar: null
  });
  const [kategoris, setKategoris] = useState([]);
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Ambil data kategori
  useEffect(() => {
    const fetchKategoris = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/kategoris`);
        setKategoris(response.data);
      } catch (error) {
        console.error('Error fetching kategoris:', error);
      }
    };
    fetchKategoris();
  }, []);

  // Ambil data produk yang akan diedit
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        // Tambahkan loading state
        setLoading(true);
  
        // Gunakan endpoint yang sesuai dengan backend Anda
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/produks/${id}`);
        
        // Pastikan mengakses data produk dari response sesuai struktur backend
        const produkData = response.data.produk;
  
        // Set state produk dengan data dari backend
        setProduk({
          nama: produkData.nama || '',
          deskripsi: produkData.deskripsi || '',
          kategoriId: produkData.kategoriId || '',
          harga: produkData.harga || '',
          stok: produkData.stok || '',
          gambar: null
        });
  
        // Set preview gambar jika ada
        if (produkData.gambar) {
          setPreview(`${import.meta.env.VITE_BACKEND_URL}/produks/images/${produkData.gambar}`);
        }
      } catch (error) {
        // Tangani error dengan lebih detail
        console.error('Error fetching produk:', error);
        
        // Gunakan SweetAlert untuk menampilkan error
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memuat Produk',
          text: error.response?.data?.message || 'Terjadi kesalahan saat mengambil data produk',
          confirmButtonText: 'Tutup'
        });
  
        // Redirect kembali ke halaman manajemen produk
        navigate('/manajemen-produk');
      } finally {
        // Matikan loading state
        setLoading(false);
      }
    };
    
    // Pastikan id tersedia sebelum fetch
    if (id) {
      fetchProduk();
    }
  }, [id, navigate]);
  
  // Tambahkan state loading
  const [loading, setLoading] = useState(false);
  
  // Modifikasi render untuk menangani loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduk(prev => ({
      ...prev,
      [name]: value || '' // Pastikan selalu ada nilai
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduk(prev => ({
      ...prev,
      gambar: file
    }));

    // Preview gambar
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    // Pastikan tidak ada field kosong
    Object.keys(produk).forEach(key => {
      if (produk[key] !== null && produk[key] !== '') {
        formData.append(key, produk[key]);
      }
    });

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/produks/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      navigate('/manajemen-produk');
    } catch (error) {
      console.error('Error updating produk:', error);
      // Tambahkan logic untuk menampilkan error ke pengguna
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Edit Produk</h2>
      <hr />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Nama Produk</label>
            <input
              type="text"
              name="nama"
              value={produk.nama || ''} // Tambahkan fallback value
              onChange={handleChange}
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              required
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={produk.deskripsi || ''} // Tambahkan fallback value
              onChange={handleChange}
              className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900"
              rows="5"
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Kategori</label>
            <select 
              name="kategoriId"
              value={produk.kategoriId || ''} // Tambahkan fallback value
              onChange={handleChange}
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              required
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
              value={produk.harga || ''} // Tambahkan fallback value
              onChange={handleChange}
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              required
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Stok</label>
            <input
              type="number"
              name="stok"
              value={produk.stok || ''} // Tambahkan fallback value
              onChange={handleChange}
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              required
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Gambar</label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
            />
            {preview && (
              <img 
                src={preview} 
                alt="Preview" 
                className="mt-2 max-h-40 object-cover"
              />
            )}
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

export default CardEditProduk;