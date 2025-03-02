import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useAuth } from '../context/AuthContext';
import kontakImg from '../Assets/img/Kontak.png';

const infoLinks = [
  { text: 'Beranda', path: '/beranda-user', href: '#beranda' },
  { text: 'Layanan', path: '/layanan', href: '#layanan' },
  { text: 'Produk', path: '/produk', href: '#produk' },
  { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
  { text: 'Kontak', path: '/kontak', href: '#kontak' },
];

const KontakKami = () => {
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { isLoggedIn, user, logout } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/kontak`, { nama, email, pesan });

      // Menampilkan alert sukses
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Pesan Anda berhasil dikirim!',
      });

      // Mengosongkan form setelah berhasil
      setNama('');
      setEmail('');
      setPesan('');
      setSuccess('Pesan Anda berhasil dikirim!');

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan saat mengirim pesan!',
      });
    } finally {
      setLoading(false); // Pastikan loading direset
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        // Ubah prop untuk mendukung kondisi login
        buttonName={isLoggedIn ? "Keluar" : "Masuk"} // Mengubah nama tombol berdasarkan status login
        // useIcon={isLoggedIn} // Gunakan icon jika sudah login
        // icon={isLoggedIn ? <FiUserCheck size={24} /> : null}
        // Tambahkan prop untuk status login
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout} // Pastikan fungsi logout dipanggil saat tombol diklik
      />
      <div className="flex-grow bg-blue-50 py-20">
        <div className="container mt-8 mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center max-w-[800px] mx-auto">
            {/* Bagian Gambar */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <img src={kontakImg} alt="Perwakilan layanan pelanggan" className="rounded-lg w-full" />
            </div>

            {/* Bagian Form */}
            <div className="w-full md:w-1/2 md:pl-8">
              <h2 className="text-2xl font-bold text-blue-500 mb-2">Kontak Kami Sekarang</h2>
              <p className="text-gray-700 mb-4">Silahkan tinggalkan pesan Anda pada kolom di bawah ini</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-blue-500 mb-2 font-semibold" htmlFor="nama">
                    Nama
                  </label>
                  <input
                    id="nama"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-blue-500 mb-2 font-semibold" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      required
                      className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-blue-500 mb-2 font-semibold" htmlFor="pesan">
                      Pesan / Pengaduan
                    </label>
                    <textarea
                      id="pesan"
                      name="pesan"
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value)}
                      placeholder="Tulis pesan Anda di sini..."
                      required
                      className="border border-gray-300 p-2 w-full h-24 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`mt-2 p-2 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700 px-40'}`}
                    disabled={loading} // Nonaktifkan tombol saat loading
                  >
                    {loading ? 'Mengirim...' : 'Kirim'}
                  </button>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">{success}</p>}
              </div>
            </div>
          </div>
        </div>
        <Footer infoLinks={infoLinks} />
      </div>
    );
  };
  
  export default KontakKami;