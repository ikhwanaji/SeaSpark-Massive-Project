import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import PropTypes from 'prop-types';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../index.css'; // Import custom CSS
import { useAuth } from '../context/AuthContext'; // Sesuaikan path

// Konstanta metode pembayaran
const PAYMENT_METHODS = {
  BANK: [
    { value: 'bri', label: 'Bank BRI', imgSrc: '/src/Assets/img/bri.png' },
    { value: 'mandiri', label: 'Bank Mandiri', imgSrc: '/src/Assets/img/mandiri.png' },
  ],
  DIGITAL_WALLET: [
    { value: 'dana', label: 'Dana', imgSrc: '/src/Assets/img/dana.png' },
    { value: 'gopay', label: 'GoPay', imgSrc: '/src/Assets/img/gopay.png' },
  ],
  COD: [{ value: 'cod', label: 'COD (Bayar di Tempat)', imgSrc: '/src/Assets/img/cod.png' }],
};

// Konstanta metode pengiriman
const SHIPPING_METHODS = [
  {
    value: 'reguler',
    label: 'Reguler',
    estimasi: '3-5 Hari',
    harga: 15000,
  },
  {
    value: 'ekonomi',
    label: 'Ekonomi',
    estimasi: '5-7 Hari',
    harga: 10000,
  },
  {
    value: 'kargo',
    label: 'Kargo',
    estimasi: '1-2 Hari',
    harga: 25000,
  },
];

// const {token } = useAuth();

const FormPemesanan = ({ user = {}, produk, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      namaLengkap: user.namaLengkap || '',
      noHp: user.noHp || '089123123233',
      alamat: user.alamat || 'Cikarang Barat Bekasi',
      metodePembayaran: 'bri',
      metodePengiriman: 'reguler',
      catatan: 'mantap',
    },
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [jumlahProduk, setJumlahProduk] = useState(1);

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
              value="${watch('namaLengkap')}"
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
              value="${watch('noHp')}"
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
        const namaLengkap = document.getElementById('swal-input-nama').value;
        const noHp = document.getElementById('swal-input-hp').value;
        const alamat = document.getElementById('swal-input-alamat').value;

        // Validasi input
        if (!namaLengkap || !noHp || !alamat) {
          Swal.showValidationMessage('Semua field harus diisi');
          return false;
        }

        return { namaLengkap, noHp, alamat };
      },
      customClass: {
        popup: 'rounded-lg',
        confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded',
        cancelButton: 'bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2',
      },
    }).then((result) => {
      if (result.value) {
        // Update nilai-nilai input
        setValue('namaLengkap', result.value.namaLengkap);
        setValue('noHp', result.value.noHp);
        setValue('alamat', result.value.alamat);
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
    // Validasi metode pembayaran
    if (!data.metodePembayaran) {
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
            <p>{watch('namaLengkap')}</p>
            <p>{watch('noHp')}</p>
            <p>{watch('alamat')}</p>
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-3">Metode Pembayaran:</h2>

          {Object.entries(PAYMENT_METHODS).map(([group, methods]) => (
            <div key={group} className="mb-3">
              <h3 className="font-semibold mb-2">{group === 'BANK' ? 'Transfer Bank' : group === 'DIGITAL_WALLET' ? 'Dompet Digital' : group === 'COD' ? 'Bayar di Tempat' : group}</h3>
              <div className="space-y-2">
                {methods.map((method) => (
                  <label key={method.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      {...register('metodePembayaran', {
                        required: 'Pilih metode pembayaran',
                      })}
                      value={method.value}
                      checked={watch('metodePembayaran') === method.value}
                      onChange={(e) => {
                        setSelectedPaymentMethod(e.target.value);
                        setValue('metodePembayaran', e.target.value);
                      }}
                      className="form-radio"
                    />
                    <img src={method.imgSrc} alt={method.label} className="w-8 h-8 object-contain" />
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Metode Pengiriman */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-3">Metode Pengiriman:</h2>
          <div className="space-y-2">
            {SHIPPING_METHODS.map((method) => (
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
                Biaya Pengiriman ({SHIPPING_METHODS.find(m => m.value === selectedShippingMethod).label})
              </span>
              <span>
                Rp {SHIPPING_METHODS.find(m => m.value === selectedShippingMethod).harga.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t pt-2 mt-2">
            <span>Total Harga</span>
            <span>
              Rp {selectedShippingMethod 
                ? ((produk.harga * jumlahProduk) + SHIPPING_METHODS.find(m => m.value === selectedShippingMethod).harga).toLocaleString()
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
    namaLengkap: PropTypes.string,
    noHp: PropTypes.string,
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
