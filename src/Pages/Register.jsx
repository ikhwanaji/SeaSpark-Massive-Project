import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate
import axios from 'axios';
import { LuPhone } from 'react-icons/lu';
import { RiUserLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import { MdLockOutline } from 'react-icons/md';
import Img from '../Assets/img/HeroSection.jpg';
import ImgLoginUser from '../Assets/img/LoginUser.png';

const Register = () => {
  const navigate = useNavigate(); // Inisialisasi navigate
  const [notification, setNotification] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: '', // Sesuaikan dengan backend
    email: '',
    no_hp: '', // Sesuaikan dengan backend
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for the current input field
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validasi nama
    if (!formData.nama) newErrors.nama = 'Masukkan nama lengkap terlebih dahulu';

    // Validasi email
    if (!formData.email) {
      newErrors.email = 'Masukkan email terlebih dahulu';
    } else {
      // Regex validasi email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Format email tidak valid';
      }
    }

    // Validasi nomor HP
    if (!formData.no_hp) {
      newErrors.no_hp = 'Masukkan nomor HP terlebih dahulu';
    } else {
      // Regex validasi nomor HP Indonesia
      const phoneRegex = /^(^\+62|62|^0)(\d{9,13})$/;
      if (!phoneRegex.test(formData.no_hp)) {
        newErrors.no_hp = 'Nomor HP tidak valid';
      }
    }

    // Validasi password
    if (!formData.password) {
      newErrors.password = 'Masukkan sandi terlebih dahulu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
    }

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi form
    const validationErrors = validateForm();

    // Jika ada error, set dan hentikan proses
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Set loading state
    setIsLoading(true);
    setErrors({});
    setNotification('');

    try {
      // Pastikan URL sesuai dengan backend Anda
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, formData);

      // Tampilkan notifikasi sukses
      setNotification('Selamat, akun Anda telah dibuat!');

      // Redirect ke halaman login setelah 2 detik
      setTimeout(() => {
        navigate('/login');
      }, 2000);

      // Reset form
      setFormData({
        nama: '',
        email: '',
        no_hp: '',
        password: '',
      });
    } catch (error) {
      // Handle error dari backend
      if (error.response) {
        // Error response dari server
        const backendErrors = error.response.data.errors || {};

        // Konversi error backend ke format lokal
        const formattedErrors = {};
        if (Array.isArray(backendErrors)) {
          backendErrors.forEach((err) => {
            formattedErrors[err.path] = err.msg;
          });
        } else {
          // Jika error tidak dalam format array
          setNotification(error.response.data.message || 'Gagal mendaftar');
        }

        setErrors(formattedErrors);
      } else if (error.request) {
        // Error koneksi
        setNotification('Tidak dapat terhubung ke server');
      } else {
        // Error lainnya
        setNotification('Terjadi kesalahan saat mendaftar');
      }

      console.error('Registration error:', error);
    } finally {
      // Matikan loading state
      setIsLoading(false);
    }
  };

  // Effect to handle notification timeout
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${Img})` }}>
      <div className="container mx-auto px-4">
        <div className="bg-blue-200 bg-opacity-80 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: `url(${ImgLoginUser})` }}></div>
            <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-bold text-black text-center">Daftar Akun</h2>
              <p className="text-l text-gray-700 text-center mb-4">Silahkan Daftarkan Diri Anda</p>
              <div className="text-start text-xs text-gray-500 pt-2">
                <p className="text-sm text-gray-600">
                  Sudah Punya Akun? {''}
                  <Link to="/login" className="text-blue-700 hover:text-blue-500 font-semibold">
                    Masuk disini
                  </Link>
                </p>
              </div>
              {/* Input fields */}
              <form onSubmit={handleRegister} className="mt-4 space-y-4">
                <InputWithIcon icon={RiUserLine} name="nama" type="text" placeholder="Masukkan nama lengkap" value={formData.nama} onChange={handleChange} error={errors.nama} />
                <InputWithIcon icon={MdOutlineEmail} name="email" type="email" placeholder="Masukkan alamat email anda" value={formData.email} onChange={handleChange} error={errors.email} />
                <InputWithIcon icon={LuPhone} name="no_hp" type="tel" placeholder="Masukkan No.Hp" value={formData.no_hp} onChange={handleChange} error={errors.no_hp} />
                <InputWithIcon icon={MdLockOutline} name="password" type="password" placeholder="Masukkan sandi anda" value={formData.password} onChange={handleChange} error={errors.password} />

                {/* Tombol Register */}
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`
                      bg-blue-700 
                      text-white 
                      font-bold 
                      py-2 
                      px-4 
                      w-full 
                      rounded-lg 
                      hover:bg-blue-500 
                      transition 
                      duration-300 
                      ease-in-out
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {isLoading ? 'Mendaftar...' : 'Daftar'}
                  </button>
                </div>
              </form>

              {/* Notifikasi */}
              {notification && (
                <div
                  className={`
                    mt-4 
                    text-center 
                    font-semibold 
                    py-2 
                    rounded
                    ${notification.includes('Selamat') ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}
                  `}
                >
                  {notification}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen InputWithIcon
const InputWithIcon = ({ icon: Icon, name, type, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <div className="bg-gray-300 p-2 rounded-full">
          <Icon className="h-5 w-5 text-black" />
        </div>
      </div>
      <input
        name={name}
        className={`
          bg-gray-200 
          text-gray-700 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          border 
          border-gray-300 
          rounded-lg 
          py-2 
          pl-14 
          pr-10 
          block 
          w-full 
          appearance-none 
          leading-normal 
          ${error ? 'border-red-500' : ''}
        `}
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        value={value}
        onChange={onChange}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.781-1.781zm4.261 4.262l1.514 1.514a2.003 2.003 0 012.345 2.345l1.514 1.514a4 4 0 00-5.373-5.373z"
                clipRule="evenodd"
              />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      )}
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Register;
