import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Store, ShoppingBag, BarChart3, Settings,
  Bell, Search, TrendingUp, ArrowUpRight, Package, Activity, LogOut,
  Plus, Lock, Mail, ShieldCheck, CheckCircle, AlertTriangle, MapPin,
  Check, Percent, Truck, DollarSign, Eye, EyeOff, UserPlus, Trash2,
  X, Edit3, RefreshCw, Image as ImageIcon, FileText
} from 'lucide-react';

const API = 'http://localhost:5000/api';

// ─── Design Tokens ──────────────────────────────────────────
const C = {
  primary:     '#ff3f6c',
  primaryDark: '#e02f5c',
  secondary:   '#282c3f',
  bgLight:     '#f5f5f6',
  textMuted:   '#94969f',
  border:      '#e8e8e1',
  white:       '#ffffff',
};

// ─── Shared Styles ───────────────────────────────────────────
const S = {
  card: {
    background: C.white,
    border: `1px solid ${C.border}`,
    boxShadow: '0 1px 6px rgba(40,44,63,0.07)',
    borderRadius: '1rem',
  },
  input: {
    width: '100%', boxSizing: 'border-box',
    background: C.bgLight, border: `1px solid ${C.border}`,
    borderRadius: '0.75rem', padding: '0.75rem 1rem',
    fontSize: '0.85rem', fontFamily: "'Outfit','Inter',sans-serif",
    color: C.secondary, outline: 'none', transition: 'border 0.2s',
  },
  select: {
    width: '100%', boxSizing: 'border-box',
    background: C.bgLight, border: `1px solid ${C.border}`,
    borderRadius: '0.75rem', padding: '0.75rem 1rem',
    fontSize: '0.85rem', fontFamily: "'Outfit','Inter',sans-serif",
    color: C.secondary, outline: 'none', cursor: 'pointer', appearance: 'none',
  },
  label: {
    display: 'block', fontSize: '0.6rem', fontWeight: 900,
    color: C.textMuted, textTransform: 'uppercase',
    letterSpacing: '0.08em', marginBottom: '0.4rem',
    fontFamily: "'Outfit','Inter',sans-serif",
  },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
    background: C.primary, color: C.white, border: 'none',
    borderRadius: '0.75rem', padding: '0.75rem 1.25rem',
    fontSize: '0.8rem', fontWeight: 700, fontFamily: "'Outfit','Inter',sans-serif",
    cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,63,108,0.22)', transition: 'all 0.2s',
  },
  btnSecondary: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
    background: C.white, color: C.secondary, border: `1px solid ${C.border}`,
    borderRadius: '0.75rem', padding: '0.75rem 1.25rem',
    fontSize: '0.8rem', fontWeight: 700, fontFamily: "'Outfit','Inter',sans-serif",
    cursor: 'pointer', transition: 'all 0.2s',
  },
};

// ─── Spinner ─────────────────────────────────────────────────
const Spinner = ({ size = 36, color = C.primary }) => (
  <div style={{ width: size, height: size, border: `3px solid ${color}33`, borderTop: `3px solid ${color}`, borderRadius: '50%', animation: 'spin 0.75s linear infinite' }} />
);

// ─── Toast ───────────────────────────────────────────────────
const Toast = ({ msg, type }) => (
  <div style={{
    position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 300,
    display: 'flex', alignItems: 'center', gap: '0.65rem',
    padding: '0.875rem 1.25rem', borderRadius: '0.875rem',
    background: type === 'error' ? '#fef2f2' : C.secondary,
    color: type === 'error' ? '#dc2626' : '#fff',
    border: `1px solid ${type === 'error' ? '#fecaca' : 'rgba(255,255,255,0.1)'}`,
    boxShadow: '0 12px 32px rgba(0,0,0,0.22)', fontSize: '0.82rem', fontWeight: 700,
    fontFamily: "'Outfit','Inter',sans-serif",
    animation: 'slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
  }}>
    {type === 'error' ? <AlertTriangle size={15}/> : <CheckCircle size={15}/>}
    {msg}
  </div>
);

