import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Img from '../Assets/img/HeroSection.jpg';
import ImgLoginAdmin from '../Assets/img/LoginAdmin.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [apiError, setApiError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    setApiError('');
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Harap isi email terlebih dahulu';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Harap isi password terlebih dahulu';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login-admin`, formData);

        localStorage.setItem('token', response.data.token);
        navigate('/kategori-produk');
      } catch (error) {
        if (error.response) {
          setApiError(error.response.data.message || 'Terjadi kesalahan saat login');
        } else {
          setApiError('Terjadi kesalahan jaringan');
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${Img})` }}>
      <div className="container mx-auto px-4">
        <div className="bg-sky-200 bg-opacity-80 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: `url(${ImgLoginAdmin})` }}></div>
            <div className="w-full p-10 pb-28 lg:w-1/2">
              <h2 className="text-2xl font-semibold text-black text-center">Selamat datang Admin Doker!</h2>
              <p className="text-l text-gray-700 text-center">Silakan masuk ke akun anda</p>

              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-black text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    className={`bg-white text-gray-700 focus:outline-none focus:shadow-outline border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded py-2 px-4 block w-full appearance-none`}
                    type="email"
                    autoComplete="email"
                    placeholder="Masukkan alamat email anda"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
                      Sandi
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      className={`bg-white text-gray-700 focus:outline-none focus:shadow-outline border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded py-2 px-4 block w-full appearance-none pr-10`}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Masukkan kata sandi anda"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
                </div>

                {apiError && (
                  <div className="mt-4">
                    <p className="text-red-500 text-sm text-center">{apiError}</p>
                  </div>
                )}

                <div className="mt-4">
                  <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                    Masuk
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
