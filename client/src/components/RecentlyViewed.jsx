import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ArrowRight, History } from 'lucide-react';

const RecentlyViewed = () => {
  const { viewedProducts } = useShop();

  if (!viewedProducts || viewedProducts.length === 0) return null;

  // Determine the title based on the most common brand if they belong to the same brand
  const brands = viewedProducts.map(p => p.brand).filter(Boolean);
  const mostCommonBrand = brands.length > 0 
    ? brands.sort((a,b) => brands.filter(v => v===a).length - brands.filter(v => v===b).length).pop()
    : null;
  
  const allSameBrand = brands.length > 0 && brands.every(b => b === mostCommonBrand);
  const title = allSameBrand 
    ? `Continue Browsing ${mostCommonBrand}` 
    : "Continue Browsing Your Recent Finds";

  return (
    <section className="py-16 bg-white overflow-hidden border-t border-borderLight/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-10"
        >
          <div>
            <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-2 font-body">
              <History size={16} /> Pick up where you left off
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 text-secondary font-editorial">
              {title}
            </h2>
          </div>
          <Link to="/collections" className="text-primary hover:text-primaryDark transition-colors uppercase text-sm tracking-[0.15em] font-bold font-body flex items-center gap-2">
            View Collections <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x">
          {viewedProducts.map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[240px] md:min-w-[280px] snap-start"
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="bg-bgLight rounded-2xl overflow-hidden border border-transparent group-hover:border-primary/20 group-hover:shadow-premium transition-all duration-500">
                  <div className="h-48 md:h-56 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    {product.brand && (
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-widest text-secondary uppercase shadow-sm">
                        {product.brand}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-secondary text-sm mb-1 truncate group-hover:text-primary transition-colors font-body">
                      {product.name}
                    </h3>
                    <p className="text-xs text-textMuted mb-2 line-clamp-1 font-body">
                      {product.category} • {product.gender}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold text-lg font-fashion">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
