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
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { isLoggedIn, user, logout } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/kontak`, formData);

      // Menampilkan alert sukses
      Swal.fire({
        icon: 'success',
        title: 'Terima Kasih!',
        text: 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.',
        confirmButtonColor: '#3B82F6',
      });

      // Reset form
      setFormData({
        nama: '',
        email: '',
        pesan: '',
      });
      setSuccess('Pesan Anda berhasil dikirim!');

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan pada server');
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengirim',
        text: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
        confirmButtonColor: '#3B82F6',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Hubungi Kami</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Kami siap mendengarkan pertanyaan, saran, atau kebutuhan Anda. Silakan hubungi kami melalui formulir di bawah ini atau kunjungi lokasi kami.</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-blue-600 mb-2">Alamat</h3>
              <p className="text-gray-700">Jl. Za Pagar Alam No. 1</p>
              <p className="text-gray-700">Bandar Lampung, Lampung</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-blue-600 mb-2">Kontak</h3>
              <p className="text-gray-700">Telepon: 08961223456</p>
              <p className="text-gray-700">Email: contact@company.com</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-blue-600 mb-2">Jam Operasional</h3>
              <p className="text-gray-700">Senin - Jumat: 08.00 - 17.00</p>
              <p className="text-gray-700">Sabtu: 09.00 - 15.00</p>
            </div>
          </div>

          {/* Maps Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="p-6 bg-blue-600 text-white">
              <h2 className="text-2xl font-bold">Lokasi Kami</h2>
              <p className="text-blue-100">Temukan kami di Jl. Za Pagar Alam No. 1 Bandar Lampung, Lampung</p>
            </div>
            <div className="w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.2464935968833!2d105.24988107439904!3d-5.379340653797077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dac51ca768c5%3A0xb84445ae9da3a03d!2sJl.%20ZA.%20Pagar%20Alam%20No.1%2C%20Labuhan%20Ratu%2C%20Kec.%20Kedaton%2C%20Kota%20Bandar%20Lampung%2C%20Lampung%2035132!5e0!3m2!1sid!2sid!4v1754661538607!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Telagamurni"
              ></iframe>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Bagian Gambar */}
              <div className="w-full lg:w-1/2 bg-blue-600 flex items-center justify-center p-8">
                <div className="max-w-md">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Hubungi Kami Sekarang</h2>
                  <p className="text-blue-100 mb-8">Kami akan merespon pertanyaan Anda secepat mungkin, biasanya dalam waktu 24 jam.</p>
                  <img src={kontakImg} alt="Perwakilan layanan pelanggan" className="rounded-lg w-full max-w-sm mx-auto shadow-lg" />
                </div>
              </div>

              {/* Bagian Form */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12">
                <h3 className="text-xl font-bold text-blue-600 mb-6">Kirim Pesan</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="nama">
                      Nama Lengkap
                    </label>
                    <input
                      id="nama"
                      type="text"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap Anda"
                      required
                      className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contoh@email.com"
                      required
                      className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="pesan">
                      Pesan / Pengaduan
                    </label>
                    <textarea
                      id="pesan"
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleChange}
                      placeholder="Tulis pesan Anda di sini..."
                      required
                      rows="5"
                      className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 px-6 text-white rounded-lg font-medium transition-all duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </span>
                    ) : (
                      'Kirim Pesan'
                    )}
                  </button>
                </form>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                    <p>{error}</p>
                  </div>
                )}

                {success && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
                    <p>{success}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer infoLinks={infoLinks} isUserPage={true} />
    </div>
  );
};

export default KontakKami;
