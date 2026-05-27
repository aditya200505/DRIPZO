import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, X, Eye, Heart } from 'lucide-react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import products, { categories, getProductsByCategory, searchProducts, getProductsByGender, getSubcategoriesByCategory, getProductsByCategoryAndSubcategory } from '../data/productData';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  // Determine gender filter from route or query param
  const genderFilter = searchParams.get('gender') || (location.pathname === '/men' ? 'Men' : location.pathname === '/women' ? 'Women' : null);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high
  const [priceRange, setPriceRange] = useState('All'); // All, Under 1000, 1000-3000, Over 3000
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading when filters change for a premium feel
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeCategory, activeSubcategory, genderFilter]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
      setActiveSubcategory('All');
    }
    const search = searchParams.get('search');
    if (search) setSearchQuery(search);
  }, [searchParams]);

  // Reset subcategory when category changes
  useEffect(() => {
    setActiveSubcategory('All');
  }, [activeCategory]);

  // Get available subcategories for the active category
  const subcategories = useMemo(() => {
    if (activeCategory === 'All') return [];
    return getSubcategoriesByCategory(activeCategory);
  }, [activeCategory]);

  // Available categories based on gender filter
  const availableCategories = useMemo(() => {
    if (!genderFilter) return categories;
    const genderProducts = getProductsByGender(genderFilter);
    const cats = [...new Set(genderProducts.map(p => p.category))];
    return ['All', ...cats];
  }, [genderFilter]);

  const filteredProducts = useMemo(() => {
    let result;

    // Start with gender filter if on /men or /women
    if (genderFilter) {
      result = getProductsByGender(genderFilter);
      if (activeCategory !== 'All') {
        result = result.filter(p => p.category === activeCategory);
      }
      if (activeSubcategory !== 'All') {
        result = result.filter(p => p.subcategory === activeSubcategory);
      }
    } else {
      // Normal category + subcategory filtering
      if (activeSubcategory !== 'All') {
        result = getProductsByCategoryAndSubcategory(activeCategory, activeSubcategory);
      } else {
        result = getProductsByCategory(activeCategory);
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Apply price range filter
    if (priceRange === 'Under 1000') {
      result = result.filter(p => p.price < 1000);
    } else if (priceRange === '1000-3000') {
      result = result.filter(p => p.price >= 1000 && p.price <= 3000);
    } else if (priceRange === 'Over 3000') {
      result = result.filter(p => p.price > 3000);
    }

    // Apply sorting
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, activeSubcategory, searchQuery, genderFilter, sortBy, priceRange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
  };

  const pageTitle = genderFilter
    ? `${genderFilter}'s`
    : activeCategory === 'All' ? 'All' : activeCategory;

  return (
    <div className="pt-20 min-h-screen bg-bgLight">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary">
            {pageTitle}{' '}
            <span className="font-display italic text-primary">Collection</span>
          </h1>
          <p className="text-textMuted text-sm mt-1">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
            <input
              type="text"
              placeholder="Search for shirts, pants, shoes, jackets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-borderLight rounded-xl pl-11 pr-11 py-3 text-secondary placeholder-textMuted focus:outline-none focus:border-primary/50 focus:shadow-sm transition-all text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-textMuted hover:text-secondary">
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-4 flex flex-wrap gap-2"
        >
          {availableCategories.map((cat) => {
            const isActive = activeCategory === cat;
            let count;
            if (genderFilter) {
              const genderProds = getProductsByGender(genderFilter);
              count = cat === 'All' ? genderProds.length : genderProds.filter(p => p.category === cat).length;
            } else {
              count = cat === 'All' ? products.length : getProductsByCategory(cat).length;
            }
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSearchQuery(''); }}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-textLight border border-borderLight hover:border-primary/30 hover:text-primary'
                }`}
              >
                {cat} <span className={`text-xs ${isActive ? 'text-white/70' : 'text-textMuted'}`}>({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* Subcategory Tabs — show when a specific category is selected */}
        {activeCategory !== 'All' && subcategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            <button
              onClick={() => setActiveSubcategory('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeSubcategory === 'All'
                  ? 'bg-secondary text-white'
                  : 'bg-white text-textMuted border border-borderLight hover:border-secondary/30 hover:text-secondary'
              }`}
            >
              All {activeCategory}
            </button>
            {subcategories.map((sub) => {
              const isActive = activeSubcategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-secondary text-white'
                      : 'bg-white text-textMuted border border-borderLight hover:border-secondary/30 hover:text-secondary'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Advanced Filters & Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8 flex flex-wrap justify-between items-center gap-4 border-t border-b border-borderLight py-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-secondary">Price:</span>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-white border border-borderLight rounded-lg px-3 py-1.5 text-sm text-secondary focus:outline-none focus:border-primary"
            >
              <option value="All">All Prices</option>
              <option value="Under 1000">Under ₹1,000</option>
              <option value="1000-3000">₹1,000 - ₹3,000</option>
              <option value="Over 3000">Over ₹3,000</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-secondary">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-borderLight rounded-lg px-3 py-1.5 text-sm text-secondary focus:outline-none focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-20"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + activeSubcategory + searchQuery + (genderFilter || '')}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-20"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bgLight flex items-center justify-center">
                    <Search size={36} className="text-textMuted" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-secondary">No products found</h3>
                  <p className="text-textMuted mb-6">Try adjusting your search or filter.</p>
                  <button onClick={() => { setActiveCategory('All'); setActiveSubcategory('All'); setSearchQuery(''); }} className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primaryDark transition-colors">
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductList;
