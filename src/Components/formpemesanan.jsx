import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../index.css'; // Import custom CSS


const FormPemesanan = ({ produk, onSubmit }) => {
  const { token } = useAuth();
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [jumlahProduk, setJumlahProduk] = useState(1);
  const [shippingMethods, setShippingMethods] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama:'',
      no_hp:'',
      alamat:'',
      catatan: '',
    },
  });

   // Ambil profil saat komponen dimuat
   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: {
            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          },
        });
        
        // Update form values dengan data dari backend
        setValue('nama', response.data.user.nama);
        setValue('no_hp', response.data.user.no_hp);
        setValue('alamat', response.data.user.alamat);
      } catch (error) {
        console.error('Gagal mengambil profil:', error);
      }
    };

    fetchProfile();
  }, [token, setValue]);


  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/shipping-methods`, {
          headers: {
            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          },
        });
        
        // Transformasi data dari backend
        const methods = response.data.data.map(method => ({
          id: method.shippingId,
          value: method.kode,
          label: method.nama,
          estimasi: method.estimasi,
          harga: method.biaya
        }));
        
        setShippingMethods(methods);
      } catch (error) {
        console.error('Gagal mengambil metode pengiriman:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Tidak dapat mengambil metode pengiriman',
        });
      }
    };
  
    fetchShippingMethods();
  }, [token]);

  // Fungsi untuk menampilkan modal edit alamat
  const showAddressEditModal = () => {
    Swal.fire({
      title: 'Edit Alamat Pengiriman',
      html: `
        <div class="space-y-3 w-full">
        <div class="w-full mb-2">
            <label for="swal-input-nama" class="block text-left font-semibold mb-2">
              Nama Lengkap
            </label>
            <input 
              id="swal-input-nama" 
              class="swal2-input w-full p-2 border rounded" 
              placeholder="Nama Lengkap" 
              value="${watch('nama')}"
              required
            >
          </div>
          <div class="w-full mb-2">
            <label for="swal-input-hp" class="block text-left font-semibold mb-2">
              Nomor HP
            </label>
            <input 
              id="swal-input-hp" 
              class="swal2-input w-full p-2 border rounded" 
              placeholder="Nomor HP" 
              value="${watch('no_hp')}"
              type="tel"
              required
            >
          </div>
          <div class="w-full mb-2">
            <label for="swal-input-alamat" class="block text-left font-semibold mb-2">
              Alamat Lengkap
            </label>
            <textarea 
              id="swal-input-alamat" 
              class="swal2-textarea w-full p-2 border rounded" 
              placeholder="Alamat Lengkap"
              rows="3"
              required
            >${watch('alamat')}</textarea>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      preConfirm: () => {
        const nama = document.getElementById('swal-input-nama').value;
        const no_hp = document.getElementById('swal-input-hp').value;
        const alamat = document.getElementById('swal-input-alamat').value;

        // Validasi input
        if (!nama || !no_hp || !alamat) {
          Swal.showValidationMessage('Semua field harus diisi');
          return false;
        }

        return { nama, no_hp, alamat };
      },
      customClass: {
        popup: 'rounded-lg',
        confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded',
        cancelButton: 'bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2',
      },
    }).then(async (result) => {
      if (result.value) {
        try {
          // Ambil data profil terbaru sebelum update
          const profileResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/profile`, 
            {
              headers: {
                Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
              },
            }
          );
  
          // Kirim update profil ke backend dengan data lengkap
          const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/auth/profile`, 
            {
              nama: result.value.nama,
              email: profileResponse.data.user.email, 
              no_hp: result.value.no_hp,
              alamat: result.value.alamat,
              username: profileResponse.data.user.nama,
            },
            {
              headers: {
                Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
  
          // Update form values
          setValue('nama', response.data.user.nama);
          setValue('no_hp', response.data.user.no_hp);
          setValue('alamat', response.data.user.alamat);
  
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Profil berhasil diperbarui',
          });
        } catch (error) {
          console.error('Gagal memperbarui profil:', error.response?.data || error.message);
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: error.response?.data?.message || 'Gagal memperbarui profil',
          });
        }
      }
    });
  };

  // Render detail produk
  const renderProdukDetail = () => (
    <div className="mb-4 p-4 bg-gray-100 rounded">
      <h3 className="font-semibold">Produk yang Dibeli</h3>
      <div className="flex items-start">
        <img src={produk.gambar} alt={produk.nama} className="w-32 h-32 object-cover mr-4" />
        <div className="flex-grow">
          <p className="font-bold">{produk.nama}</p>
          <p className="text-gray-600 text-sm mb-2 mt-2 text-justify">{produk.deskripsi}</p>
          <div className="flex justify-between items-center">
            <div>
              <p>Harga: Rp {produk.harga.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Stok: {produk.stok}</p>
            </div>
            <div className="flex items-center">
              <button type="button" onClick={() => setJumlahProduk((prev) => Math.max(1, prev - 1))} className="bg-gray-200 px-2 py-1 rounded-l">
                -
              </button>
              <input
                type="number"
                value={jumlahProduk}
                min="1"
                max={produk.stok}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setJumlahProduk((prev) => Math.min(Math.max(1, value), produk.stok));
                }}
                className="w-12 text-center border-y border-gray-300 py-1 appearance-none"
              />
              <button type="button" onClick={() => setJumlahProduk((prev) => Math.min(produk.stok, prev + 1))} className="bg-gray-200 px-2 py-1 rounded-r">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Fungsi submit form
  const onFormSubmit = (data) => {
    // Temukan metode pengiriman yang dipilih
  const selectedMethod = shippingMethods.find(m => m.value === data.metodePengiriman);
    // Validasi metode pembayaran
    if (!selectedMethod) {
      Swal.fire({
        icon: 'warning',
        title: 'Perhatian',
        text: 'Pilih metode pembayaran terlebih dahulu',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Konfirmasi pesanan
    Swal.fire({
      icon: 'question',
      title: 'Konfirmasi Pesanan',
      text: 'Apakah anda yakin ingin melanjutkan pembayaran?',
      showCancelButton: true,
      confirmButtonText: 'Ya, Bayar',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Persiapkan data final
        const formData = {
          ...data,
          jumlahProduk,
          totalHarga: produk.harga * jumlahProduk,
          produk,
          metodePengiriman: selectedMethod.id, // Kirim ID integer
          metodePengirimanKode: selectedMethod.value, // Jika masih diperlukan kodenya
        };

        // Panggil fungsi submit dari parent
        onSubmit(formData);
      }
    });
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Detail Produk */}
        {renderProdukDetail()}

        {/* Informasi Pengiriman */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-3">Informasi Pengiriman</h2>

          {/* Tombol Edit Alamat */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Alamat Pengiriman</h3>
            <button type="button" onClick={showAddressEditModal} className="text-blue-600 hover:underline text-sm">
              Ubah
            </button>
          </div>

          {/* Tampilan Alamat */}
          <div className="bg-gray-100 p-3 rounded">
            <p>{watch('nama')}</p>
            <p>{watch('no_hp')}</p>
            <p>{watch('alamat')}</p>
          </div>
        </div>

        
        
        {/* Metode Pengiriman */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-3">Metode Pengiriman:</h2>
          <div className="space-y-2">
            {shippingMethods.map((method) => (
              <label 
                key={method.value} 
                className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    {...register('metodePengiriman', {
                      required: 'Pilih metode pengiriman',
                    })}
                    value={method.value}
                    checked={watch('metodePengiriman') === method.value}
                    onChange={(e) => {
                      setSelectedShippingMethod(e.target.value);
                      setValue('metodePengiriman', e.target.value);
                    }}
                    className="form-radio"
                  />
                  <div>
                    <span className="font-semibold">{method.label}</span>
                    <p className="text-xs text-gray-500">Estimasi: {method.estimasi}</p>
                  </div>
                </div>
                <span className="font-medium">
                  Rp {method.harga.toLocaleString()}
                </span>
              </label>
            ))}
          </div>
          {errors.metodePengiriman && (
            <p className="text-red-500 text-sm mt-1">
              {errors.metodePengiriman.message}
            </p>
          )}
        </div>


        {/* Catatan Tambahan */}
        <div className="mt-3">
          <label className="block text-xl font-medium mb-1">Catatan Pesanan: </label>
          <textarea {...register('catatan')} rows="3" className="w-full p-2 border border-gray-300 rounded" placeholder="Tambahkan catatan untuk pesanan anda"></textarea>
        </div>

        {/* Ringkasan Harga */}
        <div className="bg-gray-100 rounded p-3 mb-4 mt-4">
          <div className="flex justify-between">
            <span>Harga Produk</span>
            <span>Rp {(produk.harga * jumlahProduk).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Jumlah</span>
            <span>{jumlahProduk}</span>
          </div>
          {selectedShippingMethod && (
            <div className="flex justify-between">
              <span>
                Biaya Pengiriman ({shippingMethods.find(m => m.value === selectedShippingMethod).label})
              </span>
              <span>
                Rp {shippingMethods.find(m => m.value === selectedShippingMethod).harga.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t pt-2 mt-2">
            <span>Total Harga</span>
            <span>
              Rp {selectedShippingMethod 
                ? ((produk.harga * jumlahProduk) + shippingMethods.find(m => m.value === selectedShippingMethod).harga).toLocaleString()
                : (produk.harga * jumlahProduk).toLocaleString()
              }
              </span>
          </div>
        </div>

        {/* Tombol Submit */}
        <button type="button" onClick={handleSubmit(onFormSubmit)} className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition">
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
};

// PropTypes untuk validasi props
FormPemesanan.propTypes = {
  user: PropTypes.shape({
    nama: PropTypes.string,
    no_hp: PropTypes.string,
    alamat: PropTypes.string,
  }),
  produk: PropTypes.shape({
    nama: PropTypes.string.isRequired,
    harga: PropTypes.number.isRequired,
    gambar: PropTypes.string.isRequired,
    stok: PropTypes.number.isRequired,
    deskripsi: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormPemesanan;
