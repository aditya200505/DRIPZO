import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, ChevronRight, ChevronDown, Edit3, Trash2, Plus, ShoppingCart, Bell, Lock, Star, Upload, Navigation, DollarSign, X, Flame } from 'lucide-react';
import { SkeletonLine, SkeletonBlock } from '../components/Skeleton';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate, useSearchParams } from 'react-router-dom';
import DripzyRoast from '../components/DripzyRoast';
import axios from 'axios';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const { wishlist, toggleWishlist, addToCart, showToast, notifications, markAllNotificationsAsRead, markNotificationAsRead } = useShop();
  const { currentUser, logout, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarSelectionMode, setAvatarSelectionMode] = useState(null);

  const defaultAvatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jude',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Avery',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Destiny',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo'
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User size={18} /> },
    { id: 'orders', label: 'Orders', icon: <Package size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
    { id: 'cards', label: 'Payment Methods', icon: <CreditCard size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    { id: 'dripzy-roast', label: 'Dripzy Roast', icon: <Flame size={18} className="text-orange-500" /> },
  ];

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    push: false
  });

  // Rewards State
  const [dripzoPoints, setDripzoPoints] = useState(250);
  const [dripzoCredits, setDripzoCredits] = useState(4500);

  // Orders State (Dynamic from MySQL DB)
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [ratingModal, setRatingModal] = useState({ show: false, orderId: null });
  const [reviewStars, setReviewStars] = useState(0);

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;
    
    const fetchUserOrders = async () => {
      setOrdersLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/orders/user/${currentUser.id}`);
        if (data.success && data.orders) {
          import('../data/productData').then((module) => {
            const mappedOrders = data.orders.map(order => {
              const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });
              
              const items = order.products.map(p => {
                const prod = module.getProductById(p.productId) || {};
                return {
                  name: prod.name || 'Premium Item',
                  image: prod.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'
                };
              });

              let statusText = 'Pending';
              if (order.status === 'accepted') statusText = 'Accepted';
              else if (order.status === 'picking') statusText = 'Picking';
              else if (order.status === 'out_for_delivery') statusText = 'Out for Delivery';
              else if (order.status === 'delivered') statusText = 'Delivered';
              else if (order.status === 'cancelled') {
                statusText = order.paymentStatus === 'refunded' ? 'Refunded' : 'Cancelled';
              }

              return {
                id: order.id,
                shortId: `ORD-${order.id.slice(0, 6).toUpperCase()}`,
                date: orderDate,
                status: statusText,
                rawStatus: order.status,
                paymentStatus: order.paymentStatus,
                total: Number(order.totalAmount),
                items
              };
            });
            setOrders(mappedOrders);
          });
        }
      } catch (error) {
        console.error('Failed to load user orders:', error.message);
      } finally {
        setOrdersLoading(false);
      }
    };
    
    fetchUserOrders();
  }, [currentUser, activeTab]);

  useEffect(() => {
    if (showAvatarModal || ratingModal.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAvatarModal, ratingModal.show]);

  // Addresses State
  const [addressesList, setAddressesList] = useState([
    { id: 'A-1', type: 'Home', address: '128 MG Road, Apt 4B', city: 'Mumbai', zip: '400001', isDefault: true },
    { id: 'A-2', type: 'Office', address: '404 Cyber Hub, Tower 7', city: 'Gurugram', zip: '122002', isDefault: false }
  ]);
  const [editingAddressId, setEditingAddressId] = useState(null);

  // Payment State
  const [savedCardsList, setSavedCardsList] = useState([
    { id: 'C-1', type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true, bankName: 'HDFC Bank' }
  ]);

  // --- HANDLERS ---
  const handleCancelOrder = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/orders/${id}`, {
        status: 'cancelled',
        paymentStatus: 'failed'
      });
      if (res.data.success) {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled', rawStatus: 'cancelled' } : o));
        showToast('Order Cancelled Successfully', 'info');
      }
    } catch (error) {
      console.error('Failed to cancel order:', error);
      showToast('Failed to cancel order', 'error');
    }
  };

  const handleReturnOrder = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Returned' } : o));
    showToast('Return Initiated (7 Days Policy)', 'info');
  };

  const submitRating = () => {
    showToast('Review Submitted Successfully!', 'success');
    setRatingModal({ show: false, orderId: null });
    setReviewStars(0);
  };

  const convertPoints = () => {
    if (dripzoPoints >= 10) {
      const creditsToAdd = Math.floor(dripzoPoints / 10);
      setDripzoCredits(prev => prev + creditsToAdd);
      setDripzoPoints(prev => prev % 10);
      showToast(`Converted ${creditsToAdd * 10} points to ₹${creditsToAdd} credits!`, 'success');
    } else {
      showToast('Minimum 10 points required to convert', 'error');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image must be less than 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result });
        showToast('Profile photo updated!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateUser({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone')
    });
    showToast('Settings Saved Successfully!', 'success');
  };

  const handleAddPayment = (type) => {
    const newMethod = type === 'bank' 
      ? { id: `B-${Date.now()}`, type: 'Bank Account', last4: '8989', expiry: 'N/A', isDefault: false, bankName: 'SBI Account' }
      : { id: `U-${Date.now()}`, type: 'UPI', last4: 'dripzo', expiry: 'N/A', isDefault: false, bankName: 'user@upi' };
    setSavedCardsList([...savedCardsList, newMethod]);
    showToast(`Linked ${type === 'bank' ? 'Bank Account' : 'UPI ID'} Successfully`, 'success');
  };

  const handleUseLocation = () => {
    showToast('Fetching current location...', 'info');
    setTimeout(() => {
      showToast('Location fetched successfully!', 'success');
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/');
  };

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/auth" />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-borderLight p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-5">
                <img src={currentUser.avatar} alt="Profile" className="w-20 h-20 rounded-full border-2 border-primary shadow-md object-cover" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary">{currentUser.name}</h2>
                  <p className="text-textMuted text-sm">{currentUser.email}</p>
                  <p className="text-textMuted text-sm">{currentUser.phone}</p>
                </div>
              </div>
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold text-sm">
                {currentUser.tier}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <div 
                onClick={() => setActiveTab('orders')}
                className="bg-white rounded-xl border border-borderLight p-6 text-center cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <Package size={28} className="text-primary mb-3 mx-auto" />
                <h3 className="text-2xl font-bold text-secondary">{orders.length}</h3>
                <p className="text-textMuted text-xs font-bold uppercase tracking-wider mt-1">Total Orders</p>
              </div>
              <div 
                onClick={() => setActiveTab('wishlist')}
                className="bg-white rounded-xl border border-borderLight p-6 text-center cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <Heart size={28} className="text-primary mb-3 mx-auto" />
                <h3 className="text-2xl font-bold text-secondary">{wishlist.length}</h3>
                <p className="text-textMuted text-xs font-bold uppercase tracking-wider mt-1">Wishlist Items</p>
              </div>
              <div 
                onClick={() => setActiveTab('cards')}
                className="bg-white rounded-xl border border-borderLight p-6 text-center cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <DollarSign size={28} className="text-green-600 mb-3 mx-auto" />
                <h3 className="text-2xl font-bold text-secondary">₹{dripzoCredits}</h3>
                <p className="text-textMuted text-xs font-bold uppercase tracking-wider mt-1">Dripzo Credits</p>
              </div>
              <div 
                className="bg-white rounded-xl border border-borderLight p-6 text-center relative overflow-hidden group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <Star size={28} className="text-yellow-500 mb-3 mx-auto" />
                <h3 className="text-2xl font-bold text-secondary">{dripzoPoints}</h3>
                <p className="text-textMuted text-xs font-bold uppercase tracking-wider mt-1">Dripzo Points</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); convertPoints(); }} 
                  className="absolute inset-0 bg-primary/95 text-white flex items-center justify-center font-bold text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  Convert to Credits
                </button>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-secondary">Recent Orders</h2>
            {ordersLoading ? (
              /* ─── Order Skeleton Cards ─── */
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-borderLight overflow-hidden p-5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                    <div className="flex-1 space-y-3 w-full">
                      <div className="flex justify-between items-center">
                        <SkeletonLine width="w-28" height="h-4" />
                        <SkeletonLine width="w-20" height="h-5" className="rounded-full" />
                      </div>
                      <SkeletonLine width="w-36" height="h-3" />
                      <div className="flex space-x-3">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <SkeletonBlock key={j} className="w-14 h-14 rounded-lg" />
                        ))}
                      </div>
                    </div>
                    <div className="text-right space-y-3">
                      <SkeletonLine width="w-20" height="h-5" />
                      <SkeletonLine width="w-24" height="h-3" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
            <>
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-borderLight overflow-hidden hover:border-primary/30 transition-colors">
                <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-primary">{order.shortId || order.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                        order.status === 'Returned' ? 'bg-purple-100 text-purple-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-textMuted text-sm mb-3">Placed on {order.date}</p>
                    <div className="flex space-x-3">
                      {order.items.map((item, idx) => (
                        <img key={idx} src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border border-borderLight" />
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-3">
                    <span className="text-lg font-bold text-secondary">₹{order.total.toLocaleString('en-IN')}</span>
                    <button 
                      onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                      className="flex items-center text-primary hover:text-primaryDark transition-colors mt-1 text-sm font-semibold"
                    >
                      {expandedOrderId === order.id ? 'Hide Details' : 'View Details'} 
                      {expandedOrderId === order.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrderId === order.id && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="border-t border-borderLight bg-bgLight/50 p-5 overflow-hidden">
                    <h4 className="font-bold text-sm text-secondary mb-3">Order Items</h4>
                    <div className="space-y-3 mb-5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center bg-white p-3 rounded-lg border border-borderLight">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                          <p className="font-semibold text-sm flex-1">{item.name}</p>
                          {order.status === 'Delivered' && (
                            <button onClick={() => setRatingModal({ show: true, orderId: order.id })} className="text-xs bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded font-bold hover:bg-yellow-100 flex items-center gap-1">
                              <Star size={12} className="fill-yellow-500" /> Rate Product
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 justify-end pt-3 border-t border-borderLight">
                      {(order.rawStatus === 'pending' || order.rawStatus === 'accepted' || order.rawStatus === 'picking') && (
                        <button onClick={() => handleCancelOrder(order.id)} className="px-4 py-2 border border-red-200 text-red-500 rounded-lg text-sm font-bold hover:bg-red-50 hover:border-red-500 transition-colors">
                          Cancel Order
                        </button>
                      )}
                      {order.status === 'Delivered' && (
                        <button onClick={() => handleReturnOrder(order.id)} className="px-4 py-2 border border-primary/20 text-primary rounded-lg text-sm font-bold hover:bg-primary/5 hover:border-primary transition-colors">
                          Return Order (7 Days Policy)
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
            </>
            )}
          </div>
        );
      case 'wishlist':
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-secondary">My Wishlist</h2>
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-xl border border-borderLight p-10 text-center">
                <Heart size={48} className="text-borderLight mx-auto mb-4" />
                <h3 className="text-lg font-bold text-secondary mb-2">Your wishlist is empty</h3>
                <p className="text-textMuted text-sm">Save items you love here to shop them later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {wishlist.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-borderLight overflow-hidden group premium-card relative">
                    <div className="h-44 overflow-hidden relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <button onClick={() => toggleWishlist(item)} className="absolute top-2 right-2 p-2 bg-white shadow-md rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors z-10">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-secondary text-sm mb-1">{item.name}</h3>
                      <p className="text-primary font-bold mb-3">₹{item.price.toLocaleString('en-IN')}</p>
                      <button onClick={() => { addToCart(item); toggleWishlist(item); }} className="w-full py-2 border border-borderLight rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-colors flex justify-center items-center gap-2 text-sm font-semibold text-secondary relative z-10">
                        <ShoppingCart size={14} /> Move to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-secondary">My Notifications</h2>
              <button 
                onClick={markAllNotificationsAsRead}
                className="text-sm text-primary font-bold hover:underline"
              >
                Mark all as read
              </button>
            </div>
            
            <div className="bg-white rounded-xl border border-borderLight overflow-hidden">
              {notifications.length === 0 ? (
                <div className="p-20 text-center">
                  <Bell size={48} className="text-borderLight mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-secondary mb-2">No notifications yet</h3>
                  <p className="text-textMuted text-sm">We'll notify you when something important happens.</p>
                </div>
              ) : (
                <div className="divide-y divide-borderLight">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      onClick={() => {
                        markNotificationAsRead(notification.id);
                        if (notification.link) {
                          navigate(notification.link);
                        }
                      }}
                      className={`p-6 hover:bg-bgLight transition-colors cursor-pointer flex gap-4 ${!notification.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-borderLight flex items-center justify-center shrink-0 text-xl shadow-sm">
                        {notification.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-secondary">{notification.title}</h4>
                          <span className="text-xs text-textLight">{notification.time}</span>
                        </div>
                        <p className="text-sm text-textMuted leading-relaxed">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-3 h-3 bg-primary rounded-full mt-2 shadow-sm"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'addresses':
        return (
          <div className="space-y-5">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <h2 className="text-xl font-bold text-secondary">Saved Addresses</h2>
              <div className="flex gap-2">
                <button onClick={handleUseLocation} className="px-4 py-2 border border-primary text-primary rounded-lg font-semibold text-sm hover:bg-primary/5 transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Navigation size={16} /> Use Current Location
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primaryDark transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Plus size={16} /> Add Another Location
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {addressesList.map((addr) => (
                <div key={addr.id} className="bg-white rounded-xl border border-borderLight p-5 relative hover:border-primary/30 transition-colors">
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">DEFAULT</span>
                  )}
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-2 text-secondary"><MapPin size={18} className="text-primary" /> {addr.type}</h3>
                  
                  {editingAddressId === addr.id ? (
                    <div className="space-y-3 mt-3">
                      <input type="text" defaultValue={addr.address} className="w-full text-sm border border-borderLight rounded p-2 focus:outline-none focus:border-primary" />
                      <div className="flex gap-2">
                        <input type="text" defaultValue={addr.city} className="w-1/2 text-sm border border-borderLight rounded p-2 focus:outline-none focus:border-primary" />
                        <input type="text" defaultValue={addr.zip} className="w-1/2 text-sm border border-borderLight rounded p-2 focus:outline-none focus:border-primary" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingAddressId(null)} className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded hover:bg-primaryDark">Save</button>
                        <button onClick={() => setEditingAddressId(null)} className="px-3 py-1.5 bg-gray-200 text-secondary text-xs font-bold rounded hover:bg-gray-300">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-textMuted text-sm mb-0.5">{currentUser.name}</p>
                      <p className="text-textMuted text-sm mb-0.5">{addr.address}</p>
                      <p className="text-textMuted text-sm mb-4">{addr.city} - {addr.zip}</p>
                      <div className="flex gap-4 border-t border-borderLight pt-3">
                        <button onClick={() => setEditingAddressId(addr.id)} className="flex items-center gap-1.5 text-sm text-textLight hover:text-primary transition-colors"><Edit3 size={14} /> Edit</button>
                        <button onClick={() => setAddressesList(prev => prev.filter(a => a.id !== addr.id))} className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600 transition-colors"><Trash2 size={14} /> Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'cards':
        return (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-secondary">Payment Methods</h2>
              <div className="flex gap-2">
                <button onClick={() => handleAddPayment('upi')} className="px-3 py-2 border border-primary/20 text-primary rounded-lg font-semibold text-sm hover:bg-primary/5 transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Plus size={16} /> Link UPI ID
                </button>
                <button onClick={() => handleAddPayment('bank')} className="px-3 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primaryDark transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Plus size={16} /> Link Bank Account
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {savedCardsList.map((card) => (
                <div key={card.id} className="bg-gradient-to-br from-secondary to-secondary/80 text-white rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                  {card.isDefault && (
                    <span className="absolute top-4 right-4 text-xs font-bold bg-green-500/20 text-green-300 px-2 py-1 rounded z-10">DEFAULT</span>
                  )}
                  <h3 className="text-lg font-bold mb-1 z-10 relative">{card.bankName}</h3>
                  <p className="text-xs text-white/70 italic mb-4 z-10 relative">{card.type}</p>
                  <p className="text-xl font-mono tracking-widest mb-4 text-white/90 z-10 relative">
                    {card.type === 'UPI' ? card.last4 : `•••• •••• •••• ${card.last4}`}
                  </p>
                  <div className="flex justify-between items-center text-sm text-white/60 z-10 relative">
                    <p>Exp: {card.expiry}</p>
                    <button onClick={() => setSavedCardsList(prev => prev.filter(c => c.id !== card.id))} className="hover:text-red-400 transition-colors z-10 relative"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-secondary">Account Settings</h2>
            
            <div className="bg-white rounded-xl border border-borderLight p-6">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2 border-b border-borderLight pb-3 text-secondary"><User size={18} className="text-primary" /> Personal Information</h3>
              
              <div className="flex flex-col gap-5 mb-8">
                <div className="flex items-center gap-6">
                  <div className="relative group shrink-0">
                    <img src={currentUser.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-borderLight group-hover:opacity-50 transition-opacity bg-bgLight" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-base">Profile Photo</h4>
                    <p className="text-xs text-textMuted mb-3">Upload a custom photo (Max 2MB) or choose a default avatar.</p>
                    <button 
                      type="button"
                      onClick={() => { setShowAvatarModal(true); setAvatarSelectionMode(null); }}
                      className="text-xs font-bold text-primary hover:text-white hover:bg-primary transition-colors cursor-pointer inline-block border border-primary px-4 py-2 rounded-md uppercase tracking-wider"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={saveSettings} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-textMuted mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input type="text" name="name" defaultValue={currentUser.name} className="w-full bg-bgLight border border-borderLight rounded-lg px-4 py-3 text-secondary text-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-textMuted mb-1.5 uppercase tracking-wider">Email</label>
                    <input type="email" name="email" defaultValue={currentUser.email} className="w-full bg-bgLight border border-borderLight rounded-lg px-4 py-3 text-secondary text-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-textMuted mb-1.5 uppercase tracking-wider">Phone</label>
                    <input type="tel" name="phone" defaultValue={currentUser.phone} className="w-full bg-bgLight border border-borderLight rounded-lg px-4 py-3 text-secondary text-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
                <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primaryDark transition-colors">Save Changes</button>
              </form>
            </div>

            <div className="bg-white rounded-xl border border-borderLight p-6">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2 border-b border-borderLight pb-3 text-secondary"><Flame size={18} className="text-primary" /> Dripzy Roast Experience</h3>
              <div className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-semibold text-secondary text-sm">Exclusive Fashion Roast</p>
                  <p className="text-xs text-textMuted">Enable AI-powered style analysis and viral fashion feedback.</p>
                </div>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" checked={currentUser.dripzyRoastEnabled || false} onChange={() => updateUser({ dripzyRoastEnabled: !currentUser.dripzyRoastEnabled })} />
                  <div className="w-10 h-5 bg-borderLight rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm peer-checked:bg-primary"></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-borderLight p-6">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2 border-b border-borderLight pb-3 text-secondary"><Bell size={18} className="text-primary" /> Notifications</h3>
              <div className="space-y-4">
                {Object.keys(notificationSettings).map((key) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-semibold text-secondary text-sm capitalize">{key} Notifications</p>
                      <p className="text-xs text-textMuted">Get updates via {key}</p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={notificationSettings[key]} onChange={() => setNotificationSettings(p => ({...p, [key]: !p[key]}))} />
                      <div className="w-10 h-5 bg-borderLight rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm peer-checked:bg-primary"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-borderLight p-6">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2 border-b border-borderLight pb-3 text-secondary"><Lock size={18} className="text-primary" /> Security</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-semibold text-secondary text-sm">Change Password</p>
                    <p className="text-xs text-textMuted">Update your password regularly</p>
                  </div>
                  <button onClick={() => showToast('Password reset link sent to email', 'info')} className="px-4 py-2 border border-borderLight rounded-lg hover:border-primary hover:text-primary transition-colors text-sm font-semibold text-secondary">Update</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'dripzy-roast':
        return <DripzyRoast />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-bgLight relative">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-secondary">
          My <span className="text-primary">Dashboard</span>
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl border border-borderLight overflow-hidden sticky top-24">
              <div className="p-5 border-b border-borderLight">
                <div className="flex items-center space-x-3">
                  <img src={currentUser.avatar} className="w-10 h-10 rounded-full object-cover border border-primary/20" alt="Avatar" />
                  <div>
                    <h3 className="font-bold text-secondary text-sm">{currentUser.name}</h3>
                    <p className="text-xs text-textMuted">{currentUser.tier}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all mb-0.5 text-sm
                      ${activeTab === tab.id 
                        ? 'bg-primary/5 text-primary font-bold' 
                        : 'text-textLight hover:bg-bgLight hover:text-secondary'
                      }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-borderLight">
                <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm font-semibold">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* RATING MODAL */}
      {ratingModal.show && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-md relative overflow-hidden">
            <button onClick={() => setRatingModal({ show: false, orderId: null })} className="absolute top-4 right-4 text-textMuted hover:text-red-500"><X size={20}/></button>
            <h3 className="text-xl font-bold text-secondary mb-1">Rate Product</h3>
            <p className="text-sm text-textMuted mb-6">Share your experience with others.</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setReviewStars(star)}>
                  <Star size={32} className={`${reviewStars >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors`} />
                </button>
              ))}
            </div>

            <textarea 
              placeholder="Write your review here..." 
              className="w-full border border-borderLight rounded-xl p-4 text-sm focus:outline-none focus:border-primary mb-4 h-32 resize-none"
            ></textarea>

            <div className="border-2 border-dashed border-borderLight rounded-xl p-6 text-center mb-6 hover:bg-bgLight cursor-pointer transition-colors">
              <Upload size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-bold text-secondary">Upload Photos</p>
              <p className="text-xs text-textMuted">Max 3 images (JPG, PNG)</p>
            </div>

            <button onClick={submitRating} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primaryDark transition-colors">
              Submit Review
            </button>
          </motion.div>
        </div>
      )}

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
          >
            <button 
              onClick={() => { setShowAvatarModal(false); setAvatarSelectionMode(null); }}
              className="absolute top-4 right-4 text-textMuted hover:text-secondary transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="p-6 text-center border-b border-borderLight">
              <h3 className="text-xl font-bold text-secondary">Change Profile Photo</h3>
              <p className="text-sm text-textMuted mt-1">Select an option to update your avatar</p>
            </div>

            <div className="p-6 min-h-[250px]">
              {!avatarSelectionMode ? (
                <div className="space-y-4">
                  <button 
                    onClick={() => setAvatarSelectionMode('default')}
                    className="w-full py-4 px-6 border-2 border-borderLight hover:border-primary rounded-xl flex items-center gap-4 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <User size={24} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-secondary group-hover:text-primary transition-colors">Choose Default Avatar</h4>
                      <p className="text-xs text-textMuted">Select from our cool cartoon avatars</p>
                    </div>
                  </button>

                  <label className="w-full py-4 px-6 border-2 border-borderLight hover:border-primary rounded-xl flex items-center gap-4 transition-all group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Upload size={24} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-secondary group-hover:text-primary transition-colors">Upload from Device</h4>
                      <p className="text-xs text-textMuted">Choose a custom image (Max 2MB)</p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { handleAvatarChange(e); setShowAvatarModal(false); }} />
                  </label>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex items-center gap-3 mb-5">
                    <button onClick={() => setAvatarSelectionMode(null)} className="text-textMuted hover:text-primary"><ChevronRight className="rotate-180" size={18} /></button>
                    <h4 className="font-bold text-secondary">Select a Cartoon Avatar</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {defaultAvatars.map((url, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          updateUser({ avatar: url });
                          showToast('Profile photo updated!', 'success');
                          setShowAvatarModal(false);
                          setAvatarSelectionMode(null);
                        }}
                        className={`aspect-square rounded-full overflow-hidden border-2 transition-all bg-bgLight ${currentUser.avatar === url ? 'border-primary ring-4 ring-primary/20 scale-110' : 'border-borderLight hover:border-primary hover:scale-105'}`}
                      >
                        <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
