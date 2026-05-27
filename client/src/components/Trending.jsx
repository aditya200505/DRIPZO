import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { trendingModels } from '../data/productData';

const TrendingCard = ({ model, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link to="/collections" className="group block">
        <div className="premium-card bg-white rounded-xl overflow-hidden">
          {/* Product Image */}
          <div className="h-72 md:h-80 overflow-hidden relative">
            <img 
              src={model.image} 
              alt={model.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <span className="absolute top-3 left-3 badge-new font-body">{model.tag}</span>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="bg-white/90 backdrop-blur-sm text-secondary p-2.5 rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors">
                <ShoppingBag size={18} />
              </span>
            </div>
          </div>
          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-bold text-secondary text-base mb-0.5 truncate group-hover:text-primary transition-colors font-body">{model.name}</h3>
            <p className="text-xs text-textMuted mb-2 font-body">{model.subtitle}</p>
            <span className="text-primary font-bold text-lg font-fashion">₹{model.price?.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Trending = () => {
  return (
    <section className="py-20 bg-bgLight">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-body">Hot Right Now</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-secondary font-editorial">
            Trending <span className="font-fashion italic text-primary">Now</span>
          </h2>
          <p className="text-textMuted mt-4 max-w-lg mx-auto font-body">
            Must-have tees, shirts & joggers — the styles everyone's wearing right now.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {trendingModels.map((model, index) => (
            <TrendingCard key={model.id} model={model} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all hover:scale-105 font-body tracking-wider uppercase"
          >
            Explore All Trends <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Trending;
