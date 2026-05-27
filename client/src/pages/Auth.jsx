import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Smartphone, Eye, EyeOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPhonePassword, setShowPhonePassword] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(true);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [phoneData, setPhoneData] = useState({ name: '', number: '', password: '', captchaInput: '' });
  const [captchaCode, setCaptchaCode] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, signup, socialLogin } = useAuth();
  const { showToast } = useShop();
  const navigate = useNavigate();

  // Load Google GIS and Facebook SDK on Mount
  useEffect(() => {
    // Google Identity Services (GIS) loader
    const loadGoogleScript = () => {
      if (document.getElementById('google-gis-script')) return;
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-gis-script';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };
    loadGoogleScript();

    // Facebook SDK loader
    const loadFacebookScript = () => {
      if (document.getElementById('facebook-jssdk')) return;
      window.fbAsyncInit = function() {
        window.FB.init({
          appId      : import.meta.env.VITE_FACEBOOK_APP_ID || '1302839213790234', // Sandbox/Test FB App ID
          cookie     : true,
          xfbml      : true,
          version    : 'v18.0'
        });
      };
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.id = 'facebook-jssdk';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };
    loadFacebookScript();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!formData.email || !formData.password) {
        showToast('Please fill in all fields', 'error');
        return;
      }
      setIsSocialLoading(true);
      const result = await login(formData.email, formData.password);
      setIsSocialLoading(false);
      if (result.success) {
        showToast('Logged in successfully!', 'success');
        navigate('/dashboard');
      } else {
        showToast(result.message, 'error');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        showToast('Please fill in all fields', 'error');
        return;
      }
      setIsSocialLoading(true);
      const result = await signup(formData.name, formData.email, formData.password);
      setIsSocialLoading(false);
      if (result.success) {
        showToast('Account created successfully!', 'success');
        navigate('/dashboard');
      } else {
        showToast(result.message, 'error');
      }
    }
  };

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaCode(result);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!isPhoneLogin && !phoneData.name) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!phoneData.number || phoneData.number.length < 10) {
      showToast('Please enter a valid phone number', 'error');
      return;
    }
    if (!phoneData.password || phoneData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    if (phoneData.captchaInput !== captchaCode) {
      showToast('Invalid Captcha. Please try again.', 'error');
      generateCaptcha();
      setPhoneData({ ...phoneData, captchaInput: '' });
      return;
    }

    const savedUserJson = localStorage.getItem(`dripzo_phone_user_${phoneData.number}`);
    let finalName = phoneData.name;

    setIsSocialLoading(true);

    if (isPhoneLogin) {
      if (!savedUserJson) {
        showToast('Account not found. Please create one.', 'error');
        setIsSocialLoading(false);
        return;
      }
      const savedUser = JSON.parse(savedUserJson);
      if (savedUser.password !== phoneData.password) {
        showToast('Incorrect password.', 'error');
        setIsSocialLoading(false);
        return;
      }
      finalName = savedUser.name;
    } else {
      if (savedUserJson) {
        showToast('Phone number already registered. Please sign in.', 'error');
        setIsSocialLoading(false);
        return;
      }
      localStorage.setItem(`dripzo_phone_user_${phoneData.number}`, JSON.stringify({
        name: phoneData.name,
        password: phoneData.password
      }));
      showToast('Account created successfully!', 'success');
    }

    // Phone registration fallback mock sync (or we can extend it later to real SMS APIs)
    const mockEmail = `${phoneData.number}@phone.mock`;
    const result = await signup(finalName, mockEmail, phoneData.password);
    setIsSocialLoading(false);

    if (result.success || result.message.includes('already exists')) {
      // If already exists, perform standard login
      const loginRes = await login(mockEmail, phoneData.password);
      if (loginRes.success) {
        showToast('Logged in with Phone successfully!', 'success');
        setPhoneModal(false);
        navigate('/dashboard');
      } else {
        showToast('Phone Login session failed.', 'error');
      }
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleGoogleLogin = () => {
    if (typeof window.google === 'undefined') {
      showToast('Google Sign-In is loading, please try again.', 'info');
      return;
    }

    setIsSocialLoading(true);

    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '92150917281-229qg0lhsh2i7rm9lqdf1067t4j9e22e.apps.googleusercontent.com',
        scope: 'email profile',
        callback: async (tokenResponse) => {
          if (tokenResponse && tokenResponse.access_token) {
            const result = await socialLogin('google', { accessToken: tokenResponse.access_token });
            if (result.success) {
              showToast('Successfully authenticated with Google!', 'success');
              navigate('/dashboard');
            } else {
              showToast(result.message || 'Google Authentication failed', 'error');
            }
          } else {
            showToast('Google authentication cancelled.', 'error');
          }
          setIsSocialLoading(false);
        },
        error_callback: (err) => {
          console.error('Google token client error:', err);
          showToast('Google popup failed to initialize.', 'error');
          setIsSocialLoading(false);
        }
      });
      tokenClient.requestAccessToken();
    } catch (err) {
      console.error('Failed to trigger Google authentication:', err);
      showToast('Google login error. Check console for details.', 'error');
      setIsSocialLoading(false);
    }
  };

  const handleFacebookLogin = () => {
    if (typeof window.FB === 'undefined') {
      showToast('Facebook Sign-In is loading, please try again.', 'info');
      return;
    }

    setIsSocialLoading(true);

    try {
      window.FB.login((response) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          socialLogin('facebook', { accessToken }).then((result) => {
            if (result.success) {
              showToast('Successfully authenticated with Facebook!', 'success');
              navigate('/dashboard');
            } else {
              showToast(result.message || 'Facebook Authentication failed', 'error');
            }
            setIsSocialLoading(false);
          });
        } else {
          showToast('Facebook authentication cancelled.', 'error');
          setIsSocialLoading(false);
        }
      }, { scope: 'public_profile,email' });
    } catch (err) {
      console.error('Failed to trigger Facebook authentication:', err);
      showToast('Facebook login failed to initialize.', 'error');
      setIsSocialLoading(false);
    }
  };

  const handleSocial = (provider) => {
    if (provider === 'google') {
      handleGoogleLogin();
    } else if (provider === 'facebook') {
      handleFacebookLogin();
    } else if (provider === 'phone') {
      generateCaptcha();
      setPhoneData({ name: '', number: '', password: '', captchaInput: '' });
      setPhoneModal(true);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-bgLight flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="bg-white rounded-2xl border border-borderLight shadow-premium max-w-md w-full p-8 relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-theater tracking-[0.1em] text-secondary mb-2">
            DRIP<span className="text-primary">ZO</span>
          </h2>
          <p className="text-textMuted text-sm">
            {isLogin ? 'Welcome back! Please enter your details.' : 'Create an account to join the elite.'}
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex bg-bgLight p-1 rounded-xl mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-white shadow-sm text-secondary' : 'text-textMuted hover:text-secondary'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-white shadow-sm text-secondary' : 'text-textMuted hover:text-secondary'}`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                className="relative"
              >
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-borderLight rounded-xl pl-12 pr-4 py-3.5 text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                  autoComplete="off"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-white border border-borderLight rounded-xl pl-12 pr-4 py-3.5 text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
              autoComplete="off"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              placeholder="Password" 
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-white border border-borderLight rounded-xl pl-12 pr-12 py-3.5 text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
              autoComplete="new-password"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-textMuted hover:text-secondary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-xs font-bold text-primary hover:text-primaryDark transition-colors">
                Forgot Password?
              </button>
            </div>
          )}

          <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-primaryDark transition-colors group">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-borderLight flex-1"></div>
          <span className="text-xs font-bold text-textLight uppercase tracking-wider">Or continue with</span>
          <div className="h-px bg-borderLight flex-1"></div>
        </div>

        <div className="space-y-3">
          <button onClick={() => handleSocial('google')} className="w-full flex items-center justify-center gap-3 bg-white border border-borderLight py-3 rounded-xl hover:bg-bgLight transition-colors font-bold text-sm text-secondary">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <div className="flex gap-3">
            <button onClick={() => handleSocial('facebook')} className="flex-1 flex items-center justify-center gap-2 bg-white border border-borderLight py-3 rounded-xl hover:bg-bgLight transition-colors font-bold text-sm text-[#1877F2]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
            <button onClick={() => handleSocial('phone')} className="flex-1 flex items-center justify-center gap-2 bg-white border border-borderLight py-3 rounded-xl hover:bg-bgLight transition-colors font-bold text-sm text-secondary">
              <Smartphone size={18} />
              Phone
            </button>
          </div>
        </div>

      </div>

      {/* PHONE LOGIN MODAL */}
      <AnimatePresence>
        {phoneModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl p-6 w-full max-w-sm relative shadow-premium">
              <button onClick={() => setPhoneModal(false)} className="absolute top-4 right-4 text-textMuted hover:text-red-500"><X size={20}/></button>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-secondary mb-1">
                  {isPhoneLogin ? 'Login with Phone' : 'Create Account'}
                </h3>
                <p className="text-xs text-textMuted">Enter your details and solve the captcha.</p>
              </div>

              {/* Toggle Mode */}
              <div className="flex bg-bgLight p-1 rounded-xl mb-6">
                <button 
                  type="button"
                  onClick={() => setIsPhoneLogin(true)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isPhoneLogin ? 'bg-white shadow-sm text-secondary' : 'text-textMuted hover:text-secondary'}`}
                >
                  Sign In
                </button>
                <button 
                  type="button"
                  onClick={() => setIsPhoneLogin(false)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isPhoneLogin ? 'bg-white shadow-sm text-secondary' : 'text-textMuted hover:text-secondary'}`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4" autoComplete="off">
                <AnimatePresence mode="popLayout">
                  {!isPhoneLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      className="relative"
                    >
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={phoneData.name}
                        onChange={(e) => setPhoneData({...phoneData, name: e.target.value})}
                        className="w-full bg-white border border-borderLight rounded-xl pl-12 pr-4 py-3.5 text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                        autoComplete="off"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="relative">
                  <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
                  <input 
                    type="tel" 
                    placeholder="Mobile Number" 
                    value={phoneData.number}
                    onChange={(e) => setPhoneData({...phoneData, number: e.target.value})}
                    className="w-full bg-white border border-borderLight rounded-xl pl-12 pr-4 py-3.5 text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                    autoComplete="off"
                  />
                </div>

                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
                  <input 
                    type={showPhonePassword ? "text" : "password"} 
                    placeholder="Set/Enter Password" 
                    value={phoneData.password}
                    onChange={(e) => setPhoneData({...phoneData, password: e.target.value})}
                    className="w-full bg-white border border-borderLight rounded-xl pl-12 pr-12 py-3.5 text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                    autoComplete="new-password"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPhonePassword(!showPhonePassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-textMuted hover:text-secondary transition-colors"
                  >
                    {showPhonePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 border border-gray-200 rounded-xl py-3 text-center flex items-center justify-center gap-2">
                    <span className="font-mono text-xl font-bold tracking-widest text-primary italic select-none line-through decoration-gray-400">{captchaCode}</span>
                  </div>
                  <button type="button" onClick={generateCaptcha} className="p-3 bg-bgLight text-secondary rounded-xl hover:bg-gray-200 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  </button>
                </div>

                <input 
                  type="text" 
                  placeholder="Enter Captcha Code" 
                  value={phoneData.captchaInput}
                  onChange={(e) => setPhoneData({...phoneData, captchaInput: e.target.value})}
                  className="w-full bg-white border border-borderLight rounded-xl px-4 py-3 text-secondary text-sm focus:outline-none focus:border-primary transition-colors uppercase"
                />

                <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primaryDark transition-colors">
                  {isPhoneLogin ? 'Send OTP & Login' : 'Create Account & Login'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SOCIAL AUTH LOADING SPINNER */}
      <AnimatePresence>
        {isSocialLoading && (
          <div className="fixed inset-0 bg-black/40 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.8, opacity: 0 }} 
              className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-premium max-w-xs w-full text-center"
            >
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-bold text-secondary mb-1">Authenticating</h3>
              <p className="text-xs text-textMuted">Contacting secure identity services...</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;
