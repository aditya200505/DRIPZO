import React from 'react';
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
  { id: 1, title: 'New Arrivals', subtitle: 'Explore the latest trends', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&q=80', colSpan: 'col-span-2 row-span-2' },
  { id: 2, title: 'Summer Collection', subtitle: 'Breezy & Light', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80', colSpan: 'col-span-1 row-span-1' },
  { id: 3, title: 'Streetwear Collection', subtitle: 'Urban Fits', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', colSpan: 'col-span-1 row-span-1' },
];

const categories = [
  { name: 'Ethnic Wear', img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&q=80', items: ['Kurtas', 'Kurta Sets', 'Sherwanis', 'Nehru Jackets', 'Wedding Wear'] },
  { name: 'Western Wear', img: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=600&q=80', items: ['T-Shirts', 'Shirts', 'Polo T-Shirts', 'Jeans', 'Jackets'] },
  { name: 'Streetwear', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', items: ['Graphic Tees', 'Oversized Fits', 'Baggy Jeans', 'Cargo Joggers'] },
  { name: 'Party Wear', img: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&q=80', items: ['Blazers', 'Party Shirts', 'Premium Jackets', 'Slim Fit Trousers'] },
  { name: 'Wedding & Festive', img: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&q=80', items: ['Sherwanis', 'Indo-Western', 'Reception Outfits', 'Groom Collection'] },
  { name: 'Casual Wear', img: 'https://images.unsplash.com/photo-1475403614135-5f1aa0eb5015?w=600&q=80', items: ['Everyday T-Shirts', 'Casual Shirts', 'Joggers', 'Denim'] },
  { name: 'Office Wear', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', items: ['Formal Shirts', 'Formal Trousers', 'Blazers', 'Waistcoats'] },
  { name: 'Activewear', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', items: ['Gym Wear', 'Tracksuits', 'Compression Wear', 'Joggers'] },
];

const occasions = [
  { name: 'College Wear', img: 'https://images.unsplash.com/photo-1508243771214-6e95d137426b?w=600&q=80' },
  { name: 'Office Look', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80' },
  { name: 'Gym Fits', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80' },
  { name: 'Date Night', img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80' },
  { name: 'Wedding Guest', img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80' },
  { name: 'Party Night', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80' },
  { name: 'Travel Looks', img: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=600&q=80' },
  { name: 'Airport Fashion', img: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=600&q=80' },
  { name: 'Street Style', img: 'https://images.unsplash.com/photo-1475403614135-5f1aa0eb5015?w=600&q=80' },
];

const trendingStyles = [
  'Korean Men’s Fashion', 'Old Money Aesthetic', 'Streetwear', 'Minimal Fashion', 
  'Pinterest Inspired', 'Celebrity Inspired', 'Gym Aesthetic', 'Instagram Viral Styles'
];

const completeTheLook = [
  { name: 'Sneakers', price: '₹2,999', img: 'https://images.unsplash.com/photo-1527010154944-f2241763d806?w=500&q=80' },
  { name: 'Luxury Watches', price: '₹4,499', img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80' },
  { name: 'Sunglasses', price: '₹1,299', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
  { name: 'Premium Wallets', price: '₹999', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80' },
];

const filters = ['Size', 'Color', 'Fabric', 'Price', 'Brand', 'Occasion', 'Fit Type', 'Ratings', 'Delivery Time'];

const influencerPicks = [
  { handle: '@street_king', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80', likes: '24.1k' },
  { handle: '@style_guru', img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&q=80', likes: '18.5k' },
  { handle: '@trendsetter', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', likes: '32.8k' },
  { handle: '@sneaker_head', img: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80', likes: '19.2k' },
];

const premiumImages = [
  'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
  'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'
];

const MenCollection = () => {
  const { addToCart } = useShop();
  // Extract strictly men's products
  const menProducts = getProductsByGender('Men').filter(p => p.gender === 'Men');
  
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="w-full bg-bgLight min-h-screen pt-20 pb-20">
      
      {/* ═══════════ 1. MEN'S HERO SECTION ═══════════ */}
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
                  <Link to="/collections?gender=Men" className="px-6 py-3 bg-white text-secondary font-bold text-sm uppercase tracking-wider rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
                    Shop Now
                  </Link>
                  {banner.id === 1 && (
                    <Link to="/collections?gender=Men" className="px-6 py-3 bg-transparent border border-white text-white font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm hidden md:block text-center">
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
            <p className="text-textMuted mt-3 font-body">Masculine essentials for every style</p>
          </motion.div>
          
          <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
            {categories.map((cat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="min-w-[280px] snap-center group">
                <Link to={`/collections?gender=Men&category=${cat.name}`} className="block h-80 rounded-2xl overflow-hidden relative mb-4">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                  <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white font-editorial">{cat.name}</h3>
                </Link>
                <div className="flex flex-wrap gap-2">
                  {cat.items.slice(0, 3).map((item, i) => (
                    <Link to={`/collections?gender=Men&category=${cat.name}&subcategory=${item}`} key={i} className="text-xs font-medium px-3 py-1 bg-bgLight text-textMuted rounded-full hover:bg-primary/10 hover:text-primary transition-colors">{item}</Link>
                  ))}
                  {cat.items.length > 3 && <Link to={`/collections?gender=Men&category=${cat.name}`} className="text-xs font-medium px-3 py-1 text-primary">+{cat.items.length - 3} more</Link>}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4">
            {occasions.map((occ, idx) => (
              <Link to="/collections?gender=Men" key={idx} className="group relative rounded-xl overflow-hidden aspect-[4/5] block">
                <img src={occ.img} alt={occ.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-white font-bold text-xs md:text-sm font-body tracking-wider uppercase">{occ.name}</h3>
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
              <Link to="/collections?gender=Men" key={idx} className="px-8 py-4 bg-bgLight rounded-full whitespace-nowrap font-bold text-secondary text-lg hover:bg-primary hover:text-white transition-all hover:scale-105 hover:shadow-lg font-editorial">
                #{style}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. NEW ARRIVALS & 6. BEST SELLERS ═══════════ */}
      <section className="py-20 bg-bgLight">
        <div className="container mx-auto px-6">
          
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-body flex items-center gap-2"><Sparkles size={16}/> Fresh Drops</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-secondary font-editorial">
                New <span className="font-fashion italic text-primary">Arrivals</span>
              </h2>
            </div>
            <Link to="/collections?gender=Men" className="hidden md:flex items-center gap-2 text-primary hover:text-primaryDark font-bold uppercase tracking-wider text-sm">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {menProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. PREMIUM COLLECTION ═══════════ */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <span className="text-amber-500 text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 font-body">
              <Crown size={16} /> Exquisite Men's Wear
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-white font-editorial">
              Premium <span className="font-fashion italic text-amber-500">Collection</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Premium Blazers', 'Designer Jackets', 'Luxury Wedding Wear', 'Exclusive Streetwear'].map((title, idx) => (
              <div key={idx} className="group relative h-96 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
                <img src={premiumImages[idx]} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute inset-x-6 bottom-6 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold text-amber-400 font-editorial mb-2">{title}</h3>
                  <Link to="/collections?gender=Men&isLuxury=true" className="text-white text-sm font-bold uppercase tracking-widest border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">Shop Now</Link>
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
            <div className="bg-slate-50 rounded-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group border border-slate-200">
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 transform translate-x-10 group-hover:translate-x-5 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=800&q=80" alt="Offer" className="w-full h-full object-cover mix-blend-multiply rounded-full blur-2xl" />
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">Flash Sale</span>
                <h3 className="text-4xl font-bold text-secondary font-editorial mb-2">Flat 50% Off</h3>
                <p className="text-textMuted mb-6">On premium blazers & suits</p>
                <Link to="/collections?gender=Men" className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-secondary transition-colors w-max shadow-lg text-center">Claim Offer</Link>
              </div>
            </div>
            <div className="bg-amber-50 rounded-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group border border-amber-100">
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 transform translate-x-10 group-hover:translate-x-5 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1512413914833-2a4db6871fbd?w=800&q=80" alt="Offer" className="w-full h-full object-cover mix-blend-multiply rounded-full blur-2xl" />
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">Under ₹699</span>
                <h3 className="text-4xl font-bold text-secondary font-editorial mb-2">Buy 2 Get 1</h3>
                <p className="text-textMuted mb-6">Across all casual wear & streetwear</p>
                <Link to="/collections?gender=Men&category=Casual Wear" className="px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-amber-600 transition-colors w-max shadow-lg text-center">Shop Casual</Link>
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
            <p className="text-textMuted mt-3 font-body">Masculine accessories for your perfect outfit</p>
          </div>
          
          <div className="flex justify-center flex-wrap gap-8">
            {completeTheLook.map((item, idx) => (
              <div key={idx} className="group w-40 md:w-56 text-center cursor-pointer">
                <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button 
                        onClick={() => addToCart({ ...item, id: `accessory-${idx}`, category: 'Accessories' })}
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
              <p className="text-textMuted mt-2 font-body">Trending men's styles from fashion creators</p>
            </div>
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <FaInstagram size={20} /> Follow @DRIPZOMEN
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
                  <Link to="/collections?gender=Men" className="bg-white text-secondary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest hover:bg-primary hover:text-white transition-colors text-center">Shop Look</Link>
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
                to={`/collections?gender=Men&${filter.toLowerCase()}=true`} 
                key={idx} 
                className="flex items-center gap-2 bg-white border border-borderLight px-5 py-3 rounded-full shadow-sm text-secondary font-medium cursor-pointer hover:border-primary hover:text-primary transition-all"
              >
                {filter} <ChevronDown size={14} className="text-textMuted" />
              </Link>
            ))}
          </div>
          <Link to="/collections?gender=Men" className="inline-flex items-center gap-2 px-10 py-4 bg-secondary text-white font-bold rounded-full text-lg hover:bg-primary hover:shadow-glow-pink transition-all hover:-translate-y-1 font-body tracking-wider uppercase">
            <Filter size={20} /> View All Men's Products
          </Link>
        </div>
      </section>

    </div>
  );
};

export default MenCollection;
