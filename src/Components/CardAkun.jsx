import React from 'react';
import { Link } from 'react-router-dom';

const Akun = () => {
    return (
        <div className="py-12">
            <div className="flex flex-col items-center justify-center">
                <img src="/src/Assets/img/timkami.jpg" alt="Tim Member" className="rounded-full h-64 w-64 object-cover" />
                <div className="flex flex-col justify-center items-stretch w-64 space-y-2 mt-10 font-semibold">
                    <Link to="/PengaturanProfil" className="bg-blue-500 text-white w-full py-2 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300">Pengaturan Akun</Link>
                    <Link to="/" className="bg-blue-500 text-white w-full py-2 rounded-lg text-center hover:bg-blue-700 transition-colors duration-300">Keluarkan Akun</Link>
                </div>
            </div>
        </div>
    );
};

export default Akun;
