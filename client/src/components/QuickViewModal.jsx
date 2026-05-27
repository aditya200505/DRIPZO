import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, Star, Truck, Check, Clock, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useShop();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#1a1a2e');
  
  const discount = Math.floor(Math.random() * 30) + 10;
  const originalPrice = Math.floor(product.price * (1 + discount / 100));

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor);
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl bg-white rounded-2xl shadow-2xl z-[110] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-secondary hover:bg-bgLight transition"
        >
          <X size={16} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-bgLight relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-xs font-bold uppercase tracking-widest shadow-sm">
            {product.category}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
            <span className="text-textMuted text-xs font-bold">(124 Reviews)</span>
          </div>

          <h2 className="text-3xl font-bold text-secondary font-editorial mb-2">{product.name}</h2>
          
          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl font-bold text-secondary">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-textMuted text-lg line-through mb-1">₹{originalPrice.toLocaleString('en-IN')}</span>
            <span className="text-green-600 font-bold text-sm mb-1 bg-green-50 px-2 py-0.5 rounded">{discount}% OFF</span>
          </div>

          <p className="text-textMuted text-sm leading-relaxed mb-8">
            {product.description || "A premium quality product designed with exquisite attention to detail. Experience luxury fashion with exceptional comfort and style."}
          </p>

          {/* Color Selection */}
          <div className="mb-6">
            <h4 className="font-bold text-secondary text-sm uppercase tracking-wider mb-3">Color: <span className="text-textMuted font-normal capitalize">Selected</span></h4>
            <div className="flex gap-3">
              {(product.colors || ['#1a1a2e', '#e0e0e0', '#87ceeb']).map((color, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'ring-1 ring-borderLight hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && <Check size={14} className={color === '#e0e0e0' ? 'text-secondary' : 'text-white'} />}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          {product.category !== 'Cosmetics' ? (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-secondary text-sm uppercase tracking-wider">Size</h4>
                <button className="text-xs text-primary underline underline-offset-2 font-bold">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-lg text-sm font-bold transition-colors ${
                      selectedSize === size 
                        ? 'bg-secondary text-white' 
                        : 'bg-bgLight text-secondary hover:bg-borderLight'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <h4 className="font-bold text-secondary text-sm uppercase tracking-wider mb-3">Net Volume</h4>
              <div className="p-3 bg-bgLight rounded-xl border border-primary/10 text-primary font-bold text-sm inline-block">
                {product.volume || '50ml'}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-bgLight text-secondary font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-borderLight transition-colors flex justify-center items-center gap-2"
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 py-4 bg-primary text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-primaryDark transition-colors shadow-glow-pink"
            >
              Buy it Now
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] font-bold text-textMuted bg-bgLight p-5 rounded-2xl border border-borderLight/50">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Truck size={18} className="text-primary" />
              </div>
              <span>FREE DELIVERY</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Check size={18} className="text-primary" />
              </div>
              <span>AUTHENTIC</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Clock size={18} className="text-primary" />
              </div>
              <span>7 DAYS RETURN</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Zap size={18} className="text-primary" />
              </div>
              <span>EXPRESS SHIP</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default QuickViewModal;
