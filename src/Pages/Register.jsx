import React from 'react';
import { Link } from 'react-router-dom';
import { LuPhone } from "react-icons/lu";
import { RiUserLine } from "react-icons/ri";
import { LuUserCheck } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import Img from '../Assets/img/HeroSection.jpg';
import ImgLoginUser from '../Assets/img/LoginUser.png';

const Register = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${Img})` }}>
      <div className="container mx-auto px-4">
        <div className="bg-sky-200 bg-opacity-80 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: `url(${ImgLoginUser})` }}></div>
            <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-semibold text-black text-center">Daftar Akun </h2>
              <p className="text-xl text-black text-center">Pengguna Doker</p>
              <div className="text-start text-xs text-gray-500 pt-2">
                <p>
                  Sudah Punya Akun ? {''}
                  <Link to="/login" className="text-gray-800">
                    Masuk disini
                  </Link>
                </p>
              </div>
              {/* Input fields */}
              <div className="mt-4 space-y-4">
                <InputWithIcon icon={RiUserLine} name="full-name" type="text" placeholder="Masukan nama lengkap" />
                <InputWithIcon icon={LuUserCheck} name="username" type="text" placeholder="Masukkan nama pengguna" />
                <InputWithIcon icon={MdOutlineEmail} name="email" type="email" placeholder="Masukkan alamat email anda" />
                <InputWithIcon icon={LuPhone} name="tel" type="tel" placeholder="Masukkan No.Hp" />
                <InputWithIcon icon={MdLockOutline} name="new-password" type="password" placeholder="Masukkan sandi anda" />
              </div>

              {/* Tombol Register */}
              <div className="mt-4">
                <button className="bg-sky-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-white hover:text-black transition duration-300 ease-in-out">Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen InputWithIcon
const InputWithIcon = ({ icon: Icon, name, type, placeholder }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <div className="bg-gray-300 p-2 rounded-full ">
          <Icon className="h-5 w-5 text-black " />
        </div>
      </div>
      <input
        name={name}
        className="bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-gray-300 rounded-lg py-2 pl-14 pr-4 block w-full appearance-none leading-normal"
        type={type}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Register;
