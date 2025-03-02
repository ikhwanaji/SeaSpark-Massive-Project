import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Footer from '../Components/Footer';
import { IoTrashBinOutline } from 'react-icons/io5';

const CartPage = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const [shippingMethod, setShippingMethod] = useState('reguler');

  const subtotal = cartItems.reduce((acc, item) => acc + item.harga * item.quantity, 0);

  const calculateShipping = () => {
    switch (shippingMethod) {
      case 'express':
        return 20000;
      case 'reguler':
        return 12000;
      case 'ekonomi':
        return 8000;
      default:
        return 0;
    }
  };

  const shipping = calculateShipping();
  const total = subtotal + shipping;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const infoLinks = [
    { text: 'Beranda', path: '/beranda-pengguna' },
    { text: 'Layanan', path: '/layanan' },
    { text: 'Produk', path: '/produk' },
    { text: 'Tentang Kami', path: '/tentang-kami' },
    { text: 'Kontak', path: '/kontak' },
  ];

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />
        <div className="max-w-5xl mx-auto p-4 min-h-screen flex flex-col bg-blue-50">
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-500 text-center">
              Keranjang Anda Masih Kosong
            </h1>
          </div>
        </div>
        <Footer infoLinks={infoLinks} />
      </>
    );
  }

  return (
    <>
      <Navbar buttonName={isLoggedIn ? 'Keluar' : 'Masuk'} isLoggedIn={isLoggedIn} user={user} onLogout={logout} />
      <div className="max-w-5xl mx-auto p-4 min-h-screen flex flex-col ">
        <h1 className="text-2xl font-semibold mt-20 mb-6 text-gray-700">Keranjang Belanja ({cartItems.length} item)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <div className="col-span-1 lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.produkId} className="flex flex-col sm:flex-row justify-between items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                  <img src={item.gambar} alt={item.nama} className="w-20 h-20 object-contain rounded-lg" />
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">{item.nama}</h2>
                    <p className="text-sm text-gray-500 mb-2">{item.kategori}</p>
                  </div>
                </div>
                
                <div className="w-full sm:w-auto flex sm:items-center justify-between gap-4">
                  <p className="font-semibold text-gray-800">Rp {formatCurrency(item.harga * item.quantity)}</p>
                  <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
                    <button 
                      onClick={() => item.quantity > 1 && updateCartItemQuantity(item.produkId, item.quantity - 1)} 
                      className="text-gray-600 hover:text-blue-600 text-lg font-bold"
                    >-</button>
                    <span className="text-gray-700 w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartItemQuantity(item.produkId, item.quantity + 1)} 
                      className="text-gray-600 hover:text-blue-600 text-lg font-bold"
                    >+</button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.produkId)} 
                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <IoTrashBinOutline className="text-base" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-1 p-6 bg-white rounded-xl shadow-sm h-fit sticky top-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Ringkasan Pesanan</h2>
            <ul className="mb-4 text-gray-700">
              {cartItems.map((item) => (
                <li key={item.produkId} className="text-sm mb-1">{item.nama} x {item.quantity}</li>
              ))}
            </ul>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rp {formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Pengiriman</span>
                <select 
                  value={shippingMethod} 
                  onChange={(e) => setShippingMethod(e.target.value)} 
                  className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="express">Express (Rp 20.000)</option>
                  <option value="reguler">Reguler (Rp 12.000)</option>
                  <option value="ekonomi">Ekonomi (Rp 8.000)</option>
                </select>
              </div>
            </div>

            <hr className="my-4 border-t border-gray-200" />
            <div className="flex justify-between font-semibold text-lg text-gray-800 mb-6">
              <span>Total</span>
              <span>Rp {formatCurrency(total)}</span>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
              Lanjut ke Pembayaran
            </button>
          </div>
        </div>
      </div>
      <Footer infoLinks={infoLinks} />
    </>
  );
};

export default CartPage;
