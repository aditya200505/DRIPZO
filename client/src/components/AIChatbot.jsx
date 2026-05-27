import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, ShoppingBag, Shirt, Navigation, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import products, { categories, searchProducts, faqData } from '../data/productData';
import axios from 'axios';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarType, setAvatarType] = useState('boy'); // 'boy' or 'girl'
  
  // Randomly switch avatar every time it's opened or periodically
  useEffect(() => {
    const types = ['boy', 'girl'];
    setAvatarType(types[Math.floor(Math.random() * types.length)]);
  }, [isOpen]);

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'ai', 
      text: "Yo! I'm Drippy, your personal fashion assistant. ✨ Ready to level up your fit game today?",
      suggestions: ["Style me for a party", "Find fresh kicks", "Track my drip"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Prevent background scrolling when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Try calling the powerful AI Brain (Gemini via Backend)
      const { data } = await axios.post('http://localhost:5000/api/ai/chat', {
        message: text,
        history: messages.slice(-5) // Send last 5 messages for context
      });

      if (data.text) {
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: data.text }]);
      } else {
        // Fallback to local logic if AI returns empty or offline
        const response = generateAIResponse(text);
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', ...response }]);
      }
    } catch (error) {
      console.error('AI API failed, using local logic:', error);
      const response = generateAIResponse(text);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', ...response }]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();
    
    // 1. FAQ Handling (Small Queries)
    const matchingFaq = faqData.find(f => 
      q.includes(f.question.toLowerCase().split(' ').slice(-2).join(' ')) ||
      q.includes(f.question.toLowerCase().split(' ').slice(0, 2).join(' '))
    );
    if (matchingFaq) {
      return {
        text: matchingFaq.answer,
        suggestions: ["Track order", "Return policy", "COD availability"]
      };
    }

    // 2. Styling Planning / Outfit Suggestions
    if (q.includes('style') || q.includes('outfit') || q.includes('wear') || q.includes('planning') || q.includes('look')) {
      const occasion = q.includes('wedding') ? 'wedding' : 
                       q.includes('party') || q.includes('night') ? 'party' : 
                       q.includes('office') || q.includes('formal') ? 'office' : 
                       q.includes('beach') || q.includes('vacation') ? 'beach' : 'casual';
      
      let recommendation = "";
      let recommendedProducts = [];

      if (occasion === 'wedding') {
        recommendation = "For a wedding, I recommend a sharp Italian Cashmere Overcoat paired with premium Luxury Accessories and Silk Pocket Squares.";
        recommendedProducts = products.filter(p => p.isLuxury).slice(0, 2);
      } else if (occasion === 'party') {
        recommendation = "Heading to a party? A Leather Biker Jacket with a Cyberpunk Graphic Tee and Neon Pulse Sneakers will give you that edgy streetwear vibe.";
        recommendedProducts = products.filter(p => p.name?.includes('Biker') || p.name?.includes('Pulse')).slice(0, 2);
      } else if (occasion === 'office') {
        recommendation = "For a polished office look, go with a Midnight Oxford Shirt and Slim Chino Elite. Finish it with Classic Leather Loafers.";
        recommendedProducts = products.filter(p => p.subcategory?.includes('Formal') || p.subcategory?.includes('Chino')).slice(0, 2);
      } else if (occasion === 'beach') {
        recommendation = "Vacation vibes! A Hawaiian Print Shirt or a Neon Linen Shirt paired with Beach Wave Slides is the perfect combo.";
        recommendedProducts = products.filter(p => p.subcategory?.includes('Summer') || p.category === 'Flip Flops').slice(0, 2);
      } else {
        recommendation = "For a comfortable casual look, you can't go wrong with an Essential Crew Neck tee and some Tech Joggers.";
        recommendedProducts = products.filter(p => p.category === 'T-Shirts' || p.subcategory === 'Joggers').slice(0, 2);
      }

      return {
        text: `Great choice! ${recommendation} Would you like to check these out?`,
        products: recommendedProducts,
        suggestions: ["Style for party", "Help me buy shoes"]
      };
    }

    // 3. Guide to buy / Search
    if (q.includes('buy') || q.includes('find') || q.includes('looking for') || q.includes('show me') || q.includes('search')) {
      const searchResults = searchProducts(q.replace('buy', '').replace('find', '').replace('show me', '').replace('search', ''));
      if (searchResults.length > 0) {
        return {
          text: `I found some premium ${searchResults[0].category.toLowerCase()} for you! Our quality is unmatched:`,
          products: searchResults.slice(0, 4),
          suggestions: ["Show luxury collection", "Browse by gender"]
        };
      }
      return {
        text: "I can definitely help you shop! We have premium collections for Men, Women, and a curated Luxury section. What are you looking for today?",
        suggestions: ["Browse Men's", "Browse Women's", "Browse Luxury"]
      };
    }

    // 4. Navigation / Small Queries
    if (q.includes('return') || q.includes('shipping') || q.includes('track') || q.includes('order')) {
      return {
        text: "You can track your orders and manage returns in your Dashboard. Shipping usually takes 2-4 business days across India.",
        links: [{ label: "Go to Dashboard", path: "/dashboard" }],
        suggestions: ["Return policy", "Contact support"]
      };
    }

    if (q.includes('luxury') || q.includes('premium')) {
      return {
        text: "Our Luxury collection features hand-tailored Italian cashmere, Swiss watches, and handcrafted leather goods.",
        links: [{ label: "Explore Luxury", path: "/collections?category=Luxury" }],
        suggestions: ["Show luxury watches", "Show luxury bags"]
      };
    }

    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return {
        text: "Yo! I'm Drippy. I'm here to help you find the coldest fits. What's on your mind?",
        suggestions: ["Level up my style", "Latest drops", "Sale items"]
      };
    }

    // Default Fallback
    return {
      text: "I'm not catching that, but I can help you find products, plan fits, or answer questions about Dripzo. Try asking 'What should I wear for a party?'",
      suggestions: ["Style me", "Show shirts", "Track order"]
    };
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[320px] sm:w-[380px] h-[500px] sm:h-[550px] bg-white rounded-3xl shadow-2xl border border-borderLight overflow-hidden flex flex-col origin-bottom-right"
          >
            {/* Header */}
            <div className="p-5 bg-secondary text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-primary/30 p-0.5">
                  <img 
                    src={avatarType === 'boy' ? '/ai_boy.png' : '/ai_girl.png'} 
                    alt="AI Assistant" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Drippy AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] opacity-80">Online & Dripping</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-bgWhite/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                      msg.type === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white text-secondary rounded-tl-none border border-borderLight'
                    }`}>
                      {msg.text}
                    </div>
                    
                    {/* Links */}
                    {msg.links && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.links.map((link, i) => (
                          <Link 
                            key={i} 
                            to={link.path}
                            className="flex items-center gap-2 px-3 py-1.5 bg-secondary/5 text-secondary text-xs font-bold rounded-full hover:bg-secondary/10 transition-colors border border-secondary/10"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label} <ArrowRight size={12} />
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Products Grid */}
                    {msg.products && (
                      <div className="mt-3 grid grid-cols-2 gap-2 w-full">
                        {msg.products.map((prod) => (
                          <Link 
                            key={prod.id} 
                            to={`/product/${prod.id}`}
                            className="bg-white p-2 rounded-xl border border-borderLight hover:border-primary/30 transition-all group"
                            onClick={() => setIsOpen(false)}
                          >
                            <img src={prod.image} alt={prod.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
                            <h4 className="text-[10px] font-bold text-secondary truncate">{prod.name}</h4>
                            <p className="text-[10px] text-primary font-black">₹{prod.price}</p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Suggestions */}
                    {msg.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(s)}
                            className="px-3 py-1.5 bg-white text-primary text-[11px] font-bold rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-borderLight shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-borderLight">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full pl-4 pr-12 py-3 bg-bgLight rounded-2xl text-[13px] text-secondary border border-transparent focus:border-primary/30 outline-none transition-all"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  <Send size={16} />
                </button>
              </form>
              <p className="text-[10px] text-textMuted text-center mt-3 flex items-center justify-center gap-1">
                <Sparkles size={10} className="text-primary" /> Powered by Drippy Fashion Engine
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden border-2 border-primary/20 group p-1"
      >
        <motion.img 
          src={avatarType === 'boy' ? '/ai_boy.png' : '/ai_girl.png'} 
          alt="AI Assistant" 
          className="w-full h-full object-cover rounded-full pointer-events-none"
          animate={{ 
            y: [0, -4, 0],
            rotate: [0, -2, 2, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Sparkle overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="absolute top-1 right-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
          <Sparkles className="absolute bottom-1 left-1 text-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" size={10} />
        </div>

        {/* Notification Badge */}
        {!isOpen && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-primary border-2 border-white rounded-full z-10"></span>
        )}
      </motion.button>
    </div>
  );
};

export default AIChatbot;
