import React, { useState } from 'react';
import axios from 'axios';

const LupaPassword = () => {
  const [step, setStep] = useState(1); // 1: input email, 2: input kode dan password baru
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Base URL dari environment variable
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  // Fungsi untuk mengirim kode reset
  const handleSendResetCode = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${baseURL}/auth/forgot-password`, {
        email,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        setStep(2); // Pindah ke step verifikasi kode
      }
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        setError(error.response.data.message || 'Gagal mengirim kode reset');
      } else if (error.request) {
        // Request was made but no response received
        setError('Tidak dapat terhubung ke server. Silakan coba lagi.');
      } else {
        // Something else happened
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk verifikasi kode dan reset password
  const handleResetPassword = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // Validasi password
    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password tidak sesuai');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password minimal 6 karakter');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/auth/verify-reset-code`, {
        email,
        resetCode,
        newPassword,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        // Redirect ke login setelah beberapa detik
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        setError(error.response.data.message || 'Gagal mereset password');
      } else if (error.request) {
        // Request was made but no response received
        setError('Tidak dapat terhubung ke server. Silakan coba lagi.');
      } else {
        // Something else happened
        setError('Terjadi kesalahan. Silakan coba lagu.');
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6 bg-white">
      <div className="mt-7 bg-white rounded-xl shadow-lg border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">{step === 1 ? 'Lupa Password?' : 'Masukkan Kode Reset'}</h1>
            <p className="mt-2 text-sm text-gray-600">
              {step === 1 ? (
                <>
                  Ingat kata sandi anda?{' '}
                  <a href="/login" className="text-blue-600 decoration-2 hover:underline font-medium">
                    Login disini
                  </a>
                </>
              ) : (
                <>Kode reset telah dikirim ke email {email}</>
              )}
            </p>
          </div>

          {/* Pesan sukses */}
          {message && <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{message}</div>}

          {/* Pesan error */}
          {error && <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          <div className="mt-5">
            {step === 1 ? (
              // Step 1: Input Email
              <div>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        disabled={loading}
                        placeholder="Masukkan email Anda"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendResetCode}
                    disabled={loading}
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      'Kirim Kode Reset'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              // Step 2: Input Kode dan Password Baru
              <div>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="resetCode" className="block text-sm font-bold ml-1 mb-2">
                      Kode Reset (4 digit)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="resetCode"
                        name="resetCode"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md  focus:border-blue-500 focus:ring-blue-500 shadow-sm text-center text-2xl font-bold tracking-widest"
                        required
                        disabled={loading}
                        placeholder="****"
                        maxLength="4"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-bold ml-1 mb-2">
                      Password Baru
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        disabled={loading}
                        placeholder="Masukkan password baru"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-bold ml-1 mb-2">
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        disabled={loading}
                        placeholder="Konfirmasi password baru"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={loading}
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-gray-300 font-semibold bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      onClick={handleResetPassword}
                      disabled={loading}
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Memproses...
                        </>
                      ) : (
                        'Reset Password'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LupaPassword;
