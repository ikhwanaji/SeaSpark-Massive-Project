import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


// Konstanta untuk metode pembayaran
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
  VIRTUAL_ACCOUNT: [
    { value: 'bni_virtual', label: 'BNI Virtual Account', imgSrc: '/src/Assets/img/bni_virtual.png' },
    { value: 'bca_virtual', label: 'BCA Virtual Account', imgSrc: '/src/Assets/img/bca_virtual.png' },
    { value: 'btn_virtual', label: 'BTN Virtual Account', imgSrc: '/src/Assets/img/btn_virtual.png' },
  ],
};



const FormPemesanan = ({ onSubmit, produk }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      namaLengkap: '',
      alamat: '',
      noHp: '',
      provinsi: '',
      kotaKabupaten: '',
      kecamatan: '',
      kelurahan: '',
      kodePos: '',
      metodePembayaran: '',
      jumlahProduk: 1,
    },
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [jumlahProduk, setJumlahProduk] = useState(1);

  // Utilitas untuk mendapatkan tipe pembayaran
  const getPaymentType = (value) => {
    const paymentTypeMap = {
      dana: 'Dompet Digital',
      gopay: 'Dompet Digital',
      cod: 'Bayar di Tempat',
      bni_virtual: 'Virtual Account',
      bca_virtual: 'Virtual Account',
      btn_virtual: 'Virtual Account',
    };
    return paymentTypeMap[value] || 'Bank Transfer';
  };
  const navigate = useNavigate();

  // Handler untuk submit form
  const onFormSubmit = (data) => {
    const formData = {
      ...data,
      jumlahProduk,
      totalHarga: produk ? produk.harga * jumlahProduk : 0,
      produk,
    };
    navigate('/konfirmasi-pembayaran', { state: formData });
  };

  // Render input field umum
  const renderInputField = (label, name, placeholder, required = false, type = 'text', validation = {}) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, {
          required: required ? `${label} harus diisi` : false,
          ...validation,
        })}
        placeholder={placeholder}
        className={`border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md w-full p-2`}
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );

  // Validasi khusus untuk nomor HP
  const renderNoHpField = () =>
    renderInputField('Nomor Handphone*', 'noHp', 'Contoh: 08123456789', true, 'tel', {
      pattern: {
        value: /^(\+62|62|0)8[1-9][0-9]{6,10}$/,
        message: 'Nomor HP tidak valid',
      },
      minLength: { value: 10, message: 'Nomor HP minimal 10 digit' },
      maxLength: { value: 14, message: 'Nomor HP maksimal 14 digit' },
    });

  // Render metode pembayaran
  const renderPaymentMethodGroup = (title, methods) => (
    <div key={title}>
      <h3 className="text-md font-semibold mb-3">{title}</h3>
      {methods.map((method) => (
        <div key={method.value} className="flex items-center mb-2">
          <input
            id={method.value}
            type="radio"
            {...register('metodePembayaran', {
              required: 'Pilih metode pembayaran',
            })}
            value={method.value}
            checked={watch('metodePembayaran') === method.value}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedPaymentMethod(value);
              setValue('metodePembayaran', value, { shouldValidate: true });
              setIsDropdownOpen(false);
            }}
            className="mr-2"
          />
          <label htmlFor={method.value} className="flex items-center cursor-pointer">
            <img src={method.imgSrc} alt={method.label} className="w-8 h-8 mr-2" />
            {method.label}
          </label>
        </div>
      ))}
    </div>
  );

  // Render detail produk
  const renderProdukDetail = () => (
    <div className="mb-4 p-4 bg-gray-100 rounded">
      <h3 className="font-semibold">Produk yang Dibeli</h3>
      <div className="flex items-top ">
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
                className="w-12 text-center border-y border-gray-300 py-1 appearance-none appearance-none, 
      [-moz-appearance:textfield], 
      [&::-webkit-inner-spin-button]:appearance-none ,
      [&::-webkit-outer-spin-button]:appearance-none"
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

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Detail Pembelian</h2>

      {produk && renderProdukDetail()}

      <form onSubmit={handleSubmit(onFormSubmit)}>
        {renderInputField('Nama Lengkap*', 'namaLengkap', 'Masukkan nama Lengkap', true)}
        {renderInputField('Alamat*', 'alamat', 'Alamat', true)}

        {renderNoHpField()}

        {renderInputField('Provinsi*', 'provinsi', 'Provinsi', true)}
        {renderInputField('Kab/kota*', 'kotaKabupaten', 'Kab/kota', true)}
        {renderInputField('Kecamatan*', 'kecamatan', 'Kecamatan', true)}

        <div className="grid grid-cols-2 gap-4 mb-4">
          {renderInputField('Kelurahan*', 'kelurahan', 'Kelurahan', true)}
          {renderInputField('Kode Pos*', 'kodePos', 'Kode Pos', true, 'text', {
            pattern: {
              value: /^\d{5}$/,
              message: 'Kode Pos harus 5 digit angka',
            },
          })}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Metode Pembayaran</h2>
            <button type="button" onClick={() => setIsDropdownOpen((prev) => !prev)} className="text-sm text-gray-800 font-bold hover:underline flex items-center">
              Lihat Selengkapnya
              {isDropdownOpen ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
            </button>
          </div>

          {selectedPaymentMethod && (
            <div className="mb-4 p-2 bg-gray-100 rounded">
              <h3 className="font-semibold">Metode Pembayaran yang Dipilih:</h3>
              <div className="flex items-center">
                <img src={`/src/Assets/img/${selectedPaymentMethod}.png`} alt={selectedPaymentMethod} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <p className="font-semibold">{getPaymentType(selectedPaymentMethod)}</p>
                  <p>{selectedPaymentMethod.charAt(0).toUpperCase() + selectedPaymentMethod.slice(1).replace(/_/g, ' ')}</p>
                </div>
              </div>
            </div>
          )}

          {errors.metodePembayaran && <p className="text-red-500 text-sm mb-2">{errors.metodePembayaran.message}</p>}

          <div className="flex flex-col space-y-2">{renderPaymentMethodGroup('Bank Transfer', PAYMENT_METHODS.BANK)}</div>

          {isDropdownOpen && (
            <div className="flex flex-col mt-4">
              {renderPaymentMethodGroup('Dompet Digital', PAYMENT_METHODS.DIGITAL_WALLET)}
              {renderPaymentMethodGroup('Bayar di Tempat', PAYMENT_METHODS.COD)}
              {renderPaymentMethodGroup('Virtual Account', PAYMENT_METHODS.VIRTUAL_ACCOUNT)}
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="font-semibold">Total Harga: Rp {produk ? (produk.harga * jumlahProduk).toLocaleString() : 0}</p>
        </div>

        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-md mt-4 hover:bg-blue-700">
          Pesan Sekarang
        </button>
      </form>
    </div>
  );
};

// PropTypes untuk validasi props
FormPemesanan.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  produk: PropTypes.shape({
    nama: PropTypes.string.isRequired,
    harga: PropTypes.number.isRequired,
    gambar: PropTypes.string.isRequired,
    deskripsi: PropTypes.string.isRequired,
    stok: PropTypes.number.isRequired,
  }),
};

export default FormPemesanan;
