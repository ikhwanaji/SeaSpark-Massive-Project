import React from 'react';
import Button from '../Components/Button';

function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-20">
      <div className="text-2xl font-semibold mb-4">Pesan Anda Telah Terkirim !</div>
      <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center">
        <svg
          className="w-36 h-36 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <Button to='/beranda-pengguna'>
        Kembali Ke Beranda
      </Button>
    </div>
  );
}

export default SuccessMessage;
