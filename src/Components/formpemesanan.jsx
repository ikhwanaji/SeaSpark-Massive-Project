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
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, setValue]);

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
          setIsLoading(true);
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
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const renderProdukDetail = () => (
    <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
      <h3 className="font-semibold text-lg mb-3 text-gray-800">Produk yang Dibeli</h3>
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <div className="relative pb-[100%] w-full overflow-hidden rounded-lg bg-gray-100">
            <img src={produk.gambar} alt={produk.nama} className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform hover:scale-105" />
          </div>
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-gray-800 text-xl mb-2">{produk.nama}</h4>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{produk.deskripsi}</p>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="text-gray-700 font-medium">Harga:</p>
              <p className="text-blue-600 font-bold text-xl">Rp {produk.harga.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Stok tersedia: {produk.stok}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-700 font-medium mb-2">Jumlah:</p>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button type="button" onClick={() => setJumlahProduk((prev) => Math.max(1, prev - 1))} className="bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors" disabled={jumlahProduk <= 1}>
                  −
                </button>
                <input
                  type="number"
                  value={jumlahProduk}
                  min="1"
                  max={produk.stok}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      setJumlahProduk(Math.min(Math.max(1, value), produk.stok));
                    }
                  }}
                  className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none"
                />
                <button type="button" onClick={() => setJumlahProduk((prev) => Math.min(produk.stok, prev + 1))} className="bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors" disabled={jumlahProduk >= produk.stok}>
                  +
                </button>
              </div>
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
        text: 'Pilih metode pengiriman terlebih dahulu',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-lg',
          confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
        },
      });
      return;
    }

    Swal.fire({
      icon: 'question',
      title: 'Konfirmasi Pesanan',
      html: `
        <div class="text-left px-2">
          <p class="mb-3">Detail pesanan Anda:</p>
          <div class="flex justify-between mb-2">
            <span>Produk:</span>
            <span class="font-medium">${produk.nama}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>Jumlah:</span>
            <span class="font-medium">${jumlahProduk}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>Pengiriman:</span>
            <span class="font-medium">${selectedMethod.label}</span>
          </div>
          <div class="flex justify-between font-bold pt-2 mt-2 border-t border-gray-200">
            <span>Total:</span>
            <span class="text-blue-600">Rp ${(produk.harga * jumlahProduk + selectedMethod.harga).toLocaleString()}</span>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ya, Bayar Sekarang',
      cancelButtonText: 'Batal',
      customClass: {
        popup: 'rounded-lg',
        confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
        cancelButton: 'bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = {
          ...data,
          jumlahProduk,
          totalHarga: produk.harga * jumlahProduk,
          produk,
          metodePengiriman: selectedMethod.id,
          metodePengirimanKode: selectedMethod.value,
          ongkir: selectedMethod.harga,
          totalBayar: produk.harga * jumlahProduk + selectedMethod.harga,
        };
        onSubmit(formData);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl md:text-3xl font-bold">Formulir Pemesanan</h1>
          <p className="text-blue-100 mt-1">Silakan lengkapi data untuk melanjutkan pemesanan</p>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {renderProdukDetail()}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Alamat Pengiriman</h2>
                    <button type="button" onClick={showAddressEditModal} className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Ubah
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    {!watch('nama') || !watch('no_hp') || !watch('alamat') ? (
                      <div className="text-center py-2">
                        <p className="text-gray-500">Alamat belum lengkap</p>
                        <button type="button" onClick={showAddressEditModal} className="mt-2 text-blue-600 hover:text-blue-800 underline text-sm">
                          Lengkapi alamat
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500">Nama:</p>
                            <p className="font-medium text-gray-800">{watch('nama')}</p>
                          </div>
                        </div>

                        <div className="flex items-start mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500">Nomor HP:</p>
                            <p className="font-medium text-gray-800">{watch('no_hp')}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500">Alamat:</p>
                            <p className="font-medium text-gray-800">{watch('alamat')}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Catatan Pesanan</h2>
                  <textarea
                    {...register('catatan')}
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all resize-none"
                    placeholder="Tambahkan catatan untuk pesanan anda (opsional)"
                  ></textarea>
                </div>
              </div>

              <div className="mb-6 bg-white rounded-lg p-5 border border-gray-200 shadow-sm transition-all hover:shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Metode Pengiriman</h2>

                {shippingMethods.length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <p className="text-gray-500">Tidak ada metode pengiriman tersedia</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${watch('metodePengiriman') === method.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                      >
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
                            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <span className="font-semibold text-gray-800">{method.label}</span>
                            <div className="flex items-center mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-xs text-gray-500">Estimasi: {method.estimasi}</p>
                            </div>
                          </div>
                        </div>
                        <span className="font-medium text-gray-900">Rp {method.harga.toLocaleString()}</span>
                      </label>
                    ))}
                  </div>
                )}

                {errors.metodePengiriman && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {errors.metodePengiriman.message}
                  </p>
                )}
              </div>

              <div className="bg-white rounded-lg p-5 border border-blue-100 shadow-sm mb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pembayaran</h2>

                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Harga Produk</span>
                    <span className="font-medium">Rp {produk.harga.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Jumlah</span>
                    <div className="flex items-center">
                      <span className="font-medium">{jumlahProduk}</span>
                      <span className="text-gray-500 mx-2">×</span>
                      <span className="font-medium">Rp {produk.harga.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rp {(produk.harga * jumlahProduk).toLocaleString()}</span>
                  </div>

                  {selectedShippingMethod && (
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <div className="flex items-center">
                        <span className="text-gray-600">Pengiriman</span>
                        <span className="bg-gray-100 text-gray-600 text-xs ml-2 px-2 py-1 rounded">{shippingMethods.find((m) => m.value === selectedShippingMethod).label}</span>
                      </div>
                      <span className="font-medium">Rp {shippingMethods.find((m) => m.value === selectedShippingMethod).harga.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-gray-800 text-lg">Total</span>
                    <span className="font-bold text-blue-600 text-xl">
                      Rp {selectedShippingMethod ? (produk.harga * jumlahProduk + shippingMethods.find((m) => m.value === selectedShippingMethod).harga).toLocaleString() : (produk.harga * jumlahProduk).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={handleSubmit(onFormSubmit)}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center text-lg font-semibold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Bayar Sekarang
                </button>

                <p className="text-center text-sm text-gray-500">Dengan melakukan pembayaran, Anda menyetujui syarat dan ketentuan kami.</p>
              </div>
            </>
          )}
        </div>
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
