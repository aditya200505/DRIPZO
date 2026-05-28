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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-soft py-2' : 'bg-white/95 py-3'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-theater font-bold tracking-[0.15em] text-secondary shrink-0">
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
              <Search size={16} className="text-textMuted group-hover:text-primary transition-colors" />
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

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSearchOpen(true)} className="text-secondary hover:text-primary transition-colors p-1.5 lg:hidden">
              <Search size={20} />
            </button>
            <Link to={isAuthenticated ? "/dashboard" : "/auth"} className="text-secondary hover:text-primary transition-colors p-1.5">
              <User size={20} />
            </Link>
            <Link to="/dashboard?tab=wishlist" className="relative text-secondary hover:text-primary transition-colors p-1.5 hidden sm:block">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{wishlist.length}</span>
              )}
            </Link>
            
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative text-secondary hover:text-primary transition-colors p-1.5 hidden sm:block"
              >
                <Bell size={20} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 bg-primary w-2 h-2 rounded-full border-2 border-white"></span>
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
                          // setIsNotificationsOpen(false); // Optional: close dropdown
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
            <button className="relative text-secondary hover:text-primary transition-colors p-1.5" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            <button className="md:hidden text-secondary p-1.5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Border Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-borderLight"></div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white border-t border-borderLight"
            >
              <div className="px-6 py-4 flex flex-col space-y-1">
                {[
                  { label: 'Men', to: '/men' },
                  { label: 'Women', to: '/women' },
                  { label: 'ALL', to: '/collections' },
                  { label: 'Luxury', to: '/collections?category=Luxury' },
                  { label: 'Beauty', to: '/collections?category=Cosmetics' },
                ].map(item => (
                  <Link key={item.label} to={item.to} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="py-3 text-secondary hover:text-primary transition-colors font-semibold text-sm uppercase tracking-wider border-b border-borderLight"
                  >
                    {item.label}
                  </Link>
                ))}
                
                <Link to={isAuthenticated ? "/dashboard" : "/auth"} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3.5 text-primary hover:text-primaryDark transition-colors font-bold text-sm uppercase tracking-wider flex items-center justify-between"
                >
                  <span>{isAuthenticated ? 'My Dashboard' : 'Login / Sign Up'}</span>
                  <ArrowRight size={16} />
                </Link>
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
