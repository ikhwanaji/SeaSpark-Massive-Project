import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.produkId === product.produkId);
      if (existingItem) {
        return prevItems.map((item) => (item.produkId === product.produkId ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.produkId !== productId));
  };

  // **Fungsi updateCartItemQuantity untuk menambah/mengurangi jumlah barang**
  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.produkId === productId ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
