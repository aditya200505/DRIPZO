import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search, Menu, X, ArrowRight, Heart, Bell } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { searchProducts } from '../data/productData';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

// removed local mockNotifications as it's now in ShopContext

const placeholders = ["Shirts", "Joggers", "Shoes", "T-shirts", "Jackets", "Cosmetics", "Luxury Wear", "Makeup"];

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: {
      height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3 },
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.25 }
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
  },
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, wishlist, notifications, markAllNotificationsAsRead, markNotificationAsRead } = useShop();
  const { isAuthenticated } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const notificationRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(searchProducts(searchQuery).slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-soft border-secondary/5 py-2' 
            : 'bg-white/90 backdrop-blur-md border-transparent py-2.5 sm:py-3.5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center w-full">
          <Link to="/" className="text-xl sm:text-2xl font-theater font-bold tracking-[0.15em] text-secondary shrink-0 select-none">
            DRIP<span className="text-primary">ZO</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-2">
            {[
              { to: '/men', label: 'Men' },
              { to: '/women', label: 'Women' },
              { to: '/collections', label: 'ALL' },
              { to: '/collections?category=Luxury', label: 'Luxury' },
              { to: '/collections?category=Cosmetics', label: 'Beauty' },
            ].map(link => (
              <Link key={link.to} to={link.to} className="px-4 py-2 rounded-full text-secondary border border-secondary/20 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 font-semibold text-[13px] uppercase tracking-[0.1em] font-body">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Persistent Search Bar (Myntra Style) */}
          <div className="hidden lg:flex flex-1 max-w-[240px] mx-6">
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="w-full bg-[#f5f5f6] border border-transparent hover:border-borderLight hover:bg-white hover:shadow-sm rounded-lg px-3 py-1.5 flex items-center gap-2.5 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-1 shrink-0 border-r border-borderLight pr-2.5 mr-0.5">
                <span className="text-[11px] font-theater font-bold tracking-wider text-secondary">D<span className="text-primary">Z</span></span>
              </div>
              <Search size={16} strokeWidth={1.5} className="text-textMuted group-hover:text-primary transition-colors" />
              <div className="relative h-4 overflow-hidden flex-1">
                 <AnimatePresence mode="wait">
                    <motion.p
                      key={placeholders[placeholderIdx]}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-textMuted text-[13px] absolute inset-0 font-medium"
                    >
                      Search for "{placeholders[placeholderIdx]}"
                    </motion.p>
                 </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Icons Group */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 md:gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)} 
              className="text-secondary hover:text-primary transition-all duration-300 p-1.5 sm:p-2 rounded-full hover:bg-secondary/5 flex items-center justify-center lg:hidden"
            >
              <Search size={20} strokeWidth={1.4} />
            </button>
            
            <Link 
              to={isAuthenticated ? "/dashboard" : "/auth"} 
              className="text-secondary hover:text-primary transition-all duration-300 p-1.5 sm:p-2 rounded-full hover:bg-secondary/5 flex items-center justify-center"
            >
              <User size={20} strokeWidth={1.4} />
            </Link>
            
            <Link 
              to="/dashboard?tab=wishlist" 
              className="relative text-secondary hover:text-primary transition-all duration-300 p-1.5 sm:p-2 rounded-full hover:bg-secondary/5 flex items-center justify-center"
            >
              <Heart size={20} strokeWidth={1.4} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 translate-x-0.5 -translate-y-0.5 bg-red-500 text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold border border-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative text-secondary hover:text-primary transition-all duration-300 p-1.5 sm:p-2 rounded-full hover:bg-secondary/5 flex items-center justify-center hidden sm:flex"
              >
                <Bell size={20} strokeWidth={1.4} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 translate-x-0.5 -translate-y-0.5 bg-primary w-1.5 h-1.5 rounded-full border border-white"></span>
                )}
              </button>
              
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-borderLight rounded-2xl shadow-premium z-[100] overflow-hidden"
                  >
                    <div className="p-4 border-b border-borderLight flex justify-between items-center">
                      <h3 className="font-bold text-secondary text-sm">Notifications</h3>
                      <button 
                        onClick={() => {
                          markAllNotificationsAsRead();
                        }}
                        className="text-xs text-primary font-bold hover:underline"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell size={32} className="mx-auto text-borderLight mb-2" />
                          <p className="text-xs text-textMuted">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            onClick={() => {
                              markNotificationAsRead(notification.id);
                              if (notification.link) {
                                navigate(notification.link);
                                setIsNotificationsOpen(false);
                              }
                            }}
                            className={`p-4 border-b border-borderLight last:border-0 hover:bg-bgLight transition-colors cursor-pointer flex gap-3 ${!notification.read ? 'bg-primary/5' : ''}`}
                          >
                            <div className="w-10 h-10 rounded-full bg-white border border-borderLight flex items-center justify-center shrink-0 text-lg">
                              {notification.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-secondary mb-0.5">{notification.title}</h4>
                              <p className="text-xs text-textMuted leading-relaxed mb-1">{notification.message}</p>
                              <span className="text-[10px] text-textLight">{notification.time}</span>
                            </div>
                            {!notification.read && <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>}
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 bg-bgLight text-center border-t border-borderLight">
                      <button 
                        onClick={() => {
                          setIsNotificationsOpen(false);
                          navigate('/dashboard?tab=notifications');
                        }}
                        className="text-xs font-bold text-secondary hover:text-primary transition-colors"
                      >
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              className="relative text-secondary hover:text-primary transition-all duration-300 p-1.5 sm:p-2 rounded-full hover:bg-secondary/5 flex items-center justify-center" 
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} strokeWidth={1.4} />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 translate-x-0.5 -translate-y-0.5 bg-primary text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold border border-white">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden text-secondary p-1.5 sm:p-2 rounded-full hover:bg-secondary/5 flex items-center justify-center transition-all duration-300" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={20} strokeWidth={1.4} />
              ) : (
                <Menu size={20} strokeWidth={1.4} />
              )}
            </button>
          </div>
        </div>

        {/* Border Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-borderLight/40"></div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-t border-borderLight/60 shadow-lg"
            >
              <div className="px-6 py-5 flex flex-col space-y-1">
                {[
                  { label: 'Men', to: '/men' },
                  { label: 'Women', to: '/women' },
                  { label: 'ALL', to: '/collections' },
                  { label: 'Luxury', to: '/collections?category=Luxury' },
                  { label: 'Beauty', to: '/collections?category=Cosmetics' },
                ].map(item => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <Link 
                      to={item.to} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="py-3.5 text-secondary hover:text-primary transition-colors font-semibold text-sm uppercase tracking-wider border-b border-borderLight/50 flex items-center group font-body"
                    >
                      <span className="relative overflow-hidden inline-block py-0.5">
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div variants={itemVariants}>
                  <Link to="/dashboard?tab=wishlist" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3.5 text-secondary hover:text-primary transition-colors font-semibold text-sm uppercase tracking-wider border-b border-borderLight/50 flex items-center justify-between font-body group"
                  >
                    <span className="relative overflow-hidden inline-block py-0.5">
                      My Wishlist
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <span className="bg-red-500/10 text-red-500 text-xs px-2.5 py-0.5 rounded-full font-bold">{wishlist.length}</span>
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link to={isAuthenticated ? "/dashboard" : "/auth"} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-4 text-primary hover:text-primaryDark transition-colors font-bold text-sm uppercase tracking-wider flex items-center justify-between font-body group"
                  >
                    <span className="relative overflow-hidden inline-block py-0.5">
                      {isAuthenticated ? 'My Dashboard' : 'Login / Sign Up'}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primaryDark transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </motion.nav>

      {/* ═══════════ SEARCH OVERLAY ═══════════ */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-0 left-0 right-0 z-[90] pt-6 px-6"
            >
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-textMuted" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search shirts, pants, shoes, jackets, cosmetics..."
                    className="w-full bg-white border border-borderLight rounded-2xl pl-14 pr-14 py-4 text-secondary text-lg placeholder-textMuted focus:outline-none focus:border-primary/50 shadow-premium"
                  />
                  <button type="button" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-textMuted hover:text-secondary">
                    <X size={22} />
                  </button>
                </form>

                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 bg-white border border-borderLight rounded-2xl overflow-hidden shadow-premium"
                  >
                    {searchResults.map((product) => (
                      <button key={product.id}
                        onClick={() => { navigate(`/product/${product.id}`); setIsSearchOpen(false); setSearchQuery(''); }}
                        className="w-full flex items-center gap-4 p-4 hover:bg-bgLight transition-colors text-left border-b border-borderLight last:border-0"
                      >
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-secondary text-sm truncate">{product.name}</h4>
                          <p className="text-xs text-textMuted">{product.category}</p>
                        </div>
                        <span className="text-secondary font-bold text-sm">₹{product.price.toLocaleString('en-IN')}</span>
                        <ArrowRight size={14} className="text-textMuted" />
                      </button>
                    ))}
                    <button onClick={handleSearchSubmit} className="w-full p-3 text-center text-primary font-bold text-sm hover:bg-bgLight transition-colors">
                      View all results for "{searchQuery}"
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
