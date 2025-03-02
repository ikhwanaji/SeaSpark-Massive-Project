import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../index.css';

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
      nama: '',
      no_hp: '',
      alamat: '',
      catatan: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: {
            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          },
        });
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
        const methods = response.data.data.map((method) => ({
          id: method.shippingId,
          value: method.kode,
          label: method.nama,
          estimasi: method.estimasi,
          harga: method.biaya,
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

  const showAddressEditModal = () => {
    Swal.fire({
      title: 'Edit Alamat Pengiriman',
      html: `
        <div class="space-y-3 w-full">
          <div class="w-full mb-2">
            <label for="swal-input-nama" class="block text-left font-semibold mb-2">Nama Lengkap</label>
            <input id="swal-input-nama" class="swal2-input w-full p-2 border rounded" placeholder="Nama Lengkap" value="${watch('nama')}" required>
          </div>
          <div class="w-full mb-2">
            <label for="swal-input-hp" class="block text-left font-semibold mb-2">Nomor HP</label>
            <input id="swal-input-hp" class="swal2-input w-full p-2 border rounded" placeholder="Nomor HP" value="${watch('no_hp')}" type="tel" required>
          </div>
          <div class="w-full mb-2">
            <label for="swal-input-alamat" class="block text-left font-semibold mb-2">Alamat Lengkap</label>
            <textarea id="swal-input-alamat" class="swal2-textarea w-full p-2 border rounded" placeholder="Alamat Lengkap" rows="3" required>${watch('alamat')}</textarea>
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
          const profileResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
            headers: {
              Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            },
          });
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
                'Content-Type': 'application/json',
              },
            }
          );
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

  const renderProdukDetail = () => (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-lg mb-3">Produk yang Dibeli</h3>
      <div className="flex items-start">
        <img src={produk.gambar} alt={produk.nama} className="w-32 h-32 object-cover rounded-lg mr-4" />
        <div className="flex-grow">
          <p className="font-bold text-gray-800">{produk.nama}</p>
          <p className="text-gray-600 text-sm mb-2 mt-2 text-justify">{produk.deskripsi}</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700">Harga: Rp {produk.harga.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Stok: {produk.stok}</p>
            </div>
            <div className="flex items-center">
              <button type="button" onClick={() => setJumlahProduk((prev) => Math.max(1, prev - 1))} className="bg-gray-200 px-2 py-1 rounded-l hover:bg-gray-300">
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
              <button type="button" onClick={() => setJumlahProduk((prev) => Math.min(produk.stok, prev + 1))} className="bg-gray-200 px-2 py-1 rounded-r hover:bg-gray-300">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const onFormSubmit = (data) => {
    const selectedMethod = shippingMethods.find((m) => m.value === data.metodePengiriman);
    if (!selectedMethod) {
      Swal.fire({
        icon: 'warning',
        title: 'Perhatian',
        text: 'Pilih metode pembayaran terlebih dahulu',
        confirmButtonText: 'OK',
      });
      return;
    }

    Swal.fire({
      icon: 'question',
      title: 'Konfirmasi Pesanan',
      text: 'Apakah anda yakin ingin melanjutkan pembayaran?',
      showCancelButton: true,
      confirmButtonText: 'Ya, Bayar',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = {
          ...data,
          jumlahProduk,
          totalHarga: produk.harga * jumlahProduk,
          produk,
          metodePengiriman: selectedMethod.id,
          metodePengirimanKode: selectedMethod.value,
        };
        onSubmit(formData);
      }
    });
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {renderProdukDetail()}

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Informasi Pengiriman</h2>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Alamat Pengiriman</h3>
            <button type="button" onClick={showAddressEditModal} className="text-blue-600 hover:underline text-sm">
              Ubah
            </button>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p className="text-gray-700">
              Nama lengkap: <span className="font-semibold">{watch('nama')}</span>
            </p>
            <p className="text-gray-700">
              No HP: <span className="font-semibold">{watch('no_hp')}</span>
            </p>
            <p className="text-gray-700">
              Alamat: <span className="font-semibold">{watch('alamat')}</span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Metode Pengiriman:</h2>
          <div className="space-y-2">
            {shippingMethods.map((method) => (
              <label key={method.value} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    {...register('metodePengiriman', { required: 'Pilih metode pengiriman' })}
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
                <span className="font-medium">Rp {method.harga.toLocaleString()}</span>
              </label>
            ))}
          </div>
          {errors.metodePengiriman && <p className="text-red-500 text-sm mt-1">{errors.metodePengiriman.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-xl font-medium mb-1">Catatan Pesanan:</label>
          <textarea {...register('catatan')} rows="3" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Tambahkan catatan untuk pesanan anda"></textarea>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Harga Produk</span>
            <span className="font-semibold">Rp {(produk.harga * jumlahProduk).toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Jumlah</span>
            <span className="font-semibold">{jumlahProduk}</span>
          </div>
          {selectedShippingMethod && (
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Biaya Pengiriman ({shippingMethods.find((m) => m.value === selectedShippingMethod).label})</span>
              <span className="font-semibold">Rp {shippingMethods.find((m) => m.value === selectedShippingMethod).harga.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t pt-2 mt-2">
            <span className="text-gray-800">Total Harga</span>
            <span className="text-blue-600">
              Rp {selectedShippingMethod ? (produk.harga * jumlahProduk + shippingMethods.find((m) => m.value === selectedShippingMethod).harga).toLocaleString() : (produk.harga * jumlahProduk).toLocaleString()}
            </span>
          </div>
        </div>

        <button type="button" onClick={handleSubmit(onFormSubmit)} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
};

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
