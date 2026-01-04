import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar'; // Pastikan path ini benar

// Gambar fallback jika gambar dari backend tidak ada
import bakteriDetailImg from '../Assets/img/bakteridetail.png';
import jamurDetailImg from '../Assets/img/jamurdetail.png';
import virusDetailImg from '../Assets/img/virusdetail.png';
import parasitDetailImg from '../Assets/img/parasitdetail.png';
import nutrisiDetailImg from '../Assets/img/nutrisidetail.png';

// Helper function untuk mem-parsing string JSON dengan aman
const parseJsonString = (str) => {
  if (!str || typeof str !== 'string') {
    return [];
  }
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    // Jika gagal parse, coba split dengan koma sebagai fallback
    return str.split(',').map(item => item.trim());
  }
};

// Fungsi untuk mendapatkan data rekomendasi/penanganan manual berdasarkan kategori
const getPenangananData = (category) => {
    const lowerCategory = category ? category.toLowerCase() : '';
    switch (lowerCategory) {
        case 'bakteri':
            return {
                title: "Produk Rekomendasi (Bakteri)",
                items: ["Antibiotik Oxytetracycline khusus ikan", "Probiotik Bacillus subtilis", "Suplemen Vitamin C dan E", "Desinfektan kolam ramah lingkungan", "Imunostimulan alami berbahan herbal"],
            };
        case 'jamur':
            return {
                title: "Produk Rekomendasi (Jamur)",
                items: ["Methylene Blue Antiseptik", "Obat Antijamur Herbal", "Probiotik Lactobacillus", "Garam Mineral Khusus", "Vitamin Peningkat Imun"],
            };
        case 'virus':
            return {
                title: "Produk Rekomendasi Penanganan (Virus)",
                items: ["Vaksin VNN (jika tersedia)", "Imunostimulan Beta-glukan", "Vitamin C dosis tinggi", "Ekstrak herbal Echinacea", "Kit deteksi cepat virus"],
            };
        case 'parasit':
            return {
                title: "Produk Rekomendasi Pengobatan (Parasit)",
                items: ["Formalin 37% grade akuakultur", "Praziquantel murni", "Copper sulfate kristal", "Hydrogen peroxide 35%", "Kit pemeriksaan parasit"],
            };
        case 'nutrisi':
             return {
                title: "Produk Rekomendasi (Nutrisi)",
                items: ["Pakan Premium (Protein 50%)", "Kompleks Vitamin Premix", "Suplemen Mineral Esensial", "Vitamin C (Stay-C)", "Asam Lemak Esensial (HUFA)"],
            };
        default:
            return {
                title: "Produk Rekomendasi Umum",
                items: ["Vitamin C", "Probiotik Ikan", "Garam Ikan", "Pakan Berkualitas Tinggi"],
            };
    }
};

