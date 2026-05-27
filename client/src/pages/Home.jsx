import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw, Headphones, Crown, Sparkles, Star, Quote, ChevronDown, MessageSquare } from 'lucide-react';
import { useRef } from 'react';
import Hero from '../components/Hero';
import Trending from '../components/Trending';
import RecentlyViewed from '../components/RecentlyViewed';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { SkeletonBlock } from '../components/Skeleton';
import { categoryImages, getFeaturedProducts, getLuxuryProducts, getCosmeticsProducts, customerTestimonials, faqData } from '../data/productData';
// ═══════════ FAQ ACCORDION COMPONENT ═══════════
const FAQSection = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-bgLight">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-body">Got Questions?</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-secondary font-editorial">
            Frequently Asked <span className="font-fashion italic text-primary">Questions</span>
          </h2>
          <p className="text-textMuted mt-4 max-w-lg mx-auto font-body">
            Everything you need to know about shopping with DRIPZO.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white border border-borderLight rounded-xl overflow-hidden hover:border-primary/20 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-secondary font-semibold text-base pr-4 font-body">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-textMuted shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : ''}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-60 pb-5' : 'max-h-0'}`}>
                <p className="px-5 text-textLight text-sm leading-relaxed font-body">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [homeLoading, setHomeLoading] = useState(true);
  const featuredProducts = getFeaturedProducts();
  const luxuryProducts = getLuxuryProducts();
  const cosmeticsProducts = getCosmeticsProducts();
  const mainCategories = ['Shirts', 'Pants', 'Shoes', 'Jackets', 'Flip Flops', 'T-Shirts'];

  useEffect(() => {
    const timer = setTimeout(() => setHomeLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <div className="w-full bg-white">
      <Hero />

      {/* ═══════════ MARQUEE BANNER ═══════════ */}
      <div className="bg-secondary py-3 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-10 px-4">
                <span className="text-xs font-bold text-white/90 whitespace-nowrap flex items-center gap-2 tracking-[0.15em] uppercase font-body">
                  <Truck size={14} className="text-primary" /> FREE SHIPPING OVER ₹999
                </span>
                <span className="text-white/30">|</span>
                <span className="text-xs font-bold text-white/90 whitespace-nowrap flex items-center gap-2 tracking-[0.15em] uppercase font-body">
                  <Shield size={14} className="text-primary" /> 100% AUTHENTIC PRODUCTS
                </span>
                <span className="text-white/30">|</span>
                <span className="text-xs font-bold text-white/90 whitespace-nowrap flex items-center gap-2 tracking-[0.15em] uppercase font-body">
                  <RotateCcw size={14} className="text-primary" /> 30-DAY EASY RETURNS
                </span>
                <span className="text-white/30">|</span>
                <span className="text-xs font-bold text-white/90 whitespace-nowrap flex items-center gap-2 tracking-[0.15em] uppercase font-body">
                  <Headphones size={14} className="text-primary" /> 24/7 SUPPORT
                </span>
                <span className="text-white/30">|</span>
                <span className="text-xs font-bold text-primary whitespace-nowrap tracking-[0.15em] uppercase font-theater">
                  ⚡ FLASH SALE — UP TO 50% OFF ⚡
                </span>
                <span className="text-white/30 mr-10">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ SHOP BY CATEGORY ═══════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-body">Browse</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-secondary font-editorial">
              Shop by <span className="font-fashion italic text-primary">Category</span>
            </h2>
            <p className="text-textMuted mt-4 max-w-lg mx-auto font-body">
              Find exactly what you're looking for. From shirts to sneakers.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {homeLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <SkeletonBlock className="h-56 md:h-72 rounded-xl" />
                </motion.div>
              ))
            ) : (
              mainCategories.map((cat) => (
                <motion.div key={cat} variants={itemVariants}>
                  <Link
                    to={`/collections?category=${encodeURIComponent(cat)}`}
                    className="group relative block h-56 md:h-72 rounded-xl overflow-hidden"
                  >
                    <img 
                      src={categoryImages[cat]} 
                      alt={cat}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-bold text-white font-theater">{cat}</h3>
                      <span className="text-white/70 text-xs font-medium flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-500"></div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ RECENTLY VIEWED ═══════════ */}
      <RecentlyViewed />

      {/* ═══════════ TRENDING SECTION ═══════════ */}
      <Trending />

      {/* ═══════════ FEATURED PRODUCTS ═══════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-body">Curated</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-secondary font-editorial">
                Featured <span className="font-fashion italic text-primary">Picks</span>
              </h2>
              <p className="text-textMuted mt-3 font-body">Our editors' favorite pieces this season.</p>
            </div>
            <Link to="/collections" className="hidden md:flex items-center gap-2 text-primary hover:text-primaryDark transition-colors uppercase text-sm tracking-[0.15em] font-bold font-body">
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {homeLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <ProductCardSkeleton />
                </motion.div>
              ))
            ) : (
              featuredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <Link to={`/product/${product.id}`} className="group block">
                    <div className="premium-card bg-white rounded-xl overflow-hidden">
                      <div className="h-64 overflow-hidden relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                        <span className="absolute top-3 left-3 badge-new">{product.category}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-secondary text-sm mb-1 truncate group-hover:text-primary transition-colors font-body">{product.name}</h3>
                        <p className="text-xs text-textMuted mb-2 line-clamp-1 font-body">{product.description}</p>
                        <span className="text-primary font-bold text-lg font-fashion">₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ LUXURY COLLECTION ═══════════ */}
      <section className="py-24 luxury-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-96 h-96 bg-amber-300/20 rounded-full blur-[200px]"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-[200px]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-amber-700 text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 font-body">
              <Crown size={16} /> Exclusive
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-3 text-secondary font-editorial">
              <span className="font-fashion italic text-gradient-gold">Luxury</span> Collection
            </h2>
            <p className="text-secondary/50 mt-4 max-w-lg mx-auto font-body">
              Handcrafted excellence. Premium materials. Timeless sophistication.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {luxuryProducts.slice(0, 3).map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="bg-white/70 backdrop-blur-sm border border-amber-200/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-amber-400/60 hover:shadow-premium hover:bg-white/90">
                    <div className="h-72 overflow-hidden relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <span className="absolute top-4 left-4 badge-luxury">LUXURY</span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-secondary text-lg mb-1 group-hover:text-amber-700 transition-colors font-theater">{product.name}</h3>
                      <p className="text-textMuted text-sm mb-3 font-body">{product.description}</p>
                      <span className="text-amber-700 font-bold text-xl font-fashion">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/collections?category=Luxury" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-full hover:from-amber-700 hover:to-amber-800 transition-all hover:scale-105 shadow-lg font-body tracking-wider uppercase"
            >
              Explore More <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ COSMETICS SECTION ═══════════ */}
      <section className="py-24 cosmetics-bg relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-purple-500 text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 font-body">
              <Sparkles size={16} /> Beauty
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-3 text-secondary font-editorial">
              <span className="font-fashion italic text-purple-500">Cosmetics</span> & Beauty
            </h2>
            <p className="text-secondary/50 mt-4 max-w-lg mx-auto font-body">
              Glow up with our premium beauty collection. From skincare to fragrances.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {cosmeticsProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="bg-white/70 backdrop-blur-sm border border-purple-200/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-purple-400/60 hover:shadow-premium hover:bg-white/90">
                    <div className="h-72 overflow-hidden relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <span className="absolute top-4 left-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Beauty</span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-secondary text-lg mb-1 group-hover:text-purple-500 transition-colors font-theater">{product.name}</h3>
                      <p className="text-textMuted text-sm mb-3 font-body">{product.description}</p>
                      <span className="text-purple-500 font-bold text-xl font-fashion">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/collections?category=Cosmetics" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-500 text-white font-bold rounded-full hover:bg-purple-600 transition-all hover:scale-105 shadow-lg font-body tracking-wider uppercase"
            >
              Shop All Beauty <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CUSTOMER REVIEWS ═══════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/3 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-body flex items-center justify-center gap-2">
              <MessageSquare size={16} /> What Our Customers Say
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-secondary font-editorial">
              Customer <span className="font-fashion italic text-primary">Reviews</span>
            </h2>
            <p className="text-textMuted mt-4 max-w-lg mx-auto font-body">
              Real stories from real shoppers across India. See why 50,000+ people love DRIPZO.
            </p>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(showAllReviews ? customerTestimonials : customerTestimonials.slice(0, 3)).map((review, index) => (
              <motion.div 
                key={review.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                layout
              >
                <div className="bg-bgLight border border-borderLight rounded-xl p-4 h-full flex flex-col hover:shadow-card-hover hover:border-primary/20 transition-all duration-300">
                  {/* Quote icon */}
                  <Quote size={20} className="text-primary/20 mb-2" />

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-textLight text-xs leading-relaxed mb-3 flex-1 font-body">
                    "{review.comment}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3 border-t border-borderLight">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center font-theater overflow-hidden">
                      {review.avatar.includes('http') ? (
                        <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                      ) : (
                        review.avatar
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-secondary font-body">{review.name}</h4>
                      <p className="text-[10px] text-textMuted font-body">{review.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all font-body text-xs uppercase tracking-wider"
            >
              {showAllReviews ? 'Show Less' : 'Show More Reviews'}
              <ChevronDown size={14} className={`transform transition-transform ${showAllReviews ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ SECTION ═══════════ */}
      <FAQSection faqData={faqData} />

      {/* ═══════════ PROMO CTA ═══════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-secondary font-editorial">
              Ready to <span className="font-fashion italic text-primary">Upgrade</span> Your Style?
            </h2>
            <p className="text-textMuted text-xl max-w-2xl mx-auto mb-10 font-body">
              Join 50,000+ fashion enthusiasts who get premium style delivered fast.
            </p>
            <Link 
              to="/collections" 
              className="group inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-full text-lg hover:bg-primaryDark hover:shadow-glow-pink transition-all hover:scale-105 font-body tracking-wider uppercase"
            >
              Start Shopping
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
