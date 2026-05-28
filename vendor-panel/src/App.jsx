import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  LayoutDashboard, Package, ShoppingBag, DollarSign,
  X, Search, Bell, Activity, AlertTriangle, TrendingUp,
  Store, Plus, Lock, Mail, UserPlus, ShieldCheck, CheckCircle,
  Eye, EyeOff, Trash2, Image as ImageIcon, ArrowUpRight,
  FileText, LogOut, Edit3, RefreshCw, Truck, Check
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000/api' : 'https://dripzo-backend.onrender.com/api');

// ─── Design Tokens ─────────────────────────────────────────
const C = {
  primary:     '#ff3f6c',
  primaryDark: '#e02f5c',
  secondary:   '#282c3f',
  bgLight:     '#f5f5f6',
  textMuted:   '#94969f',
  border:      '#e8e8e1',
  white:       '#ffffff',
};

// ─── Shared Style Objects ───────────────────────────────────
const S = {
  card: {
    background: C.white,
    border: `1px solid ${C.border}`,
    boxShadow: '0 1px 6px rgba(40,44,63,0.07)',
    borderRadius: '1rem',
  },
  input: {
    width: '100%', boxSizing: 'border-box',
    background: C.bgLight,
    border: `1px solid ${C.border}`,
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.85rem',
    fontFamily: "'Outfit','Inter',sans-serif",
    color: C.secondary,
    outline: 'none',
    transition: 'border 0.2s',
  },
  select: {
    width: '100%', boxSizing: 'border-box',
    background: C.bgLight,
    border: `1px solid ${C.border}`,
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.85rem',
    fontFamily: "'Outfit','Inter',sans-serif",
    color: C.secondary,
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
  },
  label: {
    display: 'block',
    fontSize: '0.6rem', fontWeight: 900,
    color: C.textMuted,
    textTransform: 'uppercase', letterSpacing: '0.08em',
    marginBottom: '0.4rem',
    fontFamily: "'Outfit','Inter',sans-serif",
  },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
    background: C.primary, color: C.white,
    border: 'none', borderRadius: '0.75rem',
    padding: '0.75rem 1.25rem',
    fontSize: '0.8rem', fontWeight: 700,
    fontFamily: "'Outfit','Inter',sans-serif",
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(255,63,108,0.22)',
    transition: 'all 0.2s',
  },
  btnSecondary: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
    background: C.white, color: C.secondary,
    border: `1px solid ${C.border}`, borderRadius: '0.75rem',
    padding: '0.75rem 1.25rem',
    fontSize: '0.8rem', fontWeight: 700,
    fontFamily: "'Outfit','Inter',sans-serif",
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

