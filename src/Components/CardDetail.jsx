import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
// import { useAuth } from '../context/AuthContext';
import bakteriDetailImg from '../Assets/img/bakteridetail.png'
import jamurDetailImg from '../Assets/img/jamurdetail.png'
import virusDetailImg from '../Assets/img/virusdetail.png'
import parasitDetailImg from '../Assets/img/parasitdetail.png'
import nutrisiDetailImg from '../Assets/img/nutrisidetail.png'

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { isLoggedIn, user, logout } = useAuth(); 

  // Expanded penyakit details
  const penyakitDetails = {
    1: {
      title: 'Penyakit Bakteri pada Ikan Kerapu',
      image: bakteriDetailImg,
      description: `Ikan kerapu (Epinephelus spp.) rentan terhadap penyakit bakteri yang dapat menyebabkan kerugian signifikan dalam budidaya.`,
      details: {
        penyebab: ['Infeksi bakteri seperti Vibrio spp.', 'Aeromonas spp.', 'Streptococcus spp.', 'Pseudomonas spp.'],
        gejala: ['Pembengkakan', 'Luka pada kulit', 'Pendarahan', 'Kehilangan nafsu makan', 'Kematian mendadak'],
        pencegahan: ['Menjaga kualitas air', 'Pemberian pakan berkualitas', 'Kontrol kepadatan ikan', 'Penggunaan probiotik'],
        pengobatan: ['Pemberian antibiotik yang sesuai', 'Terapi probiotik', 'Peningkatan kualitas lingkungan budidaya'],
      },
      recommendations: [
        {
          title: 'Produk Rekomendasi',
          items: ['Antibiotik khusus ikan', 'Probiotik untuk meningkatkan sistem imun', 'Suplemen nutrisi tambahan'],
        },
      ],
    },
    2: {
      title: 'Penyakit Jamur pada Ikan Kerapu',
      image: jamurDetailImg,
      description: `Ikan kerapu (Epinephelus spp.) rentan terhadap penyakit bakteri yang dapat menyebabkan kerugian signifikan dalam budidaya.`,
      details: {
        penyebab: ['Kondisi Lingkungan Buruk', 'Luka Pada Ikan', 'Stress', 'Infeksi Sekunder yang disebabkan oleh jamur yang sering menyerang ikan yang sudah lemah akibat infeksi bakteri atau parasit.'],
        gejala: [
          'Lesi Putih Berbulu: Tanda khas berupa pertumbuhan jamur berwarna putih seperti kapas di kulit, sirip, atau insang.',
          'Perubahan Perilaku berupa lesu, berenang lambat, atau sering menggosokkan tubuhnya ke benda di sekitarnya.',
          'Penurunan Nafsu Makan',
          'Sirip dan kulit terlihat rusak atau terkikis.',
        ],
        pencegahan: [
          'Menjaga kualitas air tetap optimal',
          'Kontrol suhu dan pH air secara berkala',
          'Pemberian pakan bernutrisi tinggi',
          'Mengurangi kepadatan ikan dalam budidaya',
          'Sterilisasi peralatan budidaya',
          'Karantina ikan baru sebelum dimasukkan ke dalam kolam utama',
        ],
        pengobatan: [
          'Penggunaan antijamur khusus ikan (misal: Methylene Blue)',
          'Perendaman ikan dalam larutan garam',
          'Pemberian obat antijamur berbasis herbal',
          'Terapi air garam dengan konsentrasi rendah',
          'Penggunaan probiotik untuk meningkatkan sistem imun',
          'Pergantian sebagian air kolam secara berkala',
        ],
      },
      recommendations: [
        {
          title: 'Produk Rekomendasi',
          items: ['Methylene Blue Antiseptik', 'Obat Antijamur Herbal', 'Probiotik Peningkat Imun Ikan', 'Garam Mineral Khusus Ikan', 'Vitamin Penambah Daya Tahan Tubuh'],
        },
      ],
    },
    3: {
      title: 'Penyakit Virus pada Ikan Kerapu',
      image: virusDetailImg,
      description: `Ikan kerapu (Epinephelus spp.) rentan terhadap penyakit bakteri yang dapat menyebabkan kerugian signifikan dalam budidaya.`,
      details: {
        penyebab: [
          'Virus Lymphocystis Disease (LCD)',
          'Viral Nervous Necrosis (VNN)',
          'Infectious Pancreatic Necrosis Virus (IPNV)',
          'Herpesvirus pada ikan kerapu',
          'Lingkungan budidaya yang tidak terkontrol',
          'Transfer virus antar ikan melalui kontak langsung',
        ],
        gejala: [
          'Pembengkakan dan pertumbuhan benjolan putih di kulit',
          'Gangguan sistem saraf (gerakan tidak beraturan)',
          'Perubahan warna tubuh menjadi pucat',
          'Luka terbuka atau lecet pada permukaan tubuh',
          'Pendarahan di sekitar sirip dan ekor',
          'Kehilangan nafsu makan',
          'Tingkat kematian yang tinggi',
          'Pertumbuhan terhambat',
        ],
        pencegahan: [
          'Karantina ketat untuk ikan baru',
          'Menjaga kualitas air optimal',
          'Kontrol suhu dan pH air',
          'Pemberian pakan bernutrisi tinggi',
          'Mengurangi kepadatan ikan dalam budidaya',
          'Sterilisasi peralatan budidaya',
          'Vaksinasi berkala',
          'Penggunaan probiotik untuk meningkatkan sistem imun',
        ],
        pengobatan: [
          'Tidak ada pengobatan definitif untuk virus',
          'Manajemen gejala dan pencegahan penyebaran',
          'Isolasi ikan terinfeksi',
          'Pemberian vitamin dan suplemen penguat imun',
          'Terapi supportif untuk mengurangi stres',
          'Penggunaan imunostimulan',
          'Penanganan lingkungan budidaya',
        ],
      },
      recommendations: [
        {
          title: 'Produk Rekomendasi Penanganan',
          items: ['Vaksin Virus Khusus Ikan Kerapu', 'Imunostimulan Herbal', 'Probiotik Penguat Sistem Imun', 'Vitamin Multikomponen', 'Suplemen Mineral Tambahan'],
        },
      ],
    },
    4: {
      title: 'Penyakit Parasit pada Ikan Kerapu',
      image: parasitDetailImg,
      description: `Infestasi parasit merupakan ancaman serius dalam budidaya ikan kerapu, dapat memengaruhi kesehatan, pertumbuhan, dan produktivitas ikan secara signifikan.`,
      details: {
        penyebab: [
          'Protozoa Cryptocaryon irritans',
          'Trichodina sp.',
          'Ichthyophthirius multifiliis (White Spot)',
          'Gyrodactylus sp.',
          'Dactylogyrus sp.',
          'Lingkungan budidaya yang tidak terkontrol',
          'Kualitas air buruk',
          'Sistem pertahanan tubuh ikan lemah',
        ],
        gejala: [
          'Munculnya bintik-bintik putih pada permukaan tubuh',
          'Lapisan lendir berlebih di permukaan tubuh',
          'Gerak renang tidak normal',
          'Menggesek-gesekkan tubuh ke dinding atau dasar kolam',
          'Nafsu makan menurun drastis',
          'Sirip rusak atau aus',
          'Perubahan warna tubuh menjadi pucat',
          'Pernafasan terganggu',
          'Luka terbuka pada permukaan tubuh',
        ],
        pencegahan: [
          'Menjaga kualitas air optimal',
          'Kontrol suhu dan pH air secara berkala',
          'Karantina ikan baru sebelum dimasukkan ke kolam utama',
          'Pemberian pakan bernutrisi tinggi',
          'Sterilisasi peralatan budidaya',
          'Penggunaan probiotik',
          'Kontrol kepadatan ikan',
          'Pembersihan berkala media budidaya',
        ],
        pengobatan: [
          'Penggunaan obat anti-parasit spesifik',
          'Perendaman dalam larutan garam',
          'Terapi suhu air',
          'Pemberian obat herbal anti-parasit',
          'Penggunaan formalin dengan dosis tepat',
          'Perlakuan copper sulfate',
          'Pembersihan total media budidaya',
          'Terapi supportif untuk pemulihan',
        ],
      },
      recommendations: [
        {
          title: 'Produk Rekomendasi Pengobatan',
          items: ['Obat Anti-Parasit Khusus Ikan', 'Formalin Terstandar', 'Garam Mineral Khusus', 'Larutan Copper Sulfate', 'Probiotik Penguat Imun'],
        },
      ],
    },
    5: {
      title: 'Penyakit Nutrisi pada Ikan Kerapu',
      image: nutrisiDetailImg,
      description: `Gangguan nutrisi merupakan faktor kritis yang memengaruhi kesehatan, pertumbuhan, dan produktivitas ikan kerapu dalam budidaya.`,
      details: {
        penyebab: [
          'Ketidakseimbangan gizi dalam pakan',
          'Kualitas pakan rendah',
          'Kurangnya protein dalam pakan',
          'Defisiensi vitamin dan mineral',
          'Sistem pencernaan yang terganggu',
          'Pakan tidak sesuai fase pertumbuhan',
          'Kontaminasi pakan',
        ],
        gejala: [
          'Pertumbuhan terhambat/lambat',
          'Warna tubuh pucat atau tidak cerah',
          'Bentuk tubuh tidak proposional',
          'Kelemahan sistem imun',
          'Nafsu makan menurun',
          'Deformitas pada tulang/rangka',
          'Tingkat kematian meningkat',
          'Reproduksi terganggu',
          'Lemah dan mudah terserang penyakit',
        ],
        pencegahan: [
          'Gunakan pakan berkualitas tinggi',
          'Sesuaikan komposisi nutrisi dengan fase pertumbuhan',
          'Berikan pakan dengan protein optimal',
          'Tambahkan vitamin dan mineral lengkap',
          'Kontrol kualitas pakan secara berkala',
          'Variasikan jenis pakan',
          'Hindari pemberian pakan berlebih',
          'Pantau kondisi kesehatan ikan',
        ],
        pengobatan: [
          'Perbaiki komposisi pakan',
          'Berikan suplemen nutrisi',
          'Gunakan pakan terapi',
          'Tambahkan vitamin dan mineral',
          'Lakukan terapi nutrisi intensif',
          'Kurangi stres pada ikan',
          'Perbaiki kualitas air',
          'Berikan probiotik pendukung',
        ],
      },
      recommendations: [
        {
          title: 'Produk Rekomendasi',
          items: ['Pakan Khusus Ikan Kerapu', 'Suplemen Vitamin Ikan', 'Mineral Tambahan', 'Probiotik Pencernaan', 'Penguat Sistem Imun'],
        },
      ],
    },
  };

  const penyakit = penyakitDetails[id] || {
    title: 'Detail Tidak Ditemukan',
    image: 'https://via.placeholder.com/800x400',
    description: 'Maaf, informasi detail tidak tersedia.',
    details: {},
  };

  const handleKembali = () => {
    navigate('/layanan');
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* <Navbar
        // Ubah prop untuk mendukung kondisi login
        buttonName={isLoggedIn ? "Keluar" : "Masuk"} // Mengubah nama tombol berdasarkan status login
        // useIcon={isLoggedIn} // Gunakan icon jika sudah login
        // icon={isLoggedIn ? <FiUserCheck size={24} /> : null}
        // Tambahkan prop untuk status login
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout} // Pastikan fungsi logout dipanggil saat tombol diklik
      /> */}

      <div className="flex-grow container mx-auto px-4 py-12">
        {/* Judul Utama */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">{penyakit.title}</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Gambar Header */}
          <div className="relative h-64 md:h-96 w-full">
            <img src={penyakit.image} alt={penyakit.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          {/* Konten Utama */}
          <div className="p-6 md:p-12">
            {/* Grid Detail Penyakit */}
            <div className="grid md:grid-cols-2 gap-6">
              {penyakit.details &&
                Object.entries(penyakit.details).map(([heading, content], index) => {
                  // Daftar warna untuk setiap card
                  const cardColors = [
                    'bg-red-100 border-red-300',
                    'bg-blue-100 border-blue-300',
                    'bg-yellow-100 border-yellow-300',
                    'bg-green-100 border-green-300',
                  ];

                  // Pilih warna berdasarkan index
                  const cardColor = cardColors[index % cardColors.length];

                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-lg shadow-md border ${cardColor} hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-4">
                          {heading === 'penyebab' ? '🦠' : heading === 'gejala' ? '🩺' : heading === 'pencegahan' ? '🛡️' : '💊'}
                        </span>
                        <h2 className="text-lg font-bold capitalize">{heading}</h2>
                      </div>
                      <ul className="list-disc ml-5 text-gray-700">
                        {Array.isArray(content) &&
                          content.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </div>
                  );
                })}
            </div>

            {/* Rekomendasi Produk */}
            {penyakit.recommendations && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-center mb-6">
                  {penyakit.recommendations[0].title}
                </h3>
                <div className="flex justify-center space-x-4 flex-wrap gap-4">
                  {penyakit.recommendations[0].items.map((item, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                      {/* Button with integrated dropdown */}
                      <div className="relative">
                        <button 
                          className="bg-blue-100 px-6 py-3 rounded-full text-blue-800 
                                    shadow-md hover:bg-blue-200 
                                    transition-all duration-300 
                                    flex items-center"
                        >
                          {item}
                        </button>
                        
                        <div 
                          className="absolute z-10 bg-blue-100 px-4 py-2 rounded 
                                    shadow-md opacity-0 invisible 
                                    group-hover:opacity-100 group-hover:visible
                                    transition-all duration-300 
                                    text-sm mt-2 left-0 right-0 top-full"
                        >
                          <p className="text-blue-700">
                            Informasi detail tentang {item}. Anda dapat menjelaskan 
                            aspek spesifik dari item ini, seperti manfaat, fitur, 
                            atau tips penggunaan.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tombol Kembali */}
            <div className="text-center mt-16">
              <button
                onClick={handleKembali}
                className="
                  bg-blue-500 
                  text-white 
                  px-8 
                  py-3 
                  rounded-lg 
                  hover:bg-blue-600 
                  transition 
                  duration-300 
                  shadow-md
                  flex 
                  items-center 
                  justify-center 
                  mx-auto
                  gap-2
                "
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Kembali ke Layanan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
