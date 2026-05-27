import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, MapPin } from 'lucide-react';

const OrderTracking = () => {
  return (
    <div className="pt-20 min-h-screen bg-bgLight">
      <div className="container mx-auto px-6 max-w-4xl py-10">
        <h1 className="text-3xl font-bold mb-8 text-secondary">Order Tracking</h1>
        
        <div className="bg-white rounded-xl border border-borderLight p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Package size={120} className="text-secondary" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-secondary">Order #DRIP-8493X</h2>
          <p className="text-textMuted mb-8 text-sm">Estimated Delivery: <span className="text-primary font-bold text-lg ml-2">14:35 PM</span></p>
          
          <div className="relative">
            <div className="absolute top-5 left-0 w-full h-1 bg-borderLight rounded-full"></div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-5 left-0 h-1 bg-gradient-to-r from-primary to-electricPurple rounded-full"
            ></motion.div>
            
            <div className="relative flex justify-between">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mb-3 shadow-md z-10">
                  <CheckCircle size={20} />
                </div>
                <span className="font-semibold text-xs text-secondary">Confirmed</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-electricPurple flex items-center justify-center text-white mb-3 shadow-md z-10">
                  <Package size={20} />
                </div>
                <span className="font-semibold text-xs text-secondary">Picking</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-bgLight border-2 border-borderLight flex items-center justify-center text-textMuted mb-3 z-10">
                  <Truck size={20} />
                </div>
                <span className="font-semibold text-xs text-textMuted">On the way</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-bgLight border-2 border-borderLight flex items-center justify-center text-textMuted mb-3 z-10">
                  <MapPin size={20} />
                </div>
                <span className="font-semibold text-xs text-textMuted">Delivered</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-borderLight p-6">
             <h3 className="text-lg font-bold mb-4 border-b border-borderLight pb-3 text-secondary">Delivery Partner</h3>
             <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-borderLight">
                 <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Driver" className="w-full h-full object-cover" />
               </div>
               <div>
                 <h4 className="font-bold text-secondary">Alex Carter</h4>
                 <p className="text-textMuted text-sm">Electric Bike • 4.9 ★</p>
               </div>
               <button className="ml-auto w-10 h-10 rounded-full bg-bgLight flex items-center justify-center hover:bg-primary hover:text-white transition text-secondary border border-borderLight">
                 📞
               </button>
             </div>
          </div>
          
          <div className="bg-white rounded-xl border border-borderLight p-6">
             <h3 className="text-lg font-bold mb-4 border-b border-borderLight pb-3 text-secondary">Live Map (Simulated)</h3>
             <div className="h-28 bg-bgLight rounded-xl relative overflow-hidden flex items-center justify-center border border-borderLight">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ff3f6c 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-4 h-4 bg-primary rounded-full absolute top-1/2 left-1/4 shadow-md"
                ></motion.div>
                <span className="text-textMuted z-10 text-sm">Map Component Pending API Key</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