// ─── Status Badge ───────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = {
    pending:  { bg: '#fffbeb', color: '#d97706', border: '#fde68a', label: 'Pending Review' },
    approved: { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0', label: 'Approved & Live' },
    rejected: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', label: 'Rejected' },
  }[status] || { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0', label: 'Approved' };

  return (
    <span style={{
      display: 'inline-block',
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`,
      borderRadius: '4px',
      padding: '0.2rem 0.55rem',
      fontSize: '0.6rem', fontWeight: 900,
      textTransform: 'uppercase', letterSpacing: '0.08em',
      fontFamily: "'Outfit','Inter',sans-serif",
    }}>{cfg.label}</span>
  );
};

// ─── Order Status Badge ─────────────────────────────────────
const OrderBadge = ({ status, type = 'status' }) => {
  const statusMap = {
    pending:         { bg: '#fef9c3', color: '#a16207', border: '#fde047' },
    accepted:        { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
    picking:         { bg: '#fdf4ff', color: '#7e22ce', border: '#e9d5ff' },
    out_for_delivery:{ bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
    delivered:       { bg: '#ecfdf5', color: '#065f46', border: '#a7f3d0' },
    cancelled:       { bg: '#fef2f2', color: '#991b1b', border: '#fecaca' },
    completed:       { bg: '#ecfdf5', color: '#065f46', border: '#a7f3d0' },
    refunded:        { bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe' },
  };
  const cfg = statusMap[status] || { bg: '#f5f5f6', color: '#94969f', border: '#e8e8e1' };
  return (
    <span style={{
      display: 'inline-block',
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
      borderRadius: '4px', padding: '0.15rem 0.5rem',
      fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.07em',
      fontFamily: "'Outfit','Inter',sans-serif",
    }}>{status?.replace('_', ' ')}</span>
  );
};

// ─── Spinner ────────────────────────────────────────────────
const Spinner = ({ size = 36, color = C.primary }) => (
  <div style={{
    width: size, height: size,
    border: `3px solid ${color}33`,
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 0.75s linear infinite',
  }} />
);

// ═══════════════════════════════════════════════════════════
//  LOGIN / REGISTER VIEW
// ═══════════════════════════════════════════════════════════
const VendorLoginView = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName]                   = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [shopName, setShopName]           = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [showPassword, setShowPassword]   = useState(false);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState('');
  const [success, setSuccess]             = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      if (isRegistering) {
        const res = await axios.post(`${API}/auth/register`, {
          name, email, password, role: 'shopkeeper', shopName, shopDescription
        });
        if (res.data?.token) {
          setSuccess('Vendor account & shop created! Redirecting...');
          setTimeout(() => onLoginSuccess(res.data), 1500);
        } else setError('Unexpected response from server.');
      } else {
        const res = await axios.post(`${API}/auth/login`, { email, password });
        if (res.data?.token) {
          if (res.data.role === 'shopkeeper' || res.data.role === 'admin') {
            onLoginSuccess(res.data);
          } else setError('Access Denied: Vendor privileges required.');
        } else setError('Invalid server response. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed.');
    } finally { setLoading(false); }
  };

  const iStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '0.75rem',
    padding: '0.8rem 1rem 0.8rem 2.75rem',
    color: '#fff', fontSize: '0.85rem',
    fontFamily: "'Outfit','Inter',sans-serif",
    outline: 'none',
  };
  const lStyle = {
    display: 'block', fontSize: '0.6rem', fontWeight: 900,
    color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
    letterSpacing: '0.1em', marginBottom: '0.35rem',
    fontFamily: "'Outfit','Inter',sans-serif",
  };
  const iconPos = { position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.28)', pointerEvents: 'none' };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#0d0f12 0%,#12151c 60%,#0d0f12 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', position: 'relative', overflow: 'hidden',
      fontFamily: "'Outfit','Inter',sans-serif", color: '#fff',
    }}>
      {/* Gradient orbs */}
      <div style={{ position:'absolute', top:'-15%', left:'-15%', width:'55%', height:'55%', background:'radial-gradient(circle,rgba(255,63,108,0.15) 0%,transparent 65%)', filter:'blur(60px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-15%', right:'-15%', width:'55%', height:'55%', background:'radial-gradient(circle,rgba(59,130,246,0.10) 0%,transparent 65%)', filter:'blur(60px)', pointerEvents:'none' }} />
      {/* Grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }} />

      {/* Card */}
      <div style={{
        width:'100%', maxWidth:'28rem',
        background:'rgba(255,255,255,0.03)',
        backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
        border:'1px solid rgba(255,255,255,0.10)',
        borderRadius:'1.75rem', padding:'2.25rem',
        boxShadow:'0 32px 80px rgba(0,0,0,0.55)',
        position:'relative', zIndex:10,
        animation:'cardEntry 0.45s cubic-bezier(0.34,1.56,0.64,1) both',
      }}>
        {/* Brand */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{
            width:'3.75rem', height:'3.75rem', borderRadius:'1rem',
            background:'linear-gradient(135deg,#ff3f6c,#e02f5c)',
            display:'flex', alignItems:'center', justifyContent:'center',
            margin:'0 auto 1rem', boxShadow:'0 10px 28px rgba(255,63,108,0.30)',
          }}>
            {isRegistering ? <UserPlus color="#fff" size={24}/> : <Lock color="#fff" size={24}/>}
          </div>
          <h1 style={{ margin:0, fontSize:'1.45rem', fontWeight:900, letterSpacing:'-0.04em' }}>DRIPZO</h1>
          <p style={{ margin:'0.3rem 0 0', fontSize:'0.62rem', color:'rgba(255,255,255,0.38)', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>
            {isRegistering ? 'Register Brand Shop' : 'Vendor Hub Portal'}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.1rem', padding:'0.8rem 1rem', borderRadius:'0.7rem', background:'rgba(239,68,68,0.10)', border:'1px solid rgba(239,68,68,0.22)', color:'#f87171', fontSize:'0.75rem', fontWeight:700 }}>
            <AlertTriangle size={14} style={{ flexShrink:0 }}/> {error}
          </div>
        )}
        {success && (
          <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.1rem', padding:'0.8rem 1rem', borderRadius:'0.7rem', background:'rgba(16,185,129,0.10)', border:'1px solid rgba(16,185,129,0.22)', color:'#34d399', fontSize:'0.75rem', fontWeight:700 }}>
            <CheckCircle size={14} style={{ flexShrink:0 }}/> {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
          {isRegistering && (
            <div>
              <label style={lStyle}>Owner Full Name</label>
              <div style={{ position:'relative' }}>
                <UserPlus size={14} style={iconPos}/>
                <input type="text" required placeholder="e.g. Samuel Zara" value={name} onChange={e=>setName(e.target.value)} style={iStyle}/>
              </div>
            </div>
          )}

          <div>
            <label style={lStyle}>Email Address</label>
            <div style={{ position:'relative' }}>
              <Mail size={14} style={iconPos}/>
              <input type="email" required placeholder="vendor@dripzo.com" value={email} onChange={e=>setEmail(e.target.value)} style={iStyle}/>
            </div>
          </div>

          <div>
            <label style={lStyle}>Password</label>
            <div style={{ position:'relative' }}>
              <Lock size={14} style={iconPos}/>
              <input type={showPassword?'text':'password'} required placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} style={{ ...iStyle, paddingRight:'3rem' }}/>
              <button type="button" onClick={()=>setShowPassword(!showPassword)}
                style={{ position:'absolute', right:'0.9rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(255,255,255,0.30)', cursor:'pointer', display:'flex', alignItems:'center' }}>
                {showPassword ? <EyeOff size={14}/> : <Eye size={14}/>}
              </button>
            </div>
          </div>

          {isRegistering && (
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', paddingTop:'0.85rem', marginTop:'0.2rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ margin:0, fontSize:'0.6rem', fontWeight:900, color:C.primary, textTransform:'uppercase', letterSpacing:'0.15em', display:'flex', alignItems:'center', gap:'0.35rem' }}>
                <Store size={12}/> Brand Store Details
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.65rem' }}>
                <div>
                  <label style={lStyle}>Shop Name</label>
                  <div style={{ position:'relative' }}>
                    <Store size={14} style={iconPos}/>
                    <input type="text" required placeholder="e.g. ZARA Premium" value={shopName} onChange={e=>setShopName(e.target.value)} style={iStyle}/>
                  </div>
                </div>
                <div>
                  <label style={lStyle}>Description</label>
                  <div style={{ position:'relative' }}>
                    <FileText size={14} style={iconPos}/>
                    <input type="text" required placeholder="High-end fashion..." value={shopDescription} onChange={e=>setShopDescription(e.target.value)} style={iStyle}/>
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'flex-start', gap:'0.5rem', padding:'0.7rem 0.85rem', borderRadius:'0.65rem', background:'rgba(255,63,108,0.06)', border:'1px solid rgba(255,63,108,0.14)' }}>
                <ShieldCheck size={13} color={C.primary} style={{ flexShrink:0, marginTop:'1px' }}/>
                <p style={{ margin:0, fontSize:'0.62rem', color:'rgba(255,255,255,0.36)', fontWeight:600, lineHeight:1.6 }}>
                  Your shop is created instantly. Products require admin approval before going live.
                </p>
              </div>
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.45rem', marginTop:'0.5rem', padding:'0.9rem', width:'100%', boxSizing:'border-box', background:'linear-gradient(135deg,#ff3f6c,#e02f5c)', color:'#fff', border:'none', borderRadius:'0.875rem', fontWeight:700, fontSize:'0.875rem', fontFamily:"'Outfit','Inter',sans-serif", cursor:loading?'not-allowed':'pointer', boxShadow:'0 8px 24px rgba(255,63,108,0.28)', opacity:loading?0.6:1 }}>
            {loading ? <Spinner size={18} color="#fff"/> : <><ShieldCheck size={16}/>{isRegistering?'Launch Store Session':'Authenticate Vendor Session'}</>}
          </button>
        </form>

        <div style={{ textAlign:'center', marginTop:'1.25rem', paddingTop:'1.1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
          <button onClick={()=>{ setIsRegistering(!isRegistering); setError(''); setSuccess(''); }}
            style={{ background:'none', border:'none', color:'rgba(255,255,255,0.36)', fontSize:'0.73rem', fontWeight:700, cursor:'pointer', fontFamily:"'Outfit','Inter',sans-serif" }}
            onMouseEnter={e=>e.currentTarget.style.color=C.primary}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.36)'}>
            {isRegistering ? '← Already have an account? Sign In' : 'Want to sell on DRIPZO? Register Here →'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes cardEntry { from{opacity:0;transform:scale(0.93) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
      `}</style>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  PRODUCT MODAL
// ═══════════════════════════════════════════════════════════
const ProductModal = ({ onClose, onSubmit, shopId }) => {
  const [form, setForm] = useState({ title:'', price:'', stock:'100', category:'Shirts', gender:'unisex', description:'', image:'', tags:'' });
  const [imgMode, setImgMode] = useState('url');
  const [submitting, setSubmitting] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(p => ({ ...p, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({ ...form, price: Number(form.price), stock: Number(form.stock), shopId });
    setSubmitting(false);
  };

  const tabBtn = (mode, label) => (
    <button type="button" onClick={() => setImgMode(mode)} style={{
      padding:'0.25rem 0.7rem', borderRadius:'0.4rem', border:'none', cursor:'pointer',
      fontFamily:"'Outfit','Inter',sans-serif", fontSize:'0.65rem', fontWeight:900,
      background: imgMode===mode ? C.primary : C.bgLight,
      color: imgMode===mode ? '#fff' : C.textMuted,
    }}>{label}</button>
  );

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <div style={{ ...S.card, width:'100%', maxWidth:'34rem', maxHeight:'90vh', overflowY:'auto', padding:'2rem', animation:'cardEntry 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' }}>
          <div>
            <h3 style={{ margin:0, fontSize:'1.3rem', fontWeight:800, color:C.secondary }}>Request Product Approval</h3>
            <p style={{ margin:'0.25rem 0 0', fontSize:'0.8rem', color:C.textMuted }}>Submit product details. Admin reviews before going live.</p>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:C.textMuted, display:'flex', padding:'0.25rem' }}><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <div>
            <label style={S.label}>Product Title *</label>
            <input required type="text" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Premium Linen Oversized Shirt" style={S.input}/>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
            <div>
              <label style={S.label}>Price (₹) *</label>
              <input required type="number" min="1" value={form.price} onChange={e=>setForm(p=>({...p,price:e.target.value}))} placeholder="e.g. 2499" style={S.input}/>
            </div>
            <div>
              <label style={S.label}>Stock Quantity *</label>
              <input required type="number" min="0" value={form.stock} onChange={e=>setForm(p=>({...p,stock:e.target.value}))} placeholder="e.g. 100" style={S.input}/>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
            <div>
              <label style={S.label}>Gender Collection</label>
              <select value={form.gender} onChange={e=>setForm(p=>({...p,gender:e.target.value}))} style={S.select}>
                <option value="unisex">Unisex</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Category</label>
              <select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} style={S.select}>
                {['Shirts','T-Shirts','Cargo Pants','Jeans','Jackets','Footwear','Accessories','Luxury','Cosmetics'].map(c=>(
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={S.label}>Product Description *</label>
            <textarea required rows={3} value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} placeholder="Fabric details, fit, and premium features..." style={{ ...S.input, resize:'none', lineHeight:1.6 }}/>
          </div>

          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.4rem' }}>
              <label style={{ ...S.label, margin:0 }}>Product Image *</label>
              <div style={{ display:'flex', gap:'0.35rem' }}>
                {tabBtn('url','Remote URL')}
                {tabBtn('upload','File Upload')}
              </div>
            </div>
            {imgMode === 'url' ? (
              <input required type="url" value={form.image} onChange={e=>setForm(p=>({...p,image:e.target.value}))} placeholder="https://images.unsplash.com/..." style={S.input}/>
            ) : (
              <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
                <label style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', padding:'0.75rem', background:C.bgLight, border:`1px solid ${C.border}`, borderRadius:'0.75rem', cursor:'pointer', fontSize:'0.8rem', fontWeight:700, color:C.textMuted }}>
                  <ImageIcon size={16}/> {form.image ? 'Change Image' : 'Upload File'}
                  <input type="file" accept="image/*" onChange={handleFile} style={{ display:'none' }}/>
                </label>
                {form.image && (
                  <div style={{ width:52, height:52, borderRadius:'0.6rem', overflow:'hidden', border:`1px solid ${C.border}`, flexShrink:0 }}>
                    <img src={form.image} alt="preview" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label style={S.label}>Tags / Keywords (comma separated)</label>
            <input type="text" value={form.tags} onChange={e=>setForm(p=>({...p,tags:e.target.value}))} placeholder="e.g. linen, casual, premium, luxury" style={S.input}/>
          </div>

          <div style={{ display:'flex', gap:'0.75rem', paddingTop:'0.75rem', borderTop:`1px solid ${C.border}` }}>
            <button type="submit" disabled={submitting} style={{ ...S.btnPrimary, flex:1, padding:'0.875rem' }}>
              {submitting ? <Spinner size={16} color="#fff"/> : <><Plus size={16}/> Submit for Approval</>}
            </button>
            <button type="button" onClick={onClose} style={{ ...S.btnSecondary, padding:'0.875rem 1.5rem' }}>Cancel</button>
          </div>
        </form>
      </div>
      <style>{`@keyframes cardEntry{from{opacity:0;transform:scale(0.93) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  EDIT PRODUCT MODAL
// ═══════════════════════════════════════════════════════════
const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    title: product.title, price: product.price,
    stock: product.stock, category: product.category,
    gender: product.gender, description: product.description,
    image: product.images?.[0] || '', tags: (product.tags||[]).join(', ')
  });
  const [imgMode, setImgMode] = useState('url');
  const [submitting, setSubmitting] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(p => ({ ...p, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onUpdate(product.id, { ...form, price: Number(form.price), stock: Number(form.stock) });
    setSubmitting(false);
  };

  const tabBtn = (mode, label) => (
    <button type="button" onClick={() => setImgMode(mode)} style={{
      padding:'0.25rem 0.7rem', borderRadius:'0.4rem', border:'none', cursor:'pointer',
      fontFamily:"'Outfit','Inter',sans-serif", fontSize:'0.65rem', fontWeight:900,
      background: imgMode===mode ? C.primary : C.bgLight,
      color: imgMode===mode ? '#fff' : C.textMuted,
    }}>{label}</button>
  );

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <div style={{ ...S.card, width:'100%', maxWidth:'34rem', maxHeight:'90vh', overflowY:'auto', padding:'2rem', animation:'cardEntry 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' }}>
          <div>
            <h3 style={{ margin:0, fontSize:'1.3rem', fontWeight:800, color:C.secondary }}>Edit Product</h3>
            <p style={{ margin:'0.25rem 0 0', fontSize:'0.8rem', color:C.textMuted }}>Updating will move this product back to pending review.</p>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:C.textMuted, display:'flex', padding:'0.25rem' }}><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <div>
            <label style={S.label}>Product Title</label>
            <input type="text" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} style={S.input}/>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
            <div>
              <label style={S.label}>Price (₹)</label>
              <input type="number" value={form.price} onChange={e=>setForm(p=>({...p,price:e.target.value}))} style={S.input}/>
            </div>
            <div>
              <label style={S.label}>Stock</label>
              <input type="number" value={form.stock} onChange={e=>setForm(p=>({...p,stock:e.target.value}))} style={S.input}/>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
            <div>
              <label style={S.label}>Gender</label>
              <select value={form.gender} onChange={e=>setForm(p=>({...p,gender:e.target.value}))} style={S.select}>
                <option value="unisex">Unisex</option><option value="men">Men</option>
                <option value="women">Women</option><option value="kids">Kids</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Category</label>
              <select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} style={S.select}>
                {['Shirts','T-Shirts','Cargo Pants','Jeans','Jackets','Footwear','Accessories','Luxury','Cosmetics'].map(c=>(
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label style={S.label}>Description</label>
            <textarea rows={3} value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} style={{ ...S.input, resize:'none', lineHeight:1.6 }}/>
          </div>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.4rem' }}>
              <label style={{ ...S.label, margin:0 }}>Image</label>
              <div style={{ display:'flex', gap:'0.35rem' }}>
                {tabBtn('url','Remote URL')}
                {tabBtn('upload','File Upload')}
              </div>
            </div>
            {imgMode === 'url' ? (
              <input type="url" value={form.image} onChange={e=>setForm(p=>({...p,image:e.target.value}))} placeholder="https://..." style={S.input}/>
            ) : (
              <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
                <label style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', padding:'0.75rem', background:C.bgLight, border:`1px solid ${C.border}`, borderRadius:'0.75rem', cursor:'pointer', fontSize:'0.8rem', fontWeight:700, color:C.textMuted }}>
                  <ImageIcon size={16}/> {form.image ? 'Change Image' : 'Upload File'}
                  <input type="file" accept="image/*" onChange={handleFile} style={{ display:'none' }}/>
                </label>
                {form.image && (
                  <div style={{ width:52, height:52, borderRadius:'0.6rem', overflow:'hidden', border:`1px solid ${C.border}`, flexShrink:0 }}>
                    <img src={form.image} alt="preview" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <label style={S.label}>Tags (comma separated)</label>
            <input type="text" value={form.tags} onChange={e=>setForm(p=>({...p,tags:e.target.value}))} placeholder="e.g. casual, premium" style={S.input}/>
          </div>
          <div style={{ display:'flex', gap:'0.75rem', paddingTop:'0.75rem', borderTop:`1px solid ${C.border}` }}>
            <button type="submit" disabled={submitting} style={{ ...S.btnPrimary, flex:1, padding:'0.875rem' }}>
              {submitting ? <Spinner size={16} color="#fff"/> : <><Check size={16}/> Save Changes</>}
            </button>
            <button type="button" onClick={onClose} style={{ ...S.btnSecondary, padding:'0.875rem 1.5rem' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  CONFIRM DELETE MODAL
// ═══════════════════════════════════════════════════════════
const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmLabel='Delete', danger=true }) => (
  <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
    <div style={{ ...S.card, width:'100%', maxWidth:'24rem', padding:'2rem', animation:'cardEntry 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}>
      <div style={{ width:'3rem', height:'3rem', borderRadius:'0.75rem', background:'rgba(239,68,68,0.10)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>
        <AlertTriangle size={22} color="#ef4444"/>
      </div>
      <h3 style={{ margin:0, fontSize:'1.2rem', fontWeight:800, color:C.secondary }}>{title}</h3>
      <p style={{ margin:'0.5rem 0 1.5rem', fontSize:'0.85rem', color:C.textMuted, lineHeight:1.6 }}>{message}</p>
      <div style={{ display:'flex', gap:'0.75rem' }}>
        <button onClick={onConfirm} style={{ ...S.btnPrimary, flex:1, padding:'0.875rem', background: danger ? '#ef4444' : C.primary, boxShadow: danger ? '0 6px 18px rgba(239,68,68,0.22)' : undefined }}>
          {confirmLabel}
        </button>
        <button onClick={onCancel} style={{ ...S.btnSecondary, padding:'0.875rem 1.5rem' }}>Cancel</button>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════
function App() {
  const [vendorUser, setVendorUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vendorUser')) || null; } catch { return null; }
  });
  const [activeTab, setActiveTab]     = useState('Dashboard');
  const [products, setProducts]       = useState([]);
  const [orders, setOrders]           = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [showAddModal, setShowAddModal]       = useState(false);
  const [editProduct, setEditProduct]         = useState(null);
  const [deleteProduct, setDeleteProduct]     = useState(null);
  const [orderFilter, setOrderFilter]         = useState('all');
  const [productFilter, setProductFilter]     = useState('all');
  const [toast, setToast]                     = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const shopId = vendorUser?.shop?.id;

  // Always refresh shop data from server on startup to handle stale shopIds
  useEffect(() => {
    const fetchShop = async () => {
      if (vendorUser && vendorUser.id) {
        try {
          const res = await axios.get(`${API}/admin/shops/owner/${vendorUser.id}`);
          if (res.data.success && res.data.shop) {
            const currentShopId = vendorUser.shop?.id;
            const freshShopId = res.data.shop.id;
            // Update if shop was missing or if the ID changed (e.g. after re-seed)
            if (!currentShopId || currentShopId !== freshShopId) {
              const updated = { ...vendorUser, shop: res.data.shop };
              setVendorUser(updated);
              localStorage.setItem('vendorUser', JSON.stringify(updated));
            }
          }
        } catch (err) {
          console.error('Could not fetch shop for vendor:', err);
        }
      }
    };
    fetchShop();
  }, [vendorUser?.id]);

  const showToast = (msg, type='success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => {
    setVendorUser(null);
    localStorage.removeItem('vendorUser');
  };

  const fetchShopData = async () => {
    if (!shopId) return;
    setLoadingData(true);
    try {
      const [pr, or] = await Promise.all([
        axios.get(`${API}/products/shop/${shopId}`),
        axios.get(`${API}/orders/shop/${shopId}`),
      ]);
      if (pr.data.success) setProducts(pr.data.products);
      if (or.data.success) setOrders(or.data.orders);
    } catch (err) {
      console.error('Error fetching shop data:', err);
    } finally { setLoadingData(false); }
  };

  useEffect(() => { if (vendorUser && shopId) fetchShopData(); }, [vendorUser, shopId]);

  // Auto-refresh every 30s so admin deletions/changes appear in real time
  useEffect(() => {
    if (!vendorUser || !shopId) return;
    const interval = setInterval(() => {
      fetchShopData();
    }, 30000);
    return () => clearInterval(interval);
  }, [vendorUser, shopId]);

  // ─── Product CRUD ─────────────────────────────────────
  const handleCreateProduct = async (data) => {
    try {
      const res = await axios.post(`${API}/products/vendor`, data);
      if (res.data.success) {
        setShowAddModal(false); fetchShopData();
        showToast('Product submitted for approval!');
      }
    } catch (err) { showToast(err.response?.data?.message || 'Failed to create product.', 'error'); }
  };

  const handleUpdateProduct = async (id, data) => {
    try {
      const res = await axios.put(`${API}/products/vendor/${id}`, data);
      if (res.data.success) {
        setEditProduct(null); fetchShopData();
        showToast('Product updated! Pending admin review.');
      }
    } catch (err) { showToast('Failed to update product.', 'error'); }
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await axios.delete(`${API}/products/vendor/${deleteProduct.id}`);
      if (res.data.success) {
        setDeleteProduct(null); fetchShopData();
        showToast('Product removed successfully.');
      }
    } catch (err) { showToast('Failed to delete product.', 'error'); }
  };

  // ─── Order Actions ─────────────────────────────────────
  const handleOrderStatus = async (orderId, status, paymentStatus) => {
    try {
      const payload = {};
      if (status) payload.status = status;
      if (paymentStatus) payload.paymentStatus = paymentStatus;
      const res = await axios.put(`${API}/orders/${orderId}/status`, payload);
      if (res.data.success) { fetchShopData(); showToast('Order status updated!'); }
    } catch (err) { showToast('Failed to update order.', 'error'); }
  };

  if (!vendorUser) {
    return <VendorLoginView onLoginSuccess={user => { setVendorUser(user); localStorage.setItem('vendorUser', JSON.stringify(user)); }}/>;
  }

  // ─── Computed Values ────────────────────────────────────
  const totalSales = orders.filter(o => o.paymentStatus === 'completed' || o.status === 'delivered').reduce((s, o) => s + Number(o.totalAmount), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const lowStockCount = products.filter(p => p.stock <= 5).length;
  const approvedProducts = products.filter(p => p.status === 'approved');
  const estCOGS = totalSales * 0.60;
  const estComm = totalSales * 0.10;
  const netEarnings = totalSales - estCOGS - estComm;

  const filteredProducts = products.filter(p => productFilter === 'all' ? true : p.status === productFilter);
  const filteredOrders   = orders.filter(o => orderFilter === 'all' ? true : o.status === orderFilter);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Products',  icon: Package },
    { name: 'Orders',    icon: ShoppingBag },
    { name: 'Earnings',  icon: DollarSign },
  ];

  // ─── Sidebar ─────────────────────────────────────────────
  const sidebarStyle = {
    width: '260px', flexShrink: 0,
    background: 'linear-gradient(180deg, #282c3f 0%, #1a1a2e 100%)',
    display: 'flex', flexDirection: 'column',
    color: '#fff', fontFamily: "'Outfit','Inter',sans-serif",
    minHeight: '100vh', position: 'sticky', top: 0, overflowY: 'auto',
  };

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:C.bgLight, fontFamily:"'Outfit','Inter',sans-serif", color:C.secondary }}>

      {/* ── Sidebar ── */}
      <aside style={sidebarStyle}>
        {/* Logo */}
        <div style={{ padding:'1.5rem 1.25rem 1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <div style={{ width:'2.4rem', height:'2.4rem', background:C.primary, borderRadius:'0.7rem', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'1rem', flexShrink:0, boxShadow:'0 6px 18px rgba(255,63,108,0.30)' }}>D</div>
          <div>
            <div style={{ fontWeight:900, fontSize:'1.05rem', letterSpacing:'-0.03em', lineHeight:1 }}>DRIPZO</div>
            <div style={{ fontSize:'0.6rem', color:C.primary, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'2px' }}>Vendor Hub</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'0.5rem 0.75rem', display:'flex', flexDirection:'column', gap:'0.25rem' }}>
          {navItems.map(item => {
            const active = activeTab === item.name;
            return (
              <button key={item.name} onClick={() => setActiveTab(item.name)} style={{
                display:'flex', alignItems:'center', gap:'0.75rem',
                padding:'0.75rem 1rem', borderRadius:'0.7rem',
                border:'none', cursor:'pointer', width:'100%', textAlign:'left',
                fontFamily:"'Outfit','Inter',sans-serif", fontSize:'0.875rem', fontWeight:700,
                background: active ? 'rgba(255,63,108,0.12)' : 'transparent',
                color: active ? C.primary : 'rgba(255,255,255,0.55)',
                borderRight: active ? `3px solid ${C.primary}` : '3px solid transparent',
                transition: 'all 0.2s',
              }}>
                <item.icon size={17}/>
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Shop stats quick bar */}
        <div style={{ padding:'0.75rem', margin:'0 0.75rem 0.75rem', borderRadius:'0.75rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ margin:'0 0 0.5rem', fontSize:'0.6rem', fontWeight:900, color:'rgba(255,255,255,0.30)', textTransform:'uppercase', letterSpacing:'0.1em' }}>Quick Stats</p>
          {[
            { label:'Products', value: products.length, color:'#a78bfa' },
            { label:'Pending', value: products.filter(p=>p.status==='pending').length, color:'#fbbf24' },
            { label:'Orders', value: orders.length, color:'#34d399' },
          ].map(s => (
            <div key={s.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.3rem' }}>
              <span style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.40)', fontWeight:600 }}>{s.label}</span>
              <span style={{ fontSize:'0.85rem', fontWeight:900, color:s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* User Profile Footer */}
        <div style={{ padding:'1rem 1.25rem', borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.65rem', minWidth:0 }}>
            <div style={{ width:'2.25rem', height:'2.25rem', borderRadius:'0.6rem', background:C.primary, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'0.85rem', flexShrink:0, boxShadow:'0 4px 12px rgba(255,63,108,0.25)' }}>
              {vendorUser.name?.slice(0,2).toUpperCase()}
            </div>
            <div style={{ minWidth:0 }}>
              <p style={{ margin:0, fontSize:'0.78rem', fontWeight:800, color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'120px' }}>{vendorUser.name}</p>
              <p style={{ margin:0, fontSize:'0.62rem', color:'rgba(255,255,255,0.35)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'120px' }}>{vendorUser.shop?.name || 'My Boutique'}</p>
            </div>
          </div>
          <button onClick={handleLogout} title="Logout" style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.35)', display:'flex', padding:'0.25rem', borderRadius:'0.4rem' }}
            onMouseEnter={e=>e.currentTarget.style.color=C.primary}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.35)'}>
            <LogOut size={16}/>
          </button>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, maxHeight:'100vh', overflow:'hidden' }}>

        {/* Header */}
        <header style={{ height:'70px', background:C.white, borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 2rem', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', background:C.bgLight, borderRadius:'0.75rem', padding:'0.55rem 1rem', width:'280px' }}>
            <Search size={14} color={C.textMuted}/>
            <input type="text" placeholder="Search inventory, orders..." style={{ background:'none', border:'none', outline:'none', fontSize:'0.8rem', color:C.secondary, fontFamily:"'Outfit','Inter',sans-serif", width:'100%' }}/>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <button onClick={fetchShopData} title="Refresh data" style={{ background:C.bgLight, border:'none', borderRadius:'0.65rem', width:'2.4rem', height:'2.4rem', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:C.textMuted }}>
              <RefreshCw size={15}/>
            </button>
            <div style={{ width:'1px', height:'1.5rem', background:C.border }}/>
            <span style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.75rem', fontWeight:700, background:'#ecfdf5', color:'#059669', border:'1px solid #a7f3d0', borderRadius:'0.65rem', padding:'0.4rem 0.75rem' }}>
              <span style={{ width:'6px', height:'6px', background:'#10b981', borderRadius:'50%', animation:'pulse 2s infinite' }}/>
              Shop Active
            </span>
            <div ref={notifRef} style={{ position:'relative' }}>
              <button onClick={() => setShowNotifications(v => !v)} style={{ width:'2.4rem', height:'2.4rem', borderRadius:'0.65rem', background: showNotifications ? '#fff0f3' : C.bgLight, border:'none', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', cursor:'pointer' }}>
                <Bell size={16} color={showNotifications ? C.primary : C.textMuted}/>
                {(pendingOrdersCount + products.filter(p => p.stock <= 5).length + products.filter(p => p.status === 'pending').length) > 0 && <span style={{ position:'absolute', top:'4px', right:'4px', minWidth:'14px', height:'14px', background:C.primary, borderRadius:'10px', border:`2px solid ${C.white}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.5rem', fontWeight:900, color:'#fff', padding:'0 2px' }}>{pendingOrdersCount + products.filter(p => p.stock <= 5).length + products.filter(p => p.status === 'pending').length}</span>}
              </button>
              {showNotifications && (
                <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:'340px', background:C.white, border:`1px solid ${C.border}`, borderRadius:'1rem', boxShadow:'0 16px 48px rgba(40,44,63,0.15)', zIndex:100, overflow:'hidden', animation:'cardEntry 0.25s ease both' }}>
                  <div style={{ padding:'1rem 1.25rem', borderBottom:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <h4 style={{ margin:0, fontSize:'0.95rem', fontWeight:800, color:C.secondary }}>Notifications</h4>
                    <span style={{ fontSize:'0.6rem', fontWeight:800, background:'#fff0f3', color:C.primary, padding:'0.15rem 0.5rem', borderRadius:'0.4rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>
                      {pendingOrdersCount + products.filter(p => p.stock <= 5).length + products.filter(p => p.status === 'pending').length} New
                    </span>
                  </div>
                  <div style={{ maxHeight:'320px', overflowY:'auto' }}>
                    {pendingOrdersCount > 0 && (
                      <button onClick={() => { setActiveTab('Orders'); setOrderFilter('pending'); setShowNotifications(false); }} style={{ width:'100%', display:'flex', alignItems:'flex-start', gap:'0.75rem', padding:'0.875rem 1.25rem', background:'none', border:'none', borderBottom:`1px solid ${C.border}`, cursor:'pointer', textAlign:'left', fontFamily:"'Outfit','Inter',sans-serif", transition:'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background=C.bgLight}
                        onMouseLeave={e => e.currentTarget.style.background='none'}>
                        <div style={{ width:'2rem', height:'2rem', borderRadius:'0.5rem', background:'#fffbeb', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <ShoppingBag size={14} color='#d97706'/>
                        </div>
                        <div>
                          <p style={{ margin:0, fontSize:'0.78rem', fontWeight:700, color:C.secondary }}>{pendingOrdersCount} Pending Order{pendingOrdersCount > 1 ? 's' : ''}</p>
                          <p style={{ margin:'2px 0 0', fontSize:'0.65rem', color:C.textMuted }}>Needs your attention — review and accept</p>
                        </div>
                      </button>
                    )}
                    {products.filter(p => p.stock <= 5).length > 0 && (
                      <button onClick={() => { setActiveTab('Products'); setProductFilter('all'); setShowNotifications(false); }} style={{ width:'100%', display:'flex', alignItems:'flex-start', gap:'0.75rem', padding:'0.875rem 1.25rem', background:'none', border:'none', borderBottom:`1px solid ${C.border}`, cursor:'pointer', textAlign:'left', fontFamily:"'Outfit','Inter',sans-serif", transition:'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background=C.bgLight}
                        onMouseLeave={e => e.currentTarget.style.background='none'}>
                        <div style={{ width:'2rem', height:'2rem', borderRadius:'0.5rem', background:'#fef2f2', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <AlertTriangle size={14} color='#dc2626'/>
                        </div>
                        <div>
                          <p style={{ margin:0, fontSize:'0.78rem', fontWeight:700, color:C.secondary }}>{products.filter(p => p.stock <= 5).length} Low Stock Item{products.filter(p => p.stock <= 5).length > 1 ? 's' : ''}</p>
                          <p style={{ margin:'2px 0 0', fontSize:'0.65rem', color:C.textMuted }}>Stock ≤ 5 units — consider restocking</p>
                        </div>
                      </button>
                    )}
                    {products.filter(p => p.status === 'pending').length > 0 && (
                      <button onClick={() => { setActiveTab('Products'); setProductFilter('pending'); setShowNotifications(false); }} style={{ width:'100%', display:'flex', alignItems:'flex-start', gap:'0.75rem', padding:'0.875rem 1.25rem', background:'none', border:'none', borderBottom:`1px solid ${C.border}`, cursor:'pointer', textAlign:'left', fontFamily:"'Outfit','Inter',sans-serif", transition:'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background=C.bgLight}
                        onMouseLeave={e => e.currentTarget.style.background='none'}>
                        <div style={{ width:'2rem', height:'2rem', borderRadius:'0.5rem', background:'#fffbeb', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Activity size={14} color='#d97706'/>
                        </div>
                        <div>
                          <p style={{ margin:0, fontSize:'0.78rem', fontWeight:700, color:C.secondary }}>{products.filter(p => p.status === 'pending').length} Product{products.filter(p => p.status === 'pending').length > 1 ? 's' : ''} Awaiting Approval</p>
                          <p style={{ margin:'2px 0 0', fontSize:'0.65rem', color:C.textMuted }}>Submitted to admin for review</p>
                        </div>
                      </button>
                    )}
                    {orders.filter(o => o.status === 'delivered').length > 0 && (
                      <button onClick={() => { setActiveTab('Orders'); setOrderFilter('delivered'); setShowNotifications(false); }} style={{ width:'100%', display:'flex', alignItems:'flex-start', gap:'0.75rem', padding:'0.875rem 1.25rem', background:'none', border:'none', borderBottom:`1px solid ${C.border}`, cursor:'pointer', textAlign:'left', fontFamily:"'Outfit','Inter',sans-serif", transition:'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background=C.bgLight}
                        onMouseLeave={e => e.currentTarget.style.background='none'}>
                        <div style={{ width:'2rem', height:'2rem', borderRadius:'0.5rem', background:'#ecfdf5', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <CheckCircle size={14} color='#059669'/>
                        </div>
                        <div>
                          <p style={{ margin:0, fontSize:'0.78rem', fontWeight:700, color:C.secondary }}>{orders.filter(o => o.status === 'delivered').length} Delivered Order{orders.filter(o => o.status === 'delivered').length > 1 ? 's' : ''}</p>
                          <p style={{ margin:'2px 0 0', fontSize:'0.65rem', color:C.textMuted }}>Successfully fulfilled and completed</p>
                        </div>
                      </button>
                    )}
                    {products.length > 0 && (
                      <button onClick={() => { setActiveTab('Products'); setProductFilter('approved'); setShowNotifications(false); }} style={{ width:'100%', display:'flex', alignItems:'flex-start', gap:'0.75rem', padding:'0.875rem 1.25rem', background:'none', border:'none', borderBottom:`1px solid ${C.border}`, cursor:'pointer', textAlign:'left', fontFamily:"'Outfit','Inter',sans-serif", transition:'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background=C.bgLight}
                        onMouseLeave={e => e.currentTarget.style.background='none'}>
                        <div style={{ width:'2rem', height:'2rem', borderRadius:'0.5rem', background:'#eff6ff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Package size={14} color='#3b82f6'/>
                        </div>
                        <div>
                          <p style={{ margin:0, fontSize:'0.78rem', fontWeight:700, color:C.secondary }}>{products.filter(p => p.status === 'approved').length} Live Products</p>
                          <p style={{ margin:'2px 0 0', fontSize:'0.65rem', color:C.textMuted }}>Currently visible to customers</p>
                        </div>
                      </button>
                    )}
                    {pendingOrdersCount === 0 && products.filter(p => p.stock <= 5).length === 0 && products.filter(p => p.status === 'pending').length === 0 && orders.length === 0 && products.length === 0 && (
                      <div style={{ padding:'2.5rem 1.25rem', textAlign:'center', color:C.textMuted }}>
                        <Bell size={28} color={C.border} style={{ display:'block', margin:'0 auto 0.75rem' }}/>
                        <p style={{ margin:0, fontSize:'0.82rem', fontWeight:700 }}>All caught up!</p>
                        <p style={{ margin:'4px 0 0', fontSize:'0.7rem' }}>No new notifications right now.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, overflowY:'auto', padding:'2rem' }}>
          {loadingData ? (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh' }}>
              <Spinner size={40}/>
            </div>
          ) : (
            <>
              {/* ════════════════════════ DASHBOARD ════════════════════════ */}
              {activeTab === 'Dashboard' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'1.75rem', animation:'fadeIn 0.4s ease both' }}>
                  {/* Heading */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
                    <div>
                      <h2 style={{ margin:0, fontSize:'1.6rem', fontWeight:800, color:C.secondary }}>{vendorUser.shop?.name || 'Vendor Store'} Overview</h2>
                      <p style={{ margin:'0.25rem 0 0', fontSize:'0.85rem', color:C.textMuted }}>Manage your catalogue, fulfill orders, and track payouts.</p>
                    </div>
                    <button onClick={() => setShowAddModal(true)} style={{ ...S.btnPrimary, padding:'0.75rem 1.25rem' }}>
                      <Plus size={16}/> Request Product Approval
                    </button>
                  </div>

                  {/* Stat Cards */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }}>
                    {[
                      { label:'Total Revenue', value:`₹${totalSales.toLocaleString('en-IN')}`, icon:DollarSign, iconBg:'#fff0f3', iconColor:C.primary, badge:'+14.2%', badgeBg:'#ecfdf5', badgeColor:'#059669' },
                      { label:'Pending Orders', value:pendingOrdersCount, icon:ShoppingBag, iconBg:'#eff6ff', iconColor:'#3b82f6', badge:'Live', badgeBg:'#eff6ff', badgeColor:'#3b82f6' },
                      { label:'Low Stock Items', value:lowStockCount, icon:AlertTriangle, iconBg:'#fffbeb', iconColor:'#f59e0b', badge:'Review', badgeBg:'#fffbeb', badgeColor:'#d97706' },
                    ].map(st => (
                      <div key={st.label} style={{ ...S.card, padding:'1.5rem', transition:'all 0.25s' }}
                        onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 30px rgba(40,44,63,0.10)'; }}
                        onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=S.card.boxShadow; }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                          <div style={{ padding:'0.65rem', borderRadius:'0.65rem', background:st.iconBg, color:st.iconColor }}>
                            <st.icon size={20}/>
                          </div>
                          <span style={{ fontSize:'0.65rem', fontWeight:900, background:st.badgeBg, color:st.badgeColor, border:`1px solid ${st.badgeBg}`, borderRadius:'0.4rem', padding:'0.15rem 0.5rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>{st.badge}</span>
                        </div>
                        <p style={{ margin:'0 0 0.25rem', fontSize:'0.65rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>{st.label}</p>
                        <p style={{ margin:0, fontSize:'1.65rem', fontWeight:900, color:C.secondary }}>{st.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Orders + Performance */}
                  <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.25rem' }}>
                    {/* Recent Transactions */}
                    <div style={{ ...S.card, padding:'1.5rem' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
                        <h3 style={{ margin:0, fontWeight:800, fontSize:'1.05rem', color:C.secondary }}>Recent Payout Transactions</h3>
                        <span style={{ fontSize:'0.65rem', fontWeight:900, background:'#fff0f3', color:C.primary, border:`1px solid #ffd0db`, borderRadius:'0.4rem', padding:'0.2rem 0.6rem' }}>Orders Ledger</span>
                      </div>
                      {orders.length === 0 ? (
                        <div style={{ textAlign:'center', padding:'3rem 1rem', color:C.textMuted, fontSize:'0.875rem' }}>No order transactions yet.</div>
                      ) : (
                        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                          {orders.slice(0, 4).map(o => (
                            <div key={o.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.875rem', background:C.bgLight, borderRadius:'0.75rem', border:`1px solid ${C.border}` }}>
                              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                                <div style={{ width:'2.4rem', height:'2.4rem', borderRadius:'0.6rem', background:'#fff0f3', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                  <ShoppingBag size={16} color={C.primary}/>
                                </div>
                                <div>
                                  <p style={{ margin:0, fontWeight:700, fontSize:'0.82rem', color:C.secondary }}>Order #{o.id.slice(0,8).toUpperCase()}</p>
                                  <p style={{ margin:0, fontSize:'0.7rem', color:C.textMuted, marginTop:'1px' }}>{o.products?.length||1} item(s) · <span style={{ textTransform:'uppercase', fontWeight:700, color:C.primary }}>{o.paymentMethod}</span></p>
                                </div>
                              </div>
                              <div style={{ textAlign:'right' }}>
                                <p style={{ margin:0, fontWeight:900, fontSize:'0.9rem', color:C.secondary }}>₹{Number(o.totalAmount).toLocaleString('en-IN')}</p>
                                <OrderBadge status={o.status}/>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <button onClick={() => setActiveTab('Orders')} style={{ ...S.btnSecondary, width:'100%', marginTop:'1rem', padding:'0.75rem' }}>
                        Go to Order Terminal ({pendingOrdersCount} Pending)
                      </button>
                    </div>

                    {/* Store Performance */}
                    <div style={{ ...S.card, padding:'1.5rem', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                      <div>
                        <h3 style={{ margin:'0 0 1.25rem', fontWeight:800, fontSize:'1.05rem', color:C.secondary }}>Store Performance</h3>
                        {[
                          { label:'Total Products', sub:'In your catalogue', value:products.length, color:'#059669' },
                          { label:'Pending Reviews', sub:'Awaiting admin', value:products.filter(p=>p.status==='pending').length, color:'#d97706' },
                          { label:'Approved & Live', sub:'Visible to buyers', value:approvedProducts.length, color:C.primary },
                          { label:'Rejected', sub:'Needs edits', value:products.filter(p=>p.status==='rejected').length, color:'#dc2626' },
                        ].map((m, i, arr) => (
                          <div key={m.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'0.875rem', marginBottom:'0.875rem', borderBottom: i<arr.length-1 ? `1px solid ${C.border}` : 'none' }}>
                            <div>
                              <p style={{ margin:0, fontSize:'0.82rem', fontWeight:700, color:C.secondary }}>{m.label}</p>
                              <p style={{ margin:0, fontSize:'0.7rem', color:C.textMuted }}>{m.sub}</p>
                            </div>
                            <span style={{ fontSize:'1.25rem', fontWeight:900, color:m.color }}>{m.value}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setActiveTab('Earnings')} style={{ ...S.btnSecondary, width:'100%', padding:'0.75rem' }}>
                        <Activity size={14}/> View Earnings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════════════════════ PRODUCTS ════════════════════════ */}
              {activeTab === 'Products' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', animation:'fadeIn 0.4s ease both' }}>
                  {/* Header */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
                    <div>
                      <h2 style={{ margin:0, fontSize:'1.6rem', fontWeight:800, color:C.secondary }}>My Boutique Products</h2>
                      <p style={{ margin:'0.25rem 0 0', fontSize:'0.85rem', color:C.textMuted }}>Manage product statuses, stock levels, and pricing.</p>
                    </div>
                    <button onClick={() => setShowAddModal(true)} style={{ ...S.btnPrimary, padding:'0.75rem 1.25rem' }}>
                      <Plus size={16}/> Request New Approval
                    </button>
                  </div>

                  {/* Filter tabs */}
                  <div style={{ display:'flex', gap:'0.5rem', padding:'0 0 1rem', borderBottom:`1px solid ${C.border}` }}>
                    {['all','pending','approved','rejected'].map(f => (
                      <button key={f} onClick={() => setProductFilter(f)} style={{
                        padding:'0.5rem 1rem', borderRadius:'0.65rem', border:'none', cursor:'pointer',
                        fontFamily:"'Outfit','Inter',sans-serif", fontSize:'0.75rem', fontWeight:800,
                        background: productFilter===f ? C.primary : C.white,
                        color: productFilter===f ? '#fff' : C.textMuted,
                        boxShadow: productFilter===f ? '0 4px 14px rgba(255,63,108,0.22)' : `0 1px 3px rgba(40,44,63,0.06)`,
                        border: productFilter!==f ? `1px solid ${C.border}` : 'none',
                        textTransform:'capitalize',
                      }}>
                        {f === 'all' ? `All (${products.length})` : f === 'pending' ? `Pending (${products.filter(p=>p.status==='pending').length})` : f === 'approved' ? `Approved (${products.filter(p=>p.status==='approved').length})` : `Rejected (${products.filter(p=>p.status==='rejected').length})`}
                      </button>
                    ))}
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div style={{ ...S.card, padding:'5rem', textAlign:'center', color:C.textMuted }}>
                      <Package size={48} color={C.border} style={{ display:'block', margin:'0 auto 1rem' }}/>
                      <p style={{ margin:0, fontWeight:700 }}>No products found. Click "Request New Approval" to add your first product!</p>
                    </div>
                  ) : (
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1.25rem' }}>
                      {filteredProducts.map(p => (
                        <div key={p.id} style={{ ...S.card, borderRadius:'1rem', overflow:'hidden', display:'flex', flexDirection:'column', transition:'all 0.25s' }}
                          onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(40,44,63,0.12)'; }}
                          onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=S.card.boxShadow; }}>
                          {/* Image */}
                          <div style={{ height:'180px', background:C.bgLight, overflow:'hidden', position:'relative' }}>
                            <img src={p.images?.[0] || p.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=70'} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }}
                              onMouseEnter={e=>e.target.style.transform='scale(1.06)'}
                              onMouseLeave={e=>e.target.style.transform=''}
                              onError={e=>{ e.target.onerror=null; e.target.src='https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=70'; }}/>
                            <span style={{ position:'absolute', top:'8px', left:'8px', background:'rgba(40,44,63,0.80)', backdropFilter:'blur(6px)', color:'#fff', fontSize:'0.6rem', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.08em', padding:'0.2rem 0.5rem', borderRadius:'4px' }}>
                              {p.category}
                            </span>
                            <div style={{ position:'absolute', top:'6px', right:'6px', display:'flex', gap:'4px' }}>
                              <button onClick={() => setEditProduct(p)} title="Edit product"
                                style={{ background:'rgba(255,255,255,0.90)', border:'none', borderRadius:'0.45rem', width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:C.secondary }}>
                                <Edit3 size={13}/>
                              </button>
                              <button onClick={() => setDeleteProduct(p)} title="Delete product"
                                style={{ background:'rgba(255,63,108,0.90)', border:'none', borderRadius:'0.45rem', width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#fff' }}>
                                <Trash2 size={13}/>
                              </button>
                            </div>
                          </div>
                          {/* Info */}
                          <div style={{ padding:'1rem', flex:1 }}>
                            <StatusBadge status={p.status}/>
                            <h3 style={{ margin:'0.5rem 0 0.25rem', fontSize:'0.9rem', fontWeight:800, color:C.secondary, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>{p.title}</h3>
                            <p style={{ margin:'0 0 0.6rem', fontSize:'0.75rem', color:C.textMuted, textTransform:'capitalize' }}>{p.gender} · Stock: <strong style={{ color: p.stock<=5 ? C.primary : C.secondary }}>{p.stock}</strong></p>
                            <p style={{ margin:0, fontSize:'1rem', fontWeight:900, color:C.primary }}>₹{Number(p.price).toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ════════════════════════ ORDERS ════════════════════════ */}
              {activeTab === 'Orders' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', animation:'fadeIn 0.4s ease both' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem' }}>
                    <div>
                      <h2 style={{ margin:0, fontSize:'1.6rem', fontWeight:800, color:C.secondary }}>Live Order Terminal</h2>
                      <p style={{ margin:'0.25rem 0 0', fontSize:'0.85rem', color:C.textMuted }}>Accept, fulfill, and track all incoming shop orders.</p>
                    </div>
                    {/* Filter pills */}
                    <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
                      {['all','pending','accepted','out_for_delivery','delivered','cancelled'].map(f => (
                        <button key={f} onClick={() => setOrderFilter(f)} style={{
                          padding:'0.4rem 0.85rem', borderRadius:'2rem', border:'none', cursor:'pointer',
                          fontFamily:"'Outfit','Inter',sans-serif", fontSize:'0.7rem', fontWeight:800,
                          background: orderFilter===f ? C.secondary : C.white,
                          color: orderFilter===f ? '#fff' : C.textMuted,
                          border: `1px solid ${orderFilter===f ? C.secondary : C.border}`,
                          textTransform:'capitalize',
                        }}>{f.replace('_',' ')}</button>
                      ))}
                    </div>
                  </div>

                  {filteredOrders.length === 0 ? (
                    <div style={{ ...S.card, padding:'5rem', textAlign:'center', color:C.textMuted }}>
                      <ShoppingBag size={48} color={C.border} style={{ display:'block', margin:'0 auto 1rem' }}/>
                      <p style={{ margin:0, fontWeight:700 }}>No orders found for this filter.</p>
                    </div>
                  ) : (
                    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                      {filteredOrders.map(o => {
                        const orderDate = new Date(o.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
                        return (
                          <div key={o.id} style={{ ...S.card, padding:'1.5rem', borderRadius:'1rem' }}>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem' }}>
                              {/* Left: Order info */}
                              <div style={{ flex:1, minWidth:200 }}>
                                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.75rem', flexWrap:'wrap' }}>
                                  <span style={{ fontFamily:'monospace', fontWeight:900, color:C.primary, fontSize:'0.95rem' }}>
                                    #{o.id.slice(0,8).toUpperCase()}
                                  </span>
                                  <span style={{ fontSize:'0.7rem', color:C.textMuted }}>{orderDate}</span>
                                  <OrderBadge status={o.paymentStatus}/>
                                  <OrderBadge status={o.status}/>
                                </div>
                                {/* Customer */}
                                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'0.75rem' }}>
                                  <div>
                                    <p style={{ margin:'0 0 2px', fontSize:'0.6rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>Customer</p>
                                    <p style={{ margin:0, fontWeight:700, fontSize:'0.82rem', color:C.secondary }}>{o.User?.name || 'Customer'}</p>
                                    <p style={{ margin:0, fontSize:'0.72rem', color:C.textMuted }}>{o.User?.email || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p style={{ margin:'0 0 2px', fontSize:'0.6rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>Delivery Address</p>
                                    <p style={{ margin:0, fontWeight:600, fontSize:'0.8rem', color:C.secondary }}>{o.deliveryAddress?.street || 'N/A'}</p>
                                    <p style={{ margin:0, fontSize:'0.72rem', color:C.textMuted }}>{o.deliveryAddress?.city || ''}</p>
                                  </div>
                                </div>
                                {/* Products */}
                                <div style={{ background:C.bgLight, borderRadius:'0.6rem', padding:'0.65rem 0.85rem', border:`1px solid ${C.border}` }}>
                                  <p style={{ margin:'0 0 0.4rem', fontSize:'0.6rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>Items Ordered</p>
                                  {o.products?.map((item, idx) => (
                                    <div key={idx} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', fontWeight:600, color:C.secondary, padding:'0.15rem 0' }}>
                                      <span>• {item.name || `Product`} {item.size ? `(${item.size})` : ''}</span>
                                      <span style={{ color:C.textMuted }}>{item.quantity}× ₹{Number(item.price).toLocaleString('en-IN')}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Right: Amount & Actions */}
                              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'space-between', gap:'1rem', minWidth:180 }}>
                                <div style={{ textAlign:'right' }}>
                                  <p style={{ margin:'0 0 2px', fontSize:'0.6rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>Order Total</p>
                                  <p style={{ margin:0, fontSize:'1.55rem', fontWeight:900, color:C.secondary }}>₹{Number(o.totalAmount).toLocaleString('en-IN')}</p>
                                  <p style={{ margin:0, fontSize:'0.72rem', color:'#059669', fontWeight:700 }}>+₹{Number(o.deliveryFee||0).toFixed(0)} delivery</p>
                                </div>
                                {/* Action buttons */}
                                <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem', width:'100%' }}>
                                  {o.status === 'pending' && <>
                                    <button onClick={() => handleOrderStatus(o.id,'accepted',null)}
                                      style={{ ...S.btnPrimary, width:'100%', padding:'0.6rem', background:'#10b981', boxShadow:'0 4px 14px rgba(16,185,129,0.22)' }}>
                                      <Check size={14}/> Accept Order
                                    </button>
                                    <button onClick={() => handleOrderStatus(o.id,'cancelled','refunded')}
                                      style={{ ...S.btnSecondary, width:'100%', padding:'0.6rem', color:'#ef4444', borderColor:'#fecaca' }}>
                                      <X size={14}/> Reject
                                    </button>
                                  </>}
                                  {o.status === 'accepted' && (
                                    <button onClick={() => handleOrderStatus(o.id,'out_for_delivery',null)}
                                      style={{ ...S.btnPrimary, width:'100%', padding:'0.6rem', background:'#f59e0b', boxShadow:'0 4px 14px rgba(245,158,11,0.22)' }}>
                                      <Truck size={14}/> Dispatch Order
                                    </button>
                                  )}
                                  {o.status === 'out_for_delivery' && (
                                    <button onClick={() => handleOrderStatus(o.id,'delivered','completed')}
                                      style={{ ...S.btnPrimary, width:'100%', padding:'0.6rem' }}>
                                      <CheckCircle size={14}/> Mark Delivered
                                    </button>
                                  )}
                                  {o.status === 'delivered' && (
                                    <span style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.78rem', fontWeight:800, color:'#059669', justifyContent:'flex-end' }}>
                                      <CheckCircle size={15}/> Completed
                                    </span>
                                  )}
                                  {o.status === 'cancelled' && (
                                    <span style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.78rem', fontWeight:800, color:'#dc2626', justifyContent:'flex-end' }}>
                                      <X size={15}/> Cancelled
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ════════════════════════ EARNINGS ════════════════════════ */}
              {activeTab === 'Earnings' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', animation:'fadeIn 0.4s ease both' }}>
                  <div>
                    <h2 style={{ margin:0, fontSize:'1.6rem', fontWeight:800, color:C.secondary }}>Payout & Earnings Ledger</h2>
                    <p style={{ margin:'0.25rem 0 0', fontSize:'0.85rem', color:C.textMuted }}>Revenue share estimations, platform fees, and net profit projections.</p>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.25rem' }}>
                    {/* P&L Ledger */}
                    <div style={{ ...S.card, padding:'1.75rem' }}>
                      <h3 style={{ margin:'0 0 1.5rem', display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'1.1rem', fontWeight:800, color:C.primary, paddingBottom:'1rem', borderBottom:`1px solid ${C.border}` }}>
                        <FileText size={18}/> Profit & Loss Statement
                      </h3>
                      {[
                        { label:'Gross Sales Revenue', sub:'Completed & delivered orders', value:`₹${totalSales.toLocaleString('en-IN')}`, color:C.secondary, sign:'' },
                        { label:'Est. Cost of Goods Sold (60%)', sub:'Sourcing, manufacturing, logistics', value:`₹${estCOGS.toLocaleString('en-IN')}`, color:'#d97706', sign:'−' },
                        { label:'Platform Commission (10%)', sub:'DRIPZO marketplace fee', value:`₹${estComm.toLocaleString('en-IN')}`, color:'#3b82f6', sign:'−' },
                      ].map(row => (
                        <div key={row.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 0', borderBottom:`1px solid ${C.border}` }}>
                          <div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
                            <span style={{ width:'8px', height:'8px', borderRadius:'50%', background: row.sign==='−' ? (row.color) : C.secondary, flexShrink:0 }}/>
                            <div>
                              <p style={{ margin:0, fontSize:'0.75rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.07em' }}>{row.label}</p>
                              <p style={{ margin:0, fontSize:'0.7rem', color:C.textMuted }}>{row.sub}</p>
                            </div>
                          </div>
                          <span style={{ fontWeight:900, fontSize:'1.05rem', color:row.color }}>{row.sign} {row.value}</span>
                        </div>
                      ))}
                      {/* Net */}
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'1.25rem' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
                          <span style={{ width:'10px', height:'10px', borderRadius:'50%', background:C.primary, animation:'pulse 2s infinite' }}/>
                          <div>
                            <p style={{ margin:0, fontSize:'0.8rem', fontWeight:900, color:C.primary, textTransform:'uppercase', letterSpacing:'0.08em' }}>Net Retained Profit</p>
                            <p style={{ margin:0, fontSize:'0.7rem', color:C.textMuted }}>Estimated take-home payout</p>
                          </div>
                        </div>
                        <span style={{ fontWeight:900, fontSize:'1.75rem', color:C.primary }}>₹{netEarnings.toLocaleString('en-IN')}</span>
                      </div>
                      {/* Payout note */}
                      <div style={{ display:'flex', alignItems:'flex-start', gap:'0.65rem', padding:'0.875rem', borderRadius:'0.75rem', background:'#ecfdf5', border:'1px solid #a7f3d0', marginTop:'1.5rem' }}>
                        <CheckCircle size={16} color="#059669" style={{ flexShrink:0, marginTop:'1px' }}/>
                        <p style={{ margin:0, fontSize:'0.72rem', color:'#065f46', fontWeight:700, lineHeight:1.6 }}>DRIPZO processes vendor payouts every Monday directly to your registered bank account. Figures update live with order completions.</p>
                      </div>
                    </div>

                    {/* KPI Cards */}
                    <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
                      {/* Summary heading */}
                      <div style={{ ...S.card, padding:'1.5rem' }}>
                        <h3 style={{ margin:'0 0 1.1rem', fontSize:'1.05rem', fontWeight:800, color:C.secondary }}>Financial KPIs</h3>
                        {[
                          { label:'Gross Margin', value:'40.0%', sub:'After COGS deduction', bg:'#ecfdf5', color:'#059669', icon:TrendingUp },
                          { label:'Net Profit Margin', value:'30.0%', sub:'After all deductions', bg:'#fff0f3', color:C.primary, icon:ArrowUpRight },
                          { label:'Orders Delivered', value:`${orders.filter(o=>o.status==='delivered').length}`, sub:'Successfully fulfilled', bg:'#eff6ff', color:'#3b82f6', icon:CheckCircle },
                          { label:'Approved Products', value:`${approvedProducts.length}`, sub:'Live on store', bg:'#f5f3ff', color:'#7c3aed', icon:Package },
                        ].map(k => (
                          <div key={k.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.85rem', background:k.bg, borderRadius:'0.75rem', marginBottom:'0.65rem' }}>
                            <div>
                              <p style={{ margin:'0 0 2px', fontSize:'0.6rem', fontWeight:900, color:k.color, textTransform:'uppercase', letterSpacing:'0.08em' }}>{k.label}</p>
                              <p style={{ margin:0, fontSize:'1.25rem', fontWeight:900, color:k.color }}>{k.value}</p>
                              <p style={{ margin:0, fontSize:'0.65rem', color:`${k.color}99` }}>{k.sub}</p>
                            </div>
                            <k.icon size={28} color={`${k.color}55`}/>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => window.print()} style={{ ...S.btnSecondary, padding:'0.875rem', background:C.secondary, color:'#fff', border:'none', boxShadow:'0 4px 14px rgba(40,44,63,0.15)' }}>
                        <FileText size={15}/> Print Statement
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ── Modals ── */}
      {showAddModal && <ProductModal onClose={() => setShowAddModal(false)} onSubmit={handleCreateProduct} shopId={shopId}/>}
      {editProduct && <EditProductModal product={editProduct} onClose={() => setEditProduct(null)} onUpdate={handleUpdateProduct}/>}
      {deleteProduct && (
        <ConfirmModal
          title="Remove Product?"
          message={`Are you sure you want to permanently delete "${deleteProduct.title}"? This action cannot be undone.`}
          confirmLabel="Delete Product"
          onConfirm={handleDeleteProduct}
          onCancel={() => setDeleteProduct(null)}
        />
      )}

      {/* ── Toast Notifications ── */}
      {toast && (
        <div style={{
          position:'fixed', bottom:'1.5rem', right:'1.5rem', zIndex:200,
          display:'flex', alignItems:'center', gap:'0.65rem',
          padding:'0.875rem 1.25rem', borderRadius:'0.875rem',
          background: toast.type==='error' ? '#fef2f2' : C.secondary,
          color: toast.type==='error' ? '#dc2626' : '#fff',
          border: `1px solid ${toast.type==='error' ? '#fecaca' : 'rgba(255,255,255,0.1)'}`,
          boxShadow:'0 12px 32px rgba(0,0,0,0.22)',
          fontSize:'0.82rem', fontWeight:700,
          fontFamily:"'Outfit','Inter',sans-serif",
          animation:'slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          {toast.type === 'error' ? <AlertTriangle size={15}/> : <CheckCircle size={15}/>}
          {toast.msg}
        </div>
      )}

      <style>{`
        @keyframes cardEntry { from{opacity:0;transform:scale(0.93) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.45} }
        @keyframes fadeIn    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        body { margin:0; font-family:'Outfit','Inter',sans-serif; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:#f5f5f6; }
        ::-webkit-scrollbar-thumb { background:#d4d5d9; border-radius:3px; }
        ::-webkit-scrollbar-thumb:hover { background:#ff3f6c; }
        input:focus, textarea:focus, select:focus { border-color:#ff3f6c !important; box-shadow:0 0 0 3px rgba(255,63,108,0.10) !important; }
      `}</style>
    </div>
  );
}

export default App;