// Fungsi untuk mendapatkan data FAQ berdasarkan kategori
const getFaqData = (category, title) => {
    const lowerCategory = category ? category.toLowerCase() : '';
    const defaultTitle = title || "penyakit ini";

    const faqs = {
        bakteri: [
            { question: `Bagaimana cara membedakan infeksi bakteri dengan penyakit lainnya?`, answer: `Infeksi bakteri biasanya ditandai dengan luka bernanah, pendarahan, dan pembengkakan. Berbeda dengan jamur yang menunjukkan pertumbuhan seperti kapas, bakteri lebih sering menyebabkan kerusakan jaringan.` },
            { question: `Berapa lama waktu pemulihan dari ${defaultTitle.toLowerCase()}?`, answer: `Dengan pengobatan antibiotik yang tepat, perbaikan biasanya terlihat dalam 3-5 hari, dan pemulihan lengkap dalam 1-2 minggu.` },
            { question: `Apakah penyakit ini dapat menular ke manusia?`, answer: `Beberapa bakteri seperti Mycobacterium dan Vibrio dapat menginfeksi manusia melalui luka terbuka. Selalu gunakan sarung tangan.` }
        ],
        jamur: [
            { question: `Bagaimana cara membedakan infeksi jamur dengan penyakit lainnya?`, answer: `Infeksi jamur paling mudah dikenali dari adanya pertumbuhan seperti kapas berwarna putih keabu-abuan pada permukaan tubuh ikan.` },
            { question: `Berapa lama waktu pemulihan dari ${defaultTitle.toLowerCase()}?`, answer: `Infeksi jamur ringan hingga sedang dapat pulih dalam 7-14 hari dengan pengobatan yang tepat.` },
            { question: `Apakah penyakit ini dapat menular ke manusia?`, answer: `Sebagian besar jamur ikan tidak menular ke manusia, namun kebersihan tetap penting.` }
        ],
        virus: [
            { question: `Bagaimana cara membedakan infeksi virus dengan penyakit lainnya?`, answer: `Infeksi virus sering ditandai dengan gejala neurologis seperti berenang tidak beraturan (spiral) dan kematian massal dalam waktu singkat tanpa tanda eksternal yang jelas.` },
            { question: `Berapa lama waktu pemulihan dari ${defaultTitle.toLowerCase()}?`, answer: `Tidak ada pengobatan spesifik untuk virus. Pemulihan tergantung pada sistem imun ikan dan bisa memakan waktu 3-6 minggu.` },
            { question: `Apakah penyakit ini dapat menular ke manusia?`, answer: `Virus ikan tidak menular ke manusia karena perbedaan suhu tubuh dan reseptor sel.` }
        ],
        parasit: [
            { question: `Bagaimana cara membedakan infestasi parasit dengan penyakit lainnya?`, answer: `Parasit eksternal sering terlihat menempel pada tubuh ikan, dan ikan sering menggesekkan tubuhnya (flashing). Bintik putih adalah gejala umum untuk beberapa jenis parasit.` },
            { question: `Berapa lama waktu pemulihan dari ${defaultTitle.toLowerCase()}?`, answer: `Pengobatan parasit eksternal biasanya efektif dalam 3-7 hari, tergantung jenis parasit dan metode pengobatan.` },
            { question: `Apakah penyakit ini dapat menular ke manusia?`, answer: `Parasit ikan umumnya spesifik inang dan tidak menginfeksi manusia. Namun, beberapa cacing bisa berbahaya jika ikan dimakan mentah.` }
        ],
        nutrisi: [
            { question: `Bagaimana cara mengenali masalah nutrisi?`, answer: `Masalah nutrisi umumnya terlihat dari pertumbuhan yang terhambat, deformitas tulang, dan warna tubuh yang tidak normal. Ini berkembang perlahan dan jarang menyebabkan kematian mendadak.` },
            { question: `Berapa lama waktu pemulihan dari masalah nutrisi?`, answer: `Pemulihan dari masalah nutrisi membutuhkan waktu lebih lama, biasanya 2-8 minggu setelah pakan diperbaiki.` },
            { question: `Apakah masalah nutrisi menular?`, answer: `Tidak, masalah nutrisi tidak menular ke ikan lain atau manusia.` }
        ]
    };

    const commonQuestion = {
        question: `Bagaimana cara mencegah kambuhnya ${defaultTitle.toLowerCase()} setelah pengobatan?`,
        answer: `Untuk pencegahan, lakukan perbaikan kualitas air secara konsisten, pertahankan biosekuriti yang ketat, berikan pakan berkualitas, kurangi kepadatan, dan lakukan monitoring kesehatan ikan secara berkala.`
    };

    const categoryFaqs = faqs[lowerCategory] || faqs.bakteri; // Default to bakteri if not found
    return [...categoryFaqs, commonQuestion];
};

