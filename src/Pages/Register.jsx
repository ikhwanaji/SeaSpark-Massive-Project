import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuPhone } from "react-icons/lu";
import { RiUserLine } from "react-icons/ri";
import { LuUserCheck } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import Img from '../Assets/img/HeroSection.jpg';
import ImgLoginUser  from '../Assets/img/LoginUser.png';

const Register = () => {
  const [notification, setNotification] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    tel: '',
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

  const handleRegister = () => {
    const newErrors = {};

    // Validasi untuk setiap field
    if (!formData.fullName) newErrors.fullName = 'Masukkan nama lengkap terlebih dahulu';
    if (!formData.username) newErrors.username = 'Masukkan nama pengguna terlebih dahulu';
    if (!formData.email) newErrors.email = 'Masukkan email terlebih dahulu';
    if (!formData.tel) newErrors.tel = 'Masukkan nomor HP terlebih dahulu';
    if (!formData.password) newErrors.password = 'Masukkan sandi terlebih dahulu';

    // Jika ada error, set state errors dan return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Jika tidak ada error, tampilkan notifikasi
    setNotification('Selamat, akun Anda telah dibuat!');

    // Hapus notifikasi setelah 3 detik
    setTimeout(() => {
      setNotification('');
    }, 3000);

    // Reset form
    setFormData({
      fullName: '',
      username: '',
      email: '',
      tel: '',
      password: '',
    });

    // Reset errors
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${Img})` }}>
      <div className="container mx-auto px-4">
        <div className="bg-sky-200 bg-opacity-80 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: `url(${ImgLoginUser  })` }}></div>
            <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-semibold text-black text-center">Daftar Akun</h2>
              <p className="text-xl text-black text-center">Pengguna Doker</p>
              <div className="text-start text-xs text-gray-500 pt-2">
                <p>
                  Sudah Punya Akun? {''}
                  <Link to="/login" className="text-gray-800">
                    Masuk disini
                  </Link>
                </p>
              </div>
              {/* Input fields */}
              <div className="mt-4 space-y-4">
                <InputWithIcon 
                  icon={RiUserLine} 
                  name="fullName" 
                  type="text" 
                  placeholder="Masukan nama lengkap" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  error={errors.fullName}
                />
                <InputWithIcon 
                  icon={LuUserCheck} 
                  name="username" 
                  type="text" 
                  placeholder="Masukkan nama pengguna" 
                  value={formData.username} 
                  onChange={handleChange} 
                  error={errors.username}
                />
                <InputWithIcon 
                  icon={MdOutlineEmail} 
                  name="email" 
                  type="email" 
                  placeholder="Masukkan alamat email anda" 
                  value={formData.email} 
                  onChange={handleChange} 
                  error={errors.email}
                />
                               <InputWithIcon 
                  icon={LuPhone} 
                  name="tel" 
                  type="tel" 
                  placeholder="Masukkan No.Hp" 
                  value={formData.tel} 
                  onChange={handleChange} 
                  error={errors.tel}
                />
                <InputWithIcon 
                  icon={MdLockOutline} 
                  name="password" 
                  type="password" 
                  placeholder="Masukkan sandi anda" 
                  value={formData.password} 
                  onChange={handleChange} 
                  error={errors.password}
                />
              </div>

              {/* Tombol Register */}
              <div className="mt-4">
                <button 
                  onClick={handleRegister} 
                  className="bg-sky-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-white hover:text-black transition duration-300 ease-in-out"
                >
                  Register
                </button>
              </div>

              {/* Notifikasi */}
              {notification && (
                <div className="mt-4 text-center text-green-600 font-semibold">
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
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <div className="bg-gray-300 p-2 rounded-full">
          <Icon className="h-5 w-5 text-black" />
        </div>
      </div>
      <input
        name={name}
        className={`bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-gray-300 rounded-lg py-2 pl-14 pr-4 block w-full appearance-none leading-normal ${error ? 'border-red-500' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Register;