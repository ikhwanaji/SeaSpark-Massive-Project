import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';

const CardDetailPembelianSatuan = () => {
  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      <h2 className="text-2xl text-sky-900 font-bold mb-4">Detail Pembelian Satuan</h2>
      <hr />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Nama Lengkap</label>
            <input
              type="text"
              value="Mang Ojak"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sky-900 font-semibold mb-2">No. Handphone</label>
                <input
                  type="text"
                  value="08123456789"
                  className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
                />
              </div>
              <div>
                <label className="block text-sky-900 font-semibold mb-2">Provinsi</label>
                <input
                  type="text"
                  value=""
                  className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
                />
              </div>
              <div>
                <label className="block text-sky-900 font-semibold mb-2">Kelurahan</label>
                <input
                  type="text"
                  value=""
                  className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sky-900 font-semibold mb-2">Kode Pos</label>
                <input
                  type="text"
                  value=""
                  className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
                />
              </div>
              <div>
                <label className="block text-sky-900 font-semibold mb-2">Kabupaten/Kota</label>
                <input
                  type="text"
                  value=""
                  className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
                />
              </div>         
              <div>
                <label className="block text-sky-900 font-semibold mb-2">Kecamatan</label>
                <input
                  type="text"
                  value=""
                  className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
                />
              </div>   
            </div>
          </div>  
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Detail Alamat</label>
            <textarea
              value="Jl. Mangga IV Block F 01 No 10 Cikarang Barat, Bekasi"
              className="p-3 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly min-h-[120px]"
              rows="5"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Produk</label>
            <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900" defaultValue="OJamur" disabled>
              <option value="OJamur">Obat Jamur</option>
              <option value="OBakteri">Obat Bakteri</option>
              <option value="OParasit">Obat Parasit</option>
            </select>
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Jumlah Produk</label>
            <input
              type="number"
              defaultValue={1}
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900"
              disabled
            />
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Total Harga</label>
            <input
              type="text"
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
              value="Rp. 700.000"
              readOnly
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sky-900 font-semibold mb-2">Metode Pembayaran</label>
                <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900">
                  <option value="Metode1">Transfer Bank</option>
                  <option value="Metode1">Dompet Digital</option>
                  <option value="Metode2">COD (Bayar Di Tempat)</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sky-900 font-semibold mb-2">Keterangan</label>
                <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900">
                  <option value="Ket1">Menunggu Pembayaran</option>
                  <option value="Ket2">Lunas</option>
                </select>
              </div>
            </div>  
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Status Pesanan</label>
            <select className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900">
              <option value="Status1">Menunggu Respon</option>
              <option value="Status2">Sedang Di Proses</option>
              <option value="Status3">Pesanan Selesai</option>
            </select>
          </div>
          <div>
            <label className="block text-sky-900 font-semibold mb-2">Tanggal Pemesanan</label>
            <input
              type="date"
              value=""
              className="p-2 border rounded-md w-full shadow-md mb-2 border-sky-900 readOnly"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Link to="/daftar-pesanan">
          <Button label="Kembali" type="back" />
        </Link>
        <Link to="/daftar-pesanan">
          <Button label="Proses" type="process" />
        </Link>
      </div>
    </div>
  );
};

export default CardDetailPembelianSatuan;
