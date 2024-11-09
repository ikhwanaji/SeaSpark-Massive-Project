import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
const Kebijakan_Privasi = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div>
            <h1 className="text-3xl font-bold mb-6 dark:text-black text-center">Kebijakan Privasi</h1>
            <p className="mb-4 dark:text-black">
              Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda berikan saat menggunakan website kami. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan membagikan
              informasi pribadi Anda.
            </p>
          </div>
          <div>
            <h2 className="font-bold mb-2 text-black text-start text-lg">Informasi yang kami kumpulkan</h2>
            <p className="dark:text-black">Kami mengumpulkan informasi pribadi yang Anda berikan secara sukarela saat Anda:</p>
            <li>Mendaftar untuk akun </li>
            <li>Melakukan pembelian</li>
            <li>Mengisi formulir kontak</li>
            <p className="dark:text-black">Informasi yang kami kumpulkan dapat mencakup:</p>
            <li>Nama</li>
            <li>Alamat email</li>
            <li>Telephone</li>
            <li>Alamat pengiriman</li>
            <li>Informasi pembayaran (melalui penyedia pembayaran pihak ketiga)</li>
          </div>
          <div>
            <h2 className="pt-2 font-bold mb-2 text-start text-lg">Penggunaan Informasi</h2>
            <p>Kami menggunakan informasi pribadi Anda untuk:</p>
            <li>Memproses dan mengelola pesanan Anda</li>
            <li>Menghubungi Anda mengenai pesanan atau pertanyaan</li>
            <li>Mengirimkan informasi dan pembaruan terkait produk</li>
            <li>Meningkatkan pengalaman pengguna di website kami</li>
          </div>
          <div>
            <h2 className="pt-2 font-bold mb-2 text-start text-lg">Hak Anda</h2>
            <p>Anda berhak untuk:</p>
            <li>Mengakses informasi pribadi yang kami miliki tentang Anda.</li>
            <li>Memperbaiki informasi yang tidak akurat atau tidak lengkap.</li>
            <li>Menghapus informasi pribadi Anda, dengan syarat bahwa kami tidak diwajibkan untuk menyimpan informasi tersebut berdasarkan hukum yang berlaku.</li>
          </div>
          <div>
            <h2 className="pt-2 font-bold mb-2 text-start text-lg">Kontak</h2>
            <p>Jika Anda memiliki pertanyaan atau kekhawatiran mengenai kebijakan privasi ini, silakan hubungi kami di:</p>
            <a href="">Doker.com</a>
            <br />
            <a href="">Email: DoKer@email.id</a>
            <br />
            <a href="">Telepon: (022)1000001</a>
            <br />
            <a href="">Alamat: [Alamat Perusahaan]</a>
          </div>

          {/* Component Tombol kembali ke beranda */}
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Kebijakan_Privasi;
