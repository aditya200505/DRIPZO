import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { setDynamicProducts } from '../data/productData';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('dripzo_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000/api' : 'https://dripzo-backend.onrender.com/api');
        const { data } = await axios.get(`${API_BASE}/products`);
        if (data.success && data.products) {
          setDynamicProducts(data.products);
          setProductsLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load products from database, falling back to static product data:', error.message);
      }
    };
    fetchProducts();
  }, []);

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('dripzo_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [viewedProducts, setViewedProducts] = useState(() => {
    const saved = localStorage.getItem('dripzo_viewed');
    return saved ? JSON.parse(saved) : [];
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    localStorage.setItem('dripzo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dripzo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('dripzo_viewed', JSON.stringify(viewedProducts));
  }, [viewedProducts]);

  const showToast = React.useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  }, []);

  const addToCart = React.useCallback((product, size = 'M', color = product.colors?.[0] || 'Default', quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size && item.color === color);
      if (existing) {
        showToast('Quantity updated in cart!', 'success');
        return prev.map(item => 
          item.id === product.id && item.size === size && item.color === color 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      showToast('Added to cart!', 'success');
      return [...prev, { ...product, size, color, quantity, cartId: Date.now() + Math.random() }];
    });
  }, [showToast]);

  const removeFromCart = React.useCallback((cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
    showToast('Removed from cart', 'info');
  }, [showToast]);

  const updateQuantity = React.useCallback((cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQ = item.quantity + delta;
        return { ...item, quantity: newQ > 0 ? newQ : 1 };
      }
      return item;
    }));
  }, []);

  const toggleWishlist = React.useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.some(item => String(item.id) === String(product.id));
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(item => String(item.id) !== String(product.id));
      }
      showToast('Added to wishlist!', 'success');
      return [...prev, product];
    });
  }, [showToast]);

  const isInWishlist = React.useCallback((productId) => {
    return wishlist.some(item => String(item.id) === String(productId));
  }, [wishlist]);

  const addViewedProduct = React.useCallback((product) => {
    if (!product) return;
    setViewedProducts(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 12);
    });
  }, []);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Arrival!', message: 'The Midnight Obsidian Jacket is now back in stock.', time: '2h ago', icon: '🔥', read: false, link: '/product/1' },
    { id: 2, title: 'Price Drop', message: 'An item in your wishlist has a price drop.', time: '5h ago', icon: '💰', read: false, link: '/dashboard?tab=wishlist' },
    { id: 3, title: 'App Update', message: 'We have added new luxury items to our collection.', time: '1d ago', icon: '✨', read: true, link: '/collections?category=Luxury' },
  ]);

  const markAllNotificationsAsRead = React.useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'success');
  }, [showToast]);

  const markNotificationAsRead = React.useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const clearCart = React.useCallback(() => {
    setCart([]);
    localStorage.removeItem('dripzo_cart');
  }, []);

  return (
    <ShopContext.Provider value={{
      cart, wishlist, viewedProducts, toast, notifications, productsLoaded,
      addToCart, removeFromCart, updateQuantity, 
      toggleWishlist, isInWishlist, addViewedProduct, showToast,
      markAllNotificationsAsRead, markNotificationAsRead, clearCart
    }}>
      {children}
    </ShopContext.Provider>
  );
};
