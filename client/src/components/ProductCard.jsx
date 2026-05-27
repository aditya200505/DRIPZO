import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Clock, Eye, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  
  const isWishlisted = isInWishlist(product.id);
  
  // Stable pseudo-random data based on product id
  const { rating, reviews, discount, originalPrice } = React.useMemo(() => {
    let numericId = 0;
    if (typeof product.id === 'number') {
      numericId = product.id;
    } else if (product.id) {
      const str = String(product.id);
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      numericId = Math.abs(hash);
    }
    const seed = numericId * 12345;
    const randomFraction = (seed % 100) / 100; // 0 to 0.99
    const d = Math.floor(randomFraction * 30) + 10;
    return {
      rating: (4 + randomFraction).toFixed(1),
      reviews: Math.floor(randomFraction * 500) + 50,
      discount: d,
      originalPrice: Math.floor(product.price * (1 + d / 100))
    };
  }, [product.id, product.price]);

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Don't add to cart, just navigate with product state
    navigate('/checkout', { state: { product, directBuy: true } });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <Link 
        to={`/product/${product.id}`}
        className="group bg-white rounded-2xl overflow-hidden relative block shadow-sm hover:shadow-2xl transition-[transform,shadow,border-color] duration-500 transform hover:-translate-y-2 border border-transparent hover:border-primary/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

        {/* Image Section */}
        <div className="relative aspect-[4/5] overflow-hidden bg-bgLight z-10">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* Top Left Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className="bg-white/90 backdrop-blur-md text-secondary text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 uppercase tracking-wider">
              NEW
            </span>
            <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 uppercase tracking-wider">
              {discount}% OFF
            </span>
          </div>

          {/* Floating Actions (Right) */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
            <button 
              onClick={handleToggleWishlist}
              className={`w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all z-20 ${isWishlisted ? 'text-red-500' : 'text-textMuted hover:text-red-500'}`}
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={handleQuickView}
              className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-textMuted hover:text-primary shadow-md hover:scale-110 transition-all z-20"
            >
              <Eye size={18} />
            </button>
          </div>

          {/* Quick Add To Cart Slide-up */}
          <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 bg-gradient-to-t from-black/60 to-transparent">
            {/* Sizes & Colors Preview (Hover) - Moved here to prevent layout shift */}
            <div className="flex items-center justify-between mb-3 px-1">
               <div className="flex gap-1">
                 {product.category !== 'Cosmetics' ? (
                   ['S', 'M', 'L', 'XL'].map(s => (
                     <span key={s} className="w-6 h-6 rounded bg-white/20 backdrop-blur-md flex items-center justify-center text-[9px] font-bold text-white border border-white/20 hover:bg-white hover:text-secondary transition-colors cursor-pointer">{s}</span>
                   ))
                 ) : (
                   <span className="text-[10px] font-bold text-white bg-white/20 backdrop-blur-md px-2 py-1 rounded border border-white/20">
                     {product.volume || 'Standard'}
                   </span>
                 )}
               </div>
               <div className="flex gap-1">
                  {product.colors?.slice(0, 3).map((c, i) => (
                    <span key={i} className="w-3 h-3 rounded-full border border-white/40 shadow-sm" style={{ backgroundColor: c }}></span>
                  ))}
               </div>
            </div>
            <button 
              onClick={handleAddToCart}
              className="w-full py-2.5 bg-white text-secondary font-bold text-[11px] uppercase tracking-wider rounded-lg shadow-lg hover:bg-primary hover:text-white transition-colors flex justify-center items-center gap-2"
            >
              <ShoppingBag size={14} /> Add to Cart
            </button>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5 relative z-10 bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[10px] text-textMuted font-bold uppercase tracking-widest mb-1 flex flex-wrap items-center gap-1">
                <span>{product.category}</span>
                {product.gender && (
                  <>
                    <span className="text-[8px] opacity-50">•</span>
                    <span className="text-primary">{product.gender === 'Unisex' ? 'Both Male & Female' : product.gender}</span>
                  </>
                )}
              </p>
              <h3 className="font-bold text-secondary text-base mb-1 truncate pr-2 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-[11px] text-textMuted line-clamp-2 leading-relaxed h-8 mb-3">
                {product.description || "A premium quality product designed with exquisite attention to detail and style."}
              </p>
            </div>
            
            <div className="bg-bgLight px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 shrink-0 mt-1">
              {rating} <Star size={10} className="text-amber-400 fill-amber-400" />
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-secondary font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-textMuted text-xs line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
          </div>

          {/* Realistic Product Highlights */}
          <div className="grid grid-cols-2 gap-y-1.5 mb-2 border-t border-dashed border-borderLight pt-3">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-secondary/70">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
              <span>100% ORIGINAL</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-secondary/70">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
              <span>{product.category === 'Cosmetics' ? (product.requirement || 'NATURAL INGREDIENTS') : 'PREMIUM FABRIC'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-secondary/70">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
              <span>EASY RETURNS</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-secondary/70">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
              <span>QC PASSED</span>
            </div>
          </div>

          {/* Delivery & Buy Now */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
              <Zap size={10} /> Fast Delivery
            </span>
            <button 
              onClick={handleBuyNow}
              className="text-xs font-bold text-primary hover:text-primaryDark uppercase tracking-wider underline underline-offset-4"
            >
              Buy Now
            </button>
          </div>
        </div>
      </Link>

      <AnimatePresence>
        {showQuickView && (
          <QuickViewModal 
            product={product} 
            onClose={() => setShowQuickView(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
