import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

// Halaman Utama
import Beranda from './Pages/Beranda';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/Register';


// Halaman Kebijakan & Syarat
import Kebijakan_Privasi from './Pages/Kebijakan_Privasi';
import Syarat_ketentuan from './Pages/Syarat_ketentuan';

// Halaman Pemesanan
import Produk from './Pages/Produk';
import ProdukPaketan from './Pages/ProdukPaketan';
import ProdukSatuan from './Pages/ProdukSatuan';
import PemesananPage from './Pages/Pemesanan';
import KonfirmasiPembayaran from './Pages/KonfirmasiPembayaran';
import RiwayatPemesananPage from './Pages/RiwayatPemesananPage';

// Halaman Layanan
import LayananPage from './Pages/LayananPage';
import Layanan2Page from './Pages/Layanan2Page';
import DetailPage from './Pages/DetailPage';

// Halaman Akun & Pengaturan
import AkunPage from './Pages/AkunPage';
import PengaturanProfil from './Pages/PengaturanProfil';
import PengaturanAvatar from './Pages/PengaturanAvatar';
import PengaturanPassword from './Pages/PengaturanPassword';
import PengaturanNotifikasi from './Pages/PengaturanNotifikasi';

// Halaman Tambahan
import KontakKami from './Pages/KontakKami';
import SuksesPage from './Pages/SuksesPage';
import TentangKami from './Pages/TentangKami';

// Halaman Admin
import LoginAdmin from './Pages/loginadmin';
import LupaPassword from './Pages/LupaPassword';

// Halaman Admin : Pesanan
import DaftarPesananPage from './Admin/Pages/Pesanan/DaftarPesananPage';
import DetailPesananSatuanPage from './Admin/Pages/Pesanan/DetailPesananSatuanPage';
import DetailPesananPaketanPage from './Admin/Pages/Pesanan/DetailPesananPaketanPage';

// Halaman Admin : Kategori
import KategoriProdukPage from './Admin/Pages/Kategori/KategoriProdukPage';
import TambahKategoriPage from './Admin/Pages/Kategori/TambahKategoriPage';
import EditKategoriPage from './Admin/Pages/Kategori/EditKategoriPage';

// Halaman Admin : Manajemen Produk
import ManajemenProdukPage from './Admin/Pages/Produk/ManajemenProdukPage';
import TambahProdukPage from './Admin/Pages/Produk/TambahProdukPage';
import EditProdukPage from './Admin/Pages/Produk/EditProdukPage';

// Halaman Admin : Manajemen Paket
import ManajemenPaketPage from './Admin/Pages/Paket/ManajemenPaketPage';
import TambahPaketPage from './Admin/Pages/Paket/TambahPaketPage';
import EditPaketPage from './Admin/Pages/Paket/EditPaketPage';

// Halaman Admin : Metode Pembayaran
import MetodePembayaranPage from './Admin/Pages/Pembayaran/MetodePembayaranPage';
import TambahMetodePage from './Admin/Pages/Pembayaran/TambahMetodePage';
import EditMetodePage from './Admin/Pages/Pembayaran/EditMetodePage';

// Halaman Admin : Manajemen Artikel
import ManajemenArtikelPage from './Admin/Pages/Artikel/ManajemenArtikelPage';
import TambahArtikelPage from './Admin/Pages/Artikel/TambahArtikelPage';
import EditArtikelPage from './Admin/Pages/Artikel/EditArtikelPage';

// Halaman Admin : Laporan Pengguna
import LaporanPenggunaPage from './Admin/Pages/Laporan/LaporanPenggunaPage';

// Halaman Admin : Manajemen User
import ManajemenUserPage from './Admin/Pages/User/ManajemenUserPage';
import EditUser from './Admin/Pages/User/EditUser';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Halaman Utama Publik */}
          <Route path="/" element={<Beranda />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/lupa-password" element={<LupaPassword />} />

          {/* Halaman Publik Lainnya */}
          <Route path="/kebijakan-privasi" element={<Kebijakan_Privasi />} />
          <Route path="/syarat-dan-ketentuan" element={<Syarat_ketentuan />} />
          <Route path="/Produk" element={<Produk />} />
          <Route path="/produk-paketan" element={<ProdukPaketan />} />
          <Route path="/produk-satuan" element={<ProdukSatuan />} />
          <Route path="/layanan" element={<LayananPage />} />
          <Route path="/layanan2" element={<Layanan2Page />} />
          <Route path="/layanan/detail/:id" element={<DetailPage />} />
          <Route path="/Kontak" element={<KontakKami />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/Sukses" element={<SuksesPage />} />

          {/* Rute yang Memerlukan Autentikasi */}
          <Route element={<PrivateRoute />}>
            {/* Pemesanan */}
            <Route path="/pemesanan" element={<PemesananPage />} />
            <Route path="/konfirmasi-pembayaran" element={<KonfirmasiPembayaran />} />
            <Route path="/riwayat-pembayaran" element={<RiwayatPemesananPage />} />

            {/* Akun & Pengaturan */}
            <Route path="/Akun" element={<AkunPage />} />
            <Route path="/PengaturanProfil" element={<PengaturanProfil />} />
            <Route path="/PengaturanAvatar" element={<PengaturanAvatar />} />
            <Route path="/PengaturanPassword" element={<PengaturanPassword />} />
            <Route path="/PengaturanNotifikasi" element={<PengaturanNotifikasi />} />
          </Route>

          {/* Rute Admin */}
          <Route path="/daftar-pesanan" element={<DaftarPesananPage />} />
          <Route path="/detail-pesanan-satuan" element={<DetailPesananSatuanPage />} />
          <Route path="/detail-pesanan-paketan" element={<DetailPesananPaketanPage />} />

          {/* Kategori */}
          <Route path="/kategori-produk" element={<KategoriProdukPage />} />
          <Route path="/tambah-kategori" element={<TambahKategoriPage />} />
          <Route path="/edit-kategori/:kategoriId" element={<EditKategoriPage />} />

          {/* Manajemen Produk */}
          <Route path="/manajemen-produk" element={<ManajemenProdukPage />} />
          <Route path="/tambah-produk" element={<TambahProdukPage />} />
          <Route path="/edit-produk/:id" element={<EditProdukPage />} />

          {/* Manajemen Paket */}
          <Route path="/manajemen-paket" element={<ManajemenPaketPage />} />
          <Route path="/tambah-paket" element={<TambahPaketPage />} />
          <Route path="/edit-paket/:paketId" element={<EditPaketPage />} />

          {/* Metode Pembayaran */}
          <Route path="/metode-pembayaran" element={<MetodePembayaranPage />} />
          <Route path="/tambah-metode" element={<TambahMetodePage />} />
          <Route path="/edit-metode" element={<EditMetodePage />} />

          {/* Manajemen Artikel */}
          <Route path="/manajemen-artikel" element={<ManajemenArtikelPage />} />
          <Route path="/tambah-artikel" element={<TambahArtikelPage />} />
          <Route path="/edit-artikel/:artikelId" element={<EditArtikelPage />} />

          {/* Laporan Pengguna */}
          <Route path="/laporan-pengguna" element={<LaporanPenggunaPage />} />

          {/* Manajemen User */}
          <Route path="/manajemen-user" element={<ManajemenUserPage />} />
          <Route path="/edit-user/:userId" element={<EditUser />} />
          <Route path="/404" element={<NotFound />} />

          {/* Halaman Default atau 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
