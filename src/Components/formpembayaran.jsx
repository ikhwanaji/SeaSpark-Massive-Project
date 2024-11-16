import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import PropTypes from 'prop-types';

const FormPembayaran = ({ onSubmit, produk, additionalBanks }) => {
  const [formData, setFormData] = useState({
    namaDepan: '',
    namaBelakang: '',
    alamat: '',
    provinsi: '',
    kotaKabupaten: '',
    kecamatan: '',
    kelurahan: '',
    kodePos: '',
    metodePembayaran: '',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentType, setPaymentType] = useState('');

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Tutup dropdown setelah memilih metode pembayaran
    if (name === 'metodePembayaran') {
      setIsDropdownOpen(false);
      // Set metode pembayaran yang dipilih
      setSelectedPaymentMethod(value);

      // Tentukan jenis pembayaran berdasarkan metode yang dipilih
      if (['dana', 'gopay'].includes(value)) {
        setPaymentType('Dompet Digital');
      } else if (value === 'cod') {
        setPaymentType('Bayar di Tempat');
      } else if (['bni_virtual', 'bca_virtual', 'btn_virtual'].includes(value)) {
        setPaymentType('Virtual Account');
      } else {
        setPaymentType('Bank Transfer');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-8 px rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Detail Pembelian</h2>

      {/* Tampilkan ringkasan produk jika ada */}
      {produk && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Produk yang Dibeli</h3>
          <div className="flex items-center">
            <img src={produk.gambar} alt={produk.nama} className="w-16 h-16 object-cover mr-4" />
            <div>
              <p className="font-bold">{produk.nama}</p>
              <p>Harga: Rp {produk.harga.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Nama Depan dan Nama Belakang */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Nama Depan*</label>
            <input type="text" name="namaDepan" value={formData.namaDepan} onChange={handleChange} placeholder="Masukkan nama depan" className="border border-gray-300 rounded-md w-full p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Nama Belakang*</label>
            <input type="text" name="namaBelakang" value={formData.namaBelakang} onChange={handleChange} placeholder="Masukkan nama belakang" className="border border-gray-300 rounded-md w-full p-2" required />
          </div>
        </div>

        {/* Alamat */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Alamat*</label>
          <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" className="border border-gray-300 rounded-md w-full p-2" required />
        </div>

        {/* Provinsi */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Provinsi*</label>
          <input type="text" name="provinsi" value={formData.provinsi} onChange={handleChange} placeholder="Provinsi" className="border border-gray-300 rounded-md w-full p-2" required />
        </div>

        {/* Kota/Kabupaten */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Kab/kota*</label>
          <input type="text" name="kotaKabupaten" value={formData.kotaKabupaten} onChange={handleChange} placeholder="Kab/kota" className="border border-gray-300 rounded-md w-full p-2" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Kecamatan*</label>
          <input type="text" name="kecamatan" value={formData.kecamatan} onChange={handleChange} placeholder="Kecamatan" className="border border-gray-300 rounded-md w-full p-2" required />
        </div>

        {/* Kelurahan dan Kode Pos */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Kelurahan*</label>
            <input type="text" name="kelurahan" value={formData.kelurahan} onChange={handleChange} placeholder="Kelurahan" className="border border-gray-300 rounded-md w-full p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Kode Pos*</label>
            <input type="number" name="kodePos" value={formData.kodePos} onChange={handleChange} placeholder="Kode Pos" className="border border-gray-300 rounded-md w-full p-2" required />
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Metode Pembayaran</h2>
            <button type="button" onClick={handleButtonClick} className="text-sm text-gray-800 font-bold hover:underline flex items-center">
              Lihat Selengkapnya
              {isDropdownOpen ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
            </button>
          </div>

          {/* Tampilkan metode pembayaran yang dipilih */}
          {selectedPaymentMethod && (
            <div className="mb-4 p-2 bg-gray-100 rounded">
              <h3 className="font-semibold">Metode Pembayaran yang Dipilih :</h3>
              <div className="flex items-center">
                <img src={`/src/Assets/img/${selectedPaymentMethod}.png`} alt={selectedPaymentMethod} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <p className='font-semibold'> {paymentType}</p>
                  <p> {selectedPaymentMethod.charAt(0).toUpperCase() + selectedPaymentMethod.slice(1).replace(/_/g, ' ')}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="radio" name="metodePembayaran" value="bri" checked={formData.metodePembayaran === 'bri'} onChange={handleChange} className="mr-2" />
              <img src="/src/Assets/img/bri.png" alt="Bank BRI" className="w-8 h-8 mr-2" />
              Bank BRI
            </label>
            <label className="flex items-center">
              <input type="radio" name="metodePembayaran" value="mandiri" checked={formData.metodePembayaran === 'mandiri'} onChange={handleChange} className="mr-2" />
              <img src="/src/Assets/img/mandiri.png" alt="Bank Mandiri" className="w-8 h-8 mr-2" />
              Bank Mandiri
            </label>
          </div>

          {/* Dropdown untuk metode pembayaran tambahan */}
          {isDropdownOpen && (
            <div className="flex flex-col mt-4">
              <h3 className="text-md font-semibold mb-2">Pilih Metode Pembayaran</h3>

              <h3 className="text-md font-semibold mb-3">Dompet Digital</h3>
              <label className="flex items-center mb-2">
                <input type="radio" name="metodePembayaran" value="dana" checked={formData.metodePembayaran === 'dana'} onChange={handleChange} className="mr-2" />
                <img src="/src/Assets/img/dana.png" alt="Dana" className="w-8 h-8 mr-2" />
                Dana
              </label>
              <label className="flex items-center mb-2">
                <input type="radio" name="metodePembayaran" value="gopay" checked={formData.metodePembayaran === 'gopay'} onChange={handleChange} className="mr-2" />
                <img src="/src/Assets/img/gopay.png" alt="GoPay" className="w-8 h-8 mr-2" />
                GoPay
              </label>

              <h3 className="text-md font-semibold mb-3 mt-4">Bayar di Tempat</h3>
              <label className="flex items-center mb-2">
                <input type="radio" name="metodePembayaran" value="cod" checked={formData.metodePembayaran === 'cod'} onChange={handleChange} className="mr-2" />
                <img src="/src/Assets/img/cod.png" alt="COD" className="w-8 h-8 mr-2" />
                COD (Bayar di Tempat)
              </label>

              <h3 className="text-md font-semibold mb-3 mt-4">Virtual Account</h3>
              <label className="flex items-center mb-2">
                <input type="radio" name="metodePembayaran" value="bni_virtual" checked={formData.metodePembayaran === 'bni_virtual'} onChange={handleChange} className="mr-2" />
                <img src="/src/Assets/img/bni_virtual.png" alt="BNI Virtual Account" className="w-8 h-8 mr-2" />
                BNI Virtual Account
              </label>
              <label className="flex items-center mb-2">
                <input type="radio" name="metodePembayaran" value="bca_virtual" checked={formData.metodePembayaran === 'bca_virtual'} onChange={handleChange} className="mr-2" />
                <img src="/src/Assets/img/bca_virtual.png" alt="BCA Virtual Account" className="w-8 h-8 mr-2" />
                BCA Virtual Account
              </label>
              <label className="flex items-center mb-2">
                <input type="radio" name="metodePembayaran" value="btn_virtual" checked={formData.metodePembayaran === 'btn_virtual'} onChange={handleChange} className="mr-2" />
                <img src="/src/Assets/img/btn_virtual.png" alt="BTN Virtual Account" className="w-8 h-8 mr-2" />
                BTN Virtual Account
              </label>
            </div>
          )}
        </div>

        {/* Tombol Pesan Sekarang */}
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-md mt-4 hover:bg-blue-700">
          Pesan Sekarang
        </button>
      </form>
    </div>
  );
};

// Tambahkan PropTypes untuk validasi props
FormPembayaran.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  produk: PropTypes.shape({
    nama: PropTypes.string,
    harga: PropTypes.number,
    gambar: PropTypes.string,
  }),
};

export default FormPembayaran;
