import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Beranda from './Pages/Beranda';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/Register';
import Kebijakan_Privasi from './Pages/Kebijakan_Privasi';
import Syarat_ketentuan from './Pages/Syarat_ketentuan';
import BerandaUser  from './Pages/BerandaUser';
import Pemesanan from './Pages/Pemesanan';
import LayananPage from './Pages/LayananPage';
import DetailPage from './Pages/DetailPage';
import AkunPage from './Pages/AkunPage';
import PengaturanProfil from './Pages/PengaturanProfil';
import PengaturanAvatar from './Pages/PengaturanAvatar';
import PengaturanPassword from './Pages/PengaturanPassword';
import PengaturanNotifikasi from './Pages/PengaturanNotifikasi';
import KontakKami from './Pages/KontakKami';
import SuksesPage from './Pages/SuksesPage';
import PemesananPaketan from './Pages/PemesananPaketan';
import PemesananSatuan from './Pages/PemesananSatuan';
import TentangKami from './Pages/TentangKami'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kebijakan-privasi" element={<Kebijakan_Privasi />} />
        <Route path="/syarat-dan-ketentuan" element={<Syarat_ketentuan />} />
        <Route path="/beranda-pengguna" element={<BerandaUser  />} />
        <Route path="/Pemesanan" element={<Pemesanan />} />
        <Route path="/pemesanan-paketan" element={<PemesananPaketan />} />
        <Route path="/pemesanan-satuan" element={<PemesananSatuan />} />
        <Route path="/layanan" element={<LayananPage />} />
        <Route path="/Detail" element={<DetailPage />} />
        <Route path="/Akun" element={<AkunPage />} />
        <Route path="/PengaturanProfil" element={<PengaturanProfil />} />
        <Route path="/PengaturanAvatar" element={<PengaturanAvatar />} />
        <Route path="/PengaturanPassword" element={<PengaturanPassword />} />
        <Route path="/PengaturanNotifikasi" element={<PengaturanNotifikasi />} />
        <Route path="/Kontak" element={<KontakKami />} />
        <Route path="/Sukses" element={<SuksesPage />} />
        <Route path="/tentang-kami" element={<TentangKami />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;