// Data untuk infografis dan statistik sidebar
const statsData = {
    bakteri: { 
        keparahan: { label: 'Sedang', width: 'w-2/3', color: 'bg-yellow-500' }, 
        prevalensi: { label: 'Sangat Umum', width: 'w-5/6', color: 'bg-blue-500' },
        kesulitan: { label: 'Sedang', width: 'w-2/3', color: 'bg-yellow-500' },
        penularan: { label: 'Sedang', width: 'w-3/5', color: 'bg-yellow-500' },
        kematian: { label: 'Tinggi', width: 'w-4/5', color: 'bg-red-500' },
        peringatan: { level: 'Perhatian Khusus', icon: '⚡', color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-800', text: 'Infeksi bakteri dapat berkembang cepat dan membutuhkan penanganan tepat waktu untuk mencegah penyebaran.' }
    },
    jamur: { 
        keparahan: { label: 'Ringan', width: 'w-1/2', color: 'bg-green-500' }, 
        prevalensi: { label: 'Sedang', width: 'w-3/5', color: 'bg-blue-500' },
        kesulitan: { label: 'Rendah', width: 'w-1/2', color: 'bg-green-500' },
        penularan: { label: 'Rendah', width: 'w-2/5', color: 'bg-green-500' },
        kematian: { label: 'Rendah', width: 'w-2/5', color: 'bg-green-500' },
        peringatan: { level: 'Informasi Penting', icon: 'ℹ️', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-800', text: 'Infeksi jamur sering menjadi indikator kondisi lingkungan yang buruk dan perlu perbaikan.' }
    },
    virus: { 
        keparahan: { label: 'Sangat Tinggi', width: 'w-11/12', color: 'bg-red-500' }, 
        prevalensi: { label: 'Jarang', width: 'w-2/5', color: 'bg-blue-500' },
        kesulitan: { label: 'Sangat Tinggi', width: 'w-11/12', color: 'bg-red-500' },
        penularan: { label: 'Tinggi', width: 'w-5/6', color: 'bg-red-500' },
        kematian: { label: 'Sangat Tinggi', width: 'w-11/12', color: 'bg-red-500' },
        peringatan: { level: 'Penyakit Berbahaya!', icon: '⚠️', color: 'bg-red-50 border-red-200', textColor: 'text-red-800', text: 'Penyakit ini memiliki tingkat kematian tinggi dan penularan cepat. Tindakan segera diperlukan saat terdeteksi!' }
    },
    parasit: { 
        keparahan: { label: 'Tinggi', width: 'w-3/4', color: 'bg-orange-500' }, 
        prevalensi: { label: 'Umum', width: 'w-4/5', color: 'bg-blue-500' },
        kesulitan: { label: 'Tinggi', width: 'w-3/4', color: 'bg-orange-500' },
        penularan: { label: 'Tinggi', width: 'w-4/5', color: 'bg-red-500' },
        kematian: { label: 'Sedang', width: 'w-3/5', color: 'bg-yellow-500' },
        peringatan: { level: 'Perhatian Khusus', icon: '⚡', color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-800', text: 'Parasit dapat menyebar dengan cepat ke seluruh populasi ikan jika tidak segera ditangani.' }
    },
    nutrisi: { 
        keparahan: { label: 'Ringan', width: 'w-1/2', color: 'bg-green-500' }, 
        prevalensi: { label: 'Sangat Jarang', width: 'w-1/3', color: 'bg-blue-500' },
        kesulitan: { label: 'Rendah', width: 'w-1/3', color: 'bg-green-500' },
        penularan: { label: 'Tidak Menular', width: 'w-0', color: 'bg-gray-500' },
        kematian: { label: 'Rendah', width: 'w-1/4', color: 'bg-green-500' },
        peringatan: { level: 'Informasi Penting', icon: 'ℹ️', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-800', text: 'Defisiensi nutrisi bisa menjadi gejala dari masalah manajemen pakan yang perlu dikoreksi.' }
    },
};

// Fungsi untuk mendapatkan ID video YouTube dari URL
const getYoutubeVideoId = (url) => {
    if (!url) return null;
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.slice(1);
        }
        if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
            return urlObj.searchParams.get('v');
        }
    } catch (e) {
        console.error("Invalid URL for YouTube video");
        return null;
    }
    return null;
};

// Tautan video tutorial
const videoLinks = {
    bakteri: 'https://youtu.be/UsuTZeUJME0?si=dUkdnnrgfhtb6Ife',
    jamur: 'https://youtu.be/3nWvIDw1dhk?si=TT_i1ao6_Bv56B_l',
    virus: 'https://youtu.be/n47J4yjXw6k?si=aEyFcgUdvdb_Ctq4',
    parasit: 'https://youtu.be/DiiZJiN582A?si=AhVjNpqrQ53cN5C9',
    nutrisi: 'https://youtu.be/B7f7kEeJY9U?si=3JN3B8HhL8r_LAHP',
};

// Tautan Jurnal/Buku
const pdfLinks = {
    bakteri: 'https://ejurnal.undana.ac.id/index.php/JBP/article/view/5950/3294',
    jamur: 'https://www.seafdec.org.ph/wp-content/uploads/2012/11/Diseases-of-Cultured-Groupers_complete.pdf',
    virus: 'https://ejournal3.undip.ac.id/index.php/jamt/article/view/652/652',
    parasit: 'https://ejournal-balitbang.kkp.go.id/index.php/btla/article/view/7313/5933',
    nutrisi: 'https://ejurnal.ung.ac.id/index.php/nike/article/view/21061/6879',
};


const EnsiklopediaIkanKerapu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [penyakit, setPenyakit] = useState(null);
  const [allPenyakit, setAllPenyakit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showVideo, setShowVideo] = useState(false);

  const fallbackImages = {
    bakteri: bakteriDetailImg, jamur: jamurDetailImg, virus: virusDetailImg, parasit: parasitDetailImg, nutrisi: nutrisiDetailImg,
  };

  useEffect(() => {
    const fetchPenyakitDetail = async () => {
      try {
        setLoading(true);
        setShowVideo(false); // Sembunyikan video saat data baru dimuat
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/penyakit/getById/${id}`);
        setPenyakit(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching penyakit detail:', err);
        setError('Gagal memuat detail penyakit. Mungkin data tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPenyakitDetail();
  }, [id]);

  useEffect(() => {
    const fetchAllPenyakit = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/penyakit/getallPenyakit`);
        setAllPenyakit(response.data);
      } catch (err) {
        console.error('Error fetching all penyakit data:', err);
      }
    };
    fetchAllPenyakit();
  }, []);

  const handleKembali = () => navigate('/layanan');
  const navigateToPenyakit = (penyakitId) => {
    navigate(`/layanan/detail/${penyakitId}`);
    setActiveTab('overview');
  };
  
  const getImageUrl = (data) => {
    if (data && data.gambar) {
      return `${import.meta.env.VITE_BACKEND_URL}/penyakit/images/${data.gambar}`;
    }
    return fallbackImages[data?.kategori?.toLowerCase()] || bakteriDetailImg;
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Memuat data...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-500">{error}</div>;
  if (!penyakit) return <div className="flex justify-center items-center h-screen text-xl">Detail penyakit tidak ditemukan.</div>;
  
  const { nama, kategori, deskripsi, penyebab, gejala, pencegahan, pengobatan, referensi, info_tambahan } = penyakit;
  const fullTitle = `Penyakit ${kategori}: ${nama}`;
  const penangananData = getPenangananData(kategori);
  const faqData = getFaqData(kategori, `Penyakit ${nama}`);
  const currentStats = statsData[kategori.toLowerCase()] || statsData.bakteri;
  const videoId = getYoutubeVideoId(videoLinks[kategori.toLowerCase()]);
  const pdfLink = pdfLinks[kategori.toLowerCase()] || '#';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Deskripsi</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{deskripsi}</p>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                <img src={getImageUrl(penyakit)} alt={fullTitle} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm">Ilustrasi {fullTitle}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-bold flex items-center mb-3">
                  <span className="text-2xl mr-2">⚠️</span> Tingkat Keparahan
                </h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className={`h-4 rounded-full ${currentStats.keparahan.color} ${currentStats.keparahan.width}`}></div>
                  </div>
                  <span className="ml-3 font-medium">{currentStats.keparahan.label}</span>
                </div>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold flex items-center mb-3">
                  <span className="text-2xl mr-2">🔍</span> Prevalensi
                </h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className={`h-4 rounded-full ${currentStats.prevalensi.color} ${currentStats.prevalensi.width}`}></div>
                  </div>
                  <span className="ml-3 font-medium">{currentStats.prevalensi.label}</span>
                </div>
              </div>
            </div>
            
            {info_tambahan && (
              <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200 mb-6">
                <h3 className="text-lg font-bold flex items-center mb-3"><span className="text-2xl mr-2">💡</span> Info Tambahan</h3>
                <p className="text-gray-700">{info_tambahan}</p>
              </div>
            )}

            {referensi && (
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold flex items-center mb-2"><span className="text-2xl mr-2">📚</span> Referensi</h3>
                <p className="text-gray-600 text-sm italic">{referensi}</p>
              </div>
            )}
          </div>
        );
      case 'details':
        const detailsData = { penyebab: parseJsonString(penyebab), gejala: parseJsonString(gejala), pencegahan: parseJsonString(pencegahan), pengobatan: parseJsonString(pengobatan) };
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Detail Penyakit</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(detailsData).map(([heading, content], index) => {
                  const cardColors = ['bg-red-100 border-red-300', 'bg-blue-100 border-blue-300', 'bg-yellow-100 border-yellow-300', 'bg-green-100 border-green-300'];
                  const icons = { penyebab: '🦠', gejala: '🩺', pencegahan: '🛡️', pengobatan: '💊' };
                  return (
                    <div key={heading} className={`p-6 rounded-lg shadow-md border ${cardColors[index % 4]} hover:shadow-lg transition-all duration-300`}>
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-4">{icons[heading] || '📋'}</span>
                        <h2 className="text-lg font-bold capitalize">{heading}</h2>
                      </div>
                      <ul className="list-disc ml-5 text-gray-700 space-y-2">
                        {content.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      case 'penanganan':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Rekomendasi Penanganan</h2>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-center mb-6">{penangananData.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {penangananData.items.map((item, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start">
                      <div className="text-2xl mr-3">{['💊', '🧪', '🌿', '🔬', '📦'][index % 5]}</div>
                      <div>
                        <h4 className="font-semibold mb-2">{item}</h4>
                        <p className="text-sm text-gray-600">{['Produk utama.', 'Mendukung pemulihan.', 'Alternatif alami.', 'Produk pendukung.', 'Manajemen.'][index % 5]}</p>
                        <button onClick={() => navigate('/produk/produk-satuan')} className="mt-3 text-blue-600 text-sm font-medium hover:underline">Cari di Toko</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panduan Penerapan, Video, dan PDF */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-bold text-lg flex items-center mb-4">
                    <span className="text-2xl mr-2">📝</span> Panduan Penerapan
                </h4>
                <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                    <li>Identifikasi jenis penyakit dengan teliti sebelum menerapkan pengobatan</li>
                    <li>Mulai dengan dosis rendah dan tingkatkan secara bertahap jika diperlukan</li>
                    <li>Perhatikan respons ikan terhadap pengobatan dalam 24-48 jam pertama</li>
                    <li>Kombinasikan pengobatan dengan perbaikan kualitas lingkungan</li>
                    <li>Konsultasikan dengan ahli perikanan untuk kasus yang parah</li>
                </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-purple-50 p-5 rounded-lg border border-purple-200 flex flex-col h-full">
                <div>
                  <h3 className="text-lg font-bold flex items-center mb-4">
                    <span className="text-2xl mr-2">🎬</span> Video Tutorial
                  </h3>
                  {showVideo && videoId ? (
                      <div className="aspect-w-16 aspect-h-9">
                          <iframe
                              className="w-full h-full rounded-lg"
                              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                          ></iframe>
                      </div>
                  ) : (
                      <div className="bg-purple-100 h-40 rounded flex items-center justify-center">
                          <div className="text-center">
                              <div className="text-3xl mb-2">▶️</div>
                              <p className="text-purple-800">Tutorial Penanganan {fullTitle}</p>
                          </div>
                      </div>
                  )}
                </div>
                {!showVideo && (
                  <div className="mt-auto pt-4">
                    <button onClick={() => setShowVideo(true)} className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">Putar Video</button>
                  </div>
                )}
              </div>

              <div className="bg-teal-50 p-5 rounded-lg border border-teal-200 flex flex-col h-full">
                <div>
                  <h3 className="text-lg font-bold flex items-center mb-4">
                    <span className="text-2xl mr-2">📄</span> Jurnal Terkait
                  </h3>
                  <p className="text-gray-700">Baca jurnal atau buku referensi untuk panduan yang lebih mendalam.</p>
                </div>
                <div className="mt-auto pt-4">
                  <button onClick={() => window.open(pdfLink, '_blank')} className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    Baca Jurnal/Buku
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'faq':
          return (
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-center">Pertanyaan Umum</h2>
                  <div className="space-y-4">
                      {faqData.map((faq, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                              <div className="bg-gray-50 p-4 font-medium">
                                  <div className="flex items-start">
                                      <span className="text-blue-600 mr-2">Q:</span>
                                      <p>{faq.question}</p>
                                  </div>
                              </div>
                              <div className="p-4">
                                  <div className="flex items-start">
                                      <span className="text-green-600 mr-2">A:</span>
                                      <p className="text-gray-700">{faq.answer}</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          );
      default:
        return null;
    }
  };

  const renderRelatedDiseases = () => {
    const relatedDiseases = allPenyakit.filter(p => p.PenyakitId !== penyakit.PenyakitId).sort(() => 0.5 - Math.random()).slice(0, 2);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-4">
        {relatedDiseases.map((disease) => (
          <div key={disease.PenyakitId} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => navigateToPenyakit(disease.PenyakitId)}>
            <div className="h-32 overflow-hidden"><img src={getImageUrl(disease)} alt={disease.nama} className="w-full h-full object-cover" /></div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">{disease.nama}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{disease.deskripsi}</p>
              <button className="mt-2 text-blue-600 text-sm hover:underline">Lihat detail →</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Ensiklopedia Digital Ikan Kerapu</h1>
              <p className="opacity-90">Kumpulan informasi lengkap tentang penyakit dan penanganannya</p>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-1/3">
              <div className="relative">
                <input type="text" placeholder="Cari penyakit atau gejala..." className="w-full pl-10 pr-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-b border-blue-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <button onClick={handleKembali} className="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
              Daftar Penyakit
            </button>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{fullTitle}</span>
          </div>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-blue-600 text-white p-4"><h2 className="text-xl font-bold">{fullTitle}</h2></div>
              <div className="p-4">
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Kategori</h3>
                  <div className="flex">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${kategori.toLowerCase() === 'bakteri' ? 'bg-red-100 text-red-800' : kategori.toLowerCase() === 'jamur' ? 'bg-green-100 text-green-800' : kategori.toLowerCase() === 'virus' ? 'bg-purple-100 text-purple-800' : kategori.toLowerCase() === 'parasit' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {kategori}
                    </span>
                  </div>
                </div>

                {/* Statistik Penyakit */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Statistik</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span>Tingkat Kesulitan Penanganan</span><span className="font-medium">{currentStats.kesulitan.label}</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${currentStats.kesulitan.color} ${currentStats.kesulitan.width}`}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span>Tingkat Penularan</span><span className="font-medium">{currentStats.penularan.label}</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${currentStats.penularan.color} ${currentStats.penularan.width}`}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span>Tingkat Kematian</span><span className="font-medium">{currentStats.kematian.label}</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${currentStats.kematian.color} ${currentStats.kematian.width}`}></div></div>
                    </div>
                  </div>
                </div>

                {/* Peringatan */}
                <div className="mb-4">
                  <div className={`p-3 rounded-lg ${currentStats.peringatan.color}`}>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{currentStats.peringatan.icon}</span>
                      <span className={`text-sm font-medium ${currentStats.peringatan.textColor}`}>{currentStats.peringatan.level}</span>
                    </div>
                    <p className="text-xs mt-2 text-gray-700">{currentStats.peringatan.text}</p>
                  </div>
                </div>

                 <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Penyakit Terkait</h3>
                  {renderRelatedDiseases()}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="flex border-b border-gray-200">
                {['overview', 'details', 'penanganan', 'faq'].map((tab) => (
                  <button key={tab} className={`flex-1 py-3 px-4 text-center font-medium text-sm transition-colors ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab(tab)}>
                    {tab === 'overview' ? 'Ikhtisar' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnsiklopediaIkanKerapu;
