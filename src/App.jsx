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
import ManajemenOrderPage from "./Admin/Pages/ManajemenOrderPage";
import DetailPesananSatuanPage from "./Admin/Pages/DetailPesananSatuanPage";
import TambahPesananSatuanPage from "./Admin/Pages/TambahPesananSatuanPage";
import DetailPesananPaketanPage from "./Admin/Pages/DetailPesananPaketanPage";
import TambahPesananPaketanPage from "./Admin/Pages/TambahPesananPaketanPage";
import ManajemenUserPage from "./Admin/Pages/ManajemenUserPage";
import TambahUser from "./Admin/Pages/TambahUser";
import ManajemenBarang from "./Admin/Pages/ManajemenBarangPage";
import LaporanPengguna from "./Admin/Pages/LaporanPenggunaPages";
import TambahBarang from "./Admin/Pages/TambahBarang";
import UbahUser from "./Admin/Pages/UbahUser";

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

        {/* Manajemen Admin */}
        <Route path="/manajemen-order" element={<ManajemenOrderPage />} />
        <Route path="/manajemen-user" element={<ManajemenUserPage />} />
        <Route path="/tambah-user" element={<TambahUser />} />
        <Route path="/manajemen-barang" element={<ManajemenBarang />} />
        <Route path="/laporan-pengguna" element={<LaporanPengguna />} />
        <Route path="/tambah-barang" element={<TambahBarang />} />
        <Route path="/ubah-user" element={<UbahUser />} />

        {/* Detail Pesanan Admin */}
        <Route path="/detail-pesanan-satuan" element={<DetailPesananSatuanPage />} />
        <Route path="/tambah-pesanan-satuan" element={<TambahPesananSatuanPage />} />
        <Route path="/detail-pesanan-paketan" element={<DetailPesananPaketanPage />} />
        <Route path="/tambah-pesanan-paketan" element={<TambahPesananPaketanPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;