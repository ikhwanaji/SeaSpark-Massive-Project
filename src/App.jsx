import { BrowserRouter, Routes, Route } from "react-router-dom";

// Halaman Utama
import Beranda from "./Pages/Beranda";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";
import BerandaUser from "./Pages/BerandaUser";

// Halaman Kebijakan & Syarat
import Kebijakan_Privasi from "./Pages/Kebijakan_Privasi";
import Syarat_ketentuan from "./Pages/Syarat_ketentuan";

// Halaman Pemesanan
import Pemesanan from "./Pages/Pemesanan";
import PemesananPaketan from "./Pages/PemesananPaketan";
import PemesananSatuan from "./Pages/PemesananSatuan";
import PembayaranPage from "./Pages/Pembayaran";

// Halaman Layanan
import LayananPage from "./Pages/LayananPage";
import DetailPage from "./Pages/DetailPage";

// Halaman Akun & Pengaturan
import AkunPage from "./Pages/AkunPage";
import PengaturanProfil from "./Pages/PengaturanProfil";
import PengaturanAvatar from "./Pages/PengaturanAvatar";
import PengaturanPassword from "./Pages/PengaturanPassword";
import PengaturanNotifikasi from "./Pages/PengaturanNotifikasi";

// Halaman Tambahan
import KontakKami from "./Pages/KontakKami";
import SuksesPage from "./Pages/SuksesPage";
import TentangKami from "./Pages/TentangKami";

// Halaman Admin
import LoginAdmin from "./Pages/loginadmin";
import LupaPassword from "./Pages/LupaPassword";
import DaftarPesananPage from "./Admin/Pages/Pesanan/DaftarPesananPage";
import DetailPesananSatuanPage from "./Admin/Pages/Pesanan/DetailPesananSatuanPage";
import DetailPesananPaketanPage from "./Admin/Pages/Pesanan/DetailPesananPaketanPage";
import KategoriProdukPage from "./Admin/Pages/Kategori/KategoriProdukPage";
import TambahKategoriPage from "./Admin/Pages/Kategori/TambahKategoriPage";
import EditKategoriPage from "./Admin/Pages/Kategori/EditKategoriPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/beranda-pengguna" element={<BerandaUser />} />

        {/* Kebijakan & Syarat */}
        <Route path="/kebijakan-privasi" element={<Kebijakan_Privasi />} />
        <Route path="/syarat-dan-ketentuan" element={<Syarat_ketentuan />} />

        {/* Pemesanan */}
        <Route path="/Pemesanan" element={<Pemesanan />} />
        <Route path="/pemesanan-paketan" element={<PemesananPaketan />} />
        <Route path="/pemesanan-satuan" element={<PemesananSatuan />} />
        <Route path="/pembayaran" element={<PembayaranPage />} />

        {/* Layanan */}
        <Route path="/layanan" element={<LayananPage />} />
        <Route path="/Detail" element={<DetailPage />} />

        {/* Akun & Pengaturan */}
        <Route path="/Akun" element={<AkunPage />} />
        <Route path="/PengaturanProfil" element={<PengaturanProfil />} />
        <Route path="/PengaturanAvatar" element={<PengaturanAvatar />} />
        <Route path="/PengaturanPassword" element={<PengaturanPassword />} />
        <Route path="/PengaturanNotifikasi" element={<PengaturanNotifikasi />} />

        {/* Halaman Tambahan */}
        <Route path="/Kontak" element={<KontakKami />} />
        <Route path="/Sukses" element={<SuksesPage />} />
        <Route path="/tentang-kami" element={<TentangKami />} />

        {/* Autentikasi Admin */}
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/lupa-password" element={<LupaPassword />} />

        {/* Page Pesanan */}
        <Route path="/daftar-pesanan" element={<DaftarPesananPage />} />
        <Route path="/detail-pesanan-satuan" element={<DetailPesananSatuanPage />} />
        <Route path="/detail-pesanan-paketan" element={<DetailPesananPaketanPage />} />

        {/* Page Kategori */}
        <Route path="/kategori-produk" element={<KategoriProdukPage />} />
        <Route path="/tambah-kategori" element={<TambahKategoriPage />} />
        <Route path="/edit-kategori" element={<EditKategoriPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;