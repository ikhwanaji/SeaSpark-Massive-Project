import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Img from '../Assets/img/HeroSection.jpg';
import ImgLoginUser from '../Assets/img/LoginUser.png';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// Konstanta untuk pesan error
const ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Harap isi email terlebih dahulu',
  PASSWORD_REQUIRED: 'Harap isi password terlebih dahulu',
  EMAIL_INVALID: 'Format email tidak valid',
  PASSWORD_SHORT: 'Kata sandi minimal 6 karakter',
};

const LoginPage = () => {
  const { login, googleLogin, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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

  // Check for token in URL (for Google auth callback)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      handleBackendGoogleAuth(token);
    }
  }, [location]);

  // Handle token from backend Google auth
  const handleBackendGoogleAuth = async (token) => {
    try {
      // Set Authorization header for user data request
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Get user data from backend
      const response = await axios.get(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/auth/me`);

      if (response.data.success && response.data.user) {
        // Login with the returned user data
        googleLogin(token, response.data.user);

        // Clear the token from URL
        navigate('/', { replace: true });
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Google auth verification error:', error);
      setGlobalError('Verifikasi login Google gagal');
    }
  };

  // Efek untuk mengisi form jika sebelumnya di-remember
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  // Redirect jika sudah login
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

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
        // Gunakan fungsi login dari context
        await login(formData.email, formData.password);

        // Simpan email jika remember me dicentang
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Navigasi ke beranda
        navigate('/');
      } catch (error) {
        // Error handling
        setGlobalError(error.message || 'Login gagal');
        console.error('Login Error:', error);
      }
    }
  };

  // Login dengan Google
  const handleGoogleLogin = (response) => {
    try {
      console.log('Google Login Success:', response);

      // Redirect user to backend Google authentication
      // window.location.href = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}/auth/google`;

      // Alternatively, if you want to handle the Google token directly in frontend:
      const decodedToken = jwtDecode(response.credential);
      googleLogin(response.credential, {
        name: decodedToken.name,
        email: decodedToken.email,
        sub: decodedToken.sub,
        picture: decodedToken.picture,
      });
      navigate('/');
    } catch (error) {
      console.error('Error processing Google login:', error);
      setGlobalError('Gagal memproses login Google');
    }
  };

  const handleGoogleLoginError = () => {
    console.error('Google Login Error');
    setGlobalError('Gagal login dengan Google');
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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID }>
      <GoogleLogin onSuccess={handleGoogleLogin} onError={handleGoogleLoginError} theme="filled_blue" size="large" text="continue_with" shape="rectangular" width="100%" locale="id_ID" scope="profile email" />
    </GoogleOAuthProvider>
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
              <div className="mt-4">{renderSocialLoginButton()}</div>

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
