import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Flame, Shield, Glasses, Rocket, Sparkles, Share2, Download, RefreshCw, Star, Info, CheckCircle2, AlertCircle, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

const DripzyRoast = () => {
  const { showToast } = useShop();
  const { currentUser } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedPersonality, setSelectedPersonality] = useState('Roast Energy 🔥');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedGender, setSelectedGender] = useState('men');

  const personalities = [
    { name: 'Roast Energy 🔥', icon: <Flame size={18} />, color: 'from-orange-500 to-red-600' },
    { name: 'Streetwear Judge 🥷', icon: <Shield size={18} />, color: 'from-gray-700 to-black' },
    { name: 'Luxury Critic 🕶️', icon: <Glasses size={18} />, color: 'from-gold-400 to-yellow-600' },
    { name: 'Hype Me Up 🚀', icon: <Rocket size={18} />, color: 'from-blue-500 to-purple-600' },
    { name: 'Clean Stylist ✨', icon: <Sparkles size={18} />, color: 'from-emerald-400 to-teal-600' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image must be less than 5MB', 'error');
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async () => {
    if (!previewUrl) {
      showToast('Please upload an outfit photo first!', 'error');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call delay for cinematic feel
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:5000/api/roast/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('dripzo_token')}`
          },
          body: JSON.stringify({
            image: previewUrl,
            personality: selectedPersonality,
            gender: selectedGender
          })
        });

        const data = await response.json();
        if (response.ok) {
          setResult(data);
          setHistory([data, ...history]);
          showToast('Style Analysis Complete!', 'success');
        } else {
          showToast(data.message || 'Analysis failed', 'error');
        }
      } catch (error) {
        showToast('Connection error', 'error');
      } finally {
        setIsAnalyzing(false);
      }
    }, 3000);
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/roast/history', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('dripzo_token')}`
        }
      });
      const data = await response.json();
      if (response.ok) setHistory(data);
    } catch (error) {
      console.error('History fetch failed');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Header section */}
      <div className="relative overflow-hidden rounded-3xl bg-secondary p-8 md:p-12 text-white border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 italic">DRIPZY <span className="text-primary">ROAST</span></h2>
            <p className="text-white/60 max-w-md text-lg leading-relaxed">
              Elevate your fashion game with our AI-powered style judge. Upload your fit, choose your vibe, and prepare for the truth.
            </p>
          </div>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all flex items-center gap-2 font-bold text-sm"
          >
            {showHistory ? <Upload size={18} /> : <RefreshCw size={18} />}
            {showHistory ? 'Upload New Fit' : 'View History'}
          </button>
        </div>
      </div>

      {!showHistory ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-borderLight p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Upload size={20} className="text-primary" /> Step 1: Upload Your Fit
              </h3>
              
              <div 
                className={`relative group h-96 rounded-2xl border-4 border-dashed transition-all cursor-pointer overflow-hidden flex items-center justify-center
                  ${previewUrl ? 'border-primary/50' : 'border-borderLight hover:border-primary/30'}
                `}
                onClick={() => document.getElementById('roast-upload').click()}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={32} className="text-primary" />
                    </div>
                    <p className="font-bold text-secondary">Click to choose image</p>
                    <p className="text-xs text-textMuted mt-2 italic">Supports JPG, PNG (Max 5MB)</p>
                  </div>
                )}
                <input id="roast-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-borderLight p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User size={20} className="text-primary" /> Step 2: Who are we roasting?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {['men', 'women'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`py-3 rounded-2xl border-2 font-bold capitalize transition-all
                      ${selectedGender === g 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-borderLight text-textMuted hover:border-primary/30'
                      }
                    `}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-borderLight p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Flame size={20} className="text-primary" /> Step 3: Choose Personality
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {personalities.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedPersonality(p.name)}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 text-left
                      ${selectedPersonality === p.name 
                        ? `border-primary bg-primary/5 shadow-inner` 
                        : 'border-borderLight hover:border-primary/20'
                      }
                    `}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg`}>
                      {p.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-secondary">{p.name}</p>
                      <p className="text-[10px] text-textMuted uppercase tracking-wider font-bold">Judge Mode</p>
                    </div>
                  </button>
                ))}
              </div>

              <button 
                onClick={runAnalysis}
                disabled={isAnalyzing || !previewUrl}
                className={`w-full mt-8 py-5 rounded-2xl font-black text-lg tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-xl
                  ${isAnalyzing || !previewUrl 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-secondary text-white hover:bg-black hover:scale-[1.02] active:scale-95'
                  }
                `}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="animate-spin" /> Analyzing Vibe...
                  </>
                ) : (
                  <>
                    <Flame /> Ignite the Roast
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="h-full bg-white rounded-3xl border border-borderLight p-8 flex flex-col items-center justify-center text-center space-y-8 shadow-xl"
                >
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full border-8 border-primary/10 border-t-primary animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-4xl"
                      >
                        🧐
                      </motion.div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black italic mb-2 tracking-tight">STYLE SCANNING...</h3>
                    <p className="text-textMuted animate-pulse">Detecting fashion crimes and masterpieces</p>
                  </div>
                  <div className="w-full max-w-xs space-y-3">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '100%' }} 
                        transition={{ duration: 3 }}
                        className="h-full bg-primary"
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-textLight tracking-widest uppercase">
                      <span>Proportions</span>
                      <span>Color Harmony</span>
                      <span>Trend Detection</span>
                    </div>
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-secondary text-white rounded-3xl overflow-hidden shadow-2xl border border-white/5"
                >
                  {/* Result Header */}
                  <div className="p-8 pb-4 flex justify-between items-start">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                        {result.detectedCategory} DETECTED
                      </div>
                      <h3 className="text-3xl font-black italic leading-none">THE VERDICT</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Drip Score</p>
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        transition={{ type: 'spring', damping: 10 }}
                        className="text-6xl font-black text-primary italic leading-none"
                      >
                        {result.score}
                      </motion.div>
                    </div>
                  </div>

                  {/* Roast text */}
                  <div className="px-8 py-6 bg-white/5 border-y border-white/5">
                    <p className="text-2xl font-medium italic leading-tight text-white/90">
                      "{result.roastText}"
                    </p>
                  </div>

                  {/* Vibe & Details */}
                  <div className="p-8 space-y-6">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Styling Suggestions</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {result.suggestions.map((s, i) => (
                          <div key={i} className="flex gap-3 items-center bg-white/5 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                            <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0 font-bold text-xs">
                              {i+1}
                            </div>
                            <p className="text-sm font-medium text-white/80">{s}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">DRIPZO Recommendations</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {result.recommendations?.map((p, i) => (
                          <div key={i} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-white/10 border border-white/10">
                            <img src={p.images && p.images[0] ? p.images[0] : 'https://via.placeholder.com/400'} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Star className="text-primary fill-primary" size={20} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <Share2 size={16} /> Share Result
                      </button>
                      <button className="px-5 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all">
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full bg-bgLight/30 rounded-3xl border-4 border-dashed border-borderLight p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
                    <Info size={40} className="text-borderLight" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Awaiting Your Fit</h3>
                  <p className="text-textMuted text-sm max-w-xs">Upload a photo to see your Drip Score and get roasted by our fashion judges.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-secondary italic">YOUR <span className="text-primary">ROAST HISTORY</span></h3>
          </div>
          
          {history.length === 0 ? (
            <div className="bg-white rounded-3xl border border-borderLight p-20 text-center">
              <RefreshCw size={48} className="text-borderLight mx-auto mb-4" />
              <h3 className="text-lg font-bold text-secondary mb-2">No history yet</h3>
              <p className="text-textMuted text-sm">Your roasted fits will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item, idx) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl border border-borderLight overflow-hidden hover:border-primary/30 transition-all hover:shadow-xl group"
                >
                  <div className="h-48 relative">
                    <img src={item.image} alt="Roast" className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-full text-xs font-black italic">
                      SCORE: {item.score}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{item.detectedCategory}</p>
                      <p className="text-white font-medium text-xs line-clamp-2 italic">"{item.roastText}"</p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center bg-bgLight/50">
                    <span className="text-[10px] font-black text-textLight uppercase tracking-tighter">{item.personality}</span>
                    <button onClick={() => { setResult(item); setShowHistory(false); }} className="text-[10px] font-black text-primary uppercase hover:underline">Revisit Verdict</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DripzyRoast;
