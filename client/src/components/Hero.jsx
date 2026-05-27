import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

const typingPhrases = [
  'Premium Shirts',
  'Trendy Shoes',
  'Stylish Jackets',
  'Designer Pants',
  'Cool T-Shirts',
  'Comfy Flip Flops',
  'Luxury Fashion',
  'Beauty Essentials',
];

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // ═══════════ TYPING ANIMATION ═══════════
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTyping = useCallback(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    if (!isDeleting) {
      if (charIndex < currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      if (charIndex > 0) {
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
        return;
      }
    }
  }, [charIndex, isDeleting, phraseIndex]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [handleTyping, isDeleting]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80" 
          alt="Fashion Background" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="hero-white-overlay absolute inset-0"></div>
      </motion.div>

      {/* Decorative shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-electricPurple/5 rounded-full blur-[120px]"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full border border-primary/20 bg-primary/5 text-sm font-semibold mb-8 text-primary font-body tracking-widest uppercase">
            <Sparkles size={16} />
            Premium Fashion, Delivered Fast
            <Star size={14} fill="currentColor" />
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight mb-6 leading-[0.92] text-secondary font-editorial"
        >
          <span className="font-fashion italic text-primary">Fashion</span> That
          <br />
          <span className="text-secondary font-editorial">Speaks for You</span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <p className="text-xl md:text-2xl text-textLight max-w-2xl font-light font-body">
            Discover{' '}
            <span className="text-primary font-bold text-2xl md:text-3xl font-fashion italic">
              {displayText}
            </span>
            <span className="typing-cursor" />
          </p>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg text-textMuted max-w-xl mb-10 font-light font-body"
        >
          Premium fashion from top brands to your doorstep. Style that defines you.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            to="/collections" 
            className="group px-10 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primaryDark transition-all shadow-lg hover:shadow-glow-pink hover:scale-105 inline-flex items-center justify-center gap-2 font-body tracking-wider uppercase"
          >
            Shop Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/collections" 
            className="px-10 py-4 border-2 border-secondary/20 rounded-full font-semibold text-lg text-secondary hover:bg-secondary hover:text-white transition-all hover:scale-105 inline-flex items-center justify-center gap-2 font-body tracking-wider uppercase"
          >
            Explore Collections
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-12 mt-16"
        >
          {[
            { value: '200+', label: 'Premium Brands' },
            { value: 'Fast', label: 'Express Delivery' },
            { value: '50K+', label: 'Happy Customers' },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className="w-px bg-secondary/10"></div>}
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary font-fashion">{stat.value}</h3>
                <p className="text-sm text-textMuted mt-1 font-body tracking-wider uppercase">{stat.label}</p>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
