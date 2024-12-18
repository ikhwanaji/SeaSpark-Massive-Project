import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Footer = ({ infoLinks, isUserPage }) => {
  const navigate = useNavigate();

  const handleNavClick = (e, item) => {
    e.preventDefault();

    // Jika sedang di halaman user, gunakan navigasi
    if (isUserPage) {
      navigate(item.path || '/');
      return;
    }

    // Untuk halaman beranda, gunakan scroll smooth
    if (window.location.pathname === '/') {
      const elementId = item.text.toLowerCase().replace(/\s+/g, '-');
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Jika tidak di halaman beranda, navigasikan ke beranda
      navigate('/' + elementId);
    }
  };

  const handlePageNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-white mt-auto bottom-0 w-full">
      <div className="max-w-screen-lg px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Company Name */}
          <div className="flex justify-center sm:justify-start">
            <Link to={isUserPage ? '/' : '/'} className="cursor-pointer">
              <img className="h-44 md:h-44" src="/Assets/img/Logo Footer.png" alt="Logo" />
            </Link>
          </div>

          {/* Info */}
          <div className="text-center sm:text-left">
            <div className="text-sm uppercase text-blue-500 font-bold mb-4">Info</div>
            <div className="space-y-3">
              {infoLinks &&
                infoLinks.map((link, index) => (
                  <Link key={index} to={isUserPage ? link.path : '/'} className="block text-blue-500 hover:text-blue-600" onClick={(e) => handleNavClick(e, link)}>
                    {link.text}
                  </Link>
                ))}
            </div>
          </div>

          {/* Perusahaan */}
          <div className="text-center sm:text-left">
            <div className="text-sm uppercase text-blue-500 font-bold mb-4">Perusahaan</div>
            <div className="space-y-3">
              <Link to="/syarat-dan-ketentuan" className="block text-blue-500 hover:text-blue-600 cursor-pointer">
                Syarat dan ketentuan
              </Link>
              <Link to="/kebijakan-privasi" className="block text-blue-500 hover:text-blue-600 cursor-pointer">
                Kebijakan Privasi
              </Link>
            </div>
          </div>

          {/* Kontak */}
          <div className="text-center sm:text-left">
            <div className="text-sm uppercase text-blue-500 font-bold mb-4">Kontak</div>
            <div className="space-y-3 text-blue-500">
              <p>Jl. Za Pagar Alam No. 1</p>
              <p>Bandar Lampung, Lampung</p>
              <p>Indonesia</p>
              <p>089601963811</p>
              <p>contact@company.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 text-center bg-blue-500 text-white">
        <p>© Copyright 2020. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
