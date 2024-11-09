import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
const Syarat_ketentuan = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div>
            <h1 className="text-3xl font-bold mb-6 dark:text-black text-center">Syarat dan ketentuan</h1>
            <p className="mb-4 dark:text-black">
              Informasi pribadi yang Anda berikan dan informasi pribadi yang kami kumpulkan tentang Anda melalui layanan kami, hanya digunakan untuk kepentingan meningkatkan layanan website. Kami menyimpan informasi pribadi hanya selama
              kami memiliki alasan untuk menyimpannya. Kami bertujuan untuk transparansi penuh tentang cara kami mengumpulkan, menggunakan, dan membagikan informasi pribadi Anda.
            </p>
          </div>
          <div>
            <h2 className="font-bold  text-black text-start text-lg">Informasi yang kami kumpulkan</h2>
            <p className="dark:text-black">
              Kami hanya mengumpulkan informasi tentang Anda jika kami memiliki alasan untuk melakukannya. Misalnya, untuk menyediakan Layanan kami, untuk berkomunikasi dengan Anda, atau untuk membuat Layanan kami lebih baik.
            </p>
          </div>
          <div>
            <h2 className="pt-2 font-bold text-start text-lg">Produk dan Layanan</h2>
            <p>Website ini menjual produk obat ikan kerapu yang telah terdaftar dan memenuhi standar keamanan. Semua produk yang ditawarkan adalah untuk penggunaan sesuai dengan petunjuk yang tertera.</p>
          </div>
          <div>
            <h2 className="pt-2 font-bold text-start text-lg">Tanggung Jawab Pengguna</h2>
            <p>Pengguna bertanggung jawab untuk memberikan informasi yang akurat dan lengkap saat melakukan pemesanan. Pengguna setuju untuk tidak menggunakan website ini untuk tujuan ilegal atau melanggar hukum.</p>
          </div>
          <div>
            <h2 className="pt-2 font-bold text-start text-lg">Keamanan</h2>
            <p>
              Meskipun tidak ada layanan online yang 100% aman, kami bekerja sangat keras untuk melindungi informasi tentang Anda dari akses, penggunaan, pengubahan, atau penghancuran yang tidak sah, dan mengambil tindakan yang wajar untuk
              melakukannya. Kami memantau Layanan kami untuk potensi kerentanan dan serangan.
            </p>
          </div>
          <div>
            <h2 className="pt-2 font-bold text-start text-lg">Kebijakan Privasi</h2>
            <p>
            Informasi pribadi yang dikumpulkan akan digunakan sesuai dengan kebijakan privasi yang berlaku.
            Kami berkomitmen untuk melindungi data pribadi pengguna dan tidak akan membagikannya kepada pihak ketiga tanpa izin.
            </p>
          </div>
          <div>
            <h2 className="pt-2 font-bold text-start text-lg">Kontak</h2>
            <p>
            Untuk pertanyaan lebih lanjut mengenai syarat dan ketentuan ini, silakan hubungi kami melalui informasi kontak yang tersedia di website
            </p>
          </div>
          {/* Component Tombol kembali ke beranda */}
          <Button></Button>
        </div>
      </div>
    </div>
  );
};

export default Syarat_ketentuan;
