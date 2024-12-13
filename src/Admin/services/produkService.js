import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchKategori = async () => {
  try {
    const response = await axios.get(`${API_URL}/kategoris`);
    return response.data;
  } catch (error) {
    console.error('Error fetching kategori:', error);
    return [];
  }
};

export const tambahProduk = async (produkData) => {
  try {
    const formData = new FormData();
    
    // Tambahkan semua field ke formData
    Object.keys(produkData).forEach(key => {
      if (produkData[key] !== null && produkData[key] !== undefined) {
        formData.append(key, produkData[key]);
      }
    });

    const response = await axios.post(`${API_URL}/produks`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Produk berhasil ditambahkan',
      timer: 2000,
      showConfirmButton: false
    });

    return response.data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: error.response?.data?.message || 'Terjadi kesalahan saat menambahkan produk',
    });
    throw error;
  }
};

export const fetchProduk = async () => {
  try {
    const response = await axios.get(`${API_URL}/produks`);
    return response.data.produk;
  } catch (error) {
    console.error('Error fetching produk:', error);
    throw error;
  }
};



export const hapusProduk = async (produkId) => {
  try {
    // Tampilkan konfirmasi dengan SweetAlert
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus produk ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      // Kirim request hapus
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/produks/${produkId}`,{
        headers: {
          'Content-Type': 'application/json', 
        },
        
      });console.log('Full Delete URL:', response);
      
      // Tampilkan notifikasi sukses
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Produk telah dihapus',
        timer: 2000,
        showConfirmButton: false
      });

      return response.data;
    }
    
    return null;
  } catch (error) {
    // Tampilkan error dengan SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: error.response?.data?.message || 'Gagal menghapus produk',
    });

    console.error('Gagal menghapus produk:', error);
    throw error;
  }
};