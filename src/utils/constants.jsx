export const NAVIGATION_LINKS = [
  { name: 'Beranda', type: 'link', path: '/beranda-pengguna' },
  { name: 'Layanan', type: 'link', path: '/layanan' },
  { name: 'Produk', type: 'link', path: '/produk' },
  { name: 'Tentang Kami', type: 'link', path: '/tentang-kami' },
  { name: 'Kontak', type: 'link', path: '/kontak' },
];

export const INFO_LINKS = [
  { text: 'Beranda', path: '/beranda-user', href: '#beranda' },
  { text: 'Layanan', path: '/layanan', href: '#layanan' },
  { text: 'Produk', path: '/produk', href: '#produk' },
  { text: 'Tentang Kami', path: '/tentang-kami', href: '#tentang-kami' },
  { text: 'Kontak', path: '/kontak', href: '#kontak' },
];

export const PRODUK_DATA = [
  {
    id: 1,
    kategori: 'Alat',
    nama: 'Jaring Ikan Kantong',
    harga: 30000,
    gambar: '/src/Assets/img/jaringikan.png',
    deskripsi: 'Jaring ikan berkualitas untuk kegiatan perikanan',
    stok: 50,
  },
  {
    id: 2,
    kategori: 'Alat',
    nama: 'Termometer',
    harga: 115000,
    gambar: '/src/Assets/img//termometer.png',
    deskripsi: 'alat pengukur suhu yang menggunakan cairan (biasanya air atau alkohol) dalam tabung kaca untuk menunjukkan suhu. Cairan ini mengembang atau menyusut seiring perubahan suhu, dan tingkat cairan yang terlihat pada skala yang tertera pada tabung menunjukkan nilai suhu.',
    stok: 60,
  },
  {
    id: 3,
    kategori: 'Buku Panduan',
    nama: 'Panduan Penyakit Parasit pada Ikan Kerapu: Identifikasi dan Pengobatan',
    harga: 100000,
    gambar: '/src/Assets/img/bukupanduan.png',
    deskripsi: 'Buku panduan penyakit parasit pada ikan kerapu untuk identifikasi dan cara pengobatannya',
    stok: 40,
  },
  {
    id: 4,
    kategori: 'Obat-Obatan',
    nama: 'Max- C+ Vitamin C Ikan Dosis Tinggi ',
    harga: 25000,
    gambar: '/src/Assets/img/max-cvitamin.png',
    deskripsi:
      'suplemen nutrisi inovatif yang dirancang untuk meningkatkan sistem kekebalan tubuh dan kesehatan secara menyeluruh.',
    stok: 30,
  },
  {
    id: 5,
    kategori: 'Obat-Obatan',
    nama: 'Red Blue Dox',
    harga: 30000,
    gambar: '/src/Assets/img/redbluedox.png',
    deskripsi: 'obat ikan yang dapat digunakan untuk mencegah dan mengobati penyakit ikan dan udang, seperti:Jamur, Parasit, Bakteri, Virus, Kuman, Luka. ',
    stok: 50,
  },
  {
    id: 6,
    kategori: 'Buku Panduan',
    nama: 'Penyakit Virus pada Ikan Kerapu: Gejala, Pencegahan, dan Pengobatan',
    harga: 100000,
    gambar: '/src/Assets/img/bukupanduan2.png',
    deskripsi: 'buku panduan untuk mengatasi gejala, pencegahan dan Pengobatan Ikan Kerapu',
    stok: 40,
  },
];

export const KATEGORI_PRODUK = [{ name: 'Alat' }, { name: 'Obat-Obatan' }, { name: 'Buku Panduan' }];