// ─── Status Badge ─────────────────────────────────────────────
const Badge = ({ status, type = 'product' }) => {
  const productMap = {
    pending:  { bg:'#fffbeb', color:'#d97706', border:'#fde68a', label:'Pending Review' },
    approved: { bg:'#ecfdf5', color:'#059669', border:'#a7f3d0', label:'Approved & Live' },
    rejected: { bg:'#fef2f2', color:'#dc2626', border:'#fecaca', label:'Rejected' },
  };
  const orderMap = {
    pending:          { bg:'#fef9c3', color:'#a16207', border:'#fde047' },
    accepted:         { bg:'#eff6ff', color:'#1d4ed8', border:'#bfdbfe' },
    picking:          { bg:'#fdf4ff', color:'#7e22ce', border:'#e9d5ff' },
    out_for_delivery: { bg:'#fff7ed', color:'#c2410c', border:'#fed7aa' },
    delivered:        { bg:'#ecfdf5', color:'#065f46', border:'#a7f3d0' },
    cancelled:        { bg:'#fef2f2', color:'#991b1b', border:'#fecaca' },
    paid:             { bg:'#ecfdf5', color:'#065f46', border:'#a7f3d0' },
    failed:           { bg:'#fef2f2', color:'#991b1b', border:'#fecaca' },
    refunded:         { bg:'#eff6ff', color:'#1e40af', border:'#bfdbfe' },
    completed:        { bg:'#ecfdf5', color:'#065f46', border:'#a7f3d0' },
    unpaid:           { bg:'#fef9c3', color:'#a16207', border:'#fde047' },
  };
  const m = type === 'product' ? productMap : orderMap;
  const cfg = m[status] || { bg:'#f5f5f6', color:'#94969f', border:'#e8e8e1', label: status };
  const label = cfg.label || status?.replace('_', ' ');
  return (
    <span style={{
      display: 'inline-block', background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`, borderRadius: '4px',
      padding: '0.18rem 0.5rem', fontSize: '0.6rem', fontWeight: 900,
      textTransform: 'uppercase', letterSpacing: '0.07em',
      fontFamily: "'Outfit','Inter',sans-serif",
    }}>{label}</span>
  );
};

// ─── Confirm Modal ────────────────────────────────────────────
const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmLabel = 'Delete' }) => (
  <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', fontFamily:"'Outfit','Inter',sans-serif" }}>
    <div style={{ ...S.card, width:'100%', maxWidth:'24rem', padding:'2rem', animation:'cardEntry 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}>
      <div style={{ width:'3rem', height:'3rem', borderRadius:'0.75rem', background:'rgba(239,68,68,0.10)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>
        <AlertTriangle size={22} color="#ef4444"/>
      </div>
      <h3 style={{ margin:0, fontSize:'1.2rem', fontWeight:800, color:C.secondary }}>{title}</h3>
      <p style={{ margin:'0.5rem 0 1.5rem', fontSize:'0.85rem', color:C.textMuted, lineHeight:1.6 }}>{message}</p>
      <div style={{ display:'flex', gap:'0.75rem' }}>
        <button onClick={onConfirm} style={{ ...S.btnPrimary, flex:1, padding:'0.875rem', background:'#ef4444', boxShadow:'0 6px 18px rgba(239,68,68,0.22)' }}>{confirmLabel}</button>
        <button onClick={onCancel} style={{ ...S.btnSecondary, padding:'0.875rem 1.5rem' }}>Cancel</button>
      </div>
    </div>
  </div>
);

// ─── Section Header ───────────────────────────────────────────
const SectionHeader = ({ title, subtitle, action }) => (
  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem', marginBottom:'1.75rem', position:'relative', zIndex:10 }}>
    <div>
      <h2 style={{ margin:0, fontSize:'1.6rem', fontWeight:800, color:C.secondary }}>{title}</h2>
      {subtitle && <p style={{ margin:'0.25rem 0 0', fontSize:'0.85rem', color:C.textMuted }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

// ─── Table Wrapper ────────────────────────────────────────────
const DataTable = ({ headers, children, empty }) => (
  <div style={{ ...S.card, overflow:'hidden' }}>
    <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
      <thead>
        <tr style={{ background:C.bgLight, borderBottom:`1px solid ${C.border}` }}>
          {headers.map((h, i) => (
            <th key={i} style={{ padding:'1rem 1.5rem', fontSize:'0.6rem', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.1em', color:C.textMuted, whiteSpace:'nowrap', textAlign: i === headers.length-1 ? 'right' : 'left' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children || (
          <tr><td colSpan={headers.length} style={{ padding:'4rem', textAlign:'center', color:C.textMuted, fontSize:'0.875rem' }}>{empty || 'No data found.'}</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

const TR = ({ children }) => (
  <tr style={{ borderBottom:`1px solid ${C.border}`, transition:'background 0.15s' }}
    onMouseEnter={e => e.currentTarget.style.background = C.bgLight}
    onMouseLeave={e => e.currentTarget.style.background = ''}
  >{children}</tr>
);
const TD = ({ children, align = 'left' }) => (
  <td style={{ padding:'1rem 1.5rem', fontSize:'0.83rem', textAlign:align, verticalAlign:'middle' }}>{children}</td>
);

// ═══════════════════════════════════════════════════════════════
//  LOGIN VIEW
// ═══════════════════════════════════════════════════════════════
const LoginView = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      if (isRegistering) {
        if (secretKey.trim() !== 'DRIPZO_ADMIN_2026') {
          setError('Access Denied: Invalid Administrative Secret Key.'); setLoading(false); return;
        }
        const res = await axios.post(`${API}/auth/register`, { name, email, password, role: 'admin' });
        if (res.data?.token) { setSuccess('Account created! Redirecting...'); setTimeout(() => onLoginSuccess(res.data), 1500); }
        else setError('Registration failed.');
      } else {
        const res = await axios.post(`${API}/auth/login`, { email, password });
        if (res.data?.token) {
          if (res.data.role === 'admin') onLoginSuccess(res.data);
          else setError('Access Denied: Admin privileges required.');
        } else setError('Invalid credentials.');
      }
    } catch (err) { setError(err.response?.data?.message || 'Authentication failed.'); }
    finally { setLoading(false); }
  };

  const iStyle = { width:'100%', boxSizing:'border-box', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'0.75rem', padding:'0.8rem 1rem 0.8rem 2.75rem', color:'#fff', fontSize:'0.85rem', fontFamily:"'Outfit','Inter',sans-serif", outline:'none' };
  const lStyle = { display:'block', fontSize:'0.6rem', fontWeight:900, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.35rem', fontFamily:"'Outfit','Inter',sans-serif" };
  const iconPos = { position:'absolute', left:'0.9rem', top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.28)', pointerEvents:'none' };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0d0f12 0%,#12151c 60%,#0d0f12 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem', position:'relative', overflow:'hidden', fontFamily:"'Outfit','Inter',sans-serif", color:'#fff' }}>
      <div style={{ position:'absolute', top:'-15%', left:'-15%', width:'55%', height:'55%', background:'radial-gradient(circle,rgba(255,63,108,0.15) 0%,transparent 65%)', filter:'blur(60px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-15%', right:'-15%', width:'55%', height:'55%', background:'radial-gradient(circle,rgba(59,130,246,0.10) 0%,transparent 65%)', filter:'blur(60px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }} />

      <div style={{ width:'100%', maxWidth:'26rem', background:'rgba(255,255,255,0.03)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.10)', borderRadius:'1.75rem', padding:'2.25rem', boxShadow:'0 32px 80px rgba(0,0,0,0.55)', position:'relative', zIndex:10, animation:'cardEntry 0.45s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ width:'3.75rem', height:'3.75rem', borderRadius:'1rem', background:'linear-gradient(135deg,#ff3f6c,#e02f5c)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', boxShadow:'0 10px 28px rgba(255,63,108,0.30)' }}>
            {isRegistering ? <UserPlus color="#fff" size={24}/> : <Lock color="#fff" size={24}/>}
          </div>
          <h1 style={{ margin:0, fontSize:'1.45rem', fontWeight:900, letterSpacing:'-0.04em' }}>DRIPZO</h1>
          <p style={{ margin:'0.3rem 0 0', fontSize:'0.62rem', color:'rgba(255,255,255,0.38)', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>
            {isRegistering ? 'Register Admin Account' : 'Admin Gate Control'}
          </p>
        </div>

        {error && <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.1rem', padding:'0.8rem 1rem', borderRadius:'0.7rem', background:'rgba(239,68,68,0.10)', border:'1px solid rgba(239,68,68,0.22)', color:'#f87171', fontSize:'0.75rem', fontWeight:700 }}><AlertTriangle size={14} style={{ flexShrink:0 }}/> {error}</div>}
        {success && <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.1rem', padding:'0.8rem 1rem', borderRadius:'0.7rem', background:'rgba(16,185,129,0.10)', border:'1px solid rgba(16,185,129,0.22)', color:'#34d399', fontSize:'0.75rem', fontWeight:700 }}><CheckCircle size={14} style={{ flexShrink:0 }}/> {success}</div>}

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
          {isRegistering && (
            <div>
              <label style={lStyle}>Full Name</label>
              <div style={{ position:'relative' }}><ShieldCheck size={14} style={iconPos}/><input type="text" required placeholder="e.g. Admin Operator" value={name} onChange={e=>setName(e.target.value)} style={iStyle}/></div>
            </div>
          )}
          <div>
            <label style={lStyle}>Email Address</label>
            <div style={{ position:'relative' }}><Mail size={14} style={iconPos}/><input type="email" required placeholder="admin@dripzo.com" value={email} onChange={e=>setEmail(e.target.value)} style={iStyle}/></div>
          </div>
          <div>
            <label style={lStyle}>Password</label>
            <div style={{ position:'relative' }}>
              <Lock size={14} style={iconPos}/>
              <input type={showPassword?'text':'password'} required placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} style={{ ...iStyle, paddingRight:'3rem' }}/>
              <button type="button" onClick={()=>setShowPassword(!showPassword)} style={{ position:'absolute', right:'0.9rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(255,255,255,0.30)', cursor:'pointer', display:'flex', alignItems:'center' }}>{showPassword?<EyeOff size={14}/>:<Eye size={14}/>}</button>
            </div>
          </div>
          {isRegistering && (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.35rem' }}>
                <label style={{ ...lStyle, margin:0 }}>Admin Secret Key</label>
                <span style={{ fontSize:'0.6rem', color:C.primary, fontWeight:700 }}>Use: DRIPZO_ADMIN_2026</span>
              </div>
              <div style={{ position:'relative' }}><Lock size={14} style={iconPos}/><input type="text" required placeholder="DRIPZO_ADMIN_2026" value={secretKey} onChange={e=>setSecretKey(e.target.value)} style={{ ...iStyle, fontFamily:'monospace' }}/></div>
            </div>
          )}
          <button type="submit" disabled={loading} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.45rem', marginTop:'0.5rem', padding:'0.9rem', width:'100%', boxSizing:'border-box', background:'linear-gradient(135deg,#ff3f6c,#e02f5c)', color:'#fff', border:'none', borderRadius:'0.875rem', fontWeight:700, fontSize:'0.875rem', fontFamily:"'Outfit','Inter',sans-serif", cursor:loading?'not-allowed':'pointer', boxShadow:'0 8px 24px rgba(255,63,108,0.28)', opacity:loading?0.6:1 }}>
            {loading ? <Spinner size={18} color="#fff"/> : <><ShieldCheck size={16}/>{isRegistering?'Register Admin Session':'Authenticate Session'}</>}
          </button>
        </form>

        <div style={{ textAlign:'center', marginTop:'1.25rem', paddingTop:'1.1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
          <button onClick={()=>{setIsRegistering(!isRegistering);setError('');setSuccess('');}} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.36)', fontSize:'0.73rem', fontWeight:700, cursor:'pointer', fontFamily:"'Outfit','Inter',sans-serif" }} onMouseEnter={e=>e.currentTarget.style.color=C.primary} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.36)'}>
            {isRegistering?'← Already have an Admin account? Sign In':'Need an Admin account? Register here →'}
          </button>
        </div>
      </div>
      <style>{`@keyframes cardEntry{from{opacity:0;transform:scale(0.93) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}} @keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.45}} @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} @keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}} *{box-sizing:border-box} body{margin:0;font-family:'Outfit','Inter',sans-serif} ::-webkit-scrollbar{width:5px;height:5px} ::-webkit-scrollbar-track{background:#f5f5f6} ::-webkit-scrollbar-thumb{background:#d4d5d9;border-radius:3px} ::-webkit-scrollbar-thumb:hover{background:#ff3f6c} input:focus,textarea:focus,select:focus{border-color:#ff3f6c!important;box-shadow:0 0 0 3px rgba(255,63,108,0.10)!important}`}</style>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════════
const DashboardHome = ({ adminUser }) => {
  const [stats, setStats]   = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/admin/stats`),
      axios.get(`${API}/admin/orders`),
    ]).then(([sRes, oRes]) => {
      if (sRes.data.success) setStats(sRes.data.stats);
      if (oRes.data.success) setOrders(oRes.data.orders.slice(0, 5));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh' }}><Spinner size={40}/></div>;

  const revenue = stats?.totalRevenue || 0;
  const revDisplay = revenue >= 100000 ? `₹${(revenue/100000).toFixed(1)}L` : `₹${revenue.toLocaleString('en-IN')}`;

  const statCards = [
    { label:'Total Revenue',    value: revDisplay,              icon:TrendingUp,  iconBg:'#fff0f3', iconColor:C.primary,  badge:'Live',    link:'/orders' },
    { label:'Active Vendors',   value: stats?.totalShops || 0,  icon:Store,       iconBg:'#eff6ff', iconColor:'#3b82f6',  badge:'Shops',   link:'/shops' },
    { label:'Total Products',   value: stats?.totalProducts||0, icon:Package,     iconBg:'#fffbeb', iconColor:'#f59e0b',  badge:'Catalog', link:'/products' },
    { label:'Registered Users', value: stats?.totalUsers || 0,  icon:Users,       iconBg:'#ecfdf5', iconColor:'#10b981',  badge:'Members', link:'/users' },
  ];

  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.75rem', animation:'fadeIn 0.4s ease both' }}>
      <SectionHeader
        title={`Welcome back, ${adminUser?.name || 'Operator'}`}
        subtitle="Here's your live platform overview."
        action={
          <Link to="/products" style={{ ...S.btnPrimary, textDecoration:'none', padding:'0.75rem 1.25rem' }}>
            <Plus size={16}/> Add Product
          </Link>
        }
      />

      {/* Stat Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.25rem' }}>
        {statCards.map((st, i) => (
          <Link key={i} to={st.link} style={{ textDecoration:'none', color:'inherit' }}>
            <div style={{ ...S.card, padding:'1.5rem', transition:'all 0.25s', cursor:'pointer' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 30px rgba(40,44,63,0.10)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=S.card.boxShadow; }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                <div style={{ padding:'0.65rem', borderRadius:'0.65rem', background:st.iconBg, color:st.iconColor }}><st.icon size={20}/></div>
                <span style={{ fontSize:'0.6rem', fontWeight:900, background:st.iconBg, color:st.iconColor, borderRadius:'0.4rem', padding:'0.15rem 0.5rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>{st.badge}</span>
              </div>
              <p style={{ margin:'0 0 0.25rem', fontSize:'0.65rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>{st.label}</p>
              <p style={{ margin:0, fontSize:'1.65rem', fontWeight:900, color:C.secondary }}>{st.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.25rem' }}>
        {/* Recent Orders */}
        <div style={{ ...S.card, padding:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
            <h3 style={{ margin:0, fontWeight:800, fontSize:'1.05rem', color:C.secondary }}>Recent Order Activity</h3>
            <Link to="/orders" style={{ fontSize:'0.75rem', fontWeight:700, color:C.primary, textDecoration:'none' }}>View All →</Link>
          </div>
          {orders.length === 0 ? (
            <div style={{ textAlign:'center', padding:'3rem', color:C.textMuted, fontSize:'0.875rem' }}>No orders yet.</div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {orders.map(o => (
                <div key={o.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.875rem', background:C.bgLight, borderRadius:'0.75rem', border:`1px solid ${C.border}` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                    <div style={{ width:'2.4rem', height:'2.4rem', borderRadius:'0.6rem', background:'#fff0f3', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><ShoppingBag size={16} color={C.primary}/></div>
                    <div>
                      <p style={{ margin:0, fontWeight:700, fontSize:'0.82rem', color:C.secondary }}>{o.User?.name || 'Customer'}</p>
                      <p style={{ margin:0, fontSize:'0.7rem', color:C.textMuted, marginTop:'1px' }}>#{o.id.slice(0,8).toUpperCase()} · {o.products?.length||1} item(s)</p>
                    </div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <p style={{ margin:0, fontWeight:900, fontSize:'0.9rem', color:C.secondary }}>₹{Number(o.totalAmount).toLocaleString('en-IN')}</p>
                    <Badge status={o.status} type="order"/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Platform Overview */}
        <div style={{ ...S.card, padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
          <h3 style={{ margin:0, fontWeight:800, fontSize:'1.05rem', color:C.secondary }}>Platform Status</h3>
          {[
            { label:'Total Orders', value: stats?.totalOrders || 0, color:'#059669' },
            { label:'Pending Orders', value: pendingOrders, color:'#d97706' },
            { label:'Pending Products', value: stats?.pendingProducts || 0, color:C.primary },
            { label:'Total Shops', value: stats?.totalShops || 0, color:'#3b82f6' },
          ].map(m => (
            <div key={m.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'0.875rem', borderBottom:`1px solid ${C.border}` }}>
              <p style={{ margin:0, fontSize:'0.82rem', fontWeight:700, color:C.secondary }}>{m.label}</p>
              <span style={{ fontSize:'1.25rem', fontWeight:900, color:m.color }}>{m.value}</span>
            </div>
          ))}
          <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.75rem', borderRadius:'0.65rem', background:'#ecfdf5', border:'1px solid #a7f3d0', marginTop:'auto' }}>
            <span style={{ width:'8px', height:'8px', background:'#10b981', borderRadius:'50%', animation:'pulse 2s infinite' }}/>
            <span style={{ fontSize:'0.72rem', fontWeight:700, color:'#065f46' }}>All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  USERS LIST
// ═══════════════════════════════════════════════════════════════
const UsersList = () => {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toast, setToast]   = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const showToast = (msg, type='success') => { setToast({ msg, type }); setTimeout(()=>setToast(null), 3000); };

  const fetchUsers = () => {
    setLoading(true);
    axios.get(`${API}/admin/users`).then(res => { if (res.data.success) setUsers(res.data.users); }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(fetchUsers, []);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${API}/admin/users/${userToDelete.id}`);
      if (res.data.success) { setUserToDelete(null); fetchUsers(); showToast('User deleted successfully.'); }
    } catch (err) { showToast(err.response?.data?.message || 'Failed to delete user.', 'error'); }
  };

  const handleSuspend = async (userId, suspend) => {
    try {
      const res = await axios.put(`${API}/admin/users/${userId}/suspend`, { suspended: suspend });
      if (res.data.success) { fetchUsers(); showToast(suspend ? 'User suspended.' : 'User reactivated.'); }
    } catch (err) { showToast(err.response?.data?.message || 'Failed to update user.', 'error'); }
  };

  const filtered = users.filter(u => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh' }}><Spinner size={40}/></div>;

  const roleColors = { admin: { bg:C.secondary, color:'#fff' }, shopkeeper: { bg:'#fff0f3', color:C.primary }, customer: { bg:C.bgLight, color:C.textMuted } };

  return (
    <div style={{ animation:'fadeIn 0.4s ease both' }}>
      <SectionHeader title="User Management" subtitle={`${users.length} registered accounts`}
        action={
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', background:C.bgLight, borderRadius:'0.75rem', padding:'0.55rem 1rem' }}>
            <Search size={14} color={C.textMuted}/>
            <input placeholder="Search users..." value={search} onChange={e=>setSearch(e.target.value)} style={{ background:'none', border:'none', outline:'none', fontSize:'0.8rem', color:C.secondary, fontFamily:"'Outfit','Inter',sans-serif", width:'200px' }}/>
          </div>
        }
      />
      <DataTable headers={['User', 'Role', 'Status', 'Joined', 'Actions']}>
        {filtered.length === 0 ? (
          <TR><TD align="center"><span style={{ color:C.textMuted }}>No users found.</span></TD></TR>
        ) : filtered.map(u => (
          <TR key={u.id}>
            <TD>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <div style={{ width:'2.5rem', height:'2.5rem', borderRadius:'0.75rem', background: u.suspended ? '#fef2f2' : '#fff0f3', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'0.9rem', color: u.suspended ? '#dc2626' : C.primary, flexShrink:0 }}>{u.name?.charAt(0)}</div>
                <div>
                  <p style={{ margin:0, fontWeight:700, fontSize:'0.85rem', color: u.suspended ? C.textMuted : C.secondary, textDecoration: u.suspended ? 'line-through' : 'none' }}>{u.name}</p>
                  <p style={{ margin:0, fontSize:'0.72rem', color:C.textMuted }}>{u.email}</p>
                </div>
              </div>
            </TD>
            <TD>
              <span style={{ display:'inline-block', padding:'0.2rem 0.6rem', borderRadius:'0.4rem', fontSize:'0.65rem', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.07em', ...(roleColors[u.role] || roleColors.customer) }}>
                {u.role}
              </span>
            </TD>
            <TD>
              <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <span style={{ width:'7px', height:'7px', background: u.suspended ? '#dc2626' : '#10b981', borderRadius:'50%' }}/>
                <span style={{ fontSize:'0.78rem', fontWeight:700, color: u.suspended ? '#dc2626' : '#059669' }}>{u.suspended ? 'Suspended' : 'Active'}</span>
              </div>
            </TD>
            <TD><span style={{ fontSize:'0.78rem', color:C.textMuted }}>{new Date(u.createdAt||Date.now()).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span></TD>
            <TD align="right">
              {u.role === 'admin' ? (
                <span style={{ fontSize:'0.72rem', fontWeight:700, color:C.textMuted }}>🛡️ Protected</span>
              ) : (
                <div style={{ display:'flex', gap:'0.4rem', justifyContent:'flex-end' }}>
                  <button onClick={() => handleSuspend(u.id, !u.suspended)}
                    style={{ display:'inline-flex', alignItems:'center', gap:'0.3rem', padding:'0.35rem 0.7rem', borderRadius:'0.5rem', border:`1px solid ${u.suspended ? '#a7f3d0' : '#fde68a'}`, background: u.suspended ? '#ecfdf5' : '#fffbeb', color: u.suspended ? '#059669' : '#d97706', fontSize:'0.65rem', fontWeight:800, cursor:'pointer', fontFamily:"'Outfit','Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.05em' }}>
                    {u.suspended ? <><CheckCircle size={11}/> Reactivate</> : <><AlertTriangle size={11}/> Suspend</>}
                  </button>
                  <button onClick={() => setUserToDelete({ id: u.id, name: u.name })}
                    style={{ display:'inline-flex', alignItems:'center', gap:'0.3rem', padding:'0.35rem 0.7rem', borderRadius:'0.5rem', border:'1px solid #fecaca', background:'#fef2f2', color:'#dc2626', fontSize:'0.65rem', fontWeight:800, cursor:'pointer', fontFamily:"'Outfit','Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.05em' }}>
                    <Trash2 size={11}/> Delete
                  </button>
                </div>
              )}
            </TD>
          </TR>
        ))}
      </DataTable>
      {userToDelete && ReactDOM.createPortal(
        <ConfirmModal
          title="Delete User?"
          message={`Permanently delete "${userToDelete.name}"? This will remove their account, but orders and products may remain. This action cannot be undone.`}
          confirmLabel="Delete User"
          onConfirm={handleDelete}
          onCancel={() => setUserToDelete(null)}
        />,
        document.body
      )}
      {toast && <Toast {...toast}/>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  PRODUCTS
// ═══════════════════════════════════════════════════════════════
const ProductsList = () => {
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal]       = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [imgMode, setImgMode]           = useState('url');
  const [toast, setToast]               = useState(null);
  const [newProduct, setNewProduct]     = useState({ title:'', price:'', stock:'100', category:'Shirts', gender:'unisex', description:'', image:'', tags:'' });

  const showToast = (msg, type='success') => { setToast({ msg, type }); setTimeout(()=>setToast(null), 3000); };

  const fetchProducts = () => {
    setLoading(true);
    axios.get(`${API}/products?all=true`).then(res => { if (res.data.success) setProducts(res.data.products); }).catch(console.error).finally(()=>setLoading(false));
  };

  useEffect(fetchProducts, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = newProduct.tags ? newProduct.tags.split(',').map(t=>t.trim()).filter(Boolean) : [];
      const payload = {
        title: newProduct.title,
        description: newProduct.description,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock || 100),
        category: newProduct.category,
        gender: newProduct.gender,
        image: newProduct.image || '',
        tags: tagsArray,
        status: 'approved'
      };
      console.log('Creating product with payload:', payload);
      const res = await axios.post(`${API}/admin/products`, payload);
      if (res.data.success) {
        setShowModal(false);
        fetchProducts();
        showToast('Product created and approved!');
        setNewProduct({ title:'', price:'', stock:'100', category:'Shirts', gender:'unisex', description:'', image:'', tags:'' });
        setImgMode('url');
      } else {
        showToast(res.data.message || 'Failed to create product.', 'error');
      }
    } catch (err) {
      console.error('Product creation error:', err);
      showToast(err.response?.data?.message || 'Failed to create product.', 'error');
    }
  };

  const handleReview = async (id, status) => {
    try {
      const res = await axios.put(`${API}/admin/products/${id}`, { status });
      if (res.data.success) { fetchProducts(); showToast(`Product ${status}!`); }
    } catch { showToast('Failed to update.', 'error'); }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${API}/admin/products/${productToDelete.id}`);
      if (res.data.success) { setProductToDelete(null); fetchProducts(); showToast('Product deleted.'); }
    } catch (err) { showToast(err.response?.data?.message || 'Delete failed.', 'error'); }
  };

  const handleFile = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setNewProduct(p => ({ ...p, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const filtered = products.filter(p => filterStatus === 'all' ? true : p.status === filterStatus || (filterStatus === 'approved' && !p.status));

  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh' }}><Spinner size={40}/></div>;

  const tabBtn = (tab, label) => (
    <button key={tab} onClick={()=>setFilterStatus(tab)} style={{ padding:'0.5rem 1rem', borderRadius:'0.65rem', border: filterStatus===tab ? 'none' : `1px solid ${C.border}`, cursor:'pointer', fontFamily:"'Outfit','Inter',sans-serif", fontSize:'0.75rem', fontWeight:800, background:filterStatus===tab ? C.primary : C.white, color:filterStatus===tab ? '#fff' : C.textMuted, boxShadow:filterStatus===tab ? '0 4px 14px rgba(255,63,108,0.22)' : 'none' }}>{label}</button>
  );

  const tabModeBtn = (mode, label) => (
    <button type="button" onClick={()=>setImgMode(mode)} style={{ padding:'0.25rem 0.7rem', borderRadius:'0.4rem', border:'none', cursor:'pointer', fontFamily:"'Outfit','Inter',sans-serif", fontSize:'0.65rem', fontWeight:900, background:imgMode===mode ? C.primary : C.bgLight, color:imgMode===mode ? '#fff' : C.textMuted }}>{label}</button>
  );

  return (
    <div style={{ animation:'fadeIn 0.4s ease both' }}>
      <SectionHeader title="Product Catalog" subtitle="Manage, approve, and add products across all vendor shops."
        action={<button onClick={()=>setShowModal(true)} style={{ ...S.btnPrimary, padding:'0.75rem 1.25rem' }}><Plus size={16}/> Add Product</button>}
      />

      {/* Filter Tabs */}
      <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem', paddingBottom:'1rem', borderBottom:`1px solid ${C.border}` }}>
        {tabBtn('all', `All (${products.length})`)}
        {tabBtn('pending', `Pending (${products.filter(p=>p.status==='pending').length})`)}
        {tabBtn('approved', `Approved (${products.filter(p=>p.status==='approved'||!p.status).length})`)}
        {tabBtn('rejected', `Rejected (${products.filter(p=>p.status==='rejected').length})`)}
      </div>

      {filtered.length === 0 ? (
        <div style={{ ...S.card, padding:'5rem', textAlign:'center', color:C.textMuted }}>
          <Package size={48} color={C.border} style={{ display:'block', margin:'0 auto 1rem' }}/>
          <p style={{ margin:0, fontWeight:700 }}>No products found.</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1.25rem' }}>
          {filtered.map(p => (
            <div key={p.id} style={{ ...S.card, borderRadius:'1rem', overflow:'hidden', display:'flex', flexDirection:'column', transition:'all 0.25s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(40,44,63,0.12)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=S.card.boxShadow; }}>
              {/* Image */}
              <div style={{ height:'180px', background:C.bgLight, overflow:'hidden', position:'relative' }}>
                <img src={p.images?.[0]||'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=70'} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }}
                  onMouseEnter={e=>e.target.style.transform='scale(1.06)'} onMouseLeave={e=>e.target.style.transform=''}
                  onError={e=>{ e.target.src='https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=70'; }}/>
                <span style={{ position:'absolute', top:'8px', left:'8px', background:'rgba(40,44,63,0.80)', backdropFilter:'blur(6px)', color:'#fff', fontSize:'0.6rem', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.08em', padding:'0.2rem 0.5rem', borderRadius:'4px' }}>{p.category}</span>
                <button onClick={()=>setProductToDelete({ id:p.id, title:p.title })} style={{ position:'absolute', top:'8px', right:'8px', background:'rgba(255,63,108,0.90)', border:'none', borderRadius:'0.45rem', width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#fff', opacity:0, transition:'opacity 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.opacity='1'}
                  ref={el => el && el.closest && el.closest('div[style*="position"]')?.addEventListener('mouseenter', ()=>el.style.opacity='1')}
                ><Trash2 size={13}/></button>
              </div>
              {/* Info */}
              <div style={{ padding:'1rem', flex:1 }}>
                <Badge status={p.status||'approved'}/>
                <h3 style={{ margin:'0.5rem 0 0.25rem', fontSize:'0.9rem', fontWeight:800, color:C.secondary, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>{p.title}</h3>
                <p style={{ margin:'0 0 0.4rem', fontSize:'0.72rem', color:C.textMuted, textTransform:'capitalize' }}>{p.gender} · Stock: <strong style={{ color: p.stock<=5 ? C.primary : C.secondary }}>{p.stock??'—'}</strong></p>
                <p style={{ margin:'0 0 0.75rem', fontSize:'1rem', fontWeight:900, color:C.primary }}>₹{Number(p.price).toLocaleString('en-IN')}</p>
                {p.Shop && <p style={{ margin:0, fontSize:'0.65rem', color:C.textMuted }}>🏪 {p.Shop.name}</p>}
              </div>
              {/* Approve / Reject buttons for pending */}
              {p.status === 'pending' && (
                <div style={{ padding:'0.75rem 1rem', borderTop:`1px solid ${C.border}`, display:'flex', gap:'0.5rem' }}>
                  <button onClick={()=>handleReview(p.id,'approved')} style={{ ...S.btnPrimary, flex:1, padding:'0.6rem', background:'#10b981', boxShadow:'0 4px 14px rgba(16,185,129,0.22)', fontSize:'0.7rem' }}><Check size={13}/> Approve</button>
                  <button onClick={()=>handleReview(p.id,'rejected')} style={{ ...S.btnSecondary, flex:1, padding:'0.6rem', color:'#ef4444', borderColor:'#fecaca', fontSize:'0.7rem' }}><X size={13}/> Reject</button>
                </div>
              )}
              {p.status === 'rejected' && (
                <div style={{ padding:'0.75rem 1rem', borderTop:`1px solid ${C.border}` }}>
                  <button onClick={()=>handleReview(p.id,'approved')} style={{ ...S.btnPrimary, width:'100%', padding:'0.6rem', background:'#10b981', boxShadow:'0 4px 14px rgba(16,185,129,0.22)', fontSize:'0.7rem' }}>Re-Approve</button>
                </div>
              )}
              {/* Delete overlay */}
              <div style={{ padding:'0.75rem 1rem', borderTop:`1px solid ${C.border}` }}>
                <button onClick={()=>setProductToDelete({ id:p.id, title:p.title })} style={{ ...S.btnSecondary, width:'100%', padding:'0.5rem', color:'#ef4444', borderColor:'#fecaca', fontSize:'0.7rem' }}><Trash2 size={12}/> Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal - Portal to body */}
      {showModal && ReactDOM.createPortal(
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', fontFamily:"'Outfit','Inter',sans-serif" }}>
          <div style={{ ...S.card, width:'100%', maxWidth:'34rem', maxHeight:'90vh', overflowY:'auto', padding:'2rem', animation:'cardEntry 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' }}>
              <div>
                <h3 style={{ margin:0, fontSize:'1.3rem', fontWeight:800, color:C.secondary }}>Create New Product</h3>
                <p style={{ margin:'0.25rem 0 0', fontSize:'0.8rem', color:C.textMuted }}>Admin-created products are automatically approved.</p>
              </div>
              <button onClick={()=>setShowModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:C.textMuted, display:'flex' }}><X size={20}/></button>
            </div>
            <form onSubmit={handleCreate} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div><label style={S.label}>Product Title *</label><input required type="text" value={newProduct.title} onChange={e=>setNewProduct(p=>({...p,title:e.target.value}))} placeholder="e.g. Vintage Leather Jacket" style={S.input}/></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                <div><label style={S.label}>Price (₹) *</label><input required type="number" min="1" value={newProduct.price} onChange={e=>setNewProduct(p=>({...p,price:e.target.value}))} placeholder="e.g. 2499" style={S.input}/></div>
                <div><label style={S.label}>Stock *</label><input required type="number" min="0" value={newProduct.stock} onChange={e=>setNewProduct(p=>({...p,stock:e.target.value}))} placeholder="e.g. 100" style={S.input}/></div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                <div>
                  <label style={S.label}>Gender</label>
                  <select value={newProduct.gender} onChange={e=>setNewProduct(p=>({...p,gender:e.target.value}))} style={S.select}>
                    <option value="unisex">Unisex</option><option value="men">Men</option><option value="women">Women</option><option value="kids">Kids</option>
                  </select>
                </div>
                <div>
                  <label style={S.label}>Category</label>
                  <select value={newProduct.category} onChange={e=>setNewProduct(p=>({...p,category:e.target.value}))} style={S.select}>
                    {['Shirts','T-Shirts','Cargo Pants','Jeans','Jackets','Footwear','Accessories','Luxury','Cosmetics'].map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div><label style={S.label}>Description *</label><textarea required rows={3} value={newProduct.description} onChange={e=>setNewProduct(p=>({...p,description:e.target.value}))} placeholder="Fabric details, fit, premium features..." style={{ ...S.input, resize:'none', lineHeight:1.6 }}/></div>
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.4rem' }}>
                  <label style={{ ...S.label, margin:0 }}>Product Image *</label>
                  <div style={{ display:'flex', gap:'0.35rem' }}>{tabModeBtn('url','Remote URL')}{tabModeBtn('upload','File Upload')}</div>
                </div>
                {imgMode === 'url' ? (
                  <input type="text" value={newProduct.image} onChange={e=>setNewProduct(p=>({...p,image:e.target.value}))} placeholder="https://images.unsplash.com/... (optional)" style={S.input}/>
                ) : (
                  <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
                    <label style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', padding:'0.75rem', background:C.bgLight, border:`1px solid ${C.border}`, borderRadius:'0.75rem', cursor:'pointer', fontSize:'0.8rem', fontWeight:700, color:C.textMuted }}>
                      <ImageIcon size={16}/> {newProduct.image ? 'Change Image' : 'Upload File'}
                      <input type="file" accept="image/*" onChange={handleFile} style={{ display:'none' }}/>
                    </label>
                    {newProduct.image && <div style={{ width:52, height:52, borderRadius:'0.6rem', overflow:'hidden', border:`1px solid ${C.border}`, flexShrink:0 }}><img src={newProduct.image} alt="preview" style={{ width:'100%', height:'100%', objectFit:'cover' }}/></div>}
                  </div>
                )}
              </div>
              <div><label style={S.label}>Tags (comma separated)</label><input type="text" value={newProduct.tags} onChange={e=>setNewProduct(p=>({...p,tags:e.target.value}))} placeholder="e.g. slim, premium, luxury" style={S.input}/></div>
              <div style={{ display:'flex', gap:'0.75rem', paddingTop:'0.75rem', borderTop:`1px solid ${C.border}` }}>
                <button type="submit" style={{ ...S.btnPrimary, flex:1, padding:'0.875rem' }}><Plus size={16}/> Create Product</button>
                <button type="button" onClick={()=>setShowModal(false)} style={{ ...S.btnSecondary, padding:'0.875rem 1.5rem' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {productToDelete && ReactDOM.createPortal(<ConfirmModal title="Remove Product?" message={`Permanently delete "${productToDelete.title}"? This cannot be undone.`} onConfirm={handleDelete} onCancel={()=>setProductToDelete(null)} confirmLabel="Delete Product"/>, document.body)}
      {toast && <Toast {...toast}/>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  ORDERS
// ═══════════════════════════════════════════════════════════════
const OrdersList = () => {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('all');
  const [toast, setToast]     = useState(null);

  const showToast = (msg, type='success') => { setToast({ msg, type }); setTimeout(()=>setToast(null), 3000); };

  const fetchOrders = () => {
    setLoading(true);
    axios.get(`${API}/admin/orders`).then(res => { if (res.data.success) setOrders(res.data.orders); }).catch(console.error).finally(()=>setLoading(false));
  };

  useEffect(fetchOrders, []);

  const handleStatus = async (orderId, status, paymentStatus = null) => {
    try {
      const payload = { status };
      if (paymentStatus) payload.paymentStatus = paymentStatus;
      const res = await axios.put(`${API}/admin/orders/${orderId}`, payload);
      if (res.data.success) { fetchOrders(); showToast('Order status updated!'); }
    } catch { showToast('Update failed.', 'error'); }
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh' }}><Spinner size={40}/></div>;

  return (
    <div style={{ animation:'fadeIn 0.4s ease both' }}>
      <SectionHeader title="Order Pipeline" subtitle="Monitor, accept, dispatch, and deliver all platform orders."
        action={
          <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
            {['all','pending','accepted','picking','out_for_delivery','delivered','cancelled'].map(f => (
              <button key={f} onClick={()=>setFilter(f)} style={{ padding:'0.4rem 0.85rem', borderRadius:'2rem', border:`1px solid ${filter===f ? C.secondary : C.border}`, cursor:'pointer', fontFamily:"'Outfit','Inter',sans-serif", fontSize:'0.7rem', fontWeight:800, background:filter===f ? C.secondary : C.white, color:filter===f ? '#fff' : C.textMuted, textTransform:'capitalize', whiteSpace:'nowrap' }}>
                {f.replace('_',' ')}
              </button>
            ))}
          </div>
        }
      />

      {filtered.length === 0 ? (
        <div style={{ ...S.card, padding:'5rem', textAlign:'center', color:C.textMuted }}>
          <ShoppingBag size={48} color={C.border} style={{ display:'block', margin:'0 auto 1rem' }}/>
          <p style={{ margin:0, fontWeight:700 }}>No orders found for this filter.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          {filtered.map(o => {
            const date = new Date(o.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
            return (
              <div key={o.id} style={{ ...S.card, padding:'1.5rem', borderRadius:'1rem', transition:'all 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=`${C.primary}30`}
                onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem' }}>
                  {/* Left */}
                  <div style={{ flex:1, minWidth:250 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem', flexWrap:'wrap' }}>
                      <span style={{ fontFamily:'monospace', fontWeight:900, color:C.primary, fontSize:'0.95rem' }}>ORD-{o.id.slice(0,6).toUpperCase()}</span>
                      <span style={{ fontSize:'0.7rem', color:C.textMuted }}>{date}</span>
                      <Badge status={o.paymentStatus} type="order"/>
                      <Badge status={o.status} type="order"/>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'0.75rem' }}>
                      <div>
                        <p style={{ margin:'0 0 2px', fontSize:'0.6rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>Customer</p>
                        <p style={{ margin:0, fontWeight:700, fontSize:'0.82rem', color:C.secondary }}>{o.User?.name || 'Customer'}</p>
                        <p style={{ margin:0, fontSize:'0.72rem', color:C.textMuted }}>{o.User?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <p style={{ margin:'0 0 2px', fontSize:'0.6rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>Delivery Address</p>
                        <p style={{ margin:0, fontWeight:600, fontSize:'0.8rem', color:C.secondary }}>{o.deliveryAddress?.street || 'N/A'}</p>
                        <p style={{ margin:0, fontSize:'0.72rem', color:C.textMuted }}>{o.deliveryAddress?.city || ''} · <span style={{ textTransform:'uppercase', fontWeight:700, color:C.primary }}>{o.paymentMethod}</span></p>
                      </div>
                    </div>
                    <div style={{ background:C.bgLight, borderRadius:'0.6rem', padding:'0.65rem 0.85rem', border:`1px solid ${C.border}` }}>
                      <p style={{ margin:'0 0 0.4rem', fontSize:'0.6rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>Items</p>
                      {o.products?.map((item, idx) => (
                        <div key={idx} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', fontWeight:600, color:C.secondary, padding:'0.1rem 0' }}>
                          <span>• {item.name || `Product`} {item.size ? `(${item.size})` : ''}</span>
                          <span style={{ color:C.textMuted }}>{item.quantity}× ₹{Number(item.price||0).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right */}
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'space-between', gap:'1rem', minWidth:180, borderLeft:`1px solid ${C.border}`, paddingLeft:'1.5rem' }}>
                    <div style={{ textAlign:'right' }}>
                      <p style={{ margin:'0 0 2px', fontSize:'0.6rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>Order Total</p>
                      <p style={{ margin:0, fontSize:'1.55rem', fontWeight:900, color:C.secondary }}>₹{Number(o.totalAmount).toLocaleString('en-IN')}</p>
                      <p style={{ margin:0, fontSize:'0.72rem', color:'#059669', fontWeight:700 }}>+₹{Number(o.deliveryFee||0).toFixed(0)} delivery</p>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem', width:'100%' }}>
                      {o.status === 'pending' && <button onClick={()=>handleStatus(o.id,'accepted')} style={{ ...S.btnPrimary, width:'100%', padding:'0.6rem', background:'#10b981', boxShadow:'0 4px 14px rgba(16,185,129,0.22)', fontSize:'0.75rem' }}><Check size={13}/> Accept</button>}
                      {o.status === 'accepted' && <button onClick={()=>handleStatus(o.id,'picking')} style={{ ...S.btnPrimary, width:'100%', padding:'0.6rem', background:'#a855f7', boxShadow:'0 4px 14px rgba(168,85,247,0.22)', fontSize:'0.75rem' }}><Package size={13}/> Start Picking</button>}
                      {o.status === 'picking' && <button onClick={()=>handleStatus(o.id,'out_for_delivery')} style={{ ...S.btnPrimary, width:'100%', padding:'0.6rem', background:'#3b82f6', boxShadow:'0 4px 14px rgba(59,130,246,0.22)', fontSize:'0.75rem' }}><Truck size={13}/> Dispatch</button>}
                      {o.status === 'out_for_delivery' && <button onClick={()=>handleStatus(o.id,'delivered','completed')} style={{ ...S.btnPrimary, width:'100%', padding:'0.6rem', fontSize:'0.75rem' }}><CheckCircle size={13}/> Mark Delivered</button>}
                      {o.status === 'delivered' && o.paymentStatus === 'completed' && <button onClick={()=>handleStatus(o.id,'cancelled','refunded')} style={{ ...S.btnSecondary, width:'100%', padding:'0.6rem', color:'#3b82f6', borderColor:'#bfdbfe', fontSize:'0.75rem' }}>Issue Refund</button>}
                      {o.status !== 'cancelled' && o.status !== 'delivered' && (
                        <button onClick={()=>handleStatus(o.id,'cancelled','failed')} style={{ ...S.btnSecondary, width:'100%', padding:'0.6rem', color:'#ef4444', borderColor:'#fecaca', fontSize:'0.75rem' }}><X size={13}/> Cancel</button>
                      )}
                      {o.status === 'delivered' && <span style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.78rem', fontWeight:800, color:'#059669', justifyContent:'flex-end' }}><CheckCircle size={14}/> Completed</span>}
                      {o.status === 'cancelled' && <span style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.78rem', fontWeight:800, color:'#dc2626', justifyContent:'flex-end' }}><X size={14}/> Cancelled</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {toast && <Toast {...toast}/>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  SHOPS & VENDORS
// ═══════════════════════════════════════════════════════════════
const ShopsList = () => {
  const [shops, setShops]   = useState([]);
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast]   = useState(null);
  const [newShop, setNewShop] = useState({ name:'', ownerId:'', description:'', logo:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80', locationAddress:'Mumbai, Maharashtra' });

  const showToast = (msg, type='success') => { setToast({ msg, type }); setTimeout(()=>setToast(null), 3000); };

  const fetchData = () => {
    setLoading(true);
    Promise.all([axios.get(`${API}/admin/shops`), axios.get(`${API}/admin/users`)]).then(([sRes, uRes]) => {
      if (sRes.data.success) setShops(sRes.data.shops);
      if (uRes.data.success) { setUsers(uRes.data.users); if (uRes.data.users.length) setNewShop(p=>({ ...p, ownerId: uRes.data.users[0].id })); }
    }).catch(console.error).finally(()=>setLoading(false));
  };

  useEffect(fetchData, []);

  const handleVerify = async (id, cur) => {
    try { await axios.put(`${API}/admin/shops/${id}`, { isVerified: !cur }); fetchData(); showToast(cur ? 'Verification revoked.' : 'Shop verified!'); } catch { showToast('Failed.', 'error'); }
  };
  const handleToggle = async (id, status) => {
    try { await axios.put(`${API}/admin/shops/${id}`, { status: status==='active'?'inactive':'active' }); fetchData(); showToast('Shop status updated!'); } catch { showToast('Failed.', 'error'); }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/admin/shops`, { name: newShop.name, ownerId: newShop.ownerId, description: newShop.description, logo: newShop.logo, location: { type:'Point', coordinates:[72.8777,19.076], address: newShop.locationAddress } });
      if (res.data.success) { setShowModal(false); fetchData(); showToast('Shop created!'); }
    } catch (err) { showToast(err.response?.data?.message || 'Failed.', 'error'); }
  };

  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh' }}><Spinner size={40}/></div>;

  return (
    <div style={{ animation:'fadeIn 0.4s ease both' }}>
      <SectionHeader title="Shops & Vendors" subtitle="Manage boutiques, verify registrations, and suspend stores."
        action={<button onClick={()=>setShowModal(true)} style={{ ...S.btnPrimary, padding:'0.75rem 1.25rem' }}><Plus size={16}/> Add Shop</button>}
      />
      <DataTable headers={['Boutique', 'Owner', 'Products', 'Verified', 'Status', 'Actions']}>
        {shops.length === 0 ? (
          <TR><TD align="center"><span style={{ color:C.textMuted }}>No shops registered.</span></TD></TR>
        ) : shops.map(shop => (
          <TR key={shop.id}>
            <TD>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <img src={shop.logo||'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80'} alt={shop.name} style={{ width:'2.75rem', height:'2.75rem', borderRadius:'0.75rem', objectFit:'cover', border:`1px solid ${C.border}`, flexShrink:0 }} onError={e=>e.target.src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80'}/>
                <div>
                  <p style={{ margin:0, fontWeight:700, fontSize:'0.85rem', color:C.secondary }}>{shop.name}</p>
                  <p style={{ margin:0, fontSize:'0.7rem', color:C.textMuted, maxWidth:'160px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{shop.description || 'No description'}</p>
                </div>
              </div>
            </TD>
            <TD>
              <p style={{ margin:0, fontWeight:700, fontSize:'0.83rem', color:C.secondary }}>{shop.owner?.name || 'Unknown'}</p>
              <p style={{ margin:0, fontSize:'0.7rem', color:C.textMuted }}>{shop.owner?.email || 'N/A'}</p>
            </TD>
            <TD><span style={{ fontWeight:800, color:C.primary }}>{shop.Products?.length || 0}</span></TD>
            <TD>
              {shop.isVerified ? (
                <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', padding:'0.2rem 0.5rem', borderRadius:'4px', fontSize:'0.65rem', fontWeight:900, textTransform:'uppercase', background:'#ecfdf5', color:'#059669', border:'1px solid #a7f3d0' }}><CheckCircle size={10}/> Verified</span>
              ) : (
                <span style={{ display:'inline-block', padding:'0.2rem 0.5rem', borderRadius:'4px', fontSize:'0.65rem', fontWeight:900, textTransform:'uppercase', background:'#fffbeb', color:'#d97706', border:'1px solid #fde68a' }}>Unverified</span>
              )}
            </TD>
            <TD>
              <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <span style={{ width:'7px', height:'7px', background: shop.status==='active' ? '#10b981' : '#ef4444', borderRadius:'50%' }}/>
                <span style={{ fontSize:'0.78rem', fontWeight:700, color: shop.status==='active' ? '#059669' : '#dc2626', textTransform:'capitalize' }}>{shop.status}</span>
              </div>
            </TD>
            <TD align="right">
              <div style={{ display:'flex', gap:'0.4rem', justifyContent:'flex-end' }}>
                <button onClick={()=>handleVerify(shop.id, shop.isVerified)} style={{ padding:'0.3rem 0.7rem', borderRadius:'0.5rem', border:'none', cursor:'pointer', fontSize:'0.65rem', fontWeight:900, textTransform:'uppercase', background: shop.isVerified ? '#fffbeb' : '#ecfdf5', color: shop.isVerified ? '#d97706' : '#059669' }}>
                  {shop.isVerified ? 'Revoke' : 'Verify'}
                </button>
                <button onClick={()=>handleToggle(shop.id, shop.status)} style={{ padding:'0.3rem 0.7rem', borderRadius:'0.5rem', border:'none', cursor:'pointer', fontSize:'0.65rem', fontWeight:900, textTransform:'uppercase', background: shop.status==='active' ? '#fef2f2' : '#ecfdf5', color: shop.status==='active' ? '#dc2626' : '#059669' }}>
                  {shop.status==='active' ? 'Suspend' : 'Activate'}
                </button>
              </div>
            </TD>
          </TR>
        ))}
      </DataTable>

      {/* Create Shop Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div style={{ ...S.card, width:'100%', maxWidth:'32rem', padding:'2rem', animation:'cardEntry 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' }}>
              <div>
                <h3 style={{ margin:0, fontSize:'1.3rem', fontWeight:800, color:C.secondary }}>Register New Shop</h3>
                <p style={{ margin:'0.25rem 0 0', fontSize:'0.8rem', color:C.textMuted }}>Create a boutique and connect it to a vendor.</p>
              </div>
              <button onClick={()=>setShowModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:C.textMuted, display:'flex' }}><X size={20}/></button>
            </div>
            <form onSubmit={handleCreate} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div><label style={S.label}>Boutique Name *</label><input required type="text" value={newShop.name} onChange={e=>setNewShop(p=>({...p,name:e.target.value}))} placeholder="e.g. DRIPZO Flagship Store" style={S.input}/></div>
              <div>
                <label style={S.label}>Assign Vendor Owner *</label>
                <select value={newShop.ownerId} onChange={e=>setNewShop(p=>({...p,ownerId:e.target.value}))} style={S.select}>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role} – {u.email})</option>)}
                </select>
              </div>
              <div><label style={S.label}>Logo Image URL *</label><input required type="url" value={newShop.logo} onChange={e=>setNewShop(p=>({...p,logo:e.target.value}))} style={S.input}/></div>
              <div><label style={S.label}>Hub Location Address *</label><input required type="text" value={newShop.locationAddress} onChange={e=>setNewShop(p=>({...p,locationAddress:e.target.value}))} placeholder="e.g. Bandra West, Mumbai" style={S.input}/></div>
              <div><label style={S.label}>Description</label><textarea rows={3} value={newShop.description} onChange={e=>setNewShop(p=>({...p,description:e.target.value}))} placeholder="Boutique details, speciality..." style={{ ...S.input, resize:'none', lineHeight:1.6 }}/></div>
              <div style={{ display:'flex', gap:'0.75rem', paddingTop:'0.75rem', borderTop:`1px solid ${C.border}` }}>
                <button type="submit" style={{ ...S.btnPrimary, flex:1, padding:'0.875rem' }}><Store size={15}/> Create Boutique</button>
                <button type="button" onClick={()=>setShowModal(false)} style={{ ...S.btnSecondary, padding:'0.875rem 1.5rem' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {toast && <Toast {...toast}/>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  ANALYTICS
// ═══════════════════════════════════════════════════════════════
const AnalyticsView = () => {
  const [stats, setStats]   = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([axios.get(`${API}/admin/stats`), axios.get(`${API}/admin/orders`)]).then(([sRes, oRes]) => {
      if (sRes.data.success) setStats(sRes.data.stats);
      if (oRes.data.success) setOrders(oRes.data.orders);
    }).catch(console.error).finally(()=>setLoading(false));
  }, []);

  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh' }}><Spinner size={40}/></div>;

  const totalRevenue  = stats?.totalRevenue || 0;
  const deliveredOrds = orders.filter(o=>o.status==='delivered').length;
  const cancelledOrds = orders.filter(o=>o.status==='cancelled').length;
  const avgOrderVal   = orders.length ? (orders.reduce((s,o)=>s+Number(o.totalAmount),0)/orders.length).toFixed(0) : 0;
  const shippingFee   = localStorage.getItem('admin_setting_shipping') || '99';

  const kpiCards = [
    { title:'Total Revenue', value: totalRevenue>=100000 ? `₹${(totalRevenue/100000).toFixed(1)}L` : `₹${totalRevenue.toLocaleString('en-IN')}`, icon:DollarSign, badge:'Live', badgeColor:'#059669', badgeBg:'#ecfdf5' },
    { title:'Avg. Order Value', value: `₹${Number(avgOrderVal).toLocaleString('en-IN')}`, icon:TrendingUp, badge:'Real', badgeColor:'#3b82f6', badgeBg:'#eff6ff' },
    { title:'Base Shipping Fee', value: `₹${shippingFee}`, icon:Truck, badge:'Configured', badgeColor:'#d97706', badgeBg:'#fffbeb' },
    { title:'Total Orders', value: orders.length, icon:Activity, badge:'All Time', badgeColor:'#7c3aed', badgeBg:'#f5f3ff' },
  ];

  const statusBreakdown = [
    { label:'Pending', count: orders.filter(o=>o.status==='pending').length, color:'#f59e0b' },
    { label:'Accepted', count: orders.filter(o=>o.status==='accepted').length, color:'#3b82f6' },
    { label:'In Picking', count: orders.filter(o=>o.status==='picking').length, color:'#a855f7' },
    { label:'Out for Delivery', count: orders.filter(o=>o.status==='out_for_delivery').length, color:'#f97316' },
    { label:'Delivered', count: deliveredOrds, color:'#10b981' },
    { label:'Cancelled', count: cancelledOrds, color:'#ef4444' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.75rem', animation:'fadeIn 0.4s ease both' }}>
      <SectionHeader title="Analytics Center" subtitle="Live platform metrics from real order, product, and user data."/>

      {/* KPI Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.25rem' }}>
        {kpiCards.map((k, i) => (
          <div key={i} style={{ ...S.card, padding:'1.5rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
              <div style={{ padding:'0.65rem', borderRadius:'0.65rem', background:'#fff0f3', color:C.primary }}><k.icon size={20}/></div>
              <span style={{ fontSize:'0.6rem', fontWeight:900, background:k.badgeBg, color:k.badgeColor, borderRadius:'0.4rem', padding:'0.15rem 0.5rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>{k.badge}</span>
            </div>
            <p style={{ margin:'0 0 0.25rem', fontSize:'0.65rem', fontWeight:900, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.08em' }}>{k.title}</p>
            <p style={{ margin:0, fontSize:'1.65rem', fontWeight:900, color:C.secondary }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Order Status Breakdown */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.25rem' }}>
        <div style={{ ...S.card, padding:'1.75rem' }}>
          <h3 style={{ margin:'0 0 1.5rem', fontWeight:800, fontSize:'1.05rem', color:C.secondary }}>Order Status Breakdown</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {statusBreakdown.map(s => {
              const pct = orders.length ? Math.round((s.count / orders.length) * 100) : 0;
              return (
                <div key={s.label}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.35rem' }}>
                    <span style={{ fontSize:'0.82rem', fontWeight:700, color:C.secondary }}>{s.label}</span>
                    <span style={{ fontSize:'0.82rem', fontWeight:900, color:s.color }}>{s.count} ({pct}%)</span>
                  </div>
                  <div style={{ height:'8px', background:C.bgLight, borderRadius:'4px', overflow:'hidden' }}>
                    <div style={{ height:'100%', background:s.color, borderRadius:'4px', width:`${pct}%`, transition:'width 0.5s ease' }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform Health */}
        <div style={{ ...S.card, padding:'1.75rem' }}>
          <h3 style={{ margin:'0 0 1.25rem', fontWeight:800, fontSize:'1.05rem', color:C.secondary }}>Platform Health</h3>
          {[
            { label:'Total Products', value: stats?.totalProducts || 0, color:'#f59e0b' },
            { label:'Pending Approvals', value: stats?.pendingProducts || 0, color:C.primary },
            { label:'Registered Shops', value: stats?.totalShops || 0, color:'#3b82f6' },
            { label:'Total Users', value: stats?.totalUsers || 0, color:'#10b981' },
            { label:'Delivered Orders', value: deliveredOrds, color:'#10b981' },
            { label:'Cancellation Rate', value: orders.length ? `${Math.round((cancelledOrds/orders.length)*100)}%` : '0%', color:'#ef4444' },
          ].map(m => (
            <div key={m.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'0.75rem', marginBottom:'0.75rem', borderBottom:`1px solid ${C.border}` }}>
              <p style={{ margin:0, fontSize:'0.8rem', fontWeight:700, color:C.secondary }}>{m.label}</p>
              <span style={{ fontSize:'1.1rem', fontWeight:900, color:m.color }}>{m.value}</span>
            </div>
          ))}
          <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.75rem', borderRadius:'0.65rem', background:'#ecfdf5', border:'1px solid #a7f3d0', marginTop:'0.5rem' }}>
            <CheckCircle size={14} color="#059669"/>
            <span style={{ fontSize:'0.72rem', fontWeight:700, color:'#065f46' }}>Live data from API</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  SETTINGS
// ═══════════════════════════════════════════════════════════════
const SettingsView = () => {
  const [isMaintenance, setIsMaintenance]   = useState(JSON.parse(localStorage.getItem('admin_setting_maintenance')) || false);
  const [shippingFee, setShippingFee]       = useState(localStorage.getItem('admin_setting_shipping') || '99');
  const [taxRate, setTaxRate]               = useState(localStorage.getItem('admin_setting_tax') || '18');
  const [supportEmail, setSupportEmail]     = useState(localStorage.getItem('admin_setting_email') || 'support@dripzo.com');
  const [allowVendorReg, setAllowVendorReg] = useState(JSON.parse(localStorage.getItem('admin_setting_vendor_reg')) !== false);
  const [toast, setToast]                   = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('admin_setting_maintenance', JSON.stringify(isMaintenance));
    localStorage.setItem('admin_setting_shipping', shippingFee);
    localStorage.setItem('admin_setting_tax', taxRate);
    localStorage.setItem('admin_setting_email', supportEmail);
    localStorage.setItem('admin_setting_vendor_reg', JSON.stringify(allowVendorReg));
    setToast({ msg:'Settings saved successfully!', type:'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const Toggle = ({ val, onToggle, label, sub }) => (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <div>
        <p style={{ margin:0, fontSize:'0.9rem', fontWeight:700, color:C.secondary }}>{label}</p>
        <p style={{ margin:0, fontSize:'0.72rem', color:C.textMuted }}>{sub}</p>
      </div>
      <button type="button" onClick={onToggle} style={{ width:'3rem', height:'1.6rem', borderRadius:'1rem', border:'none', cursor:'pointer', background: val ? C.primary : C.bgLight, border: val ? 'none' : `1px solid ${C.border}`, display:'flex', alignItems:'center', padding:'2px', justifyContent: val ? 'flex-end' : 'flex-start', transition:'all 0.3s', flexShrink:0 }}>
        <span style={{ width:'1.2rem', height:'1.2rem', background: val ? '#fff' : C.textMuted, borderRadius:'50%', boxShadow:'0 2px 4px rgba(0,0,0,0.15)' }}/>
      </button>
    </div>
  );

  return (
    <div style={{ animation:'fadeIn 0.4s ease both' }}>
      <SectionHeader title="System Settings" subtitle="Configure billing, logistics, and platform parameters."/>
      <form onSubmit={handleSave} style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.25rem' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          {/* Billing */}
          <div style={{ ...S.card, padding:'1.75rem' }}>
            <h3 style={{ margin:'0 0 1.25rem', fontWeight:800, fontSize:'1.05rem', color:C.primary, display:'flex', alignItems:'center', gap:'0.5rem', paddingBottom:'1rem', borderBottom:`1px solid ${C.border}` }}><DollarSign size={18}/> Billing & Logistics</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              <div>
                <label style={S.label}>Base Shipping Fee (₹)</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:C.textMuted, fontWeight:700 }}>₹</span>
                  <input required type="number" value={shippingFee} onChange={e=>setShippingFee(e.target.value)} style={{ ...S.input, paddingLeft:'2rem' }}/>
                </div>
              </div>
              <div>
                <label style={S.label}>Standard Tax Rate (%)</label>
                <div style={{ position:'relative' }}>
                  <input required type="number" value={taxRate} onChange={e=>setTaxRate(e.target.value)} style={{ ...S.input, paddingRight:'2rem' }}/>
                  <span style={{ position:'absolute', right:'1rem', top:'50%', transform:'translateY(-50%)', color:C.textMuted, fontWeight:700 }}>%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Communications */}
          <div style={{ ...S.card, padding:'1.75rem' }}>
            <h3 style={{ margin:'0 0 1.25rem', fontWeight:800, fontSize:'1.05rem', color:C.primary, display:'flex', alignItems:'center', gap:'0.5rem', paddingBottom:'1rem', borderBottom:`1px solid ${C.border}` }}><Mail size={18}/> Communications</h3>
            <div>
              <label style={S.label}>Support Email Address</label>
              <input required type="email" value={supportEmail} onChange={e=>setSupportEmail(e.target.value)} style={S.input}/>
            </div>
          </div>
        </div>

        {/* Switches */}
        <div style={{ ...S.card, padding:'1.75rem', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <h3 style={{ margin:'0 0 1.25rem', fontWeight:800, fontSize:'1.05rem', color:C.primary, display:'flex', alignItems:'center', gap:'0.5rem', paddingBottom:'1rem', borderBottom:`1px solid ${C.border}` }}><Activity size={18}/> Platform Switches</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
              <Toggle val={isMaintenance} onToggle={()=>setIsMaintenance(!isMaintenance)} label="Maintenance Mode" sub="Lock client checkout pipeline"/>
              <Toggle val={allowVendorReg} onToggle={()=>setAllowVendorReg(!allowVendorReg)} label="Vendor Signups" sub="Allow new vendor registrations"/>
            </div>
            {/* Status Info */}
            <div style={{ marginTop:'1.5rem', padding:'0.875rem', borderRadius:'0.75rem', background: isMaintenance ? '#fef2f2' : '#ecfdf5', border:`1px solid ${isMaintenance ? '#fecaca' : '#a7f3d0'}` }}>
              <p style={{ margin:0, fontSize:'0.75rem', fontWeight:700, color: isMaintenance ? '#dc2626' : '#059669' }}>
                {isMaintenance ? '⚠️ Maintenance active – checkout locked' : '✅ Platform running normally'}
              </p>
            </div>
          </div>
          <button type="submit" style={{ ...S.btnPrimary, width:'100%', padding:'0.875rem', marginTop:'1.5rem' }}><CheckCircle size={16}/> Save Settings</button>
        </div>
      </form>
      {toast && <Toast {...toast}/>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════
function App() {
  const location = useLocation();
  const [adminUser, setAdminUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('adminUser')) || null; } catch { return null; }
  });

  const handleLogout = () => { setAdminUser(null); localStorage.removeItem('adminUser'); };

  if (!adminUser) {
    return (
      <LoginView onLoginSuccess={user => { setAdminUser(user); localStorage.setItem('adminUser', JSON.stringify(user)); }}/>
    );
  }

  const menuItems = [
    { name:'Dashboard',      path:'/',         icon:LayoutDashboard },
    { name:'Users',          path:'/users',    icon:Users },
    { name:'Products',       path:'/products', icon:Package },
    { name:'Orders',         path:'/orders',   icon:ShoppingBag },
    { name:'Shops & Vendors',path:'/shops',    icon:Store },
    { name:'Analytics',      path:'/analytics',icon:BarChart3 },
    { name:'Settings',       path:'/settings', icon:Settings },
  ];

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f5f6', fontFamily:"'Outfit','Inter',sans-serif", color:'#282c3f' }}>

      {/* ── Sidebar ── */}
      <aside style={{ width:'260px', flexShrink:0, background:'linear-gradient(180deg,#282c3f 0%,#1a1a2e 100%)', display:'flex', flexDirection:'column', color:'#fff', minHeight:'100vh', position:'sticky', top:0, overflowY:'auto' }}>
        {/* Logo */}
        <div style={{ padding:'1.5rem 1.25rem 1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <div style={{ width:'2.5rem', height:'2.5rem', background:C.white, borderRadius:'0.7rem', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 14px rgba(0,0,0,0.25)' }}>
            <span style={{ fontWeight:900, fontSize:'1.1rem', color:C.secondary }}>D</span>
          </div>
          <div>
            <div style={{ fontWeight:900, fontSize:'1.05rem', letterSpacing:'-0.03em', lineHeight:1 }}>DRIPZO</div>
            <div style={{ fontSize:'0.58rem', color:C.primary, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'2px' }}>Admin Center</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'0.5rem 0.75rem', display:'flex', flexDirection:'column', gap:'0.2rem' }}>
          {menuItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} style={{
                display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.75rem 1rem',
                borderRadius:'0.7rem', textDecoration:'none', fontFamily:"'Outfit','Inter',sans-serif",
                fontSize:'0.875rem', fontWeight:700,
                background: active ? 'rgba(255,63,108,0.12)' : 'transparent',
                color: active ? C.primary : 'rgba(255,255,255,0.55)',
                borderRight: active ? `3px solid ${C.primary}` : '3px solid transparent',
                transition:'all 0.2s',
              }}>
                <item.icon size={17}/>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div style={{ padding:'1rem 1.25rem', borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.65rem', minWidth:0 }}>
            <div style={{ width:'2.25rem', height:'2.25rem', borderRadius:'0.6rem', background:C.primary, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'0.85rem', flexShrink:0, boxShadow:'0 4px 12px rgba(255,63,108,0.25)' }}>
              {adminUser.name?.slice(0,2).toUpperCase()}
            </div>
            <div style={{ minWidth:0 }}>
              <p style={{ margin:0, fontSize:'0.78rem', fontWeight:800, color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'120px' }}>{adminUser.name}</p>
              <p style={{ margin:0, fontSize:'0.62rem', color:'rgba(255,255,255,0.35)', textTransform:'capitalize' }}>{adminUser.role || 'Super Admin'}</p>
            </div>
          </div>
          <button onClick={handleLogout} title="Logout" style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.35)', display:'flex', padding:'0.25rem', borderRadius:'0.4rem' }} onMouseEnter={e=>e.currentTarget.style.color=C.primary} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.35)'}>
            <LogOut size={16}/>
          </button>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, maxHeight:'100vh', overflow:'hidden' }}>
        {/* Header */}
        <header style={{ height:'70px', background:C.white, borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 2rem', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', background:C.bgLight, borderRadius:'0.75rem', padding:'0.55rem 1rem', width:'320px' }}>
            <Search size={14} color={C.textMuted}/>
            <input type="text" placeholder="Search orders, products, users..." style={{ background:'none', border:'none', outline:'none', fontSize:'0.8rem', color:C.secondary, fontFamily:"'Outfit','Inter',sans-serif", width:'100%' }}/>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <span style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.75rem', fontWeight:700, background:'#ecfdf5', color:'#059669', border:'1px solid #a7f3d0', borderRadius:'0.65rem', padding:'0.4rem 0.75rem' }}>
              <span style={{ width:'6px', height:'6px', background:'#10b981', borderRadius:'50%', animation:'pulse 2s infinite' }}/>
              All Systems Online
            </span>
            <div style={{ width:'1px', height:'1.5rem', background:C.border }}/>
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', background:C.bgLight, borderRadius:'0.75rem', padding:'0.45rem 0.85rem' }}>
              <div style={{ width:'1.85rem', height:'1.85rem', borderRadius:'0.5rem', background:C.primary, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'0.7rem', color:'#fff' }}>{adminUser.name?.slice(0,2).toUpperCase()}</div>
              <span style={{ fontSize:'0.78rem', fontWeight:700, color:C.secondary }}>System v1.2</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, overflowY:'auto', padding:'2rem' }}>
          <Routes>
            <Route path="/"         element={<DashboardHome adminUser={adminUser}/>}/>
            <Route path="/users"    element={<UsersList/>}/>
            <Route path="/products" element={<ProductsList/>}/>
            <Route path="/orders"   element={<OrdersList/>}/>
            <Route path="/shops"    element={<ShopsList/>}/>
            <Route path="/analytics"element={<AnalyticsView/>}/>
            <Route path="/settings" element={<SettingsView/>}/>
          </Routes>
        </main>
      </div>

      <style>{`
        @keyframes cardEntry { from{opacity:0;transform:scale(0.93) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.45} }
        @keyframes fadeIn    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
        body { margin:0; font-family:'Outfit','Inter',sans-serif; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:#f5f5f6; }
        ::-webkit-scrollbar-thumb { background:#d4d5d9; border-radius:3px; }
        ::-webkit-scrollbar-thumb:hover { background:#ff3f6c; }
        input:focus, textarea:focus, select:focus { border-color:#ff3f6c!important; box-shadow:0 0 0 3px rgba(255,63,108,0.10)!important; }
        a { text-decoration:none; }
      `}</style>
    </div>
  );
}

export default App;
