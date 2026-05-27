import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const delivery = subtotal > 1000 ? 0 : 99;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-borderLight z-[70] p-6 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-borderLight">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" /> Shopping Bag ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
              <button onClick={onClose} className="p-2 bg-bgLight rounded-full hover:bg-borderLight transition text-secondary">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-textMuted gap-4">
                  <ShoppingBag size={48} className="text-borderLight" />
                  <p>Your bag is empty.</p>
                  <button onClick={onClose} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primaryDark transition">Start Shopping</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4 p-4 bg-bgLight rounded-xl mb-4 relative group hover:shadow-md transition">
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="absolute top-2 right-2 text-textMuted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 border border-borderLight bg-white">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-bold text-secondary text-sm line-clamp-1 pr-4">{item.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-textMuted">
                          {item.size && <span>Size: <strong className="text-secondary">{item.size}</strong></span>}
                          {item.color && (
                            <span className="flex items-center gap-1">
                              Color: <span className="w-3 h-3 rounded-full border border-borderLight" style={{backgroundColor: item.color}}></span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-secondary font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        <div className="flex items-center gap-3 bg-white border border-borderLight rounded-full px-3 py-1 shadow-sm">
                          <button onClick={() => updateQuantity(item.cartId, -1)} className="text-textMuted hover:text-secondary font-bold text-lg leading-none">−</button>
                          <span className="text-sm font-bold text-secondary w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} className="text-textMuted hover:text-secondary font-bold text-lg leading-none">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="pt-5 border-t border-borderLight mt-auto bg-white">
                <div className="flex justify-between mb-2 text-sm text-textMuted">
                  <span>Subtotal</span>
                  <span className="text-secondary font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm text-textMuted">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? "text-green-600 font-bold" : "text-secondary font-bold"}>
                    {delivery === 0 ? 'FREE' : `₹${delivery.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between mb-5 text-lg">
                  <span className="font-bold text-secondary">Total</span>
                  <span className="font-bold text-primary text-xl">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl text-base hover:bg-primaryDark transition-colors shadow-glow-pink"
                >
                  PLACE ORDER
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
