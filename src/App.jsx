import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Beranda from './Pages/Beranda';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
