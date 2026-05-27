import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const GlobalToast = () => {
  const { toast } = useShop();

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-2xl border border-borderLight"
        >
          {toast.type === 'success' ? (
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle size={18} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Info size={18} />
            </div>
          )}
          <p className="font-bold text-secondary text-sm">{toast.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalToast;
