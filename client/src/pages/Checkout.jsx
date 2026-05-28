import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, Check, ArrowLeft, Delete, Smartphone, X } from 'lucide-react';
import axios from 'axios';

// SVGs for UPI Logos
const GPayLogo = ({ className = "w-10 h-10 object-contain" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="white" />
    <path d="M26.2 18.5H19.5v3.1h4.8c-.2 1-.8 1.8-1.7 2.4l2.6 2c1.5-1.4 2.4-3.5 2.4-6 0-.5 0-1-.1-1.5z" fill="#4285F4"/>
    <path d="M19.5 25.5c2 0 3.7-.7 4.9-1.9l-2.6-2c-.6.4-1.4.7-2.3.7-1.8 0-3.3-1.2-3.8-2.9l-2.7 2.1c1.2 2.4 3.7 4 6.5 4z" fill="#34A853"/>
    <path d="M15.7 19.4c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2l-2.7-2.1c-.6 1.2-.9 2.6-.9 4.1s.3 2.9.9 4.1l2.7-2.1z" fill="#FBBC05"/>
    <path d="M19.5 14.5c1.1 0 2.1.4 2.9 1.1l2.2-2.2C23.2 12.1 21.5 11.5 19.5 11.5c-2.8 0-5.3 1.6-6.5 4l2.7 2.1c.5-1.7 2-3.1 3.8-3.1z" fill="#EA4335"/>
  </svg>
);

const PhonePeLogo = ({ className = "w-10 h-10 object-contain" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="#5F259F" />
    <path d="M27 12H13c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2zm-7 13.5l-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6z" fill="white"/>
  </svg>
);

const PaytmLogo = ({ className = "w-10 h-10 object-contain" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="#002E6E" />
    <text x="5" y="26" fill="#00BAF2" fontSize="12" fontWeight="bold" fontFamily="system-ui">Paytm</text>
  </svg>
);

const MobikwikLogo = ({ className = "w-10 h-10 object-contain" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="#005B9E" />
    <text x="6" y="26" fill="#FF8200" fontSize="13" fontWeight="black" fontFamily="sans-serif">M</text>
    <text x="18" y="26" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">K</text>
  </svg>
);

const BhimLogo = ({ className = "w-10 h-10 object-contain" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="#1C5E55" />
    <text x="8" y="26" fill="white" fontSize="12" fontWeight="bold" fontFamily="monospace">BHIM</text>
  </svg>
);

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart, showToast } = useShop();
  const { currentUser } = useAuth();
  
  const directProduct = location.state?.product;
  const directBuy = location.state?.directBuy;

  const checkoutItems = directBuy && directProduct 
    ? [{ ...directProduct, quantity: 1, size: location.state.size || '8', color: location.state.color || 'Default' }] 
    : cart;

  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;

  const [shippingAddress, setShippingAddress] = useState({
    name: currentUser?.name || '',
    street: '',
    city: '',
    zip: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'cod'
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay'); // 'gpay', 'phonepe', 'paytm', 'mobikwik', 'bhim'

  // UPI Simulation Modal State
  const [upiModal, setUpiModal] = useState({
    show: false,
    app: null,
    step: 'redirecting', // 'redirecting', 'details', 'pin', 'processing', 'success'
    pin: ''
  });

  // Automatically transition from redirecting splash step to details sheet
  React.useEffect(() => {
    if (upiModal.show && upiModal.step === 'redirecting') {
      const timer = setTimeout(() => {
        setUpiModal(prev => ({ ...prev, step: 'details' }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [upiModal.show, upiModal.step]);

  const handleAddressChange = (e, field) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handlePlaceOrder = async (e) => {
    if (e) e.preventDefault();

    if (!currentUser) {
      showToast('Please login to place an order', 'warning');
      navigate('/auth', { state: { from: '/checkout' } });
      return;
    }

    if (!shippingAddress.name || !shippingAddress.street || !shippingAddress.city || !shippingAddress.zip) {
      showToast('Please fill out all shipping details', 'warning');
      return;
    }

    if (paymentMethod === 'upi') {
      // Launch Indian UPI simulated payment sheet starting with redirecting splash screen
      setUpiModal({
        show: true,
        app: selectedUpiApp,
        step: 'redirecting',
        pin: ''
      });
      showToast(`Redirecting to ${getAppName(selectedUpiApp)} Secure Gateway...`, 'info');
    } else {
      // Handle standard placement directly
      await submitOrderToBackend();
    }
  };

  const submitOrderToBackend = async () => {
    try {
      const orderPayload = {
        userId: currentUser.id,
        products: checkoutItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          size: item.size || '8',
          price: item.price
        })),
        totalAmount: total,
        deliveryFee: 0,
        deliveryAddress: {
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: 'Karnataka',
          zip: shippingAddress.zip
        },
        paymentMethod: paymentMethod === 'upi' ? `upi_${upiModal.app}` : paymentMethod
      };

      const API_BASE = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000/api' : 'https://dripzo-backend.onrender.com/api');
      const res = await axios.post(`${API_BASE}/orders`, orderPayload);
      
      if (res.data.success) {
        showToast('Order placed successfully! Fulfilling in 1 hour.', 'success');
        clearCart();
        navigate('/dashboard?tab=orders');
      } else {
        showToast(res.data.message || 'Failed to place order', 'error');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      showToast(error.response?.data?.message || 'Error communicating with server', 'error');
    }
  };

  // UPI Numeric Keypad typing handler
  const handlePinKey = (key) => {
    setUpiModal(prev => {
      if (key === 'del') {
        return { ...prev, pin: prev.pin.slice(0, -1) };
      }
      if (prev.pin.length >= 6) return prev; // Limit to 6-digit PIN
      return { ...prev, pin: prev.pin + key };
    });
  };

  const handlePinSubmit = () => {
    if (upiModal.pin.length < 4) {
      showToast('Please enter a valid 4 or 6 digit PIN', 'warning');
      return;
    }
    // Proceed to Processing State
    setUpiModal(prev => ({ ...prev, step: 'processing' }));
    
    // Simulate server verification
    setTimeout(() => {
      setUpiModal(prev => ({ ...prev, step: 'success' }));
      // Redirect successfully
      setTimeout(() => {
        setUpiModal(prev => ({ ...prev, show: false }));
        submitOrderToBackend();
      }, 1500);
    }, 1800);
  };

  const getAppName = (app) => {
    const names = { gpay: 'Google Pay', phonepe: 'PhonePe', paytm: 'Paytm', mobikwik: 'MobiKwik', bhim: 'BHIM UPI' };
    return names[app] || 'UPI App';
  };

  const getAppColor = (app) => {
    const colors = { gpay: '#4285F4', phonepe: '#5F259F', paytm: '#002E6E', mobikwik: '#005B9E', bhim: '#1C5E55' };
    return colors[app] || '#1A1A1A';
  };

  return (
    <div className="pt-20 min-h-screen bg-bgLight relative">
      <div className="container mx-auto px-6 max-w-4xl py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link to={directBuy ? `/product/${directProduct.id}` : "/collections"} className="p-2 hover:bg-white rounded-full transition-colors text-textMuted hover:text-primary">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-secondary">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-borderLight p-8"
          >
            <h2 className="text-xl font-bold mb-6 border-b border-borderLight pb-4 text-secondary">Shipping Address</h2>
            <form className="space-y-4" onSubmit={handlePlaceOrder}>
              <input 
                type="text" 
                placeholder="Full Name" 
                required
                value={shippingAddress.name}
                onChange={(e) => handleAddressChange(e, 'name')}
                className="w-full p-3.5 rounded-lg bg-bgLight border border-borderLight focus:border-primary outline-none transition text-secondary text-sm font-semibold" 
              />
              <input 
                type="text" 
                placeholder="Street Address" 
                required
                value={shippingAddress.street}
                onChange={(e) => handleAddressChange(e, 'street')}
                className="w-full p-3.5 rounded-lg bg-bgLight border border-borderLight focus:border-primary outline-none transition text-secondary text-sm" 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="City" 
                  required
                  value={shippingAddress.city}
                  onChange={(e) => handleAddressChange(e, 'city')}
                  className="w-full p-3.5 rounded-lg bg-bgLight border border-borderLight focus:border-primary outline-none transition text-secondary text-sm" 
                />
                <input 
                  type="text" 
                  placeholder="Pin Code" 
                  required
                  value={shippingAddress.zip}
                  onChange={(e) => handleAddressChange(e, 'zip')}
                  className="w-full p-3.5 rounded-lg bg-bgLight border border-borderLight focus:border-primary outline-none transition text-secondary text-sm" 
                />
              </div>
            </form>
            
            <h2 className="text-xl font-bold mb-6 border-b border-borderLight pb-4 mt-8 text-secondary">Payment Method</h2>
            <div className="space-y-3">
              <label 
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-borderLight bg-bgLight'}`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  className="mr-4 accent-primary" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')} 
                />
                <span className="font-semibold text-secondary text-sm">Credit / Debit Card</span>
              </label>

              <div className={`border-2 rounded-lg overflow-hidden transition-all duration-300 ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-borderLight bg-bgLight'}`}>
                <label 
                  onClick={() => setPaymentMethod('upi')}
                  className="flex items-center p-4 cursor-pointer"
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    className="mr-4 accent-primary"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <span className="font-semibold text-secondary text-sm flex-1">UPI Payments</span>
                </label>
                
                {/* Simulated UPI App Options */}
                <AnimatePresence>
                  {paymentMethod === 'upi' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      exit={{ opacity: 0, height: 0 }} 
                      className="px-4 pb-4 border-t border-dashed border-primary/20 bg-primary/3"
                    >
                      <p className="text-[10px] font-bold text-primary tracking-wider uppercase mt-3 mb-2">Select Preferred UPI App</p>
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          { id: 'gpay', component: <GPayLogo /> },
                          { id: 'phonepe', component: <PhonePeLogo /> },
                          { id: 'paytm', component: <PaytmLogo /> },
                          { id: 'mobikwik', component: <MobikwikLogo /> },
                          { id: 'bhim', component: <BhimLogo /> }
                        ].map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => {
                              setSelectedUpiApp(app.id);
                              showToast(`Selected payment redirect to ${getAppName(app.id)}`, 'info');
                            }}
                            className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${selectedUpiApp === app.id ? 'border-primary bg-white shadow-sm scale-105' : 'border-transparent opacity-60 hover:opacity-100 hover:bg-white/40'}`}
                          >
                            {app.component}
                            <span className="text-[9px] font-bold text-secondary mt-1 capitalize">{app.id}</span>
                          </button>
                        ))}
                      </div>
                      <div className="mt-3.5 text-center bg-white/70 py-2.5 px-4 rounded-xl border border-primary/10 shadow-sm animate-pulse">
                        <span className="text-xs text-textMuted font-semibold">
                          🔗 Ready to pay: Will <span className="font-extrabold text-primary">REDIRECT TO {getAppName(selectedUpiApp).toUpperCase()}</span> secure payments page.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <label 
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-borderLight bg-bgLight'}`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  className="mr-4 accent-primary"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <span className="font-semibold text-secondary text-sm">Cash on Delivery (COD)</span>
              </label>
            </div>
          </motion.div>
          
          {/* Right: Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-xl border border-borderLight p-8 sticky top-28 shadow-sm">
              <h2 className="text-xl font-bold mb-6 border-b border-borderLight pb-4 text-secondary">Order Summary</h2>
              
              {/* Item List */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {checkoutItems.length > 0 ? (
                  checkoutItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-16 h-20 bg-bgLight rounded overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-secondary line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-textMuted mt-0.5">Size: {item.size} | Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-primary mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-textMuted text-center py-4">No items in checkout</p>
                )}
              </div>

              <div className="flex justify-between mb-3 text-sm text-textMuted">
                <span>Subtotal</span>
                <span className="text-secondary font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between mb-3 text-sm text-textMuted">
                <span>Delivery Fee (1-Hr)</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between mb-6 text-lg font-bold border-t border-borderLight pt-4 text-secondary">
                <span>Total</span>
                <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
              </div>
              
              <button 
                onClick={handlePlaceOrder}
                disabled={checkoutItems.length === 0}
                className="w-full py-3.5 bg-primary text-white font-bold rounded-lg text-base hover:bg-primaryDark transition-colors shadow-lg shadow-primary/20 disabled:bg-textMuted disabled:cursor-not-allowed"
              >
                Place Order
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* INDIAN UPI PAYMENTS MOCK OVERLAY (GPAY, PHONEPE, ETC.) */}
      <AnimatePresence>
        {upiModal.show && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ y: '100%', opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: '100%', opacity: 0 }} 
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
            >
              {/* IMMERSIVE REDIRECTING SPLASH SCREEN */}
              {upiModal.step === 'redirecting' && (
                <div 
                  className="p-8 text-center flex flex-col items-center justify-center min-h-[380px] transition-all duration-500 relative"
                  style={{ 
                    backgroundColor: upiModal.app === 'gpay' ? '#FFFFFF' : getAppColor(upiModal.app),
                    color: upiModal.app === 'gpay' ? '#1A1A1A' : '#FFFFFF'
                  }}
                >
                  {/* Absolute positioning of a close button in top right */}
                  <button 
                    onClick={() => setUpiModal(p => ({ ...p, show: false }))}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
                    style={{ color: upiModal.app === 'gpay' ? '#71717A' : '#FFFFFF' }}
                  >
                    <X size={20} />
                  </button>

                  <div className="relative mb-6 flex items-center justify-center mt-6">
                    {/* Animated Pulsing Rings */}
                    <div 
                      className="absolute inset-0 w-28 h-28 rounded-full opacity-15 animate-ping"
                      style={{ backgroundColor: upiModal.app === 'gpay' ? '#4285F4' : '#FFFFFF' }}
                    ></div>
                    <div 
                      className="absolute inset-0 w-24 h-24 rounded-full opacity-20 animate-pulse"
                      style={{ backgroundColor: upiModal.app === 'gpay' ? '#34A853' : '#FFFFFF' }}
                    ></div>
                    
                    {/* Large Brand Vector Graphic */}
                    <div className="relative z-10 p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl bg-white">
                      {upiModal.app === 'gpay' && <GPayLogo className="w-16 h-16 object-contain" />}
                      {upiModal.app === 'phonepe' && <PhonePeLogo className="w-16 h-16 object-contain" />}
                      {upiModal.app === 'paytm' && <PaytmLogo className="w-16 h-16 object-contain" />}
                      {upiModal.app === 'mobikwik' && <MobikwikLogo className="w-16 h-16 object-contain" />}
                      {upiModal.app === 'bhim' && <BhimLogo className="w-16 h-16 object-contain" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-black tracking-wide mb-1 animate-pulse">
                    Redirecting to {getAppName(upiModal.app)}...
                  </h3>
                  <p className="text-xs opacity-75 max-w-xs leading-relaxed font-semibold">
                    Launching secure transaction with <span className="font-extrabold underline decoration-wavy">DRIPZO</span>
                  </p>
                  
                  <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full border border-black/10 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Secure Sandbox Environment
                  </div>
                </div>
              )}

              {/* HEADER (DYNAMIC BRANDING COLOR) */}
              {upiModal.step !== 'redirecting' && (
                <div 
                  className="px-6 py-4 text-white flex items-center justify-between shadow-sm relative transition-all duration-300"
                  style={{ backgroundColor: getAppColor(upiModal.app) }}
                >
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        if (upiModal.step === 'pin') setUpiModal(p => ({ ...p, step: 'details' }));
                        else setUpiModal(p => ({ ...p, show: false }));
                      }}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <h3 className="font-bold text-base tracking-wide flex items-center gap-2">
                      {getAppName(upiModal.app)} Secure Gate
                    </h3>
                  </div>
                  <button 
                    onClick={() => setUpiModal(p => ({ ...p, show: false }))}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              {/* DETAILS STEP (MOBILE BOTTOM SHEET STYLING) */}
              {upiModal.step === 'details' && (
                <div className="p-6">
                  <div className="text-center mb-6 border-b border-borderLight pb-6">
                    <p className="text-xs font-bold text-textMuted uppercase tracking-widest mb-1">Paying Merchant</p>
                    <h4 className="text-xl font-bold text-secondary mb-3">DRIPZO Flagship Store</h4>
                    <div className="inline-block px-5 py-2.5 bg-secondary/5 rounded-2xl border border-borderLight">
                      <span className="text-2xl font-bold font-mono text-secondary">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Bank Account Selection Mock */}
                  <div className="border border-borderLight rounded-2xl p-4 bg-bgLight mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center font-theater">
                        H
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-secondary">HDFC Bank</h4>
                        <p className="text-xs text-textMuted">Savings Account •••• 4242</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-4 border-primary"></div>
                  </div>

                  <button 
                    onClick={() => {
                      showToast(`Opening secure ${getAppName(upiModal.app)} pinpad...`, 'success');
                      setUpiModal(p => ({ ...p, step: 'pin' }));
                    }}
                    className="w-full py-4 text-white font-bold rounded-2xl text-base shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
                    style={{ backgroundColor: getAppColor(upiModal.app) }}
                  >
                    PROCEED TO PAY ₹{total.toLocaleString('en-IN')}
                  </button>
                  <p className="text-[10px] text-center text-textMuted mt-4 flex items-center justify-center gap-1 font-semibold uppercase tracking-wider">
                    🔒 Secured by NPCI / Unified Payments Interface
                  </p>
                </div>
              )}

              {/* UPI PIN ENTRY STEP (BLACK SECURE SCREEN SIMULATOR) */}
              {upiModal.step === 'pin' && (
                <div className="bg-[#1c222c] text-white p-6 min-h-[420px] flex flex-col justify-between">
                  {/* Pin Pad Info Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white/90">DRIPZO Merchant</h4>
                      <p className="text-xs text-white/40 mt-0.5">UPI ID: dripzo@axis</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold font-mono">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Pin Dots Output */}
                  <div className="text-center py-6">
                    <p className="text-xs font-bold text-white/60 tracking-wider uppercase mb-4">Enter 4-Digit UPI PIN</p>
                    <div className="flex justify-center gap-4">
                      {[0, 1, 2, 3].map((idx) => (
                        <div 
                          key={idx} 
                          className={`w-4 h-4 rounded-full border-2 border-white/30 transition-all ${
                            upiModal.pin.length > idx 
                              ? 'bg-white border-white scale-110 shadow-glow-white' 
                              : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pin Numeric Grid Pad */}
                  <div className="grid grid-cols-3 gap-y-4 gap-x-8 max-w-xs mx-auto text-center mt-2 pb-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                      <button 
                        key={num} 
                        onClick={() => handlePinKey(num)}
                        className="py-2.5 font-bold text-xl rounded-full hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer"
                      >
                        {num}
                      </button>
                    ))}
                    <button 
                      onClick={() => handlePinKey('del')}
                      className="flex items-center justify-center py-2.5 hover:bg-white/10 active:bg-white/20 transition-all text-white/50 hover:text-white"
                    >
                      <Delete size={22} />
                    </button>
                    <button 
                      onClick={() => handlePinKey('0')}
                      className="py-2.5 font-bold text-xl rounded-full hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer"
                    >
                      0
                    </button>
                    <button 
                      onClick={handlePinSubmit}
                      className="flex items-center justify-center py-2.5 hover:bg-white/10 active:bg-white/20 transition-all text-green-400 font-bold"
                    >
                      <Check size={28} className="stroke-[3]" />
                    </button>
                  </div>
                </div>
              )}

              {/* SECURE PROCESSING STATE */}
              {upiModal.step === 'processing' && (
                <div className="p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-6" style={{ borderColor: getAppColor(upiModal.app), borderTopColor: 'transparent' }}></div>
                  <h4 className="text-lg font-bold text-secondary mb-1">Verifying Secure Payment</h4>
                  <p className="text-sm text-textMuted max-w-xs mx-auto">Please do not press back or close the browser window. Communicating with bank...</p>
                </div>
              )}

              {/* SUCCESS CHECKMARK ANIMATION SHEET */}
              {upiModal.step === 'success' && (
                <div className="p-12 text-center flex flex-col items-center justify-center min-h-[300px] bg-green-50/50">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }} 
                    animate={{ scale: 1.2, opacity: 1 }} 
                    transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-green-500/20"
                  >
                    <Check size={44} className="stroke-[3]" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-green-600 mb-1">Payment Successful!</h4>
                  <p className="text-sm text-textMuted">₹{total.toLocaleString('en-IN')} paid successfully to DRIPZO.</p>
                  <p className="text-xs text-primary font-bold mt-4 animate-pulse uppercase tracking-widest">Redirecting back to DRIPZO...</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
