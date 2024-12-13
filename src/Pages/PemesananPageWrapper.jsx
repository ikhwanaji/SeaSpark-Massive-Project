// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import PemesananPage from './PemesananPage';
// import FormPemesanan from '../Components/formpemesanan';


// const PemesananPageWrapper = () => {
//   const { produkId } = useParams();
//   const [produk, setProduk] = useState(null);

//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProdukDetail = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/produks/${produkId}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           }
//         );

//         setProduk(response.data.produk);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching produk:', error);
//         setError(error.response?.data?.message || 'Gagal memuat produk');
//         setLoading(false);
        
//         Swal.fire({
//           icon: 'error',
//           title: 'Kesalahan',
//           text: error.response?.data?.message || 'Tidak dapat memuat detail produk'
//         });
//       }
//     };

//     fetchProdukDetail();
//   }, [produkId]);

 

//   // State error
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-500">
//             {error}
//           </h2>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Muat Ulang
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Jika produk tidak ditemukan
//   if (!produk) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold">Produk Tidak Ditemukan</h2>
//           <p className="text-gray-600 mt-2">Maaf, produk yang Anda cari tidak tersedia.</p>
//         </div>
//       </div>
//     );
//   }

//   // Render PemesananPage dengan data produk
//   return <FormPemesanan produk={produk} />;
// };

// export default PemesananPageWrapper;