import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, ChevronRight, Share2, Send, CheckCircle, User, Ruler, CreditCard } from 'lucide-react';
import { getProductById, getProductsByCategory, getProductReviews, addProductReview, getAverageRating } from '../data/productData';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import SizeChartModal from '../components/SizeChartModal';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const { showToast, addToCart, addViewedProduct, toggleWishlist, isInWishlist } = useShop();

  const isWishlisted = isInWishlist(id);

  React.useEffect(() => {
    if (product) {
      addViewedProduct(product);
      window.scrollTo(0, 0);
    }
  }, [product, addViewedProduct]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `DRIPZO | ${product.name}`,
        text: product.description,
        url: url
      }).catch(err => console.log('Share failed', err));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Link copied to clipboard!', 'success');
      });
    }
  };

  // Review system state
  const [reviews, setReviews] = useState(() => getProductReviews(id));
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const avgRating = getAverageRating(id);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  }, [product]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const updatedReviews = addProductReview(id, {
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
    });
    setReviews([...updatedReviews]);
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
    setShowReviewForm(false);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  if (!product) {
    return (
      <div className="pt-32 min-h-screen bg-bgLight flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-secondary">Product Not Found</h1>
          <Link to="/collections" className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primaryDark transition-colors">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }
  const sizes = useMemo(() => {
    if (product.category === 'Shoes' || product.category === 'Flip Flops') {
      if (product.gender === 'Kids') {
        return ['10C', '11C', '12C', '13C', '1', '2', '3'];
      }
      return ['6', '7', '8', '9', '10', '11'];
    }
    return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  }, [product.category, product.gender]);

  React.useEffect(() => {
    if (sizes && sizes.length > 0) {
      if (sizes.includes('M')) setSelectedSize('M');
      else if (sizes.includes('8')) setSelectedSize('8');
      else if (sizes.includes('12C')) setSelectedSize('12C');
      else setSelectedSize(sizes[0]);
    }
  }, [sizes]);

  const price = Number(product.price) || 0;
  const originalPrice = Math.round(price * 1.4);
  const discount = originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Rating distribution
  const ratingDist = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    pct: reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100) : 0,
  }));

  return (
    <div className="pt-20 min-h-screen bg-white">
      <SizeChartModal 
        isOpen={showSizeChart} 
        onClose={() => setShowSizeChart(false)} 
        category={
          product.category === 'Shoes' || product.category === 'Flip Flops'
            ? (product.gender === 'Kids' ? 'Kids Shoes' : product.category)
            : 'Dress'
        } 
      />
      <div className="container mx-auto px-6">

        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-textMuted py-4 border-b border-borderLight mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-primary transition-colors">Collections</Link>
          <ChevronRight size={12} />
          <Link to={`/collections?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-secondary font-medium">{product.name}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 pb-16">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden group img-zoom-container bg-bgLight">
              <img src={product.image} alt={product.name} className="w-full h-[450px] lg:h-[550px] object-cover" />
              {!isWishlisted && (
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all text-textMuted hover:text-red-500"
                >
                  <Heart size={20} fill="none" />
                </button>
              )}
              <button 
                onClick={handleShare}
                className="absolute top-4 right-16 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-textMuted hover:text-secondary transition-colors"
              >
                <Share2 size={18} />
              </button>
              {product.isLuxury && <span className="absolute top-4 left-4 badge-luxury">LUXURY</span>}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <p className="text-xs text-textMuted font-semibold uppercase tracking-widest mb-1">{product.category}</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-3">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                {avgRating} <Star size={10} fill="white" />
              </div>
              <span className="text-textMuted text-sm">{reviews.length} Ratings & Reviews</span>
            </div>

            <div className="border-b border-borderLight pb-5 mb-5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-secondary">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-lg text-textMuted line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-green-600 font-bold text-sm">({discount}% OFF)</span>
              </div>
              <p className="text-green-600 text-sm font-medium mt-1">Inclusive of all taxes</p>
            </div>

            <p className="text-textLight mb-6 leading-relaxed">{product.description}</p>
            
            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-secondary mb-3 uppercase tracking-wider">Select Color</h4>
                <div className="flex gap-3">
                  {product.colors.map((color, idx) => (
                    <button key={idx} onClick={() => setSelectedColor(idx)}
                      className={`w-9 h-9 rounded-full transition-all ${selectedColor === idx ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'border-2 border-borderLight hover:scale-110'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.category !== 'Cosmetics' ? (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-secondary uppercase tracking-wider">Select Size</h4>
                  <button 
                    onClick={() => setShowSizeChart(true)}
                    className="text-primary text-sm font-bold hover:underline flex items-center gap-1"
                  >
                    <Ruler size={14} /> Size Chart
                  </button>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                        selectedSize === size
                          ? 'bg-primary text-white shadow-md'
                          : 'border border-borderLight text-secondary hover:border-primary hover:text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">Net Volume / Quantity</h4>
                <div className="flex gap-3">
                   <div className="px-6 py-3 bg-bgLight border-2 border-primary/20 text-primary rounded-xl font-bold text-sm flex items-center gap-2">
                     <CheckCircle size={16} /> {product.volume || 'Standard Size'}
                   </div>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 py-4 bg-white border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-all text-base flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> ADD TO BAG
              </button>
              <button 
                onClick={() => {
                  // Don't add to cart, just navigate with product state
                  navigate('/checkout', { 
                    state: { 
                      product, 
                      size: selectedSize, 
                      color: product.colors[selectedColor], 
                      directBuy: true 
                    } 
                  });
                }}
                className="flex-1 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primaryDark transition-all text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <CreditCard size={18} /> BUY NOW
              </button>
              <button 
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 border-2 font-bold rounded-xl transition-all flex items-center justify-center ${
                  isWishlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-borderLight text-secondary hover:border-primary'
                }`}
              >
                <Heart size={22} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-bgLight rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck size={18} className="text-secondary shrink-0" />
                <div>
                  <span className="font-bold text-secondary">1-Hour Delivery</span>
                  <span className="text-textMuted ml-1">available in your area</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield size={18} className="text-secondary shrink-0" />
                <span className="text-textMuted"><span className="font-bold text-secondary">100% Original</span> products guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw size={18} className="text-secondary shrink-0" />
                <span className="text-textMuted"><span className="font-bold text-secondary">Easy 30-day</span> returns and exchanges</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════ REVIEWS & RATINGS SECTION ═══════════ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 border-t border-borderLight"
        >
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Rating Summary */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold text-secondary mb-6 font-editorial">Ratings & Reviews</h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-secondary font-fashion">{avgRating}</div>
                  <div className="flex gap-0.5 mt-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-xs text-textMuted mt-1 font-body">{reviews.length} reviews</p>
                </div>

                {/* Bar chart */}
                <div className="flex-1 space-y-1.5">
                  {ratingDist.map(({ star, count, pct }) => (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="text-textMuted w-3 font-body">{star}</span>
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-textMuted w-6 text-right font-body">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write Review Button */}
              {reviewSubmitted && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-600 text-sm font-semibold mb-4 bg-green-50 px-4 py-2.5 rounded-lg">
                  <CheckCircle size={16} /> Review submitted successfully!
                </motion.div>
              )}

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-sm flex items-center justify-center gap-2 font-body tracking-wider uppercase"
              >
                <Send size={16} /> Write a Review
              </button>

              {/* Review Form */}
              {showReviewForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={handleSubmitReview}
                  className="mt-5 bg-bgLight rounded-xl p-5 space-y-4"
                >
                  <div>
                    <label className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2 font-body">Your Name</label>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      className="w-full bg-white border border-borderLight rounded-lg px-4 py-2.5 text-sm text-secondary focus:outline-none focus:border-primary transition-colors font-body"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2 font-body">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        >
                          <Star
                            size={24}
                            className={`transition-colors cursor-pointer ${
                              star <= (hoverRating || reviewRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2 font-body">Your Review</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience with this product..."
                      required
                      rows={3}
                      className="w-full bg-white border border-borderLight rounded-lg px-4 py-2.5 text-sm text-secondary focus:outline-none focus:border-primary transition-colors resize-none font-body"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primaryDark transition-all text-sm flex items-center justify-center gap-2 font-body"
                  >
                    <Send size={14} /> Submit Review
                  </button>
                </motion.form>
              )}
            </div>

            {/* Right: Review List */}
            <div className="lg:w-2/3">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-bgLight rounded-xl p-5 border border-borderLight hover:border-primary/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center font-theater">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-secondary font-body">{review.name}</h4>
                          <div className="flex items-center gap-2">
                            {review.verified && (
                              <span className="flex items-center gap-0.5 text-green-600 text-[10px] font-semibold">
                                <CheckCircle size={10} /> Verified
                              </span>
                            )}
                            <span className="text-[10px] text-textMuted font-body">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                        {review.rating} <Star size={9} fill="white" />
                      </div>
                    </div>
                    <p className="text-textLight text-sm leading-relaxed font-body">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-12 border-t border-borderLight"
          >
            <h2 className="text-2xl font-bold text-secondary mb-6">
              Similar Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
