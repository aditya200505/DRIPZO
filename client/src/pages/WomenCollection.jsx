import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  ArrowRight, Heart, Star, ShoppingBag, Truck, Shield, RotateCcw, 
  Sparkles, Crown, Zap, Filter, ChevronDown, Check, Clock
} from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { getProductsByGender } from '../data/productData';
import ProductCard from '../components/ProductCard';

// ════════════ MOCK DATA FOR SECTIONS ════════════
const heroBanners = [
  { id: 1, title: 'New Arrivals', subtitle: 'Explore the latest trends', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80', colSpan: 'col-span-2 row-span-2' },
  { id: 2, title: 'Summer Collection', subtitle: 'Breezy & Light', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80', colSpan: 'col-span-1 row-span-1' },
  { id: 3, title: 'Party Wear', subtitle: 'Stand out tonight', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80', colSpan: 'col-span-1 row-span-1' },
];

const categories = [
  { name: 'Indian Wear', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80', items: ['Sarees', 'Kurtis', 'Salwar Suits', 'Lehenga Choli', 'Anarkali'] },
  { name: 'Western Wear', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', items: ['Tops', 'Dresses', 'Jeans', 'Skirts', 'Co-ord Sets'] },
  { name: 'Party Wear', img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80', items: ['Sequin Dresses', 'Cocktail Dresses', 'Satin Dresses', 'Party Gowns'] },
  { name: 'Wedding & Festive', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80', items: ['Bridal Lehenga', 'Wedding Sarees', 'Reception Gowns'] },
  { name: 'Casual Wear', img: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=600&q=80', items: ['Cotton Kurtis', 'Lounge Wear', 'Everyday Tops'] },
  { name: 'Office Wear', img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80', items: ['Formal Shirts', 'Trousers', 'Pencil Skirts', 'Blazers'] },
  { name: 'Activewear', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80', items: ['Gym Sets', 'Yoga Pants', 'Sports Bras'] },
];

const occasions = [
  { name: 'College Wear', img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80' },
  { name: 'Date Night', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80' },
  { name: 'Office Look', img: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=600&q=80' },
  { name: 'Vacation Fits', img: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80' },
  { name: 'Wedding Guest', img: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80' },
  { name: 'Party Night', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80' },
];

const trendingStyles = [
  'Korean Fashion', 'Y2K Fashion', 'Pinterest Inspired', 'Bollywood Inspired', 
  'Old Money Aesthetic', 'Minimal Fashion', 'Streetwear', 'Instagram Viral'
];

const completeTheLook = [
  { name: 'Strappy Heels', price: '₹1,299', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80' },
  { name: 'Gold Hoops', price: '₹499', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80' },
  { name: 'Leather Handbag', price: '₹2,499', img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80' },
  { name: 'Velvet Lipstick', price: '₹799', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80' },
];

const filters = ['Size', 'Color', 'Fabric', 'Price', 'Brand', 'Occasion', 'Sleeve Type', 'Ratings', 'Delivery Time'];

const influencerPicks = [
  { handle: '@fashion_diva', img: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&q=80', likes: '12.4k' },
  { handle: '@style_icon', img: 'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=600&q=80', likes: '8.2k' },
  { handle: '@trendsetter', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80', likes: '15.1k' },
  { handle: '@glam_look', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80', likes: '10.5k' },
];

const premiumImages = [
  'https://images.unsplash.com/photo-1615886753866-79396abc446e?w=800&q=80',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
  'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80'
];

const WomenCollection = () => {
  const { addToCart } = useShop();
  const womenProducts = getProductsByGender('Women').filter(p => p.gender === 'Women');
  
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <div className="w-full bg-bgLight min-h-screen pt-20 pb-20">
      
      {/* ═══════════ 1. WOMEN'S HERO SECTION ═══════════ */}
      <section className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
          {heroBanners.map((banner) => (
            <div key={banner.id} className={`${banner.colSpan} relative rounded-2xl overflow-hidden group`}>
              <img src={banner.img} alt={banner.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-white/80 font-body uppercase tracking-widest text-xs mb-2">{banner.subtitle}</p>
                <h2 className="text-4xl md:text-5xl font-editorial font-bold text-white mb-6">{banner.title}</h2>
                <div className="flex gap-4">
                  <Link to="/collections?gender=Women" className="px-6 py-3 bg-white text-secondary font-bold text-sm uppercase tracking-wider rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
                    Shop Now
                  </Link>
                  {banner.id === 1 && (
                    <Link to="/collections?gender=Women" className="px-6 py-3 bg-transparent border border-white text-white font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm hidden md:block text-center">
                      Explore Collection
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Fast Delivery Highlight Strip */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-borderLight flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="font-bold text-secondary font-body">Fast Delivery</h4>
              <p className="text-sm text-textMuted font-body">Delivered in 1–6 Hours</p>
            </div>
          </div>
          <div className="w-px h-10 bg-borderLight hidden md:block"></div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 className="font-bold text-secondary font-body">Same-Day Exchange</h4>
              <p className="text-sm text-textMuted font-body">Hassle-free returns at door</p>
            </div>
          </div>
          <div className="w-px h-10 bg-borderLight hidden md:block"></div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Check size={24} />
            </div>
            <div>
              <h4 className="font-bold text-secondary font-body">Live Inventory</h4>
              <p className="text-sm text-textMuted font-body">Nearby Store Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 2. SHOP BY CATEGORY ═══════════ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary font-editorial">
              Shop by <span className="font-fashion italic text-primary">Category</span>
            </h2>
            <p className="text-textMuted mt-3 font-body">Curated collections for every style</p>
          </motion.div>
          
          <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
            {categories.map((cat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="min-w-[280px] snap-center group">
                <Link to={`/collections?gender=Women&category=${cat.name}`} className="block h-80 rounded-2xl overflow-hidden relative mb-4">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                  <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white font-editorial">{cat.name}</h3>
                </Link>
                <div className="flex flex-wrap gap-2">
                  {cat.items.slice(0, 3).map((item, i) => (
                    <Link to={`/collections?gender=Women&category=${cat.name}&subcategory=${item}`} key={i} className="text-xs font-medium px-3 py-1 bg-bgLight text-textMuted rounded-full hover:bg-primary/10 hover:text-primary transition-colors">{item}</Link>
                  ))}
                  {cat.items.length > 3 && <Link to={`/collections?gender=Women&category=${cat.name}`} className="text-xs font-medium px-3 py-1 text-primary">+{cat.items.length - 3} more</Link>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 3. SHOP BY OCCASION ═══════════ */}
      <section className="py-16 bg-bgLight">
        <div className="container mx-auto px-6">
           <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary font-editorial">
                Shop by <span className="font-fashion italic text-primary">Occasion</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {occasions.map((occ, idx) => (
              <Link to="/collections?gender=Women" key={idx} className="group relative rounded-xl overflow-hidden aspect-[4/5] block">
                <img src={occ.img} alt={occ.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-white font-bold text-sm md:text-base font-body tracking-wider uppercase">{occ.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 4. TRENDING NOW SECTION ═══════════ */}
      <section className="py-12 bg-white border-y border-borderLight overflow-hidden">
        <div className="container mx-auto px-6 mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-widest text-secondary uppercase font-body">Trending Now</h2>
        </div>
        <div className="marquee-container bg-white">
          <div className="marquee-content flex gap-6">
            {[...trendingStyles, ...trendingStyles].map((style, idx) => (
              <Link to="/collections?gender=Women" key={idx} className="px-8 py-4 bg-bgLight rounded-full whitespace-nowrap font-bold text-secondary text-lg hover:bg-primary hover:text-white transition-all hover:scale-105 hover:shadow-lg font-editorial">
                #{style}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. NEW ARRIVALS & 6. BEST SELLERS ═══════════ */}
      <section className="py-20 bg-bgLight">
        <div className="container mx-auto px-6">
          
          {/* Section Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-body flex items-center gap-2"><Sparkles size={16}/> Fresh Drops</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-secondary font-editorial">
                New <span className="font-fashion italic text-primary">Arrivals</span>
              </h2>
            </div>
            <Link to="/collections?gender=Women" className="hidden md:flex items-center gap-2 text-primary hover:text-primaryDark font-bold uppercase tracking-wider text-sm">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {womenProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. PREMIUM COLLECTION ═══════════ */}
      <section className="py-24 luxury-bg relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <span className="text-amber-700 text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 font-body">
              <Crown size={16} /> Boutique Exclusives
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-secondary font-editorial">
              Premium <span className="font-fashion italic text-gradient-gold">Collection</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Luxury Sarees', 'Designer Gowns', 'Premium Party Wear', 'Boutique Collection'].map((title, idx) => (
              <div key={idx} className="group relative h-96 rounded-2xl overflow-hidden border border-amber-200/50 shadow-premium">
                <img src={premiumImages[idx]} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute inset-x-6 bottom-6 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold text-amber-400 font-editorial mb-2">{title}</h3>
                  <Link to="/collections?gender=Women&isLuxury=true" className="text-white text-sm font-bold uppercase tracking-widest border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">Shop Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 8. SPECIAL OFFERS ═══════════ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pink-50 rounded-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 transform translate-x-10 group-hover:translate-x-5 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1566367576585-051ccdfc572a?w=800&q=80" alt="Offer" className="w-full h-full object-cover mix-blend-multiply rounded-full blur-2xl" />
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">Flash Sale</span>
                <h3 className="text-4xl font-bold text-secondary font-editorial mb-2">Flat 50% Off</h3>
                <p className="text-textMuted mb-6">On premium dresses & gowns</p>
                <Link to="/collections?gender=Women" className="px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-primary transition-colors w-max shadow-lg text-center">Claim Offer</Link>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 transform translate-x-10 group-hover:translate-x-5 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" alt="Offer" className="w-full h-full object-cover mix-blend-multiply rounded-full blur-2xl" />
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">Festive Special</span>
                <h3 className="text-4xl font-bold text-secondary font-editorial mb-2">Buy 2 Get 1</h3>
                <p className="text-textMuted mb-6">Across all ethnic wear & jewelry</p>
                <Link to="/collections?gender=Women" className="px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-blue-600 transition-colors w-max shadow-lg text-center">Shop Ethnic</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. COMPLETE THE LOOK ═══════════ */}
      <section className="py-20 bg-bgLight">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary font-editorial">
              Complete The <span className="font-fashion italic text-primary">Look</span>
            </h2>
            <p className="text-textMuted mt-3 font-body">Matching accessories for your perfect outfit</p>
          </div>
          
          <div className="flex justify-center flex-wrap gap-8">
            {completeTheLook.map((item, idx) => (
              <div key={idx} className="group w-40 md:w-56 text-center cursor-pointer">
                <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button 
                        onClick={() => addToCart({ ...item, id: `accessory-w-${idx}`, category: 'Accessories' })}
                        className="bg-white text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md hover:bg-primary hover:text-white transition-colors"
                      >
                        Add
                      </button>
                  </div>
                </div>
                <h4 className="font-bold text-secondary font-body group-hover:text-primary transition-colors">{item.name}</h4>
                <p className="text-textMuted text-sm">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 10. INFLUENCER PICKS (INSTAGRAM STYLE) ═══════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary font-editorial">
                Influencer <span className="font-fashion italic text-primary">Picks</span>
              </h2>
              <p className="text-textMuted mt-2 font-body">Trending styles from fashion creators</p>
            </div>
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <FaInstagram size={20} /> Follow @DRIPZO
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {influencerPicks.map((pick, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <img src={pick.img} alt={pick.handle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Instagram UI Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-[-10px] group-hover:translate-y-0">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-white p-[2px]">
                       <img src={pick.img} className="w-full h-full rounded-full object-cover" alt="avatar" />
                     </div>
                     <span className="text-white font-bold text-xs shadow-sm">{pick.handle}</span>
                   </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-[10px] group-hover:translate-y-0">
                  <div className="flex items-center gap-1 text-white text-sm font-bold">
                    <Heart size={16} className="fill-white" /> {pick.likes}
                  </div>
                  <Link to="/collections?gender=Women" className="bg-white text-secondary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest hover:bg-primary hover:text-white transition-colors text-center">Shop Look</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 11. FILTERS & SORTING (CTA SECTION) ═══════════ */}
      <section className="py-16 bg-bgLight border-t border-borderLight text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-secondary font-editorial mb-8">
            Find Your Perfect Fit
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filters.map((filter, idx) => (
              <Link 
                to={`/collections?gender=Women&${filter.toLowerCase()}=true`} 
                key={idx} 
                className="flex items-center gap-2 bg-white border border-borderLight px-5 py-3 rounded-full shadow-sm text-secondary font-medium cursor-pointer hover:border-primary hover:text-primary transition-all"
              >
                {filter} <ChevronDown size={14} className="text-textMuted" />
              </Link>
            ))}
          </div>
          <Link to="/collections?gender=Women" className="inline-flex items-center gap-2 px-10 py-4 bg-secondary text-white font-bold rounded-full text-lg hover:bg-primary hover:shadow-glow-pink transition-all hover:-translate-y-1 font-body tracking-wider uppercase">
            <Filter size={20} /> View All 10,000+ Products
          </Link>
        </div>
      </section>

    </div>
  );
};

export default WomenCollection;
