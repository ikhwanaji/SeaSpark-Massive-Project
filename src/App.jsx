import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Beranda from './Pages/Beranda';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/Register';
import Kebijakan_Privasi from './Pages/Kebijakan_Privasi';
import Syarat_ketentuan from './Pages/Syarat_ketentuan';
import BerandaUser from './Pages/BerandaUser';
import Pemesanan from './Pages/Pemesanan';
import LayananPage from './Pages/LayananPage';
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
        <Route path="/beranda-user" element={<BerandaUser />} />
        <Route path="/Pemesanan" element={<Pemesanan />} />
        <Route path="/Layanan" element={<LayananPage />} />
        <Route path="/TentangKami" element={<TentangKami />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
