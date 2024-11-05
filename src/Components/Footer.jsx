import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white w-full">
      {/* Top shadow applied directly to the footer */}
      <div className="shadow-md">
        <div className="max-w-screen-lg px-4 py-8 mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* Logo Section */}
            <div className="flex justify-center sm:justify-start">
              <a href="/">
                <img 
                  className="h-44 md:h-44" 
                  src="/src/Assets/img/Logo Footer.png" 
                  alt="Logo" 
                />
              </a>
            </div>

            {/* Info Links */}
            <div className="text-center sm:text-left">
              <div className="text-sm uppercase text-sky-500 font-bold mb-4">Info</div>
              <div className="space-y-3">
                <a className="block text-sky-500 hover:text-sky-600" href="/#">
                  Beranda
                </a>
                <a className="block text-sky-500 hover:text-sky-600" href="/#">
                  Layanan
                </a>
                <a className="block text-sky-500 hover:text-sky-600" href="/#">
                  Ulasan
                </a>
                <a className="block text-sky-500 hover:text-sky-600" href="/#">
                  Tentang Kami
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div className="text-center sm:text-left">
              <div className="text-sm uppercase text-sky-500 font-bold mb-4">Perusahaan</div>
              <div className="space-y-3">
                <a className="block text-sky-500 hover:text-sky-600" href="/#">
                  Syarat dan ketentuan
                </a>
                <a className="block text-sky-500 hover:text-sky-600" href="/#">
                  Kebijakan Privasi
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-center sm:text-left">
              <div className="text-sm uppercase text-sky-500 font-bold mb-4">Kontak</div>
              <div className="space-y-3 text-sky-500">
                <p>Jl. Za Pagar Alam No. 1</p>
                <p>Bandar Lampung, Lampung</p>
                <p>Indonesia</p>
                <p>089601963811</p>
                <p>contact@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section with no shadow */}
      <div className="py-4 text-center bg-sky-500 text-white">
        <p>© Copyright 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
