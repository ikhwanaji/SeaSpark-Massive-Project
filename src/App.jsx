import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Beranda from './Pages/Beranda';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/Register';
import Kebijakan_Privasi from './Pages/Kebijakan_Privasi';
import Syarat_ketentuan from './Pages/Syarat_ketentuan';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kebijakan-privasi" element={<Kebijakan_Privasi />} />
        <Route path="/syarat-dan-ketentuan" element={<Syarat_ketentuan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
