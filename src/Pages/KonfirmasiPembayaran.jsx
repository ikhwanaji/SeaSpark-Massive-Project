import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const KonfirmasiPembayaran = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">Data Tidak Ditemukan</h1>
        <button onClick={() => navigate('/')} className="text-blue-500 underline mt-4">
          Kembali ke Halaman Utama
        </button>
      </div>
    );
  }

  const paymentMethods = {
    bri: '/src/Assets/img/bri.png',
    mandiri: '/src/Assets/img/mandiri.png',
    dana: '/src/Assets/img/dana.png',
    gopay: '/src/Assets/img/gopay.png',
    cod: '/src/Assets/img/cod.png',
    bni_virtual: '/src/Assets/img/bni_virtual.png',
    bca_virtual: '/src/Assets/img/bca_virtual.png',
    btn_virtual: '/src/Assets/img/btn_virtual.png',
  };

  const selectedPaymentImage = paymentMethods[data.metodePembayaran];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Konfirmasi Pembayaran</h1>

      {/* Gambar Produk */}
      <div className="mb-6 flex items-start">
        <img src={data.produk.gambar} alt={data.produk.nama} className="w-32 h-32 object-cover rounded mr-4" />
        <div>
          <p className="font-bold">{data.produk.nama}</p>
          <p className="text-sm text-gray-600">{data.produk.deskripsi}</p>
          <p className="mt-2">Harga: Rp {data.produk.harga.toLocaleString()}</p>
          <p>Jumlah: {data.jumlahProduk}</p>
        </div>
      </div>

      {/* Detail Pembayaran */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Detail Pembayaran</h2>
        <p>Metode Pembayaran: {data.metodePembayaran.replace(/_/g, ' ').toUpperCase()}</p>

        {/* Gambar Metode Pembayaran */}
        {selectedPaymentImage && <img src={selectedPaymentImage} alt={data.metodePembayaran} className="w-16 h-16 mt-2 object-cover" />}
        <p>Total Harga: Rp {data.totalHarga.toLocaleString()}</p>
      </div>

      {/* Tombol Kembali */}
      <button onClick={() => navigate('/')} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        Kembali ke Halaman Utama
      </button>
    </div>
  );
};

export default KonfirmasiPembayaran;
