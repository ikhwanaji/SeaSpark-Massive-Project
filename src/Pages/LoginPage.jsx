import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
import AuthService from '../services/AuthService';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Img from '../Assets/img/HeroSection.jpg';
import ImgLoginUser from '../Assets/img/LoginUser.png';

// Konstanta untuk pesan error
const ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Harap isi email terlebih dahulu',
  PASSWORD_REQUIRED: 'Harap isi password terlebih dahulu',
  EMAIL_INVALID: 'Format email tidak valid',
  PASSWORD_SHORT: 'Kata sandi minimal 6 karakter',
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // Efek untuk mengisi form jika sebelumnya di-remember
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  // Validasi email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Sanitasi input
  const sanitizeInput = (input) => {
    return input.replace(/[<>&'"]/g, '');
  };

  // Fungsi validasi form
  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // Validasi Email
    if (!formData.email.trim()) {
      newErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGES.EMAIL_INVALID;
      isValid = false;
    }

    // Validasi Password
    if (!formData.password.trim()) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_SHORT;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handler untuk perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setGlobalError('');
  };

  // Handler submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    if (validateForm()) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
          email: formData.email,
          password: formData.password,
        });

        // Gunakan fungsi login dari context
        login(response.data.user, response.data.token);

        // Navigasi ke beranda
        navigate('/');
      } catch (error) {
        // Error handling tetap sama
        if (error.response) {
          setGlobalError(error.response.data.message || 'Login gagal');
        } else {
          setGlobalError('Terjadi kesalahan saat login');
        }
        console.error('Login Error:', error);
      }
    }
  };

  // Login dengan Google (placeholder)
  const handleGoogleLogin = async () => {
    try {
      // Implementasi login Google
      // Contoh: await signInWithGoogle()
      setGlobalError('Fitur login Google dalam pengembangan');
    } catch (error) {
      console.error('Google Login Error', error);
      setGlobalError('Gagal login dengan Google');
    }
  };

  // Render input dengan error handling
  const renderInput = (name, type, placeholder, icon = null, leadingIcon = null) => (
    <div className="mt-4">
      <label htmlFor={name} className="block text-black text-sm font-bold mb-2">
        {name === 'email' ? 'Email' : 'Password'}
      </label>
      <div className="relative">
        {leadingIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{leadingIcon}</div>}
        <input
          id={name}
          name={name}
          className={`
            bg-white text-gray-700 focus:outline-none focus:shadow-outline border 
            ${errors[name] ? 'border-red-500' : 'border-gray-300'} 
            rounded py-2 px-4 block w-full appearance-none 
            ${leadingIcon ? 'pl-10' : ''} 
            ${icon ? 'pr-10' : ''}
          `}
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          autoComplete={name === 'email' ? 'email' : 'current-password'}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleInputChange}
        />
        {icon && (
          <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" onClick={() => setShowPassword(!showPassword)}>
            {icon}
          </button>
        )}
      </div>
      {errors[name] && <p className="text-red-500 text-xs italic mt-1">{errors[name]}</p>}
    </div>
  );

  // Render tombol login sosial
  const renderSocialLoginButton = () => (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="
        w-full 
        flex 
        items-center 
        justify-center 
        mt-4 
        bg-white 
        text-gray-700 
        py-2 
        px-4 
        rounded-lg 
        shadow-md 
        hover:bg-gray-100 
        focus:outline-none 
        focus:ring-2 
        focus:ring-gray-200 
        transition 
        duration-300 
        ease-in-out
      "
    >
      <div className="mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
          <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-4v3.1C2.615 21.14 7.065 24 12.255 24z" />
          <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.1h-4c-.81 2.05-.81 4.34 0 6.39l4-3.1z" />
          <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-5.19 0-9.64 2.86-11.73 7l4 3.1c.95-2.85 3.6-4.96 6.73-4.96z" />
        </svg>
      </div>
      <span className="font-semibold">Lanjutkan dengan Google</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${Img})` }}>
      <div className="container mx-auto px-4">
        <div className="bg-blue-200 bg-opacity-90 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="flex flex-col lg:flex-row">
            {/* Gambar Login */}
            <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${ImgLoginUser})` }} />

            {/* Form Login */}
            <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-bold text-black text-center">Selamat Datang!</h2>
              <p className="text-l text-gray-700 text-center">Silahkan Masuk Ke Akun Anda</p>

              {/* Tampilan Error Global */}
              {globalError && (
                <div
                  className="
                    mt-4 
                    bg-red-100 
                    border 
                    border-red-400 
                    text-red-700 
                    px-4 
                    py-3 
                    rounded 
                    relative
                  "
                  role="alert"
                >
                  {globalError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-4">
                {renderInput('email', 'email', 'Masukkan alamat email anda', null, <FaEnvelope className="text-gray-400" />)}

                {renderInput('password', 'password', 'Masukkan kata sandi anda', showPassword ? <FaEyeSlash /> : <FaEye />, <FaLock className="text-gray-400" />)}

                {/* Pengaturan Remember Me */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="
                        h-4 
                        w-4 
                        text-blue-600 
                        focus:ring-blue-500 
                        border-gray-300 
                        rounded
                      "
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                      Ingat saya
                    </label>
                  </div>

                  <Link to="/lupa-password" className="text-sm text-blue-700 hover:text-blue-500">
                    Lupa Password?
                  </Link>
                </div>

                {/* Tombol Submit */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="
                      w-full 
                      bg-blue-600 
                      text-white 
                      py-2 
                      px-4 
                      rounded-lg 
                      hover:bg-blue-500 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-700 
                      focus:ring-opacity-50
                      transition 
                      duration-300
                    "
                  >
                    Masuk
                  </button>
                </div>
              </form>

              {/* Pemisah Login Sosial */}
              <div className="mt-6 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <p className="text-xs text-center text-gray-500 uppercase">Atau masuk dengan</p>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>

              {/* Tombol Login Sosial */}
              {renderSocialLoginButton()}

              {/* Tautan Daftar */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Belum punya akun?{' '}
                  <Link to="/register" className="text-blue-700 hover:text-blue-500 font-semibold">
                    Daftar Sekarang
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
